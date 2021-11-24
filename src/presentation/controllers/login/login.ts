import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { IController, IHttpRequest, IHttpResponse } from '../../protocols'
import { IEmailValidator } from '../signup/signup-protocols'

export class LoginController implements IController {
  private readonly emailValidator: IEmailValidator

  constructor (
    emailValidator: IEmailValidator
  ) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const requiredFields = ['email', 'password']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return await new Promise(resolve => resolve(badRequest(new MissingParamError(field))))
      }
    }

    const { email } = httpRequest.body

    const isValidEmail = this.emailValidator.isValid(email)
    if (!isValidEmail) {
      return await new Promise(resolve => resolve(badRequest(new InvalidParamError('email'))))
    }

    return await new Promise(resolve => resolve(badRequest(new MissingParamError('field'))))
  }
}
