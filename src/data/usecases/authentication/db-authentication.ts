import { IHashComparer } from '@/data/protocols/criptography/hash-comparer'
import {
  IAuthentication,
  IAuthenticationModel,
  ILoadAccountByEmailRepository,
  IEnctypter,
  IUpdateAccessTokenRepository
} from './db-authentication-protocols'

export class DBAuthentication implements IAuthentication {
  constructor (
    private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository,
    private readonly hashComparer: IHashComparer,
    private readonly encripter: IEnctypter,
    private readonly updateAccessTokenRepository: IUpdateAccessTokenRepository
  ) {}

  async auth (authentication: IAuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email)
    if (account) {
      const isPasswordValid = await this.hashComparer.compare(authentication.password, account.password)
      if (isPasswordValid) {
        const accessToken = await this.encripter.encrypt(account.id)
        await this.updateAccessTokenRepository.updateAccessToken(account.id, accessToken)
        return accessToken
      }
    }

    return null as unknown as string
  }
}
