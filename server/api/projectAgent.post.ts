import { runPhase } from '~/server/agents/projectAgent'
import { usePrisma } from '~/server/db/prismaClient'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { goal, sessionId, phase } = body

  if (!goal || !phase || !sessionId) {
    throw createError({ statusCode: 400, statusMessage: 'Missing data' })
  }

  const prisma = usePrisma()
  const existing = await prisma.projectMemory.findFirst({ where: { sessionId } })
  const memory = existing ?? { sessionId, goal }

  const result = await runPhase(phase, memory)
  Object.assign(memory, result)

  await prisma.projectMemory.upsert({
    where: { sessionId },
    update: memory,
    create: memory
  })

  return { memory }
})
