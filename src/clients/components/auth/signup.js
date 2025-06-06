"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Email,
  Lock,
  Luggage,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useNavigate } from "@/utils/navigate";

export default function SignupPage({ onToggleMode }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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
    // Add actual signup logic here
  };
  const navigateTo = useNavigate();

  const handleNavigate = () => {
    navigateTo("/login");
  };

  return (
    <Box className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <Card className="w-full max-w-md rounded-xl shadow-lg">
        <div className="h-32 bg-blue-600 relative overflow-hidden rounded-t-xl">
          <div className="absolute inset-0 opacity-20">
            <svg
              className="w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path d="M0,0 L100,0 L100,100 Z" fill="white" />
              <path d="M0,100 L100,0 L100,100 Z" fill="white" opacity="0.5" />
            </svg>
          </div>
          <Box className="absolute bottom-4 left-6 flex items-center">
            <Luggage className="text-white mr-2" fontSize="medium" />
            <Typography variant="h5" className="text-white font-medium">
              TravelEase
            </Typography>
          </Box>
        </div>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="!space-y-6">
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              required
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />

            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email className="text-gray-500" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              required
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock className="text-gray-500" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Confirm Password"
              variant="outlined"
              fullWidth
              required
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock className="text-gray-500" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3"
            >
              Sign Up
            </Button>
          </form>

          <Box className="mt-6 text-center">
            <Typography variant="body2" className="text-gray-600">
              Already have an account?{" "}
              <Button
                variant="text"
                onClick={handleNavigate}
                className="p-0 min-w-0 text-blue-600 font-medium normal-case"
              >
                Login
              </Button>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
