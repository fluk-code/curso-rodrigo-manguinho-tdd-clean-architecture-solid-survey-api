import { IAddSurvey, TAddSurveyModel } from '@/domain/usecases/add-survey'
import { IAddSurveyRepository } from './db-add-survey-protocols'

export class DbAddSurvey implements IAddSurvey {
  constructor (
    private readonly addSurveyRepository: IAddSurveyRepository
  ) {}

  async add (accountData: TAddSurveyModel): Promise<void> {
    await this.addSurveyRepository.add(accountData)
  }
}
