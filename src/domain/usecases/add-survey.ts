import { ISurveyAnswerModel } from '@/domain/models/survey'

export interface IAddSurveyModel {
  date?: Date
  question: string
  answers: ISurveyAnswerModel[]
}

export interface IAddSurvey {
  add: (accountData: IAddSurveyModel) => Promise<void>
}
