import { IValidation } from '@/presentation/protocols/valitation'

export class ValidationComposite implements IValidation {
  constructor (
    private readonly validations: IValidation[]
  ) {}

  validate (input: any): any {
    for (const validation of this.validations) {
      const error = validation.validate(input)
      if (error) {
        return error
      }
    }
  }
}
