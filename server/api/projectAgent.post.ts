import { runPhase } from '~/server/agents/projectAgent'
import { usePrisma } from '~/server/db/prismaClient'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { goal, phase, sessionId } = body

  if (!goal || !phase || !sessionId) {
    throw createError({ statusCode: 400, statusMessage: 'Missing data' })
  }

  const memory = await getOrInitMemory(sessionId, goal)
  const result = await runPhase(phase, memory)

  Object.assign(memory, result)

  const prisma = usePrisma()

  await prisma.projectMemory.upsert({
    where: { sessionId },
    update: {
      goal: memory.goal,
      scope: memory.scope,
      constraints: memory.constraints,
      features: memory.features,
      techStack: memory.techStack,
      deployment: memory.deployment,
      serviceDelivery: memory.serviceDelivery
    },
    create: {
      sessionId,
      goal: memory.goal,
      scope: memory.scope,
      constraints: memory.constraints,
      features: memory.features,
      techStack: memory.techStack,
      deployment: memory.deployment,
      serviceDelivery: memory.serviceDelivery
    }
  })


  return { response: result }
})

async function getOrInitMemory(sessionId: string, goal: string) {
  const prisma = usePrisma()
  const existing = await prisma.projectMemory.findFirst({ where: { sessionId } })
  if (existing) return existing
  return { sessionId, goal }
}
