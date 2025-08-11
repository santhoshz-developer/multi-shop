// ShopCard.styled.tsx
import { styled } from "@mui/material/styles";
import { Card, CardMedia, CardContent, Chip, Box, Typography } from "@mui/material";

export const StyledCard = styled(Card)(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  background: "rgba(28, 37, 61, 0.6)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  borderRadius: "20px",
  border: "1px solid rgba(255, 255, 255, 0.15)",
  boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
  color: "white",
  transition: "box-shadow 0.3s ease-in-out",
}));

export const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: "180px",
  objectFit: "cover",
  flexShrink: 0,
}));

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

export const StyledChip = styled(Chip)(({ theme }) => ({
  backgroundColor: "rgba(37, 99, 235, 0.5)",
  color: "white",
  fontWeight: "medium",
  border: "1px solid rgba(37, 99, 235, 0.8)",
  flexShrink: 0,
  marginLeft: theme.spacing(1),
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  color: "rgba(255, 255, 255, 0.8)",
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
}));

export const StyledTitleTypography = styled(Typography)(({ theme }) => ({
  textShadow: "0 1px 3px rgba(0, 0, 0, 0.4)",
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
}));

export const StyledLocationBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  color: "rgba(255, 255, 255, 0.7)",
  paddingTop: theme.spacing(2),
}));