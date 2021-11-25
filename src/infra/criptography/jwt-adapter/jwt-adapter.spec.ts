import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

describe('JWT Adapter', () => {
  it('Should call sign with correct values', async () => {
    const sut = new JwtAdapter('secret')
    const signJwtSpy = jest.spyOn(jwt, 'sign')

    await sut.encrypt('any_id')
    expect(signJwtSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
  })
})
