import { z } from 'zod'

import { MealQuerySchema, OLLAMA_ENDPOINT } from './config'
import { HttpError, httpError } from "./http";

export interface DTO {
  query: string
}

export const requestToDTO = (body: any): [DTO, Error | null] => {
  if (typeof body !== 'object' || body === null) {
    return [{} as DTO, new Error('body is invalid')]
  }

  if (typeof body.query !== 'string') {
    return [{} as DTO, new Error('query is invalid')]
  }

  if (body.query.trim().length < 3) {
    return [{} as DTO, new Error('query is too short')]
  }

  return [{query: body.query}, null]
}