import { z } from 'zod'

import { MealQuerySchema, OLLAMA_ENDPOINT } from './config'
import { DTO } from './domain'

export const interpretRequest = async (dto: DTO): Promise<[z.infer<typeof MealQuerySchema> | null, Error | null]> => {
  const request = await fetch(OLLAMA_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'qwen3:8b',
      messages: [
        {
          role: 'system', // Instructions
          content: `
            You are a recipe assistant.
            
            Extract nutritional requirements from the user.
            Only extract values explicitly mentioned.
            Do not invent nutritional targets.
            If a numeric value is missing, return null.
          `,
        },
        {
          role: 'user',
          content: dto.query
        },
      ],
      stream: false, // disable streaming for easier response handling
      think: false, // disable reasoning for faster responses
      options: {
        num_predict: 150, // limit token usage
      },
      format: z.toJSONSchema(MealQuerySchema)
    })
  }) // Not using a catch for simplicity

  if (!request.ok) {
    return [null, new Error('Failed to fetch response from AI model')]
  }
  const response = await request.json()

  const parsed = JSON.parse(response.message.content)
  const result = MealQuerySchema.safeParse(parsed)
  // The model spat out something incorrect
  if (!result.success) {
    console.error('Invalid response from AI model:', result.error)
    return [null, new Error('Something went wrong.')]
  }

  return [result.data, null]
}

// There's currently no need for this second LLM call as TypeScript could be used to format the result.
// However, this could be extended to include more information in the future.
export const formatRecipeResponse = async (query: string, recipes: Array<any>): Promise<[string | null, Error | null]> => {
  const request = await fetch(OLLAMA_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'qwen3:8b',
      messages: [
        {
          role: 'system', // Instructions
          content: `
          You are a recipe assistant.
          Present the supplied recipes as a concise recommendation.
          Include each recipe's name, calories and protein.
          Do not invent or change nutritional information.
          Keep the response under 100 words.
          `,
        },
        {
          role: 'user',
          content: JSON.stringify(recipes)
        },
      ],
      stream: false, // disable streaming for easier response handling
      think: false, // disable reasoning for faster responses
      options: {
        num_predict: 250, // limit token usage
      },
    })
  })

  if (!request.ok) {
    return [null, new Error(`Failed to fetch response from AI model: ${await request.text()}`)]
  }
  const response = await request.json()

  return [response.message.content, null]
}