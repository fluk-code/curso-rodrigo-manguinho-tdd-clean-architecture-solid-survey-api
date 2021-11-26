import env from '../../config/env'
import { DBAuthentication } from '../../../data/usecases/authentication/db-authentication'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../infra/criptography/jwt-adapter/jwt-adapter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account-mongo-repository'
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository'
import { LoginController } from '../../../presentation/controllers/login/login-controller'
import { IController } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { makeLoginValidation } from './login-validation-factory'

export const makeLoginController = (): IController => {
  const salt = 12
  const bcryptAdapiter = new BcryptAdapter(salt)
  const jwtAdapiter = new JwtAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAuthentication = new DBAuthentication(accountMongoRepository, bcryptAdapiter, jwtAdapiter, accountMongoRepository)
  const logMongoRepository = new LogMongoRepository()
  const loginController = new LoginController(dbAuthentication, makeLoginValidation())
  return new LogControllerDecorator(loginController, logMongoRepository)
}
