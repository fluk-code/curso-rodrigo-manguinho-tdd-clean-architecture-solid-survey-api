import { ServerError, UnauthorizedError } from '@/presentation/errors'
import { IHttpResponse } from '@/presentation/protocols'

export const success = (data: any): IHttpResponse => {
  return {
    statusCode: 200,
    body: data
  }
}

export const noContent = (): IHttpResponse => {
  return {
    statusCode: 204,
    body: null
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
