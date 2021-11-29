import { forbidden } from '../helpers/http/http-helper'
import { AccessDeniedError } from '../errors'
import { AuthMiddleware } from './auth-middleware'
import { ILoadAccountByToken } from '../../domain/usecases/load-account-by-token'
import { IAccountModel } from '../../domain/models/account'

const makeFakeAccount = (): IAccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hased_password'
})

class LoadAccountByTokenStub implements ILoadAccountByToken {
  async load (accessToken: string, role?: string): Promise<IAccountModel> {
    return await new Promise(resolve => resolve(makeFakeAccount()))
  }
}
const loadAccountByTokenStub = new LoadAccountByTokenStub()

describe(('Auth middleware'), () => {
  it('Should return 403 if no x-access-token exists in header', async () => {
    const sut = new AuthMiddleware(loadAccountByTokenStub)
    const httpResponse = await sut.handle({})

    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  it('Should call LoadAccountByToken with correct accessToken', async () => {
    const loadAccountSpy = jest.spyOn(loadAccountByTokenStub, 'load')
    const sut = new AuthMiddleware(loadAccountByTokenStub)
    await sut.handle({
      headers: {
        'x-access-token': 'any_token'
      }
    })

    expect(loadAccountSpy).toHaveBeenCalledWith('any_token')
  })
})
