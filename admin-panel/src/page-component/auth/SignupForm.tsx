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
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmailIcon from "@mui/icons-material/Email";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { Box } from "@mui/system";

const formVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { staggerChildren: 0.1 } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log("Signup successful!");
    }, 2000);
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
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <TextField
              required
              fullWidth
              id="email-signup"
              label="Email Address"
              name="email"
              autoComplete="email"
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
              name="password-signup"
              label="Password"
              type="password"
              id="password-signup"
              autoComplete="new-password"
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
                disabled={isLoading}
                startIcon={!isLoading && <HowToRegIcon />}
                sx={{ py: 1.5, fontSize: "1rem" }}
              >
                Create Account
              </Button>
              {isLoading && (
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
