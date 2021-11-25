import { IAuthentication, IAuthenticationModel } from '../../../domain/usecases/authentication'
import { IHashComparer } from '../../protocols/criptography/hash-comparer'
import { ILoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'

export class DBAuthentication implements IAuthentication {
  private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository
  private readonly hashComparer: IHashComparer

  constructor (
    loadAccountByEmailRepository: ILoadAccountByEmailRepository,
    hashComparer: IHashComparer
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
    this.hashComparer = hashComparer
  }

  async auth (aithentication: IAuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(aithentication.email)
    if (account) {
      await this.hashComparer.compare(aithentication.password, account.password)
    }

    return null as unknown as string
  }
}
