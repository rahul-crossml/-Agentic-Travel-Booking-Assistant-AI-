import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import styles from './dashboard.module.css'

const TopBar = ({ onMenuClick }) => {
  return (
    <header className={`bg-white border-b border-gray-200 px-6 py-4 ${styles.dashboardHeader}`}>
      <div className="flex items-center justify-between">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <MenuIcon className="text-gray-600" />
          </button>

          <div className="hidden md:flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <span style={{ color: '#fff' }} className="text-gray-500">Welcome back, Sarah!</span>
          </div>
        </div>

        {/* Center search */}
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <SearchIcon sx={{ color: '#000' }} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fontSize="small" />
            <input
              type="text"
              placeholder="Search destinations, bookings..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              style={{ '::placeholder': { color: '#000' } }}
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-4">
          <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <NotificationsIcon className="text-gray-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <PersonIcon className="text-white" fontSize="small" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-900">Sarah Johnson</p>
              <p className="text-xs text-gray-500">Premium Member</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
