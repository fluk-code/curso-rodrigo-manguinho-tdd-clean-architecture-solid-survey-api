
import { MissingParamError } from '../../errors'
import { ValidationComposite } from './validation-composite'
import { IValidation } from './valitation'

const makeValidation = (): IValidation => {
  class ValidationStub implements IValidation {
    validate (input: string): any {
      return null
    }
  }

  return new ValidationStub()
}

interface ISutTypes {
  sut: ValidationComposite
  validationStub: IValidation
}

const makeSut = (): ISutTypes => {
  const validationStub = makeValidation()
  const sut = new ValidationComposite([validationStub])

  return {
    sut,
    validationStub
  }
}

describe('Validation Composite', () => {
  it('Should return an error if any validation fails', () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('field'))

    const error = sut.validate({ field: 'any_value' })

    expect(error).toEqual(new MissingParamError('field'))
  })
})
