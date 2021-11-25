import { MissingParamError } from '../../errors'
import { IValidation } from './valitation'

export class RequiredFieldValidation implements IValidation {
  private readonly fieldName: string
  constructor (
    fieldName: string
  ) {
    this.fieldName = fieldName
  }

  validate (input: any): any {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName)
    }
  }
}
