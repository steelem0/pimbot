// server/api/projectAgent.post.ts
import { runProjectAgent } from '~/server/agents/projectAgent'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const goal = body.goal

  if (!goal) {
    throw createError({ statusCode: 400, statusMessage: 'Goal is required' })
  }

  const result = await runProjectAgent(goal)
  return { response: result }
})
