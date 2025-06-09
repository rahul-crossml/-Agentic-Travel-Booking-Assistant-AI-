"use client";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import StatsCard from "./StatsCard";
import FlightCard from "./FlightCard";
import DestinationCard from "./DestinationCard";
import RecentBookings from "./RecentBookings";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FlightSearch from "./FlightSearch";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const [storeFlightData, setStoreFlightData] = useState(null);

  const handleFlightData = (data) => {
    setStoreFlightData(data);
  };

  console.log(storeFlightData?.airports[0]?.departure[0]?.airport?.name);

  const destinations = [
    {
      image:
        "https://www.costacruises.com/content/dam/costa/inventory-assets/ports/JTR/jtr-santorini-port-1.jpg",
      destination: "Santorini",
      country: "Greece",
      price: "$899",
      rating: 4.8,
      description:
        "Beautiful island with stunning sunsets and white architecture",
    },
    {
      image:
        "https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg?auto=compress&cs=tinysrgb&w=800",
      destination: "Tokyo",
      country: "Japan",
      price: "$1,245",
      rating: 4.9,
      description: "Modern metropolis with rich culture and amazing cuisine",
    },
    {
      image:
        "https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=800",
      destination: "Bali",
      country: "Indonesia",
      price: "$756",
      rating: 4.7,
      description:
        "Tropical paradise with beaches, temples, and lush landscapes",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} /> */}

      <div className="">
        <TopBar onMenuClick={toggleSidebar} />

        <FlightSearch handleFlightData={handleFlightData} />

        <main className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Total Bookings"
              value="47"
              change="12%"
              changeType="increase"
              icon={CreditCardIcon}
              color="bg-gradient-to-r from-sky-500 to-sky-600"
            />
            <StatsCard
              title="Upcoming Trips"
              value="3"
              change="8%"
              changeType="increase"
              icon={CalendarMonthIcon}
              color="bg-gradient-to-r from-teal-500 to-teal-600"
            />
            <StatsCard
              title="Wishlist Items"
              value="12"
              change="4%"
              changeType="increase"
              icon={FavoriteIcon}
              color="bg-gradient-to-r from-pink-500 to-pink-600"
            />
            <StatsCard
              title="Miles Earned"
              value="24.5K"
              change="18%"
              changeType="increase"
              icon={TrendingUpIcon}
              color="bg-gradient-to-r from-purple-500 to-purple-600"
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Upcoming Flights */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Upcoming Flights
                </h2>
                <button className="text-sky-600 hover:text-sky-700 text-sm font-medium flex items-center space-x-1">
                  <AccessTimeIcon style={{ fontSize: 18 }} />
                  <span>View All</span>
                </button>
              </div>

              <div className="space-y-4">
                <FlightCard
                  from="New York"
                  to="Tokyo"
                  fromCode="JFK"
                  toCode="NRT"
                  departureTime="10:30"
                  arrivalTime="14:45+1"
                  date="Dec 15, 2024"
                  airline={
                    storeFlightData?.airports[0]?.departure[0]?.airport?.name
                  }
                  flightNumber="JL004"
                  gate="B12"
                  status="On Time"
                />
                <FlightCard
                  from="Tokyo"
                  to="New York"
                  fromCode="NRT"
                  toCode="JFK"
                  departureTime="16:20"
                  arrivalTime="10:55"
                  date="Dec 22, 2024"
                  airline="Japan Airlines"
                  flightNumber="JL003"
                  gate="A8"
                  status="Boarding"
                />
              </div>
            </div>

            {/* Recent Bookings */}
            <div>
              <RecentBookings />
            </div>
          </div>

          {/* Destination Recommendations */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Recommended Destinations
              </h2>
              <button className="text-sky-600 hover:text-sky-700 text-sm font-medium">
                Explore More
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinations.map((destination, index) => (
                <DestinationCard key={index} {...destination} />
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-r from-sky-500 to-teal-500 p-8 rounded-xl text-white">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-2xl font-bold mb-2">
                  Ready for your next adventure?
                </h3>
                <p className="text-sky-100">
                  Discover amazing destinations and book your perfect trip
                  today.
                </p>
              </div>
              <div className="flex space-x-4">
                <button className="bg-white text-sky-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200">
                  Search Flights
                </button>
                <button className="bg-sky-600 border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-sky-700 transition-colors duration-200">
                  Browse Hotels
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
