import { DbAddSurvey } from './db-add-survey'
import { IAddSurveyModel, IAddSurveyRepository } from './db-add-survey-protocols'

const makeFakeSurveyData = (): IAddSurveyModel => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }]
})

describe('DBAddSurvey Usecase', () => {
  it('Should call AddSurveyRepository with correct values', async () => {
    class AddSurveyRepositoryStub implements IAddSurveyRepository {
      async add (surveyData: IAddSurveyModel): Promise<void> {
        return await new Promise(resolve => resolve())
      }
    }
    const addSurveyRespositoryStub = new AddSurveyRepositoryStub()
    const addSurveySpy = jest.spyOn(addSurveyRespositoryStub, 'add')

    const sut = new DbAddSurvey(addSurveyRespositoryStub)

    const surveyData = makeFakeSurveyData()
    await sut.add(surveyData)

    expect(addSurveySpy).toHaveBeenCalledWith(surveyData)
  })
})
