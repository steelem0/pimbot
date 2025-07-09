import { runInitiationAgent } from './initiationAgent'
import { runPlanningAgent } from './planningAgent'
import { runExecutionAgent } from './executionAgent'
import { runDeliveryAgent } from './deliveryAgent'

type ProjectPhase = 'initiation' | 'planning' | 'execution' | 'delivery'

export async function runPhase(phase: ProjectPhase, memory: any) {
  switch (phase) {
    case 'initiation':
      return await runInitiationAgent(memory.goal)
    case 'planning':
      return await runPlanningAgent(memory)
    case 'execution':
      return await runExecutionAgent(memory)
    case 'delivery':
      return await runDeliveryAgent(memory)
    default:
      throw new Error('Unknown phase')
  }
}
