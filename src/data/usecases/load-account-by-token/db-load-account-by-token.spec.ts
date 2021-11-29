import { DbLoadAccountByToken } from './db-load-account-by-token'
import { IDecrypter } from '../../protocols/criptography/decrypter'

const makeDecrypter = (): IDecrypter => {
  class DecrypterStub implements IDecrypter {
    async decrypt (value: string): Promise<string> {
      return await new Promise(resolve => resolve('any_value'))
    }
  }
  return new DecrypterStub()
}

interface ISutTypes {
  sut: DbLoadAccountByToken
  decrypterStub: IDecrypter
}

const makeSut = (): ISutTypes => {
  const decrypterStub = makeDecrypter()
  const sut = new DbLoadAccountByToken(decrypterStub)

  return {
    sut,
    decrypterStub
  }
}

describe('DbLoadAccountByToken Usecase', () => {
  it('Should call Decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptTokenSpy = jest.spyOn(decrypterStub, 'decrypt')

    await sut.load('any_token', 'any_role')

    expect(decryptTokenSpy).toHaveBeenCalledWith('any_token')
  })

  it('Should return null if Decrypter return null', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(
      new Promise(resolve => resolve(null as unknown as string))
    )
    const account = await sut.load('any_token', 'any_role')

    expect(account).toBeNull()
  })
})
