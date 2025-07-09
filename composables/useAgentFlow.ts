export const useAgentFlow = () => {
  const sessionId = useState(() => crypto.randomUUID())
  const memory = ref({})
  const currentPhase = ref<'initiation' | 'planning' | 'execution' | 'delivery'>('initiation')

  const start = async (goal: string) => {
    currentPhase.value = 'initiation'
    const { response } = await $fetch('/api/projectAgent', {
      method: 'POST',
      body: { goal, phase: 'initiation', sessionId: sessionId.value }
    })
    Object.assign(memory.value, { goal, ...response })
  }

  const next = async () => {
    const phaseOrder = ['planning', 'execution', 'delivery']
    const nextPhase = phaseOrder.shift()
    if (!nextPhase) return

    currentPhase.value = nextPhase
    const { response } = await $fetch('/api/projectAgent', {
      method: 'POST',
      body: {
        goal: memory.value.goal,
        phase: nextPhase,
        sessionId: sessionId.value
      }
    })
    Object.assign(memory.value, response)
  }

  return { start, next, memory, currentPhase }
}
