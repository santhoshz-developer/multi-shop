// src/components/ProductCard.tsx
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useCart } from "@/context/CartContext";
import {
  StyledCard,
  StyledCardActionArea,
  StyledCardMedia,
  StyledCardContent,
  StyledCardActions,
  StyledTypographyPrice,
  StyledButton,
} from "./ProductCard.styled";

export const ProductCard = ({ product }: { product: any }) => {
  const { addToCart } = useCart();

  return (
    <StyledCard elevation={0}>
      <StyledCardActionArea>
        <StyledCardMedia
          image={
            product.imageUrl || "https://via.placeholder.com/400?text=No+Image"
          }
          aria-label={product.name}
        />

        <StyledCardContent>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            noWrap
            title={product.name}
          >
            {product.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            title={product.description}
          >
            {product.description || " "}
          </Typography>
        </StyledCardContent>
      </StyledCardActionArea>

      <StyledCardActions>
        <StyledTypographyPrice variant="subtitle1">
          ${product.price}
        </StyledTypographyPrice>
        <StyledButton
          variant="contained"
          size="small"
          onClick={() => addToCart(product)}
        >
          <AddShoppingCartIcon sx={{ fontSize: "1rem", mr: 0.5 }} />
          Add
        </StyledButton>
      </StyledCardActions>
    </StyledCard>
  );
};
