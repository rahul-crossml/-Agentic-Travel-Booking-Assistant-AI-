"use client";
import { useState, useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";
import MailIcon from "@mui/icons-material/Mail";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import FlightIcon from "@mui/icons-material/Flight";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import TerrainIcon from "@mui/icons-material/Terrain";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import ApartmentIcon from "@mui/icons-material/Apartment";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import StarIcon from "@mui/icons-material/Star";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import PublicIcon from "@mui/icons-material/Public";
import { useNavigate } from "@/utils/navigate";

export default function TravelSignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const destinations = [
    {
      name: "Bali, Indonesia",
      image:
        "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=600&fit=crop",
      icon: <BeachAccessIcon className="w-5 h-5 !text-white" />,
      color: "from-orange-500 to-pink-500",
    },
    {
      name: "Swiss Alps",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      icon: <TerrainIcon className="w-5 h-5 !text-white" />,
      color: "from-blue-500 to-teal-500",
    },
    {
      name: "Tokyo, Japan",
      image:
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
      icon: <ApartmentIcon className="w-5 h-5 !text-white" />,
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Santorini, Greece",
      image:
        "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&h=600&fit=crop",
      icon: <CameraAltIcon className="w-5 h-5 !text-white" />,
      color: "from-blue-400 to-cyan-400",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % destinations.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup attempt with:", formData);
  };

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50! via-white! to-cyan-50! relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20! to-purple-400/20! rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-pink-400/20! to-orange-400/20! rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-blue-400! rounded-full animate-ping delay-500"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-purple-400! rounded-full animate-ping delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-pink-400! rounded-full animate-ping delay-1500"></div>
      </div>

      {/* Floating Travel Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FlightIcon className="absolute top-20 left-20 w-6 h-6 text-blue-400/30! animate-bounce delay-300" />
        <PublicIcon className="absolute top-40 right-32 w-5 h-5 text-purple-400/30! animate-spin delay-300" />
        <LocationOnIcon className="absolute bottom-32 left-16 w-4 h-4 text-pink-400/30! animate-bounce delay-300" />
        <DirectionsCarIcon className="absolute bottom-40 right-20 w-5 h-5 text-teal-400/30! animate-ping delay-1300" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <div className="flex max-w-6xl w-full bg-white/80! backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20!">
          {/* Left Side - Hero Section */}
          <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600! via-purple-600! to-pink-600!"></div>

            {/* Destination Showcase */}
            <div className="relative z-10 flex flex-col justify-between p-8 text-white">
              <div>
                <div className="flex items-center mb-6">
                  <div className="bg-white/20! backdrop-blur-sm p-3 rounded-2xl mr-4">
                    <FlightIcon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">TravelEase</h1>
                    <p className="text-white/80">Your Journey Begins Here</p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <StarIcon className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-lg">4.9★ Rated Travel Platform</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <PublicIcon className="w-5 h-5" />
                    <span className="text-lg">500+ Destinations Worldwide</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <LocationOnIcon className="w-5 h-5" />
                    <span className="text-lg">1M+ Happy Travelers</span>
                  </div>
                </div>
              </div>

              {/* Destination Slider */}
              <div className="relative">
                <div className="bg-white/10! backdrop-blur-sm rounded-2xl p-6 border border-white/20!">
                  <div className="flex items-center mb-4">
                    {destinations[currentSlide].icon}
                    <span className="ml-2 font-semibold">
                      Featured Destination
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    {destinations[currentSlide].name}
                  </h3>
                  <p className="text-white/80 mb-4">
                    Discover breathtaking views and unforgettable experiences
                  </p>

                  <div className="flex space-x-2">
                    {destinations.map((_, index) => (
                      <div
                        key={index}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          index === currentSlide
                            ? "w-8 bg-white!"
                            : "w-2 bg-white/40!"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
            </div>
          </div>

          {/* Right Side - Signup Form */}
          <div className="w-full lg:w-1/2 p-8 lg:p-12">
            <div className="max-w-md mx-auto">
              {/* Mobile Header */}
              <div className="lg:hidden text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-gradient-to-r from-blue-600! to-purple-600! p-3 rounded-2xl mr-3">
                    <FlightIcon className="w-6 h-6 text-white" />
                  </div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600! to-purple-600! bg-clip-text text-transparent">
                    TravelEase
                  </h1>
                </div>
                <p className="text-gray-600!">Start your journey with us</p>
              </div>

              <div className="text-center mb-8">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-800! mb-2">
                  Create Account
                </h2>
                <p className="text-gray-600!">
                  Join millions of happy travelers
                </p>
              </div>

              <div className="space-y-6">
                {/* Full Name Field */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700! mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <PersonIcon className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500! transition-colors" />
                    </div>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200! rounded-xl focus:border-blue-500! focus:ring-4 focus:ring-blue-500/20! transition-all duration-200 bg-white/50! backdrop-blur-sm"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700! mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <MailIcon className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500! transition-colors" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200! rounded-xl focus:border-blue-500! focus:ring-4 focus:ring-blue-500/20! transition-all duration-200 bg-white/50! backdrop-blur-sm"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700! mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <LockIcon className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500! transition-colors" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-12 pr-12 py-4 border-2 border-gray-200! rounded-xl focus:border-blue-500! focus:ring-4 focus:ring-blue-500/20! transition-all duration-200 bg-white/50! backdrop-blur-sm"
                      placeholder="Create a strong password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon className="h-5 w-5" />
                      ) : (
                        <VisibilityIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700! mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <LockIcon className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500! transition-colors" />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full pl-12 pr-12 py-4 border-2 border-gray-200! rounded-xl focus:border-blue-500! focus:ring-4 focus:ring-blue-500/20! transition-all duration-200 bg-white/50! backdrop-blur-sm"
                      placeholder="Confirm your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? (
                        <VisibilityOffIcon className="h-5 w-5" />
                      ) : (
                        <VisibilityIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-blue-600! to-purple-600! text-white font-bold py-4 px-6 rounded-xl hover:from-blue-700! hover:to-purple-700! transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center group"
                >
                  <span>Start Your Journey</span>
                  <ArrowRightAltIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Login Link */}
              <div className="mt-8 text-center">
                <p className="text-gray-600!">
                  Already have an account?{" "}
                  <button
                    className="text-blue-600! hover:text-blue-700! font-semibold hover:underline transition-colors"
                    onClick={handleNavigate}
                  >
                    Sign In
                  </button>
                </p>
              </div>

              {/* Trust Indicators */}
              <div className="mt-8 pt-6 border-t border-gray-200!">
                <div className="flex items-center justify-center space-x-8 text-sm text-gray-500!">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500! rounded-full mr-2"></div>
                    Secure & Safe
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500! rounded-full mr-2"></div>
                    Trusted by 1M+
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
