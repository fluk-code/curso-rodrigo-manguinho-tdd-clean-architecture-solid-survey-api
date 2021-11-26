import { InvalidParamError } from '../../errors'
import { IEmailValidator } from '../../protocols/email-validator'
import { IValidation } from '../../protocols/valitation'

export class EmailValidation implements IValidation {
  constructor (
    private readonly emailValidator: IEmailValidator,
    private readonly fieldName: string
  ) {}

  validate (input: any): any {
    const isValidEmail = this.emailValidator.isValid(input[this.fieldName])
    if (!isValidEmail) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
