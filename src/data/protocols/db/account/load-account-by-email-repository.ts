
export interface ILoadAccountByEmailRepository {
  loadByEmail: (email: string) => Promise<any>
}
