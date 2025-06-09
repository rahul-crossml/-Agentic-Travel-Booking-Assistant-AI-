
"use client";
import React from 'react';
import { 
  MapPin, 
  Users, 
  DollarSign, 
  Mountain, 
  Globe, 
  Waves,
  ArrowRight 
} from 'lucide-react';
import { ConversationStarter } from '../types/travel';
import { conversationStarters } from '../data/travelData';


const iconMap = {
  MapPin,
  Users,
  DollarSign,
  Mountain,
  Globe,
  Waves
};

export const ConversationStarters = ({ onStarterClick }) => {
  return (
    <div className="p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Welcome to TravelBot! ✈️
        </h2>
        <p className="text-gray-600">
          Your friendly travel assistant ready to help plan your next adventure
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {conversationStarters.map((starter) => {
          const IconComponent = iconMap[starter.icon ];
          
          return (
            <button
              key={starter.id}
              onClick={() => onStarterClick(starter.message)}
              className="group p-4 bg-white rounded-xl border border-gray-100 hover:border-blue-200 
                       hover:shadow-md transition-all duration-200 text-left"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-100 to-cyan-100 
                              rounded-lg flex items-center justify-center group-hover:from-blue-200 
                              group-hover:to-cyan-200 transition-colors">
                  <IconComponent size={20} className="text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 mb-1">{starter.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{starter.description}</p>
                  <div className="flex items-center text-blue-600 text-sm font-medium">
                    Start conversation
                    <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};