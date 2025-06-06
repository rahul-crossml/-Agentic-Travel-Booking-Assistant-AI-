import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FlightIcon from '@mui/icons-material/Flight';
import HotelIcon from '@mui/icons-material/Hotel';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SettingsIcon from '@mui/icons-material/Settings';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CreditCardIcon from '@mui/icons-material/CreditCard';

const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    { icon: DashboardIcon, label: 'Dashboard', active: true },
    { icon: FlightIcon, label: 'Flights', active: false },
    { icon: HotelIcon, label: 'Hotels', active: false },
    { icon: CalendarTodayIcon, label: 'My Trips', active: false },
    { icon: FavoriteIcon, label: 'Wishlist', active: false },
    { icon: LocationOnIcon, label: 'Explore', active: false },
    { icon: AccountBalanceWalletIcon, label: 'Wallet', active: false },
    { icon: CreditCardIcon, label: 'Bookings', active: false },
    { icon: SettingsIcon, label: 'Settings', active: false },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:z-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-8 h-8 bg-gradient-to-r from-sky-500 to-teal-500 rounded-lg flex items-center justify-center">
              <FlightIcon className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-gray-900">TravelHub</span>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200
                  ${item.active
                    ? 'bg-sky-50 text-sky-700 border-r-2 border-sky-500'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                `}
              >
                <item.icon className={`w-5 h-5 ${item.active ? 'text-sky-600' : ''}`} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
