import { InvalidParamError } from '../../errors'
import { IValidation } from './valitation'

export class CompareFieldValidation implements IValidation {
  private readonly fieldName: string
  private readonly fieldToCompareName: string

  constructor (
    fieldName: string,
    fieldToCompareName: string
  ) {
    this.fieldName = fieldName
    this.fieldToCompareName = fieldToCompareName
  }

  validate (input: any): any {
    if (input[this.fieldName] !== input[this.fieldToCompareName]) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
