import { runProjectAgent } from '~/server/agents/projectAgent'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ goal: string }>(event)

  const content = await runProjectAgent(body.goal)

  return { content }
})
