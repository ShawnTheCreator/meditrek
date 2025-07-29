import React, { useState } from 'react'
import { isUnexpected } from '@azure-rest/ai-inference'
import ModelClient from '@azure-rest/ai-inference'
import { AzureKeyCredential } from '@azure/core-auth'

const ChatBubbleLeftRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75v-6a2.25..." />
  </svg>
)

const XMarkIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
)

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp?: string
}

const HealthChatBot = () => {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const formatTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  const sendMessageToAzure = async (newMessages: Message[]) => {
    const token = import.meta.env.VITE_GITHUB_TOKEN
    const endpoint = 'https://models.github.ai/inference'
    const model = 'openai/gpt-4.1'

    const client = ModelClient(endpoint, new AzureKeyCredential(token))

    const response = await client.path('/chat/completions').post({
      body: {
        messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        temperature: 0.8,
        top_p: 1,
        model,
      }
    })

    if (isUnexpected(response)) throw response.body.error

    return response.body.choices[0].message.content
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMsg: Message = { role: 'user', content: input, timestamp: formatTime() }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setIsLoading(true)

    try {
      const reply = await sendMessageToAzure(newMessages)
      const assistantMsg: Message = {
        role: 'assistant',
        content: reply.replace(/\\n/g, '\n').trim(),
        timestamp: formatTime(),
      }
      setMessages([...newMessages, assistantMsg])
    } catch (err) {
      setMessages([...newMessages, {
        role: 'assistant',
        content: 'Something went wrong. Please try again later.',
        timestamp: formatTime()
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end space-y-2">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 p-3 rounded-full shadow-lg hover:bg-blue-700"
        >
          <ChatBubbleLeftRightIcon className="h-6 w-6 text-white" />
        </button>
      )}

      {isOpen && (
        <div className="w-96 max-w-full p-4 rounded-2xl bg-blue-50 shadow-xl flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-blue-800">Health AI Chatbot</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-blue-600 hover:text-blue-800"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-2 h-96 overflow-y-auto bg-white p-4 rounded flex-grow">
            {messages.map((msg, idx) => (
              <div key={idx} className={`p-2 rounded-xl max-w-xs text-sm whitespace-pre-wrap ${msg.role === 'user' ? 'bg-blue-100 self-end ml-auto' : 'bg-gray-100 self-start'}`}>
                <div>{msg.content}</div>
                <div className="text-[10px] text-right text-gray-500 mt-1">{msg.timestamp}</div>
              </div>
            ))}
            {isLoading && (
              <div className="self-start bg-gray-100 text-gray-500 text-sm rounded-xl px-3 py-2 animate-pulse">
                Typing...
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="mt-4 flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow p-2 rounded-l-lg border border-blue-300"
              placeholder="Ask me something..."
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 rounded-r-lg hover:bg-blue-700"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default HealthChatBot
