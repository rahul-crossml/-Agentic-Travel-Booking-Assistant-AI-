import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';

const DestinationCard = ({
  image,
  destination,
  country,
  price,
  rating,
  description
}) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={destination}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-lg shadow-md">
          <div className="flex items-center space-x-1">
            <StarIcon className="text-yellow-400" style={{ fontSize: '1rem' }} />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center space-x-1 text-gray-500 mb-2">
          <LocationOnIcon style={{ fontSize: '1rem' }} />
          <span className="text-sm">{country}</span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2">{destination}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-sky-600">{price}</span>
            <span className="text-gray-500 text-sm ml-1">per person</span>
          </div>
          <button className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
