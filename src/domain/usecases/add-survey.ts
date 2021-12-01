import { ISurveyModel } from '@/domain/models/survey'

export type TAddSurveyModel = Omit<ISurveyModel, 'id'>

export interface IAddSurvey {
  add: (accountData: TAddSurveyModel) => Promise<void>
}
