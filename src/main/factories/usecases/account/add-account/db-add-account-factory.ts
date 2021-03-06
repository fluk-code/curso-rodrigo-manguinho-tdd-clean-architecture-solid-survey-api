import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'
import { IAddAccount } from '@/domain/usecases/add-account'
import { DBAddAccount } from '@/data/usecases/add-account/db-add-account'

export const makeDbAddAccount = (): IAddAccount => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  return new DBAddAccount(bcryptAdapter, accountMongoRepository, accountMongoRepository)
}
