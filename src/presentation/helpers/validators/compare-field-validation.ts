import { InvalidParamError } from '../../errors'
import { IValidation } from '../../protocols/valitation'

export class CompareFieldValidation implements IValidation {
  constructor (
    private readonly fieldName: string,
    private readonly fieldToCompareName: string
  ) {}

  validate (input: any): any {
    if (input[this.fieldName] !== input[this.fieldToCompareName]) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
