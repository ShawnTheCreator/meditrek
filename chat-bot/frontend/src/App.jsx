import { useEffect, useRef, useState } from "react";
import ChatbotIcon from "./components/ChatbotIcon";
import ChatForm from "./components/ChatForm";
import ChatMessage from "./components/ChatMessage";
import { companyInfo } from "./companyInfo";

// Azure SDK imports
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

const App = () => {
  const chatBodyRef = useRef();
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      hideInChat: true,
      role: "model",
      text: companyInfo,
    },
  ]);

  const generateBotResponse = async (history) => {
    const updateHistory = (text, isError = false) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Thinking..."),
        { role: "model", text, isError },
      ]);
    };

    // Add "Thinking..." placeholder message
    setChatHistory((prev) => [
      ...prev,
      { role: "model", text: "Thinking...", isError: false },
    ]);

    // Azure OpenAI client setup
    const token = import.meta.env.VITE_AZURE_OPENAI_KEY;
    const endpoint = "https://models.github.ai/inference"; // Replace with your actual Azure endpoint
    const model = "openai/gpt-4.1"; // Your deployed model name

    try {
      // Initialize Azure client
      const client = ModelClient(endpoint, new AzureKeyCredential(token));

      // Construct messages with companyInfo as system context
      const messagesForAzure = [
        {
          role: "system",
          content: `Company context:\n${companyInfo}\n\nYou are a helpful assistant. Use the above context to answer questions accurately.`,
        },
        // Append user and assistant messages from history, skipping hidden
        ...history
          .filter((msg) => !msg.hideInChat)
          .map((msg) => ({
            role: msg.role === "model" ? "assistant" : msg.role,
            content: msg.text,
          })),
      ];

      // Call Azure OpenAI chat completions endpoint
      const response = await client.path("/chat/completions").post({
        body: {
          model: model,
          messages: messagesForAzure,
          temperature: 0.7,
          top_p: 1,
        },
      });

      if (isUnexpected(response)) {
        throw response.body.error;
      }

      // Extract bot reply
      const botReply = response.body.choices[0].message.content;

      updateHistory(botReply);
    } catch (error) {
      console.error("Azure OpenAI Error:", error);
      updateHistory(
        "Sorry, I encountered an error. Please try again later.",
        true
      );
    }
  };

  useEffect(() => {
    // Auto-scroll whenever chat history updates
    chatBodyRef.current.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chatHistory]);

  return (
    <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
      <button
        onClick={() => setShowChatbot((prev) => !prev)}
        id="chatbot-toggler"
      >
        <span className="material-symbols-rounded">mode_comment</span>
        <span className="material-symbols-rounded">close</span>
      </button>

      <div className="chatbot-popup">
        {/* Chatbot Header */}
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">Chatbot</h2>
          </div>
          <button
            onClick={() => setShowChatbot((prev) => !prev)}
            className="material-symbols-rounded"
          >
            keyboard_arrow_down
          </button>
        </div>

        {/* Chatbot Body */}
        <div ref={chatBodyRef} className="chat-body">
          <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">
              Hey there 👋 <br /> How can I help you today?
            </p>
          </div>

          {/* Render the chat history dynamically */}
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>

        {/* Chatbot Footer */}
        <div className="chat-footer">
          <ChatForm
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
