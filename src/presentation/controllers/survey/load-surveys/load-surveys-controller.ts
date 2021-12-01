import { IController, IHttpRequest, IHttpResponse, ILoadSurveys } from './load-surveys-protocols'
import { noContent, serverError, success } from '@/presentation/helpers/http/http-helper'

export class LoadSurveysController implements IController {
  constructor (
    private readonly loadSurveys: ILoadSurveys
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const surveys = await this.loadSurveys.load()

      return surveys.length ? success(surveys) : noContent()
    } catch (error) {
      return serverError(new Error())
    }
  }
}
