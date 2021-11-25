import jwt from 'jsonwebtoken'
import { IEnctypter } from '../../../data/protocols/criptography/encrypter'

export class JwtAdapter implements IEnctypter {
  private readonly sercret: string

  constructor (
    secret: string
  ) {
    this.sercret = secret
  }

  async encrypt (value: string): Promise<string> {
    const accessToken = await jwt.sign({ id: value }, this.sercret)
    return accessToken
  }
}
