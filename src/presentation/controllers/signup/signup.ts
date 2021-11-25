import { IHttpRequest, IHttpResponse, IController, IAddAccount } from './signup-protocols'

import { success, badRequest, serverError } from '../../helpers/http/http-helper'
import { IValidation } from '../../protocols/valitation'

export class SignUpController implements IController {
  private readonly addAccount: IAddAccount
  private readonly validation: IValidation

  constructor (
    addAccount: IAddAccount,
    validation: IValidation
  ) {
    this.addAccount = addAccount
    this.validation = validation
  }

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

      return success(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
