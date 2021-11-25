import { IAuthentication, IAuthenticationModel } from '../../../domain/usecases/authentication'
import { ILoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'

export class DBAuthentication implements IAuthentication {
  private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository

  constructor (
    loadAccountByEmailRepository: ILoadAccountByEmailRepository
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
  }

  async auth (aithentication: IAuthenticationModel): Promise<string> {
    await this.loadAccountByEmailRepository.load(aithentication.email)

    return null as unknown as string
  }
}
