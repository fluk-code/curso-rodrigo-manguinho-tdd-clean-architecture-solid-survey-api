import { IAddSurvey, IAddSurveyModel, IHttpRequest, IValidation } from './add-survey-protocols'
import { AddSurveyController } from './add-survey-controller'
import { badRequest, noContent, serverError } from '../../../helpers/http/http-helper'

const makeFakeRequest = (): IHttpRequest => ({
  body: {
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }]
  }
})

const makeValidation = (): IValidation => {
  class ValidationStub implements IValidation {
    validate (input: any): any {
      return null
    }
  }
  return new ValidationStub()
}

const makeAddSurvey = (): IAddSurvey => {
  class AddSurveyStub implements IAddSurvey {
    async add (data: IAddSurveyModel): Promise<void> {
    }
  }
  return new AddSurveyStub()
}

interface ISutTypes {
  sut: AddSurveyController
  validationStub: IValidation
  addSurveyStub: IAddSurvey
}

const makeSut = (): ISutTypes => {
  const validationStub = makeValidation()
  const addSurveyStub = makeAddSurvey()
  const sut = new AddSurveyController(validationStub, addSurveyStub)

  return {
    sut,
    validationStub,
    addSurveyStub
  }
}

describe('AddSurvey Controller', () => {
  it('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')

    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)

    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  it('Should return 400 if Validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())

    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  it('Should call AddSurvey with correct values', async () => {
    const { sut, addSurveyStub } = makeSut()
    const addSurveySpy = jest.spyOn(addSurveyStub, 'add')

    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)

    expect(addSurveySpy).toHaveBeenCalledWith(httpRequest.body)
  })

  it('Shoul return 500 if AddSurvey throws', async () => {
    const { sut, addSurveyStub } = makeSut()
    jest.spyOn(addSurveyStub, 'add').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )

    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('Shoul return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(noContent())
  })
})
