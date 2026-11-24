import { z } from 'zod'

export const OLLAMA_ENDPOINT = process.env.OLLAMA_ENDPOINT || 'http://localhost:11434/api/chat'

// TODO: Rather than maxCalories and minProtein, there should be
// a min, max and approximate for queries such as "around 40g of protein"
export const MealQuerySchema = z.object({
  ingredients: z.array(z.string()),
  maxCalories: z.number().nullable(),
  minProtein: z.number().nullable()
}).strict()