import { ISurveyModel } from '../../../domain/models/survey'
import { ILoadSurveysRepository } from '../../protocols/db/survey/load-surveys-repository'
import { DbLoadSurveys } from './db-load-surveys'

const makeFakeSurveys = (): ISurveyModel[] => {
  return [{
    id: 'any_id',
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }],
    date: new Date()
  }, {
    id: 'other_id',
    question: 'other_question',
    answers: [{
      image: 'other_image',
      answer: 'other_answer'
    }, {
      answer: 'two_answer'
    }],
    date: new Date()
  }]
}

describe('DbLoadSurveys', () => {
  it('Should Call LoadSurveysRepository', async () => {
    class LoadSurveysRepository implements ILoadSurveysRepository {
      async loadAll (): Promise<ISurveyModel[]> {
        return await new Promise(resolve => resolve(makeFakeSurveys()))
      }
    }

    const loadSurveysRepository = new LoadSurveysRepository()
    const loadSurveysSpy = jest.spyOn(loadSurveysRepository, 'loadAll')
    const sut = new DbLoadSurveys(loadSurveysRepository)
    await sut.load()

    expect(loadSurveysSpy).toHaveBeenCalled()
  })
})
