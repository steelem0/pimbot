import { ref } from 'vue'


export const useAgentFlow = () => {
  const memory = ref<any>({})
  const currentPhase = ref<'initiation' | 'planning' | 'execution' | 'delivery'>('initiation')

const sessionId = useState('sessionId', () =>
  typeof crypto !== 'undefined' ? crypto.randomUUID() : ''
)


  const start = async (goal: string) => {
    const sessionId = crypto.randomUUID()
    const response = await $fetch('/api/projectAgent', {
      method: 'POST',
      body: {
        goal,
        sessionId,
        phase: 'initiation'
      }
    })
    memory.value = response.memory
  }


  const next = async () => {
    const phaseOrder: typeof currentPhase.value[] = ['planning', 'execution', 'delivery']
    const currentIndex = phaseOrder.indexOf(currentPhase.value)
    const nextPhase = phaseOrder[currentIndex + 1]
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
