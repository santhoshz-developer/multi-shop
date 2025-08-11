// ShopListingPage.styled.tsx
import { styled } from "@mui/material/styles";
import { Box, Container, Button, Typography } from "@mui/material";

export const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(5),
  paddingBottom: theme.spacing(5),
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  width: "100%",
  minHeight: "100vh",
  backgroundColor: "#0f172a",
  color: "white",
}));

export const StyledHeaderBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing(6),
  paddingBottom: theme.spacing(2),
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  flexWrap: "wrap",
  gap: theme.spacing(2),
}));

export const StyledAddButton = styled(Button)(({ theme }) => ({
  fontWeight: "bold",
  backgroundColor: "#2563eb",
  "&:hover": {
    backgroundColor: "#1d4ed8",
  },
}));

export const StyledGridBox = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: theme.spacing(3),
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  color: "rgba(255, 255, 255, 0.7)",
}));
