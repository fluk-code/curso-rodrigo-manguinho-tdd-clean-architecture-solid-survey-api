
import { makeSignUpValidation } from './signup-validation-factory'
import { SignUpController } from '@/presentation/controllers/login/signup/signup-controller'
import { IController } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbAddAccount } from '@/main/factories/usecases/account/add-account/db-add-account-factory'
import { makeDbAuthentication } from '@/main/factories/usecases/authentication/db-authentication-factory'

export const makeSignUpController = (): IController => {
  const signUpController = new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(signUpController)
}
