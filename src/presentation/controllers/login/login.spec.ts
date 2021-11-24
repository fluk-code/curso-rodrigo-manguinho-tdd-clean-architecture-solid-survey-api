import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { IHttpRequest } from '../../protocols'
import { LoginController } from './login'

const fakeHttpRequest = (): IHttpRequest => ({
  body: {
    email: 'any_email',
    password: 'any_password'
  }
})

describe('Login Controller', () => {
  it('Should return 400 if email is provided', async () => {
    const sut = new LoginController()
    const httpRequest = fakeHttpRequest()
    httpRequest.body.email = null

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  it('Should return 400 if password is provided', async () => {
    const sut = new LoginController()
    const httpRequest = fakeHttpRequest()
    httpRequest.body.password = null

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })
})
