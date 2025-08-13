"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Button,
  TextField,
  CircularProgress,
  Stack,
  InputAdornment,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoginIcon from "@mui/icons-material/Login";
import { Box } from "@mui/system";
import { useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { postData } from "@/service/apiService";

const formVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { staggerChildren: 0.1 } },
  exit: { opacity: 0, x: 50, transition: { duration: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const authLogin = async (data: { email: string; password: string }) => {
  return postData(`/auth/login`, data);
};

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("owner@nilgiris.com");
  const [password, setPassword] = useState("Santhosh123@");

  const fetchShopByOwner = async (ownerId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/shops/owner/${ownerId}`
      );
      const result = await response.json();
      console.log("shop data:", result);

      // Ensure we have a valid shop array
      if (response.ok && Array.isArray(result.data) && result.data.length > 0) {
        const firstShop = result.data[0];
        console.log("firstShop", firstShop);

        router.push(`/shop-dashboard/${firstShop.shop_id}`);
      } else {
        router.push("/shops/create");
      }
    } catch (err) {
      console.error("Error fetching shop:", err);
      router.push("/shops/create");
    }
  };

  const loginMutation = useMutation({
    mutationFn: authLogin,
    onSuccess: (data: any) => {
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));

      toast.success(data.message || "Login successful");

      if (data.data.user.is_shop_owner) {
        fetchShopByOwner(data.data.user.user_id);
      } else {
        router.push("/dashboard");
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "Login failed. Please try again.");
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginMutation.mutate({ email, password });
  };

  return (
    <motion.div
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Stack spacing={2.5}>
          <motion.div variants={itemVariants}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Box sx={{ position: "relative", mt: 1 }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={loginMutation.isPending}
                startIcon={!loginMutation.isPending && <LoginIcon />}
                sx={{ py: 1.5, fontSize: "1rem" }}
              >
                Log In
              </Button>
              {loginMutation.isPending && (
                <CircularProgress
                  size={24}
                  sx={{
                    color: "primary.light",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                  }}
                />
              )}
            </Box>
          </motion.div>
        </Stack>
      </Box>
    </motion.div>
  );
}
