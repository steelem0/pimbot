import { ChatGroq } from "@langchain/groq";
import { HumanMessage, SystemMessage } from '@langchain/core/messages'
import { RunnableSequence } from '@langchain/core/runnables'

const chatModel = new ChatGroq({
  model: "llama3-8b-8192",
  temperature: 0.7,
  apiKey: process.env.GROQ_API_KEY
})

const prompt = RunnableSequence.from([
  (input: any) => [
    new SystemMessage('You are a project planning agent. Given the goal, scope, and features, return architecture, tech stack, timeline, and risks.'),
    new HumanMessage(`Project goal: ${input.goal}\nScope: ${input.scope}\nFeatures: ${JSON.stringify(input.features)}\nWhat is the best plan?`)
  ],
  chatModel
])

export async function runPlanningAgent(memory: any) {
  const result = await prompt.invoke(memory)
  return JSON.parse(result.content)
}
