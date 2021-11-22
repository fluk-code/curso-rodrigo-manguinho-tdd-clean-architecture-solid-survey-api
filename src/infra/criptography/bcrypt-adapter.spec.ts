import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

describe('Bcrypt Adapter', () => {
  it('should call bcrypt with correct values', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const bcryptHashSpy = jest.spyOn(bcrypt, 'hash')

    await sut.encrypt('any_value')
    expect(bcryptHashSpy).toHaveBeenCalledWith('any_value', salt)
  })
})
