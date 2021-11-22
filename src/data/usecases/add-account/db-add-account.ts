import { IAccountModel, IAddAccount, IAddAccountModel, IAddAccountRepository, IEncrypter } from './db-add-account-protocols'

export class DBAddAccount implements IAddAccount {
  private readonly encrypter: IEncrypter
  private readonly addAccountRepository: IAddAccountRepository

  constructor (
    encrypter: IEncrypter,
    addAccountRepository: IAddAccountRepository
  ) {
    this.encrypter = encrypter
    this.addAccountRepository = addAccountRepository
  }

  async add (accountData: IAddAccountModel): Promise<IAccountModel> {
    const hasedPassword = await this.encrypter.encrypt(accountData.password)

    await this.addAccountRepository.add({
      ...accountData,
      password: hasedPassword
    })

    return await new Promise(resolve => resolve({
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    }))
  }
}
