import { IDecrypter } from '@/data/protocols/criptography/decrypter'
import { IloadAccountByTokenRepository } from '@/data/protocols/db/account/load-account-by-token-repository'
import { ILoadAccountByToken } from '@/domain/usecases/load-account-by-token'
import { IAccountModel } from '../add-account/db-add-account-protocols'

export class DbLoadAccountByToken implements ILoadAccountByToken {
  constructor (
    private readonly decrypter: IDecrypter,
    private readonly loadAccountByTokenRepository: IloadAccountByTokenRepository
  ) {}

  async load (accessToken: string, role?: string): Promise<IAccountModel> {
    const token = await this.decrypter.decrypt(accessToken)
    if (token) {
      const account = await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
      if (account) {
        return account
      }
    }

    return await new Promise(resolve => resolve(null as unknown as IAccountModel))
  }
}
