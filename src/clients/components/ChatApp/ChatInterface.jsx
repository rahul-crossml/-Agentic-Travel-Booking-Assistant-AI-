"use client";
import React, { useState, useRef, useEffect } from 'react';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';
import { Compass, RotateCcw, X, MessageCircle, Plane, Clock, DollarSign } from 'lucide-react';
import Markdown from 'react-markdown';

// Flight Results Component
const FlightResults = ({ flightData, aiInsights }) => {
  if (!flightData || !flightData.best_flights) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm">
        <p className="text-yellow-800">No flights found for your search criteria.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 max-w-full">
      {/* AI Insights */}
      {aiInsights && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <h4 className="font-semibold text-blue-800 text-xs mb-1">✨ AI Insights</h4>
          <Markdown >{aiInsights}</Markdown>
        </div>
      )}


      {/* Flight Results */}
      <div className="space-y-2">
        <h4 className="font-semibold text-gray-800 text-sm flex items-center gap-1">
          <Plane size={14} />
          Best Flight Options
        </h4>

        {flightData.best_flights.slice(0, 3).map((flight, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-3 text-xs">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <div className="font-medium text-gray-800">
                  {flight.flights?.[0]?.departure_airport?.name || flight.flights?.[0]?.departure_airport?.id}
                  → {flight.flights?.[0]?.arrival_airport?.name || flight.flights?.[0]?.arrival_airport?.id}
                </div>
                <div className="text-gray-600 flex items-center gap-3 mt-1">
                  <span className="flex items-center gap-1">
                    <Clock size={10} />
                    {flight.flights?.[0]?.departure_airport?.time} - {flight.flights?.[0]?.arrival_airport?.time}
                  </span>
                  <span>Duration: {flight.total_duration || 'N/A'}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-green-600 flex items-center gap-1">
                  <DollarSign size={10} />
                  ₹{flight.price?.toLocaleString() || 'N/A'}
                </div>
                <div className="text-gray-500 text-xs">{flight.airline_logo ? flight.flights?.[0]?.airline : 'Airline'}</div>
              </div>
            </div>

            {flight.flights?.length > 1 && (
              <div className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded">
                {flight.flights.length - 1} stop(s)
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2 mt-3">
        <button className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors">
          Show Cheapest
        </button>
        <button className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200 transition-colors">
          Direct Flights
        </button>
        <button className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded hover:bg-purple-200 transition-colors">
          Morning Flights
        </button>
      </div>
    </div>
  );
};

// Follow-up Response Component
const FollowUpResponse = ({ response, previousSearch }) => (
  <div className="space-y-2">
    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
      <h4 className="font-semibold text-green-800 text-xs mb-1">Follow-up Answer</h4>
      <Markdown >{response}</Markdown>
    </div>
    {previousSearch && (
      <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
        Related to: {previousSearch}
      </div>
    )}
  </div>
);

export const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [userId] = useState(() => `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const messagesEndRef = useRef(null);

  // API Configuration
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

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
  const callTravelAssistant = async (query) => {
    try {
      const response = await fetch(`${API_BASE_URL}/travel-assistant`, {
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
      console.error('Travel assistant API error:', error);
      throw error;
    }
  };

  const handleSendMessage = async (content) => {
    addMessage(content, 'user');
    setIsLoading(true);

    try {
      // First try smart search (for flight-related queries)
      const smartSearchResponse = await callSmartSearch(content);

      let botResponse = '';
      let metadata = null;

      // switch (smartSearchResponse.type) {
      //   case 'flight_results':
      //     botResponse = `Found flights from ${smartSearchResponse.extractedParameters?.departure} to ${smartSearchResponse.extractedParameters.arrival}!`;
      //     metadata = {
      //       type: 'flight_results',
      //       flightData: smartSearchResponse.flightData,
      //       aiInsights: smartSearchResponse.aiInsights,
      //       extractedParams: smartSearchResponse.extractedParameters
      //     };
      //     break;

      //   case 'follow_up_response':
      //     botResponse = smartSearchResponse.response;
      //     metadata = {
      //       type: 'follow_up_response',
      //       response: smartSearchResponse.response,
      //       previousSearch: smartSearchResponse.previousSearch,
      //       flightData: smartSearchResponse.flightData
      //     };
      //     break;

      //   case 'parameter_missing':
      //     botResponse = `${smartSearchResponse.message}\n\nMissing: ${Object.entries(smartSearchResponse.missing)
      //       .filter(([key, value]) => value !== null)
      //       .map(([key, value]) => value)
      //       .join(', ')}`;
      //     break;

      //   case 'general_response':
      //     // Fall back to travel assistant for general queries
      //     const travelResponse = await callTravelAssistant(content);
      //     botResponse = travelResponse.response;
      //     metadata = {
      //       type: 'travel_assistance',
      //       suggestions: smartSearchResponse.suggestions
      //     };
      //     break;

      //   default:
      //     botResponse = smartSearchResponse.message || smartSearchResponse.response || 'I can help you with travel planning and flight searches!';
      // }


      console.log(smartSearchResponse, "smartSearchResponse");
      addMessage(smartSearchResponse, 'bot', metadata);

    } catch (error) {
      console.error('API call failed:', error);

      // // Fallback response
      // addMessage(
      //   "I'm having trouble connecting to my travel database right now. Please try again in a moment, or ask me about general travel advice!",
      //   'bot',
      //   { type: 'error' }
      // );
    } finally {
      setIsLoading(false);
    }
  };

  const handleStarterClick = (message) => {
    handleSendMessage(message);
  };

  const handleQuickAction = (action, previousQuery) => {
    const actionQueries = {
      'Show Cheapest': 'Show me the cheapest flight option',
      'Direct Flights': 'Show me direct flights only',
      'Morning Flights': 'Show me morning flight options'
    }; response

    handleSendMessage(aresponsectionQueries[action] || action);
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
  const EnhancedMessageBubble = ( message ) => {
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

          {/* Render special content based on message type */}
          {/* {message.metadata?.type === 'flight_results' && (
            <FlightResults 
              flightData={message.metadata.flightData} 
              aiInsights={message.metadata.aiInsights}
            />
          )} */}
          {/*           
          {message.metadata?.type === 'follow_up_response' && (
            // <FollowUpResponse 
            //   response={message.metadata.response}
            //   previousSearch={message.metadata.previousSearch}
            // />
          )} */}

          {/* {message.metadata?.type === 'travel_assistance' && message.metadata.suggestions && (
            <div className="mt-2 space-y-1">
              <p className="text-xs text-gray-600 font-medium">Try asking:</p>
              {message.metadata.suggestions.slice(0, 2).map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(suggestion)}
                  className="block w-full text-left text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded hover:bg-blue-100 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )} */}

          {/* <div className="text-xs text-gray-400 mt-2">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div> */}
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
                {/* {messages.map((message) => {
                  console.log(message, "message");
                  
                  <EnhancedMessageBubble  message={message?.content1} />
                
                })} */}

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