export interface IAddSurveyModel {
  question: string
  answers: ISurveyAnswer[]
}

export interface ISurveyAnswer {
  image?: string
  answer: string
}

export interface IAddSurvey {
  add: (accountData: IAddSurveyModel) => Promise<void>
}
