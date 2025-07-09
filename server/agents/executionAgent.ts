import { ChatGroq } from "@langchain/groq";
import { HumanMessage, SystemMessage } from '@langchain/core/messages'
import { RunnableSequence } from '@langchain/core/runnables'

const chatModel = new ChatGroq({
  model: 'llama3-8b-8192',
  temperature: 0.7,
  apiKey: process.env.GROQ_API_KEY
})

const prompt = RunnableSequence.from([
  (input: any) => [
    new SystemMessage('You are a project execution planning agent. Based on all prior context, return task breakdown, key roles, goals, milestones, and sprint plan.'),
    new HumanMessage(`Features: ${JSON.stringify(input.features)}\nTimeline: ${input.timeline}\nWhat should the execution plan look like?`)
  ],
  chatModel
])

export async function runExecutionAgent(memory: any) {
  const result = await prompt.invoke(memory)
  return JSON.parse(result.content)
}
