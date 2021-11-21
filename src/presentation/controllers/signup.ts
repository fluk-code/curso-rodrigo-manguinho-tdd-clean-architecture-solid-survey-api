import { IHttpRequest, IHttpResponse, IController, IEmailValidator } from '../protocols'
import { IAddAccount } from '../../domain/usecases/add-account'

import { MissingParamError, InvalidParamError } from '../errors'
import { badRequest, serverError } from '../helpers/http-helper'

export class SignUpController implements IController {
  private readonly emailValidator: IEmailValidator
  private readonly addAccount: IAddAccount

  constructor (
    emailValidator: IEmailValidator,
    addAccount: IAddAccount
  ) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  handle (httpRequest: IHttpRequest): IHttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { name, email, password, passwordConfirmation } = httpRequest.body

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValidEmail = this.emailValidator.isValid(email)
      if (!isValidEmail) {
        return badRequest(new InvalidParamError('email'))
      }

      this.addAccount.add({
        name,
        email,
        password
      })

      return badRequest(new MissingParamError('email'))
    } catch (error) {
      return serverError()
    }
  }
}
