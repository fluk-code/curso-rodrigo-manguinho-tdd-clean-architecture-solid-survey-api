import { LogControllerDecorator } from './log-controller-decorator'
import { serverError, success } from '@/presentation/helpers/http/http-helper'
import { IAccountModel } from '@/domain/models/account'
import { ILogErrorRepository } from '@/data/protocols/db/log/log-error-repository'
import { IController, IHttpRequest, IHttpResponse } from '@/presentation/protocols'

const makeController = (): IController => {
  class ControllerStub implements IController {
    async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
      return await new Promise(resolve => resolve(success(makeFakeAccount())))
    }
  }

  return new ControllerStub()
}

const makeLogErrorRepository = (): ILogErrorRepository => {
  class LogErrorRepositoryStub implements ILogErrorRepository {
    async logError (stack: string): Promise<void> {
    }
  }
  return new LogErrorRepositoryStub()
}

const makeFakeRequest = (): IHttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})

const makeFakeAccount = (): IAccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password'
})

const makeFakeServerError = (): IHttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return serverError(fakeError)
}

type TSutTypes = {
  sut: LogControllerDecorator
  controllerStub: IController
  logErrorRepositoryStub: ILogErrorRepository
}

const makeSut = (): TSutTypes => {
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

    await sut.handle(makeFakeRequest())
    expect(handleControllerSpy).toHaveBeenCalledWith(makeFakeRequest())
  })

  it('Should return the same result of the controller', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(success(makeFakeAccount()))
  })

  it('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()

    const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError')
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(
      new Promise(resolve => resolve(makeFakeServerError()))
    )

    await sut.handle(makeFakeRequest())
    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
