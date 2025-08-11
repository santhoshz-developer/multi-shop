// src/components/FloatingCartButton.styled.tsx
import { Fab } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledFab = styled(Fab)(({ theme }) => ({
  position: "fixed",
  bottom: 16,
  right: 16,
  [theme.breakpoints.up("sm")]: {
    bottom: 24,
    right: 24,
  },
  [theme.breakpoints.up("md")]: {
    bottom: 32,
    right: 32,
  },
  color: "white",
  transition: "transform 0.2s ease",
  "&:hover": {
    transform: "scale(1.1)",
  },
}));
