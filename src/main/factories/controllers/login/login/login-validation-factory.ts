import { EmailValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { EmailValidatorAdapter } from '@/infra/validators/email-validator-adapter'
import { IValidation } from '@/presentation/protocols/valitation'

export const makeLoginValidation = (): ValidationComposite => {
  const validations: IValidation[] = []
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailValidation(new EmailValidatorAdapter(), 'email'))

  return new ValidationComposite(validations)
}
