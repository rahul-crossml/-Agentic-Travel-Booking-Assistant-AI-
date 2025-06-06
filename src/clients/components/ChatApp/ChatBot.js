"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./ChatBot.module.css";
import Image from "next/image";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);

  // Sample initial messages
  useEffect(() => {
    setMessages([
      {
        text: "Welcome to Travel Booking AI Assist! How can I help you today?",
        sender: "bot",
        timestamp: new Date(),
      },
      {
        text: "You can ask about Flight schedules, ticket booking, cancellations, etc.",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    const userMessage = {
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    // Add user message
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot response with more realistic delay
    setTimeout(() => {
      setIsTyping(false);
      const botResponses = [
        "I'd be happy to help you with your travel booking needs! What specific information are you looking for?",
        "Let me assist you with that. Could you provide more details about your travel requirements?",
        "Great question! I can help you find the best flight options. What's your departure and destination?",
        "I'm here to help with all your booking needs. What would you like to know more about?",
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      setMessages(prev => [
        ...prev,
        {
          text: randomResponse,
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const TypingIndicator = () => (
    <div className={styles.typingIndicator}>
      <div className={styles.typingDots}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <span className={styles.typingText}>Banti is typing...</span>
    </div>
  );

  return (
    <div className={`${styles.chatbotContainer} ${isOpen ? styles.open : ""}`}>
      {isOpen ? (
        <div className={`${styles.chatWindow} ${isMinimized ? styles.minimized : ""}`}>
          <div className={styles.chatHeader}>
            <div className={styles.headerLeft}>
              <div className={styles.imageContainer}>
                <Image
                  src="/robot-ai-technology-character-icon.avif"
                  alt="AI Bot"
                  width={35}
                  height={35}
                />
                <div className={styles.onlineIndicator}></div>
              </div>
              <div className={styles.headerInfo}>
                <h3>Banti - AI Assistant</h3>
                <span className={styles.status}>Online • Ready to help</span>
              </div>
            </div>
            <div className={styles.headerActions}>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className={styles.minimizeButton}
                title={isMinimized ? "Expand" : "Minimize"}
              >
                {isMinimized ? "□" : "−"}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className={styles.closeButton}
                title="Close chat"
              >
                ×
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              <div className={styles.messagesContainer}>
                <div className={styles.messagesWrapper}>
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`${styles.messageWrapper} ${
                        message.sender === "user" ? styles.userWrapper : styles.botWrapper
                      }`}
                    >
                      {message.sender === "bot" && (
                        <div className={styles.botAvatar}>
                          <Image
                            src="/robot-ai-technology-character-icon.avif"
                            alt="Bot"
                            width={24}
                            height={24}
                          />
                        </div>
                      )}
                      <div
                        className={`${styles.message} ${
                          message.sender === "user"
                            ? styles.userMessage
                            : styles.botMessage
                        }`}
                      >
                        <div className={styles.messageText}>{message.text}</div>
                        <div className={styles.messageTime}>
                          {formatTime(message.timestamp)}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isTyping && <TypingIndicator />}
                  <div ref={messagesEndRef} />
                </div>
              </div>
              
              <div className={styles.inputContainer}>
                <div className={styles.inputWrapper}>
                  <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message here..."
                    className={styles.messageInput}
                    rows="1"
                    disabled={isTyping}
                  />
                  <button
                    className={`${styles.sendButton} ${inputValue.trim() ? styles.sendButtonActive : ""}`}
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    title="Send message"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
                <div className={styles.quickActions}>
                  <button 
                    className={styles.quickActionBtn}
                    onClick={() => setInputValue("I need help with flight booking")}
                  >
                    ✈️ Flight Booking
                  </button>
                  <button 
                    className={styles.quickActionBtn}
                    onClick={() => setInputValue("Check flight schedules")}
                  >
                    📅 Schedules
                  </button>
                  <button 
                    className={styles.quickActionBtn}
                    onClick={() => setInputValue("Cancel my booking")}
                  >
                    ❌ Cancellation
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className={styles.chatButtonWrapper}>
          <div className={styles.imageContainer2}>
            <Image
              src="/robot-ai-technology-character-icon.avif"
              alt="AI Bot"
              width={45}
              height={45}
            />
            <div className={styles.pulseRing}></div>
          </div>
          <button 
            className={styles.chatButton} 
            onClick={() => setIsOpen(true)}
          >
            <span className={styles.chatButtonText}>Ask Banti</span>
            <span className={styles.chatButtonSubtext}>Your AI Travel Assistant</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatBot;