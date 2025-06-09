"use client"

import { popularDestinations } from './travelData';


export class TravelAssistant {
    conversationHistory = [];

    generateResponse(userMessage) {
        this.conversationHistory.push({ role: 'user', content: userMessage });

        const message = userMessage.toLowerCase();
        let response = '';

        // Greeting responses
        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            response = `Hello there! 🌟 Welcome to TravelBot! I'm excited to help you plan your next adventure. 

What kind of travel experience are you looking for? I can help with:
• Destination recommendations
• Trip planning and itineraries  
• Budget advice
• Cultural insights
• Practical travel tips

What would you like to explore first?`;
        }

        // Budget-related queries
        else if (message.includes('budget') || message.includes('cheap') || message.includes('affordable')) {
            response = `Great question about budget travel! 💰 I'd love to help you find amazing destinations that won't break the bank.

Here are some budget-friendly strategies:

**Affordable Destinations:**
• Southeast Asia (Thailand, Vietnam, Cambodia)
• Eastern Europe (Poland, Hungary, Czech Republic)  
• Central America (Guatemala, Nicaragua, Costa Rica)
• India and Nepal

**Money-Saving Tips:**
• Travel during shoulder seasons
• Use budget airlines and book in advance
• Stay in hostels or guesthouses
• Eat at local restaurants
• Use public transportation

What's your approximate budget range? This will help me give you more specific recommendations! 🎯`;
        }

        // Family travel queries
        else if (message.includes('family') || message.includes('kids') || message.includes('children')) {
            response = `Family travel is so rewarding! 👨‍👩‍👧‍👦 I'd love to help you find the perfect family-friendly destination.

**Great Family Destinations:**
• **Orlando, Florida** - Theme parks and family attractions
• **Costa Rica** - Wildlife, beaches, and adventure for all ages  
• **Japan** - Safe, clean, with amazing cultural experiences
• **Australia** - Diverse landscapes and family-friendly cities
• **Scandinavia** - Safe, beautiful, with great infrastructure

**Family Travel Tips:**
• Book accommodations with kitchenettes
• Plan for shorter travel days
• Include interactive activities and museums
• Research kid-friendly restaurants

To give you the best recommendations:
• What ages are your children?
• Do you prefer cultural experiences, nature, or theme parks?
• What time of year works best for your family?`;
        }

        // Adventure travel queries
        else if (message.includes('adventure') || message.includes('hiking') || message.includes('extreme')) {
            response = `Adventure awaits! 🏔️ I can definitely help you find some thrilling destinations for your adrenaline-filled trip.

**Top Adventure Destinations:**
• **Patagonia (Chile/Argentina)** - Epic hiking and glaciers
• **Nepal** - Everest Base Camp and Annapurna treks
• **New Zealand** - Bungee jumping, skydiving, and stunning landscapes
• **Iceland** - Glacier hiking and volcano exploration
• **Peru** - Inca Trail and Machu Picchu adventure

**Adventure Activities to Consider:**
• Multi-day trekking
• Rock climbing and mountaineering
• White-water rafting
• Skydiving and bungee jumping
• Wildlife safaris

What type of adventure activities excite you most? And what's your experience level with outdoor activities? This will help me tailor perfect recommendations! 🎯`;
        }

        // Beach/relaxation queries  
        else if (message.includes('beach') || message.includes('relax') || message.includes('unwind')) {
            response = `Beach relaxation sounds perfect! 🏖️ Nothing beats the sound of waves and warm sand between your toes.

**Beautiful Beach Destinations:**
• **Maldives** - Overwater bungalows and crystal-clear waters
• **Bali, Indonesia** - Stunning beaches with cultural experiences
• **Santorini, Greece** - Dramatic cliffs and romantic sunsets
• **Barbados** - Caribbean paradise with friendly locals
• **Seychelles** - Pristine beaches and luxury resorts

**Beach Vacation Tips:**
• Book ocean-view accommodations
• Research the best beaches for your preferences (quiet vs. lively)
• Consider all-inclusive resorts for ultimate relaxation
• Don't forget reef-safe sunscreen!

What's your ideal beach vibe? Are you looking for:
• Secluded and peaceful
• Lively with beach bars and activities  
• Luxury and pampering
• Cultural experiences nearby

Let me know your preferences and budget range! 🌊`;
        }

        // Cultural travel queries
        else if (message.includes('culture') || message.includes('tradition') || message.includes('history')) {
            response = `Cultural immersion is one of the most enriching ways to travel! 🏛️ I'm excited to help you discover amazing cultural destinations.

**Rich Cultural Destinations:**
• **Kyoto, Japan** - Ancient temples and traditional arts
• **Rome, Italy** - History, art, and incredible cuisine
• **Rajasthan, India** - Palaces, festivals, and vibrant culture
• **Morocco** - Markets, architecture, and desert experiences
• **Peru** - Inca heritage and indigenous cultures

**Cultural Experiences to Seek:**
• Cooking classes with local families
• Traditional festivals and ceremonies
• Museum and archaeological site visits
• Local craft workshops
• Homestays with local families

**Cultural Travel Tips:**
• Learn basic phrases in the local language
• Research local customs and etiquette
• Dress respectfully for religious sites
• Try authentic local cuisine
• Be open to new experiences!

What aspects of culture interest you most? Art, history, cuisine, or traditions? And are there specific regions you're drawn to? 🌍`;
        }

        // General destination queries
        else if (message.includes('where') || message.includes('destination') || message.includes('recommend')) {
            response = `I'd love to help you find the perfect destination! 🗺️ To give you the best recommendations, let me ask a few questions:

**Tell me about your preferences:**
• What's your approximate budget range?
• How long are you planning to travel?
• What time of year works best?
• Are you traveling solo, with family, or friends?

**What experiences appeal to you?**
• 🏖️ Beach relaxation
• 🏔️ Mountain adventures  
• 🏛️ Cultural immersion
• 🍜 Culinary experiences
• 🎨 Art and history
• 🌿 Nature and wildlife

**Some popular options to consider:**
• **Europe** - Rich history, art, and diverse cultures
• **Southeast Asia** - Affordable, exotic, and welcoming
• **South America** - Adventure, culture, and natural wonders
• **Africa** - Wildlife, landscapes, and authentic experiences

What type of experience calls to you most? I'll provide detailed recommendations based on your interests! ✨`;
        }

        // Default response for other queries
        else {
            response = `That's a great question! 🌟 I'm here to help with all your travel needs.

I can assist you with:
• **Destination recommendations** based on your preferences
• **Trip planning** and detailed itineraries
• **Budget advice** and cost-saving tips
• **Cultural insights** and local customs
• **Practical tips** for smooth travels
• **Activity suggestions** for any destination

Could you tell me more about what you're looking for? For example:
• Are you planning a specific type of trip?
• Do you have a destination in mind?
• What's your travel style (adventure, relaxation, culture)?
• Any specific questions about travel planning?

I'm excited to help you create an amazing travel experience! What would you like to explore first? ✈️`;
        }

        this.conversationHistory.push({ role: 'assistant', content: response });
        return response;
    }

    getDestinationRecommendations(preferences) {
        // Simple recommendation logic based on preferences
        return popularDestinations.filter(dest => {
            if (preferences.budget) {
                const budgetMatch = preferences.budget.includes('$') ?
                    dest.budget.length <= preferences.budget.length : true;
                if (!budgetMatch) return false;
            }
            return true;
        });
    }
}