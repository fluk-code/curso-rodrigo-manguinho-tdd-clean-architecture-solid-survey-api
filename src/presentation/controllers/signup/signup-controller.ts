import { IHttpRequest, IHttpResponse, IController, IAddAccount, IAuthentication } from './signup-protocols'

import { success, badRequest, serverError, forbidden } from '../../helpers/http/http-helper'
import { IValidation } from '../../protocols/valitation'
import { EmailInUseError } from '../../errors'

export class SignUpController implements IController {
  constructor (
    private readonly addAccount: IAddAccount,
    private readonly validation: IValidation,
    private readonly authentication: IAuthentication
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { name, email, password } = httpRequest.body

      const account = await this.addAccount.add({
        name,
        email,
        password
      })

      if (!account) {
        return forbidden(new EmailInUseError())
      }

      const accessToken = await this.authentication.auth({
        email,
        password
      })

      return success({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
