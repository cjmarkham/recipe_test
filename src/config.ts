import { z } from 'zod'

export const OLLAMA_ENDPOINT = process.env.OLLAMA_ENDPOINT || 'http://localhost:11434/api/chat'

export const MealQuerySchema = z.object({
  ingredients: z.array(z.string()),
  maxCalories: z.number().nullable(),
  minProtein: z.number().nullable()
}).strict()