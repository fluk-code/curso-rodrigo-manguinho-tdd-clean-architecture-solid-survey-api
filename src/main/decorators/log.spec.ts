import { IController, IHttpRequest, IHttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'
import { serverError } from '../../presentation/helpers/http-helper'
import { ILogErrorRepository } from '../../data/protocols/log-error-repository'

const makeController = (): IController => {
  class ControllerStub implements IController {
    async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
      const httpResponse: IHttpResponse = {
        statusCode: 200,
        body: {
          message: 'Success'
        }
      }
      return await new Promise(resolve => resolve(httpResponse))
    }
  }

  return new ControllerStub()
}

const makeLogErrorRepository = (): ILogErrorRepository => {
  class LogErrorRepositoryStub implements ILogErrorRepository {
    async log (stack: string): Promise<void> {
    }
  }
  return new LogErrorRepositoryStub()
}

interface ISutTypes {
  sut: LogControllerDecorator
  controllerStub: IController
  logErrorRepositoryStub: ILogErrorRepository
}

const makeSut = (): ISutTypes => {
  const controllerStub = makeController()
  const logErrorRepositoryStub = makeLogErrorRepository()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)

  return {
    sut,
    controllerStub,
    logErrorRepositoryStub
  }
}

describe('Log Controller Decorator', () => {
  it('Should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()
    const handleControllerSpy = jest.spyOn(controllerStub, 'handle')

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        password: 'any_passord',
        passwordConfirmation: 'any_passord'
      }
    }
    await sut.handle(httpRequest)
    expect(handleControllerSpy).toHaveBeenCalledWith(httpRequest)
  })

  it('Should return the same result of the controller', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        password: 'any_passord',
        passwordConfirmation: 'any_passord'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: {
        message: 'Success'
      }
    })
  })

  it('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()
    const fakeError = new Error()
    fakeError.stack = 'any_stack'
    const error = serverError(fakeError)

    const logSpy = jest.spyOn(logErrorRepositoryStub, 'log')
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(
      new Promise(resolve => resolve(error))
    )
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        password: 'any_passord',
        passwordConfirmation: 'any_passord'
      }
    }
    await sut.handle(httpRequest)
    expect(logSpy).toHaveBeenCalledWith(fakeError.stack)
  })
})
