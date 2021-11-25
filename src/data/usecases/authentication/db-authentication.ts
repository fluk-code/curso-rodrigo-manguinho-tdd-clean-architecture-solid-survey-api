import { IAuthentication, IAuthenticationModel } from '../../../domain/usecases/authentication'
import { IHashComparer } from '../../protocols/criptography/hash-comparer'
import { ITokenGenerator } from '../../protocols/criptography/token-generator'
import { ILoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'

export class DBAuthentication implements IAuthentication {
  private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository
  private readonly hashComparer: IHashComparer
  private readonly tokenGenerator: ITokenGenerator

  constructor (
    loadAccountByEmailRepository: ILoadAccountByEmailRepository,
    hashComparer: IHashComparer,
    tokenGenerator: ITokenGenerator
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
    this.hashComparer = hashComparer
    this.tokenGenerator = tokenGenerator
  }

  async auth (authentication: IAuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email)
    if (account) {
      const isPasswordValid = await this.hashComparer.compare(authentication.password, account.password)
      if (isPasswordValid) {
        const accessToken = await this.tokenGenerator.generate(account.id)
        return accessToken
      }
    }

    return null as unknown as string
  }
}
