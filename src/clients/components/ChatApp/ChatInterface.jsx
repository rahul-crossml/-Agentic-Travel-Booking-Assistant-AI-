"use client";
import React, { useState, useRef, useEffect } from 'react';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';
import { Compass, RotateCcw, X, MessageCircle, Plane, Clock, DollarSign } from 'lucide-react';
import Markdown from 'react-markdown';



export const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [userId] = useState(() => `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const messagesEndRef = useRef(null);

  // API Configuration
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ||'https://agentic-travel-booking-assistant-ai.onrender.com/api';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (content, sender, metadata = null) => {
    console.log(content, "content");
    const content1 = content?.response || content;
    const newMessage = {
      id: Date.now().toString(),
      content1,
      sender,
      timestamp: new Date(),
      metadata
    };

    setMessages(prev => [...prev, newMessage]);
  };

  // Smart Search API Call
  const callSmartSearch = async (query) => {
    try {
      const response = await fetch(`${API_BASE_URL}/smart-search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          query: query
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Smart search API error:', error);
      throw error;
    }
  };

  // Travel Assistant API Call


  const handleSendMessage = async (content) => {
    addMessage(content, 'user');
    setIsLoading(true);

    try {
      // First try smart search (for flight-related queries)
      const smartSearchResponse = await callSmartSearch(content);
      let metadata = null;
      addMessage(smartSearchResponse, 'bot', metadata);

    } catch (error) {
      console.error('API call failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStarterClick = (message) => {
    handleSendMessage(message);
  };



  const clearChat = async () => {
    try {
      // Call API to clear user history
      await fetch(`${API_BASE_URL}/history/${userId}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error('Failed to clear server history:', error);
    }

    setMessages([]);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const showStarters = messages.length === 0;

  // Enhanced MessageBubble component that handles different message types
  const EnhancedMessageBubble = (message) => {
    console.log(message, "message", message?.message.sender, "message.sender");
    if (message?.message?.sender === 'user') {
      return <MessageBubble message={message} />
    }
    // Bot message with special handling for different types
    return (

      <div className="flex items-start gap-2 mb-4">
        <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
          <Compass size={12} className="text-white" />
        </div>

        <div className="bg-white border border-gray-100 rounded-xl px-3 py-2 shadow-sm max-w-[280px]">
          <Markdown >{message?.message?.content1?.message ?? message?.message?.content1}</Markdown>


        </div>
      </div>
    );
  };

  return (
    <>
      {/* Floating Chatbot Icon */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 
                   text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 
                   transition-all duration-300 flex items-center justify-center z-50
                   animate-pulse hover:animate-none"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl 
                      border border-gray-200 flex flex-col z-50 overflow-hidden
                      transform transition-all duration-300 ease-out">

          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Compass size={16} className="text-white" />
              </div>
              <div>
                <h1 className="text-white font-bold text-sm">TravelBot AI</h1>
                <p className="text-white/80 text-xs">Smart Flight Search & Travel Assistant</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {messages.length > 0 && (
                <button
                  onClick={clearChat}
                  className="text-white/80 hover:text-white p-1 rounded transition-colors"
                  title="New Chat"
                >
                  <RotateCcw size={16} />
                </button>
              )}
              <button
                onClick={toggleChat}
                className="text-white/80 hover:text-white p-1 rounded transition-colors"
                title="Close Chat"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto bg-gradient-to-br from-blue-50/30 via-white to-cyan-50/30">
            {showStarters ? (
              <div className="p-4">
                <div className="text-center mb-4">
                  <h2 className="text-lg font-bold text-gray-800 mb-1">
                    Welcome! ✈️
                  </h2>
                  <p className="text-sm text-gray-600">
                    I can help you search flights and plan your travel!
                  </p>
                </div>

                <div className="space-y-2">
                  {[
                    { title: "🛫 Flight Search", message: "Find flights from Delhi to Mumbai departing December 25th 2024" },
                    { title: "🌍 Trip Planning", message: "I want to plan a vacation but don't know where to go. Can you help me find the perfect destination?" },
                    { title: "👨‍👩‍👧‍👦 Family Travel", message: "I'm looking for great family vacation destinations with kids-friendly activities." },
                    { title: "💰 Budget Travel", message: "I'm on a tight budget but want to travel. What are some affordable destinations and money-saving tips?" }
                  ].map((starter, index) => (
                    <button
                      key={index}
                      onClick={() => handleStarterClick(starter.message)}
                      className="w-full p-3 bg-white rounded-lg border border-gray-100 hover:border-blue-200 
                               hover:shadow-sm transition-all duration-200 text-left text-sm"
                    >
                      <div className="font-medium text-gray-800">{starter.title}</div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-3">


                {messages.map((message, index) => (
                  <EnhancedMessageBubble key={index} message={message} />
                ))}

                {isLoading && (
                  <div className="flex items-start gap-2 mb-4">
                    <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <Compass size={12} className="text-white animate-spin" />
                    </div>
                    <div className="bg-white border border-gray-100 rounded-xl px-3 py-2 shadow-sm">
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-100 bg-white p-3">
            <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
          </div>
        </div>
      )}
    </>
  );
};