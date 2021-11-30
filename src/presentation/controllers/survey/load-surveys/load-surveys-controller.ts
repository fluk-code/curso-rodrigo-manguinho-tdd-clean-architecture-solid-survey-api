import { IController, IHttpRequest, IHttpResponse, ILoadSurveys } from './load-surveys-protocols'

export class LoadSurveysController implements IController {
  constructor (
    private readonly loadSurveys: ILoadSurveys
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    await this.loadSurveys.load()

    return null as unknown as IHttpResponse
  }
}
