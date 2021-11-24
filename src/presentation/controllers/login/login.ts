import { IAuthentication } from '../../../domain/usecases/authentication'
import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, serverError, success } from '../../helpers/http-helper'
import { IController, IHttpRequest, IHttpResponse } from '../../protocols'
import { IEmailValidator } from '../signup/signup-protocols'

export class LoginController implements IController {
  private readonly emailValidator: IEmailValidator
  private readonly authentication: IAuthentication

  constructor (
    emailValidator: IEmailValidator,
    authentication: IAuthentication
  ) {
    this.emailValidator = emailValidator
    this.authentication = authentication
  }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const requiredFields = ['email', 'password']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { email, password } = httpRequest.body

      const isValidEmail = this.emailValidator.isValid(email)
      if (!isValidEmail) {
        return badRequest(new InvalidParamError('email'))
      }

      const token = await this.authentication.auth(email, password)
      return success(token)
    } catch (error) {
      return serverError(error)
    }
  }
}
