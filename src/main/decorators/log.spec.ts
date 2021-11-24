import { IController, IHttpRequest, IHttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

describe('Log Controller Decorator', () => {
  it('Should call controller handle', async () => {
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

    const controllerStub = new ControllerStub()
    const handleControllerSpy = jest.spyOn(controllerStub, 'handle')
    const sut = new LogControllerDecorator(controllerStub)
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
})
