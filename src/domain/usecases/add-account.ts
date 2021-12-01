import { IAccountModel } from '@/domain/models/account'

export type TAddAccountModel = Omit<IAccountModel, 'id'>

export interface IAddAccount {
  add: (accountData: TAddAccountModel) => Promise<IAccountModel>
}
