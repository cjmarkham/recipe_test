import { writeFileSync } from 'node:fs'

import { z } from 'zod'

import { MealQuerySchema } from '../src/config'
import { interpretRequest } from '../src/ai'

import testDataset from './evaluation-dataset.json'

interface Evaluation {
  score: number,
  exactMatch: boolean,
  fields?: Record<string, boolean>
}

/**
 * Evaluates the interpretation accuracy
 * This currently gives each field the same weight and should
 * be improved if things like allergens are added (much worse if it gets those wrong)
 */
const scoreInterpretation = (
  expected: z.infer<typeof MealQuerySchema>,
  actual: z.infer<typeof MealQuerySchema>,
): Evaluation => {
  const fields = {
    ingredients:
      JSON.stringify([...actual.ingredients].sort()) ===
      JSON.stringify([...expected.ingredients].sort()),
    maxCalories: actual.maxCalories === expected.maxCalories,
    minProtein: actual.minProtein === expected.minProtein
  }

  const correct = Object.values(fields).filter(Boolean).length

  return {
    score: correct / Object.keys(fields).length,
    exactMatch: correct === Object.keys(fields).length,
    fields
  }
}

const scores: Array<Evaluation> = []
const failures = []

for (const test of testDataset) {
  console.log(`Evaluating: ${test.id}`)
  const [actual, err] = await interpretRequest({ query: test.input })

  if (err || !actual) {
    scores.push({ score: 0, exactMatch: false })
    if (err) {
      console.error(`Failed to interpret: ${test.id}`)
    }
    continue
  }

  const evaluation = scoreInterpretation(test.expected, actual)
  scores.push(evaluation)

  if (!evaluation.exactMatch) {
    failures.push({
      id: test.id,
      category: test.category,
      input: test.input,
      expected: test.expected,
      actual,
      fields: evaluation.fields
    })
  }
  console.log(`Completed: ${test.id}`)
}

const fieldAccuracy =
  scores.reduce((sum, result) => sum + result.score, 0) /
  scores.length

const exactAccuracy =
  scores.filter(result => result.exactMatch).length /
  scores.length

const fieldNames = [
  'ingredients',
  'maxCalories',
  'minProtein'
] as const

const fieldScores = Object.fromEntries(
  fieldNames.map(field => [
    field,
    (scores.filter(s => s.fields?.[field] === true).length / scores.length).toFixed(2)
  ])
)

console.log({
  fieldAccuracy: `${(fieldAccuracy * 100).toFixed(1)}%`,
  exactAccuracy: `${(exactAccuracy * 100).toFixed(1)}%`,
  fieldScores: Object.fromEntries(
    Object.entries(fieldScores).map(([key, value]) => [
      key,
      `${(Number(value) * 100).toFixed(1)}%`
    ])
  )
})

writeFileSync(
  './evaluation-failures.json',
  JSON.stringify(failures, null, 2)
)