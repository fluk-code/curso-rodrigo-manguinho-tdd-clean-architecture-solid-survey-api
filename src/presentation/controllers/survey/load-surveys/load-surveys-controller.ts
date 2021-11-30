import { IController, IHttpRequest, IHttpResponse, ILoadSurveys } from './load-surveys-protocols'
import { success } from '../../../helpers/http/http-helper'

export class LoadSurveysController implements IController {
  constructor (
    private readonly loadSurveys: ILoadSurveys
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const surveys = await this.loadSurveys.load()

    return success(surveys)
  }
}
