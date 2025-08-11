"use client";

import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { ThemeProvider } from "@mui/material/styles";
import { Typography, Button, Stack } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";
import { authTheme } from "@/styles/theme"; // Adjust path if needed
import { AuthContainer, FormHeader, LogoWrapper, StyledDivider, ToggleText, ToggleLink } from "./Auth.styled";

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const, // Add 'as const' or use a specific easing type
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.4, 
      ease: "easeOut" as const // Add 'as const' here too
    } 
  },
};


// New, sleek admin panel icon
const AdminPanelIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
      fill="white"
    />
    <path
      d="M16 8.0001L18 6.0001M18 18.0001L16 16.0001M8 8.0001L6 6.0001M6 18.0001L8 16.0001"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export function AuthCard() {
  const [isLoginView, setLoginView] = useState(true);

  const title = isLoginView ? "Welcome Back" : "Create Account";
  const subtitle = isLoginView
    ? "Sign in to access your dashboard"
    : "Get started in just a few clicks";

  return (
    <ThemeProvider theme={authTheme}>
      <AuthContainer variants={cardVariants} initial="hidden" animate="visible">
        <FormHeader variants={childVariants}>
          <LogoWrapper
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <AdminPanelIcon />
          </LogoWrapper>
          <Typography variant="h4" component="h1" fontWeight="bold">
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
            {subtitle}
          </Typography>
        </FormHeader>

        <AnimatePresence mode="wait">
          {isLoginView ? (
            <LoginForm key="login" />
          ) : (
            <SignupForm key="signup" />
          )}
        </AnimatePresence>

        <StyledDivider variants={childVariants} sx={{ mt: 3 }}>
          OR
        </StyledDivider>

        <Stack
          component={motion.div}
          variants={childVariants}
          direction={{ xs: "column", sm: "row" }}
          spacing={3}
          sx={{ mt: 3 }}
        >
          <Button fullWidth variant="outlined" startIcon={<GoogleIcon />}>
            Sign in with Google
          </Button>
          <Button fullWidth variant="outlined" startIcon={<GitHubIcon />}>
            Sign in with GitHub
          </Button>
        </Stack>

        <ToggleText variants={childVariants} sx={{ mt: 3 }}>
          {isLoginView
            ? "Don't have an account? "
            : "Already have an account? "}
          <ToggleLink onClick={() => setLoginView(!isLoginView)}>
            {isLoginView ? "Sign Up" : "Log In"}
          </ToggleLink>
        </ToggleText>
      </AuthContainer>
    </ThemeProvider>
  );
}
