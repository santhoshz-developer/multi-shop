"use client";

import { useCart, CartItem } from "@/context/CartContext";
import { Box, Typography, IconButton, Avatar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export const CartItemCard = ({ item }: { item: CartItem }) => {
  const { updateQuantity, removeFromCart } = useCart();

  if (!item) return null; // Null check

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        p: 1,
      }}
    >
      <Avatar
        src={item?.imageUrl}
        alt={item?.name}
        variant="rounded"
        sx={{ width: 80, height: 80, bgcolor: "grey.100" }}
      />
      <Box flexGrow={1}>
        <Typography fontWeight={600}>{item.name}</Typography>
        <Typography color="text.secondary" variant="body2">
          ${Number(item?.price || 0).toFixed(2)}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton
          size="small"
          onClick={() => updateQuantity(item.id, (item.quantity || 0) - 1)}
          disabled={item.quantity <= 1}
        >
          <RemoveIcon fontSize="small" />
        </IconButton>
        <Typography fontWeight={600} mx={1}>
          {item.quantity}
        </Typography>
        <IconButton
          size="small"
          onClick={() => updateQuantity(item.id, (item.quantity || 0) + 1)}
        >
          <AddIcon fontSize="small" />
        </IconButton>
      </Box>
      <Typography fontWeight={700} sx={{ width: 80, textAlign: "right" }}>
        ${(Number(item?.price || 0) * (item?.quantity || 0)).toFixed(2)}
      </Typography>
      <IconButton color="error" onClick={() => removeFromCart(item.id)}>
        <DeleteOutlineIcon />
      </IconButton>
    </Box>
  );
};
