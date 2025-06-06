
"use client";
import React from 'react';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleIcon from '@mui/icons-material/People';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const RecentBookings = () => {
  const bookings = [
    {
      id: 'FL001',
      type: 'flight',
      destination: 'Tokyo, Japan',
      date: 'Dec 15, 2024',
      passengers: 2,
      status: 'confirmed',
      amount: '$1,245',
    },
    {
      id: 'HT002',
      type: 'hotel',
      destination: 'Bali, Indonesia',
      date: 'Jan 10, 2025',
      passengers: 2,
      status: 'pending',
      amount: '$890',
    },
    {
      id: 'FL003',
      type: 'flight',
      destination: 'Paris, France',
      date: 'Feb 20, 2025',
      passengers: 1,
      status: 'confirmed',
      amount: '$675',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-600 bg-green-50';
      case 'pending':
        return 'text-orange-600 bg-orange-50';
      case 'cancelled':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <>
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
        <button className="text-sky-600 hover:text-sky-700 text-sm font-medium">View All</button>
      </div>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                <LocationOnIcon className="text-sky-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{booking.destination}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <CalendarTodayIcon style={{ fontSize: 16 }} />
                    <span>{booking.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <PeopleIcon style={{ fontSize: 16 }} />
                    <span>
                      {booking.passengers} {booking.passengers === 1 ? 'guest' : 'guests'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className="font-semibold text-gray-900">{booking.amount}</p>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  booking.status
                )}`}
              >
                {booking.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default RecentBookings;
