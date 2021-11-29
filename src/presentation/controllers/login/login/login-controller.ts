import { badRequest, serverError, success, unauthorized } from '../../../helpers/http/http-helper'
import { IValidation } from '../../../protocols/valitation'
import { IAuthentication, IController, IHttpRequest, IHttpResponse } from './login-protocols'

export class LoginController implements IController {
  constructor (
    private readonly authentication: IAuthentication,
    private readonly validation: IValidation
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { email, password } = httpRequest.body

      const accessToken = await this.authentication.auth({ email, password })
      if (!accessToken) {
        return unauthorized()
      }

      return success({
        accessToken
      })
    } catch (error) {
      return serverError(error)
    }
  }
}
