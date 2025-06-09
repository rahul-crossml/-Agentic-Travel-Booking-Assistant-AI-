"use client";

import { useState } from "react";

import { ArrowRightLeft, ChevronDown } from "lucide-react";
import axios from "axios";
import { Button, Card } from "@mui/material";

// interface FlightSearchProps {
//   handleFlightData: (data: any) => void
// }

const FlightSearch = ({ handleFlightData }) => {
  const [tripType, setTripType] = useState("one-way");
  const [departure, setDeparture] = useState("DEL");
  const [departureCity, setDepartureCity] = useState("Delhi");
  const [departureAirport, setDepartureAirport] = useState(
    "Delhi Airport India"
  );
  const [arrival, setArrival] = useState("BOM");
  const [arrivalCity, setArrivalCity] = useState("Mumbai");
  const [arrivalAirport, setArrivalAirport] = useState(
    "Mumbai International Airport"
  );
  const [outboundDate, setOutboundDate] = useState("2025-06-08");
  const [returnDate, setReturnDate] = useState("2025-06-30");
  const [travellers, setTravellers] = useState("1 Traveller");
  const [travelClass, setTravelClass] = useState("Economy/Premium Economy");
  const [fareType, setFareType] = useState("regular");
  const [flights, setFlights] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const swapAirports = () => {
    const tempCode = departure;
    const tempCity = departureCity;
    const tempAirport = departureAirport;

    setDeparture(arrival);
    setDepartureCity(arrivalCity);
    setDepartureAirport(arrivalAirport);

    setArrival(tempCode);
    setArrivalCity(tempCity);
    setArrivalAirport(tempAirport);
  };

  const handleSearch = async () => {
    if (
      !departure ||
      !arrival ||
      !outboundDate ||
      (tripType === "round-trip" && !returnDate)
    ) {
      setError("Please fill all required fields");
      return;
    }

    setLoading(true);
    setError("");
    setFlights(null);

    try {
      const response = await axios.get(
        `http://localhost:5000/api/smart-search`,
        {
          // params: {
          //   departure,
          //   arrival,
          //   outbound_date: outboundDate,
          //   return_date: tripType === "round-trip" ? returnDate : undefined,
          // },
        }
      );
      setFlights(response.data);
      handleFlightData(response.data);
    } catch (err) {
      console.error("Frontend Axios Error:", err);
      setError("Failed to fetch flight data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear().toString().substr(-2);
    const dayOfWeek = date.toLocaleString("default", { weekday: "long" });

    return { day, month, year, dayOfWeek };
  };

  const departureFormatted = formatDate(outboundDate);

  return (
    <div>
      {/* Header with logo */}

      {/* Flight Results */}
      {flights?.flight_results?.length > 0 && (
        <div className="max-w-7xl mx-auto mt-8 bg-white rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-bold">
            Available Flights ({flights.flight_results.length})
          </h2>
          <div className="space-y-4">
            {flights.flight_results.slice(0, 5).map((flight, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">
                          {flight.airline?.name || "Unknown Airline"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {flight.flight_number || "Flight"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-6">
                    <div className="flex items-center justify-between">
                      <div className="text-center">
                        <p className="text-lg font-bold">
                          {flight.flight_schedule?.departure_time || "10:00"}
                        </p>
                        <p className="text-sm">
                          {flight.flight_schedule?.departure_airport?.code ||
                            departure}
                        </p>
                      </div>
                      <div className="flex-1 mx-4">
                        <div className="flex items-center justify-center">
                          <div className="flex-1 h-px bg-gray-300"></div>
                          <div className="mx-2 text-xs text-gray-500">
                            {flight.flight_schedule?.duration || "2h 30m"}
                          </div>
                          <div className="flex-1 h-px bg-gray-300"></div>
                        </div>
                        <p className="text-center text-xs text-gray-500 mt-1">
                          Non-stop
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold">
                          {flight.flight_schedule?.arrival_time || "12:30"}
                        </p>
                        <p className="text-sm">
                          {flight.flight_schedule?.arrival_airport?.code ||
                            arrival}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-3 text-right">
                    <p className="text-2xl font-bold text-blue-600">
                      {flight.ticket_price?.formatted || "₹5,499"}
                    </p>
                    <Button className="mt-2 bg-orange-500 hover:bg-orange-600 text-white">
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="max-w-7xl mx-auto mt-8 bg-white rounded-lg p-12 text-center">
          <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Searching for flights...
          </h3>
          <p className="text-gray-600">
            Please wait while we find the best options for you
          </p>
        </div>
      )}
    </div>
  );
};

export default FlightSearch;
