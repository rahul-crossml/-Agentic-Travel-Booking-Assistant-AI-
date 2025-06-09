"use client";

import React from 'react';

import { Bot, User } from 'lucide-react';



export const MessageBubble = ({ message }) => {
  const isBot = message?.message?.sender === 'bot';
  
  console.log('MessageBubble', message);
  return (
    <div className={`flex items-start gap-2 mb-4 ${isBot ? 'justify-start' : 'justify-end'}`}>
      {isBot && (
        <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
          <Bot size={12} className="text-white" />
        </div>
      )}
      
      <div className={`max-w-[85%] ${isBot ? 'order-2' : 'order-1'}`}>
        <div
          className={`px-3 py-2 rounded-xl shadow-sm text-sm leading-relaxed ${
            isBot
              ? 'bg-white border border-gray-100 text-gray-800'
              : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
          }`}
        >
          <p className="whitespace-pre-wrap">{message?.message?.content1}</p>
        </div>
        {/* <div className="mt-1 px-1">
          <span className="text-xs text-gray-400">
            {message?.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div> */}
      </div>
      
      {!isBot && (
        <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center order-2">
          <User size={12} className="text-white" />
        </div>
      )}
    </div>
  );
};