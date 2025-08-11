// src/page-component/landing/QuickAccessItem.styled.tsx
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const NameBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 1.5,
  minWidth: 0,
});

export const NameTypography = styled(Typography)({
  fontWeight: 500,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const ActionsBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 1,
  flexShrink: 0,
});
