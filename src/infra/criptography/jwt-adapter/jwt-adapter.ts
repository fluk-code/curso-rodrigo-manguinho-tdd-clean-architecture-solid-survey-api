import jwt from 'jsonwebtoken'
import { IDecrypter } from '../../../data/protocols/criptography/decrypter'
import { IEnctypter } from '../../../data/protocols/criptography/encrypter'

export class JwtAdapter implements IEnctypter, IDecrypter {
  constructor (
    private readonly secret: string
  ) {}

  async encrypt (value: string): Promise<string> {
    const accessToken = await jwt.sign({ id: value }, this.secret)
    return accessToken
  }

  async decrypt (value: string): Promise<string> {
    await jwt.verify(value, this.secret)
    return null as unknown as string
  }
}
