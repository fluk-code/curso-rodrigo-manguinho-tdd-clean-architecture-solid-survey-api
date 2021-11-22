import { IAccountModel } from '../../../domain/models/account'
import { IAddAccount, IAddAccountModel } from '../../../domain/usecases/add-account'
import { IEncrypter } from '../../protocols/encrypter'

export class DBAddAccount implements IAddAccount {
  private readonly encrypter: IEncrypter

  constructor (
    encrypter: IEncrypter
  ) {
    this.encrypter = encrypter
  }

  async add (account: IAddAccountModel): Promise<IAccountModel> {
    await this.encrypter.encrypt(account.password)

    return await new Promise(resolve => resolve({
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    }))
  }
}
