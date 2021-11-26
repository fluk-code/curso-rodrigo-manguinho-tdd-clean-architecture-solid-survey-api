import jwt from 'jsonwebtoken'
import { IEnctypter } from '../../../data/protocols/criptography/encrypter'

export class JwtAdapter implements IEnctypter {
  constructor (
    private readonly secret: string
  ) {}

  async encrypt (value: string): Promise<string> {
    const accessToken = await jwt.sign({ id: value }, this.secret)
    return accessToken
  }
}
