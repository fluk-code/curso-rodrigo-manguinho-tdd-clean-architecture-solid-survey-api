import { DBAddAccount } from './db-add-account'

describe('DbAddAccount Usecase', () => {
  it('Should call Encrypter with correct password', async () => {
    class EncryptStub {
      async encrypt (value: string): Promise<string> {
        return await new Promise(resolve => resolve('hashed_password'))
      }
    }

    const encryptStub = new EncryptStub()
    const sut = new DBAddAccount(encryptStub)
    const encryptSpy = jest.spyOn(encryptStub, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }
    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith(accountData.password)
  })
})
