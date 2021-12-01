
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { ISurveyModel } from '@/domain/models/survey'
import { ILoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository'
import { IAddSurveyModel, IAddSurveyRepository } from '@/data/usecases/add-survey/db-add-survey-protocols'

export class SurveyMongoRepository implements IAddSurveyRepository, ILoadSurveysRepository {
  async add (surveyData: IAddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(surveyData)
  }

  async loadAll (): Promise<ISurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const surveys = await surveyCollection.find().toArray()
    return surveys as unknown as ISurveyModel[]
  }
}
