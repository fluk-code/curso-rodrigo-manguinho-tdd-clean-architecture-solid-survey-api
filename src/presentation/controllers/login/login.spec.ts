import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { IHttpRequest } from '../../protocols'
import { LoginController } from './login'

interface ISutTypes {
  sut: LoginController
}

const makeSut = (): ISutTypes => {
  const sut = new LoginController()
  return {
    sut
  }
}

const fakeHttpRequest = (): IHttpRequest => ({
  body: {
    email: 'any_email',
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
})
