// src/page-component/landing/ScannerDialog.styled.tsx
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledDialog = styled(Dialog)({
  "& .MuiPaper-root": {
    borderRadius: "20px",
    background: "var(--glass-bg)",
    backdropFilter: "blur(10px)",
    border: "1px solid var(--glass-border)",
  },
});

export const StyledDialogContent = styled(DialogContent)({
  position: "relative",
  p: 2,
});

export const StyledIconButton = styled(IconButton)({
  position: "absolute",
  top: 12,
  right: 12,
  zIndex: 10,
  color: "var(--text-primary)",
});

export const StyledTypography = styled(Typography)({
  mb: 2,
  textAlign: "center",
  color: "var(--text-primary)",
});

export const StyledScannerBox = styled(Box)({
  width: "100%",
  borderRadius: "16px",
  overflow: "hidden",
  position: "relative",
});
