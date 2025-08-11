// src/components/ShopListingPage.styled.tsx
import { styled } from "@mui/material/styles";
import { Container, Box, Typography, Paper } from "@mui/material";

export const LoadingContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
});

export const LoadingText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  color: "var(--text-secondary)",
}));

export const ErrorContainer = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  placeContent: "center",
  minHeight: "100vh",
}));

export const ErrorTitle = styled(Typography)({
  color: "error",
  fontWeight: 600,
});

export const ErrorMessage = styled(Typography)(({ theme }) => ({
  color: "var(--text-secondary)",
  marginTop: theme.spacing(1),
}));

export const PageContainer = styled(Box)({
  backgroundColor: "var(--background-start)",
  minHeight: "100vh",
  width: "100%",
});

export const ContentContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(2, 2, 3, 2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(3, 3, 4, 3),
  },
}));

export const ContentPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1.5),
  borderRadius: "20px",
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(2),
  },
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(3),
  },
}));