
import { MissingParamError } from '../../errors'
import { ValidationComposite } from './validation-composite'
import { IValidation } from './valitation'

describe('Validation Composite', () => {
  it('Should return an error if any validation fails', () => {
    class ValidationStub implements IValidation {
      validate (input: string): any {
        return new MissingParamError('field')
      }
    }
    const validationStub = new ValidationStub()

    const sut = new ValidationComposite([validationStub])

    const error = sut.validate({ field: 'any_value' })

    expect(error).toEqual(new MissingParamError('field'))
  })
})
