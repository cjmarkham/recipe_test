import { db } from './database'

interface Recipe {
  id: number
  name: string
  ingredients: string[]
  calories: number
  protein: number
}

export const findRecipes = async (
  ingredients: string[],
  maxCalories: number | null,
  minProtein: number | null
): Promise<Array<Recipe>> => {
  const result = await db.query<Recipe>(
    `SELECT *
     FROM recipes
     WHERE ingredients @> $1::TEXT[]
       AND ($2::INTEGER IS NULL OR calories <= $2)
       AND ($3::NUMERIC IS NULL OR protein >= $3)
     LIMIT 3`,
    [ingredients, maxCalories, minProtein]
  )

  return result.rows
}