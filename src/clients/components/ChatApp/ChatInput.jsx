"use client";
import React, { useState, KeyboardEvent } from 'react';
import { Send, Plane } from 'lucide-react';


export const ChatInput = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-end gap-2">
      <div className="flex-1 relative">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask about destinations, tips, or planning..."
          className="w-full px-3 py-2 pr-8 border border-gray-200 rounded-xl 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   resize-none max-h-20 text-sm text-gray-800 placeholder-gray-500"
          rows={1}
          disabled={disabled}
        />
        <div className="absolute right-2 bottom-2 text-gray-400">
          <Plane size={14} />
        </div>
      </div>
      
      <button
        onClick={handleSend}
        disabled={!message.trim() || disabled}
        className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 
                 text-white rounded-xl flex items-center justify-center
                 hover:from-blue-600 hover:to-cyan-600 transition-all duration-200
                 disabled:opacity-50 disabled:cursor-not-allowed
                 shadow-sm hover:shadow-md"
      >
        <Send size={14} />
      </button>
    </div>
  );
};