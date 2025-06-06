import React from 'react';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const FlightCard = ({
  from,
  to,
  fromCode,
  toCode,
  departureTime,
  arrivalTime,
  date,
  airline,
  flightNumber,
  gate,
  status
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'On Time': return 'text-green-600 bg-green-50';
      case 'Delayed': return 'text-red-600 bg-red-50';
      case 'Boarding': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center">
            <FlightTakeoffIcon className="text-sky-600" fontSize="small" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">{airline}</p>
            <p className="text-sm text-gray-500">{flightNumber}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
          {status}
        </span>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{departureTime}</p>
          <p className="text-sm text-gray-500">{fromCode}</p>
          <p className="text-xs text-gray-400">{from}</p>
        </div>

        <div className="flex-1 mx-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <div className="w-8 h-8 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center">
                <FlightLandIcon className="text-gray-400" fontSize="small" />
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{arrivalTime}</p>
          <p className="text-sm text-gray-500">{toCode}</p>
          <p className="text-xs text-gray-400">{to}</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <AccessTimeIcon className="w-4 h-4" fontSize="small" />
            <span>{date}</span>
          </div>
          <div className="flex items-center space-x-1">
            <LocationOnIcon className="w-4 h-4" fontSize="small" />
            <span>Gate {gate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
