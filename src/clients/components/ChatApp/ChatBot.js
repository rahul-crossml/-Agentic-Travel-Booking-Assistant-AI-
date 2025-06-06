"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./ChatBot.module.css";
import Image from "next/image";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  // Sample initial messages
  useEffect(() => {
    setMessages([
      {
        text: "Welcome to Travel Booking AI Assist! How can I help you today?",
        sender: "bot",
      },
      {
        text: "You can ask about Flight schedules, ticket booking, cancellations, etc.",
        sender: "bot",
      },
    ]);
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    // Add user message
    setMessages([...messages, { text: inputValue, sender: "user" }]);
    setInputValue("");

    // Simulate bot response after a delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: `I received: "${inputValue}". This is a simulated response.`,
          sender: "bot",
        },
      ]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className={`${styles.chatbotContainer} ${isOpen ? styles.open : ""}`}>
      {isOpen ? (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <div className={styles.imageContainer}>
              <Image
                src="/robot-ai-technology-character-icon.avif"
                alt="AI Bot"
                width={40}
                height={40}
              />
            </div>
            <h3>Your Booking AI Agent</h3>
            <button
              onClick={() => setIsOpen(false)}
              className={styles.closeButton}
            >
              ×
            </button>
          </div>
          <div className={styles.messagesContainer}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`${styles.message} ${
                  message.sender === "user"
                    ? styles.userMessage
                    : styles.botMessage
                }`}
              >
                {message.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className={styles.inputContainer}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type here to chat..."
              style={{ color: "black" }}
            />
            <button
              className={styles.sendButtonContainer}
              onClick={handleSendMessage}
            >
              Send
              <i class="fa-solid fa-paper-plane"></i>
            </button>
          </div>
        </div>
      ) : (
        <div>
            <div className={styles.imageContainer2}>
              <Image
                src="/robot-ai-technology-character-icon.avif"
                alt="AI Bot"
                width={50}
                height={50}
              />
            </div>
          <button className={styles.chatButton} onClick={() => setIsOpen(true)}>
            Ask Banti, your AI Assistant
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
