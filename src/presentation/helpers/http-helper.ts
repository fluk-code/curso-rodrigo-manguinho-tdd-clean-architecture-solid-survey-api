import { ServerError } from '../errors/server-error'
import { IHttpResponse } from '../protocols/http'

export const success = (data: any): IHttpResponse => {
  return {
    statusCode: 200,
    body: data
  }
}

export const badRequest = (error: Error): IHttpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}

export const serverError = (): IHttpResponse => {
  return {
    statusCode: 500,
    body: new ServerError()
  }
}
