import { DbAddSurvey } from './db-add-survey'
import { IAddSurveyModel, IAddSurveyRepository } from './db-add-survey-protocols'

const makeFakeSurveyData = (): IAddSurveyModel => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }]
})

const makeAddSurveyRepository = (): IAddSurveyRepository => {
  class AddSurveyRepositoryStub implements IAddSurveyRepository {
    async add (surveyData: IAddSurveyModel): Promise<void> {
      return await new Promise(resolve => resolve())
    }
  }
  return new AddSurveyRepositoryStub()
}

interface IStuTypes {
  sut: DbAddSurvey
  addSurveyRespositoryStub: IAddSurveyRepository
}

const makeSut = (): IStuTypes => {
  const addSurveyRespositoryStub = makeAddSurveyRepository()
  const sut = new DbAddSurvey(addSurveyRespositoryStub)

  return {
    sut,
    addSurveyRespositoryStub
  }
}

describe('DBAddSurvey Usecase', () => {
  it('Should call AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRespositoryStub } = makeSut()
    const addSurveySpy = jest.spyOn(addSurveyRespositoryStub, 'add')

    const surveyData = makeFakeSurveyData()
    await sut.add(surveyData)

    expect(addSurveySpy).toHaveBeenCalledWith(surveyData)
  })
})
