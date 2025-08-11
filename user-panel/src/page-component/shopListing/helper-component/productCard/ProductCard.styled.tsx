// src/components/ProductCard.styled.tsx
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledCard = styled(Card)({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "340px",
  justifyContent: "center",
  borderRadius: "16px",
  border: "1px solid var(--border-color)",
  transition: "box-shadow 0.3s ease, transform 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
  },
});

export const StyledCardActionArea = styled(CardActionArea)({
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
});

export const StyledCardMedia = styled(CardMedia)({
  height: 160,
});

export const StyledCardContent = styled(CardContent)({
  flexGrow: 1,
  width: "100%",
  "& .MuiTypography-body2": {
    mt: 0.5,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
});

export const StyledCardActions = styled(CardActions)({
  justifyContent: "space-between",
  alignItems: "center",
  px: 2,
  pb: 2,
  pt: 0,
});

export const StyledTypographyPrice = styled(Typography)({
  fontWeight: "700",
  color: "var(--accent-color)",
});

export const StyledButton = styled(Button)({
  borderRadius: "20px",
  px: 1.5,
});
