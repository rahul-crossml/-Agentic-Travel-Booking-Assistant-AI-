"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Divider,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
  Luggage as LuggageIcon,
  Google as GoogleIcon,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useNavigate } from "@/utils/navigate";


export default function LoginPage({ onToggleMode }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt with:", { email, password });
    // Add actual login logic here
  };

  const navigateTo = useNavigate();

  const handleNavigate = () => {
    navigateTo("/signup");
  }

  return (
    <Box className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <Card className="w-full max-w-md overflow-hidden rounded-xl shadow-lg">
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
            <LuggageIcon className="text-white mr-2" fontSize="medium" />
            <Typography variant="h5" className="text-white font-medium">
              TravelEase
            </Typography>
          </Box>
        </div>

        <CardContent className="p-6">
          <Typography
            variant="h5"
            className="text-center !mb-10 text-gray-800 font-semibold "
          >
            Welcome Back, Traveler!
          </Typography>

          <form onSubmit={handleSubmit} className="!space-y-6">
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon className="text-gray-500" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              required
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon className="text-gray-500" />
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

            {/* <Box className="flex justify-end">
              <Button
                variant="text"
                className="text-blue-600 text-sm normal-case"
              >
                Forgot Password?
              </Button>
            </Box> */}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              className="bg-blue-600 hover:bg-blue-700 py-3"
            >
              Login
            </Button>
          </form>

          <Box className="mt-6 text-center">
            <Typography variant="body2" className="text-gray-600">
              Don&apos;t have an account?{" "}
              <Button
                variant="text"
                onClick={handleNavigate}
                className="p-0 min-w-0 text-blue-600 font-medium normal-case"
              >
                Sign Up
              </Button>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
