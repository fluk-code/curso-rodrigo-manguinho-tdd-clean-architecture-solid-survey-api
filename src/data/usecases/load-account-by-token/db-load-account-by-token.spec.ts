import { DbLoadAccountByToken } from './db-load-account-by-token'
import { IDecrypter } from '@/data/protocols/criptography/decrypter'
import { IloadAccountByTokenRepository } from '@/data/protocols/db/account/load-account-by-token-repository'
import { IAccountModel } from '../add-account/db-add-account-protocols'

const makeFakeAccount = (): IAccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password'

})

const makeDecrypter = (): IDecrypter => {
  class DecrypterStub implements IDecrypter {
    async decrypt (value: string): Promise<string> {
      return await new Promise(resolve => resolve('any_value'))
    }
  }
  return new DecrypterStub()
}

const makeLoadAccountByTokenRepository = (): IloadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub implements IloadAccountByTokenRepository {
    async loadByToken (token: string, role?: string): Promise<IAccountModel> {
      return await new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  return new LoadAccountByTokenRepositoryStub()
}

type TSutTypes = {
  sut: DbLoadAccountByToken
  decrypterStub: IDecrypter
  loadAccountByTokenRepositoryStub: IloadAccountByTokenRepository
}

const makeSut = (): TSutTypes => {
  const loadAccountByTokenRepositoryStub = makeLoadAccountByTokenRepository()
  const decrypterStub = makeDecrypter()
  const sut = new DbLoadAccountByToken(decrypterStub, loadAccountByTokenRepositoryStub)

  return {
    sut,
    decrypterStub,
    loadAccountByTokenRepositoryStub
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

  it('Should call LoadAccountByTokenRepository with correct values', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    const loadByTokenSpy = jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')

    await sut.load('any_token', 'any_role')

    expect(loadByTokenSpy).toHaveBeenCalledWith('any_token', 'any_role')
  })

  it('Should return null if LoadAccountByTokenRepositoryStub returns null', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockReturnValueOnce(
      new Promise(resolve => resolve(null as unknown as IAccountModel))
    )
    const account = await sut.load('any_token', 'any_role')

    expect(account).toBeNull()
  })

  it('Should return an account ib success', async () => {
    const { sut } = makeSut()
    const account = await sut.load('any_token', 'any_role')

    expect(account).toEqual(makeFakeAccount())
  })

  it('Should throws if Decrypter throws', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )

    const promiseAccount = sut.load('any_token', 'any_role')
    await expect(promiseAccount).rejects.toThrow()
  })

  it('Should throws if LoadAccountByTokenRepositoryStub throws', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )

    const promiseAccount = sut.load('any_token', 'any_role')
    await expect(promiseAccount).rejects.toThrow()
  })
})
