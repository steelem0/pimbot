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
    new SystemMessage('You are a project delivery agent. Based on the execution plan, return a deployment strategy, testing plan, and service delivery model.'),
    new HumanMessage(`Architecture: ${input.architecture}\nTimeline: ${input.timeline}\nHow should we deliver and maintain the project?`)
  ],
  chatModel
])

export async function runDeliveryAgent(memory: any) {
  const result = await prompt.invoke(memory)
  return JSON.parse(result.content)
}
