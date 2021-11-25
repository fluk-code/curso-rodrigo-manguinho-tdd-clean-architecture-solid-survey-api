import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  sign: async (): Promise<string> => {
    return await new Promise(resolve => resolve('valid_token'))
  }
}))

describe('JWT Adapter', () => {
  it('Should call sign with correct values', async () => {
    const sut = new JwtAdapter('secret')
    const signJwtSpy = jest.spyOn(jwt, 'sign')

    await sut.encrypt('any_id')
    expect(signJwtSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
  })

  it('Should return a token on sign success', async () => {
    const sut = new JwtAdapter('secret')

    const accessToken = await sut.encrypt('any_id')
    expect(accessToken).toBe('valid_token')
  })
})
