import { MissingParamError } from '../../errors'
import { IValidation } from '../../protocols/valitation'

export class RequiredFieldValidation implements IValidation {
  constructor (
    private readonly fieldName: string
  ) {}

  validate (input: any): any {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName)
    }
  }
}
