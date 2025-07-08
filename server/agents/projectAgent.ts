import { ChatGroq } from "@langchain/community/chat_models/groq"
import { HumanMessage, SystemMessage } from "@langchain/core/messages"
import { RunnableSequence } from "@langchain/core/runnables"

// Init the Groq model
const chatModel = new ChatGroq({
  temperature: 0.7,
  model: 'llama3-8b-8192', // not `modelName` in Groq wrapper
  apiKey: process.env.GROQ_API_KEY,
})

// Build a simple prompt pipeline
const promptChain = RunnableSequence.from([
  (input: { goal: string }) => [
    new SystemMessage("You are a helpful project planning agent."),
    new HumanMessage(`Help me plan a project with this goal: ${input.goal}`),
  ],
  chatModel,
])

export async function runProjectAgent(goal: string) {
  const result = await promptChain.invoke({ goal })
  return result.content
}
