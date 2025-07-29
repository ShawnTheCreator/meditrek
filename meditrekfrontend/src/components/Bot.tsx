import React, { useState, useEffect } from 'react'
import axios from 'axios'

const HealthChatBot = () => {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I\'m your health assistant. How can I help you today?' },
  ])
  const [notification, setNotification] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const newMessages = [...messages, { role: 'user', content: input }]
    setMessages(newMessages)
    setInput('')

    try {
      const response = await axios.post('/api/chat', { messages: newMessages })
      setMessages([...newMessages, { role: 'assistant', content: response.data.reply }])
    } catch (err) {
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
        const response = await axios.post('/api/chat', {
          messages: [
            { role: 'user', content: 'Give me a short health tip' }
          ]
        })
        showNotification(response.data.reply)
      } catch (error) {
        showNotification('Unable to fetch health tip. Please try again later.')
      }
    }, Math.random() * (120000 - 60000) + 60000) // Every 60-120 sec

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {notification && (
        <div className="bg-blue-600 text-white p-4 rounded-lg shadow-lg animate-bounce mb-4">
          {notification}
        </div>
      )}

      <div className="w-96 max-w-full p-4 rounded-2xl bg-blue-50 shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-blue-800">Health AI Chatbot</h2>
        <div className="space-y-2 h-96 overflow-y-auto bg-white p-4 rounded">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-xl max-w-xs ${msg.role === 'user' ? 'bg-blue-100 self-end ml-auto' : 'bg-gray-100 self-start'}`}
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
    </div>
  )
}

export default HealthChatBot
