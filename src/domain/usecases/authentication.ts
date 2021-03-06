export interface IAuthenticationModel {
  email: string
  password: string
}

export interface IAuthentication {
  auth: (aithentication: IAuthenticationModel) => Promise<string>
}
