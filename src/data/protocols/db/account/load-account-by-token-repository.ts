import { IAccountModel } from '../../../usecases/add-account/db-add-account-protocols'

export interface IloadAccountByTokenRepository {
  loadByToken: (token: string, role?: string) => Promise<IAccountModel>
}
