export interface HttpError {
  status: number
  message: string
}

export const httpError = (status: number, message: string): HttpError => ({ status, message })