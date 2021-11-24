import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { IHttpRequest } from '../../protocols'
import { IEmailValidator } from '../signup/signup-protocols'
import { LoginController } from './login'

interface ISutTypes {
  sut: LoginController
  emailValidatorStub: IEmailValidator
}

const makeSut = (): ISutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const sut = new LoginController(emailValidatorStub)
  return {
    sut,
    emailValidatorStub
  }
}

const makeEmailValidator = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const fakeHttpRequest = (): IHttpRequest => ({
  body: {
    email: 'any_email@mail.com',
    password: 'any_password'
  }
})

describe('Login Controller', () => {
  it('Should return 400 if email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = fakeHttpRequest()
    httpRequest.body.email = null

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  it('Should return 400 if password is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = fakeHttpRequest()
    httpRequest.body.password = null

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })

  it('Should call EmailValidator with correct email', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidEmailSpy = jest.spyOn(emailValidatorStub, 'isValid')

    await sut.handle(fakeHttpRequest())

    expect(isValidEmailSpy).toHaveBeenCalledWith(fakeHttpRequest().body.email)
  })
})
