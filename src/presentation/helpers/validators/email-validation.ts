import { InvalidParamError } from '../../errors'
import { IEmailValidator } from '../../protocols/email-validator'
import { IValidation } from '../../protocols/valitation'

export class EmailValidation implements IValidation {
  private readonly emailValidator: IEmailValidator
  private readonly fieldName: string

  constructor (
    emailValidator: IEmailValidator,
    fieldName: string
  ) {
    this.emailValidator = emailValidator
    this.fieldName = fieldName
  }

  validate (input: any): any {
    const isValidEmail = this.emailValidator.isValid(input[this.fieldName])
    if (!isValidEmail) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
