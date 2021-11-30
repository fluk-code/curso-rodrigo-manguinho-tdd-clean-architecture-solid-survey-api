import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

const makeSut = (): JwtAdapter => {
  return new JwtAdapter('secret')
}

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return await new Promise(resolve => resolve('valid_token'))
  },
  async verify (): Promise<string> {
    return await new Promise(resolve => resolve('valid_value'))
  }
}))

describe('JWT Adapter', () => {
  describe('sign()', () => {
    it('Should call sign with correct values', async () => {
      const sut = makeSut()
      const signJwtSpy = jest.spyOn(jwt, 'sign')

      await sut.encrypt('any_id')
      expect(signJwtSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
    })

    it('Should return a token on sign success', async () => {
      const sut = makeSut()

      const accessToken = await sut.encrypt('any_id')
      expect(accessToken).toBe('valid_token')
    })

    it('Should throw if sign throws', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
        throw new Error()
      })

      const promiseBcryptHash = sut.encrypt('any_value')
      await expect(promiseBcryptHash).rejects.toThrow()
    })
  })

  describe('verify()', () => {
    it('Should call verify with correct values', async () => {
      const sut = makeSut()
      const verifySpy = jest.spyOn(jwt, 'verify')

      await sut.decrypt('any_token')
      expect(verifySpy).toHaveBeenCalledWith('any_token', 'secret')
    })

    it('Should return a value on verify success', async () => {
      const sut = makeSut()

      const value = await sut.decrypt('any_id')
      expect(value).toBe('valid_value')
    })
  })
})
