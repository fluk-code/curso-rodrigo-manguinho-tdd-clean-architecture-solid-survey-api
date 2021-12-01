import { IEmailValidator } from '@/validation/protocols/email-validator'
import { InvalidParamError } from '@/presentation/errors'
import { IValidation } from '@/presentation/protocols/valitation'

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
