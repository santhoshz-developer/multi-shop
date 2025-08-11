// AddShopModal.styled.tsx
import { styled } from "@mui/material/styles";
import { Dialog, TextField, Button, IconButton, Typography } from "@mui/material";

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    background: "linear-gradient(135deg, rgba(30, 41, 59, 0.75), rgba(15, 23, 42, 0.75))",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    borderRadius: "20px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
    color: "#E2E8F0",
  },
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  "& input, & .MuiInputBase-input": {
    color: "white",
  },
  "& .MuiInputLabel-root": {
    color: "white",
  },
}));

export const StyledUploadButton = styled(Button)(({ theme }) => ({
  justifyContent: "flex-start",
  padding: theme.spacing(1.5),
  color: "white",
  borderColor: "rgba(255, 255, 255, 0.3)",
  "&:hover": {
    borderColor: "white",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  right: 8,
  top: 8,
  color: "rgba(255, 255, 255, 0.7)",
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  color: "rgba(255, 255, 255, 0.7)",
}));

export const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});