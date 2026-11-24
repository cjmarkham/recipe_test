import express, { type Request, type Response } from 'express'

import { formatRecipeResponse, interpretRequest } from './ai'
import { requestToDTO } from './domain'
import { findRecipes } from './repository'

const app = express()
app.use(express.json())

app.post('/query', async (req: Request, res: Response) => {
  const [dto, err] = requestToDTO(req.body)
  if (err) {
    return res.status(400).json({ error: err.message })
  }

  // Interpret the request from the user in a structured format
  const interpretStart = performance.now()
  const [data, interpretErr] = await interpretRequest(dto)
  if (!data || interpretErr) {
    return res.status(400).json({ error: interpretErr?.message || 'Failed to interpret request' })
  }
  console.log(
    `Interpretation: ${(performance.now() - interpretStart).toFixed(0)}ms`
  )
  if (data.ingredients.length === 0) {
    return res.status(400).json({ error: 'Could not find any ingredients in the query' })
  }

  // Query database for ingredients, calories, protein
  const recipes = await findRecipes(data.ingredients, data.maxCalories, data.minProtein)
  if (recipes.length === 0) {
    return res.status(404).json({ error: 'No recipes found' })
  }

  // Send the database result to LLM to structure into response
  // Computational trade off. This increases the request time, but we give
  // better information to the user.
  const formatStart = performance.now()
  const [recipeContent, recipeErr] = await formatRecipeResponse(dto.query, recipes)
  if (recipeErr) {
    return res.status(500).json({ error: recipeErr.message })
  }
  console.log(
    `Format: ${(performance.now() - formatStart).toFixed(0)}ms`
  )

  // return response to user
  res.json({ answer: recipeContent })
})

app.listen(3000, () =>
  console.log('Server is running on port 3000')
)