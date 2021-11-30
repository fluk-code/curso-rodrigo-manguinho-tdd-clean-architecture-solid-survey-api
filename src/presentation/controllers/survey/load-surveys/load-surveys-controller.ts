import { IController, IHttpRequest, IHttpResponse, ILoadSurveys } from './load-surveys-protocols'
import { serverError, success } from '../../../helpers/http/http-helper'

export class LoadSurveysController implements IController {
  constructor (
    private readonly loadSurveys: ILoadSurveys
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const surveys = await this.loadSurveys.load()

      return success(surveys)
    } catch (error) {
      return serverError(new Error())
    }
  }
}
