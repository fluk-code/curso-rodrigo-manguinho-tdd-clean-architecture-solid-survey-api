import env from '../../../config/env'
import { DBAuthentication } from '../../../../data/usecases/authentication/db-authentication'
import { IAuthentication } from '../../../../domain/usecases/authentication'
import { BcryptAdapter } from '../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../../infra/criptography/jwt-adapter/jwt-adapter'
import { AccountMongoRepository } from '../../../../infra/db/mongodb/account/account-mongo-repository'

export const makeDbAuthentication = (): IAuthentication => {
  const salt = 12
  const bcryptAdapiter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()
  return new DBAuthentication(accountMongoRepository, bcryptAdapiter, jwtAdapter, accountMongoRepository)
}
