// src/components/FloatingCartButton.tsx
import { Fab, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { StyledFab } from "./FloatingCartButton.styled";

export const FloatingCartButton = () => {
  const { cartItems } = useCart();
  const router = useRouter();
  const totalItems =
    cartItems?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;

  if (!totalItems) return null;

  return (
    <StyledFab
      aria-label="cart"
      color="primary"
      onClick={() => router.push("/cart")}
    >
      <Badge badgeContent={totalItems} color="error">
        <ShoppingCartIcon />
      </Badge>
    </StyledFab>
  );
};
