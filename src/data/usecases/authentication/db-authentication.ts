import { IHashComparer } from '../../protocols/criptography/hash-comparer'
import {
  IAuthentication,
  IAuthenticationModel,
  ILoadAccountByEmailRepository,
  IEnctypter,
  IUpdateAccessTokenRepository
} from './db-authentication-protocols'

export class DBAuthentication implements IAuthentication {
  private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository
  private readonly hashComparer: IHashComparer
  private readonly encripter: IEnctypter
  private readonly updateAccessTokenRepository: IUpdateAccessTokenRepository

  constructor (
    loadAccountByEmailRepository: ILoadAccountByEmailRepository,
    hashComparer: IHashComparer,
    encripter: IEnctypter,
    updateAccessTokenRepository: IUpdateAccessTokenRepository
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
    this.hashComparer = hashComparer
    this.encripter = encripter
    this.updateAccessTokenRepository = updateAccessTokenRepository
  }

  async auth (authentication: IAuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email)
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
