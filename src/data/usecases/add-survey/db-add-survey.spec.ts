import { DbAddSurvey } from './db-add-survey'
import { IAddSurveyModel, IAddSurveyRepository } from './db-add-survey-protocols'
import MockDate from 'mockdate'

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
  beforeAll(() => {
    MockDate.set(new Date())
  })

  beforeAll(() => {
    MockDate.reset()
  })

  it('Should call AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRespositoryStub } = makeSut()
    const addSurveySpy = jest.spyOn(addSurveyRespositoryStub, 'add')

    const surveyData = makeFakeSurveyData()
    await sut.add(surveyData)

    expect(addSurveySpy).toHaveBeenCalledWith(surveyData)
  })

  it('Should throws if AddAccountRepository throws', async () => {
    const { sut, addSurveyRespositoryStub } = makeSut()
    jest.spyOn(addSurveyRespositoryStub, 'add').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )

    const promiseSurvey = sut.add(makeFakeSurveyData())

    await expect(promiseSurvey).rejects.toThrow()
  })
})
