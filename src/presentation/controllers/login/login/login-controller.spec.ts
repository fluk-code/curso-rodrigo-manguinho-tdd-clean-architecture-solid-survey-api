import { MissingParamError } from '../../../errors'
import { badRequest, serverError, success, unauthorized } from '../../../helpers/http/http-helper'
import { IValidation } from '../../../protocols/valitation'
import { LoginController } from './login-controller'
import { IAuthentication, IAuthenticationModel, IHttpRequest } from './login-protocols'

const makeValidation = (): IValidation => {
  class ValidationStub implements IValidation {
    validate (input: any): any {
      return null
    }
  }
  return new ValidationStub()
}

interface ISutTypes {
  sut: LoginController
  authenticationStub: IAuthentication
  validationStub: IValidation
}

const makeSut = (): ISutTypes => {
  const validationStub = makeValidation()
  const authenticationStub = makeAuthentication()

  const sut = new LoginController(authenticationStub, validationStub)
  return {
    sut,
    validationStub,
    authenticationStub
  }
}

const makeAuthentication = (): IAuthentication => {
  class AuthenticationStub implements IAuthentication {
    async auth (authentication: IAuthenticationModel): Promise<string> {
      return await new Promise(resolve => resolve('valid_token'))
    }
  }
  return new AuthenticationStub()
}

const makeFakeHttpRequest = (): IHttpRequest => ({
  body: {
    email: 'any_email@mail.com',
    password: 'any_password'
  }
})

describe('Login Controller', () => {
  it('Should call Authentication with corrects values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')

    await sut.handle(makeFakeHttpRequest())

    const { email, password } = makeFakeHttpRequest().body

    expect(authSpy).toHaveBeenCalledWith({
      email,
      password
    })
  })

  it('Should return 401 if invalid credentials are provided', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(
      new Promise(resolve => resolve(''))
    )

    const httpResponse = await sut.handle(makeFakeHttpRequest())

    expect(httpResponse).toEqual(unauthorized())
  })

  it('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )

    const httpResponse = await sut.handle(makeFakeHttpRequest())

    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('Should return 200 if valid credentials are provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeHttpRequest())

    expect(httpResponse).toEqual(success({ accessToken: 'valid_token' }))
  })

  it('Should call Validation with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')

    const httpRequest = makeFakeHttpRequest()
    await sut.handle(httpRequest)

    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  it('Should return 500 if Validation an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))

    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
