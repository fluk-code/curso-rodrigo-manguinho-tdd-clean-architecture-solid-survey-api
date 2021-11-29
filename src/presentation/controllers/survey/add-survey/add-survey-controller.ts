import { badRequest, serverError } from '../../../helpers/http/http-helper'
import { IAddSurvey, IController, IHttpRequest, IHttpResponse, IValidation } from './add-survey-protocols'

export class AddSurveyController implements IController {
  constructor (
    private readonly validation: IValidation,
    private readonly addSurvey: IAddSurvey
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { question, answers } = httpRequest.body

      await this.addSurvey.add({
        question,
        answers
      })

      return await new Promise(resolve => resolve(null as unknown as IHttpResponse))
    } catch (error) {
      return serverError(error)
    }
  }
}
