import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ChatBubbleLeftRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 12.75v-6a2.25 2.25 0 012.25-2.25h15a2.25 2.25 0 012.25 2.25v6a2.25 2.25 0 01-2.25 2.25H9l-5 5v-5.25a2.25 2.25 0 01-1.5-2.25z"
    />
  </svg>
)

const XMarkIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const HealthChatBot = () => {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm your health assistant. How can I help you today?" },
  ])
  const [notification, setNotification] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false) // toggle open/close

  const sendMessageToOpenAI = async (newMessages: any[]) => {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: newMessages,
      },
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    )
    return response.data.choices[0].message.content
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const newMessages = [...messages, { role: 'user', content: input }]
    setMessages(newMessages)
    setInput('')

    try {
      const reply = await sendMessageToOpenAI(newMessages)
      setMessages([...newMessages, { role: 'assistant', content: reply }])
    } catch {
      setMessages([...newMessages, { role: 'assistant', content: 'Something went wrong. Please try again.' }])
    }
  }

  const showNotification = (message: string) => {
    setNotification(message)
    setTimeout(() => setNotification(null), 6000)
  }

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const reply = await sendMessageToOpenAI([
          { role: 'user', content: 'Give me a short health tip' },
        ])
        showNotification(reply)
      } catch {
        showNotification('Unable to fetch health tip.')
      }
    }, Math.random() * (120000 - 60000) + 60000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end space-y-2">
      {notification && (
        <div className="bg-blue-600 text-white p-4 rounded-lg shadow-lg animate-bounce mb-4 max-w-xs">
          {notification}
        </div>
      )}

      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open health chatbot"
          className="bg-blue-600 p-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <ChatBubbleLeftRightIcon className="h-6 w-6 text-white" />
        </button>
      )}

      {/* Chatbot Panel */}
      {isOpen && (
        <div className="w-96 max-w-full p-4 rounded-2xl bg-blue-50 shadow-xl flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-blue-800">Health AI Chatbot</h2>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close health chatbot"
              className="text-blue-600 hover:text-blue-800 focus:outline-none"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-2 h-96 overflow-y-auto bg-white p-4 rounded flex-grow">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-xl max-w-xs ${
                  msg.role === 'user' ? 'bg-blue-100 self-end ml-auto' : 'bg-gray-100 self-start'
                }`}
              >
                {msg.content}
              </div>
            ))}
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
