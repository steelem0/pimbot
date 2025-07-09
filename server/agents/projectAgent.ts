import { ChatGroq } from "@langchain/groq";
import { RunnableSequence } from '@langchain/core/runnables'
import { HumanMessage, SystemMessage } from '@langchain/core/messages'
import { z } from 'zod'
import { runInitiationAgent } from './initiationAgent';
import { runPlanningAgent } from './planningAgent';
import { runExecutionAgent } from './executionAgent';
import { runDeliveryAgent } from './deliveryAgent';

// Define schema for structured output
const ProjectMemorySchema = z.object({
  scope: z.string(),
  constraints: z.array(z.string()),
  features: z.array(z.string()),
  techStack: z.array(z.string()),
  deployment: z.string(),
  serviceDelivery: z.string(),
});

// You can later use a StructuredOutputParser if you want validated parsing

const chatModel = new ChatGroq({
  temperature: 0.7,
  model: 'llama3-8b-8192',
  apiKey: process.env.GROQ_API_KEY
});

const prompt = RunnableSequence.from([
  (input: { goal: string }) => [
    new SystemMessage("You are a PMBOK-based project planning assistant. Ask contextual questions to refine the user's idea."),
    new HumanMessage(`Help plan this project: ${input.goal}`)
  ],
  chatModel
]);

type ProjectPhase = 'initiation' | 'planning' | 'execution' | 'delivery'

export async function runPhase(phase: ProjectPhase, memory: any) {
  switch (phase) {
    case 'initiation':
      return await runInitiationAgent(memory.goal);
    case 'planning':
      return await runPlanningAgent(memory);
    case 'execution':
      return await runExecutionAgent(memory);
    case 'delivery':
      return await runDeliveryAgent(memory);
    default:
      throw new Error('Unknown phase');
  }
}


