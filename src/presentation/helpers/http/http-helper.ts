import { ServerError, UnauthorizedError } from '../../errors'
import { IHttpResponse } from '../../protocols'

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

export const forbidden = (error: Error): IHttpResponse => {
  return {
    statusCode: 403,
    body: error
  }
}

export const unauthorized = (): IHttpResponse => {
  return {
    statusCode: 401,
    body: new UnauthorizedError()
  }
}

export const serverError = (error: Error): IHttpResponse => {
  return {
    statusCode: 500,
    body: new ServerError(error.stack)
  }
}
