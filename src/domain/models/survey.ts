export interface ISurveyModel {
  id: string
  date?: Date
  question: string
  answers: ISurveyAnswerModel[]
}

export interface ISurveyAnswerModel {
  image?: string
  answer: string
}
