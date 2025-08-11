"use client";

import { useCart } from "@/context/CartContext";
import { Paper, Typography, Box, Button, Divider } from "@mui/material";
import Link from "next/link";

export const OrderSummary = () => {
  const { getCartTotal } = useCart();
  const subtotal = getCartTotal();
  const tax = subtotal * 0.05; // Example 5% tax
  const total = subtotal + tax;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: "16px",
        position: "sticky",
        top: "100px", // Adjust as needed
      }}
    >
      <Typography variant="h6" fontWeight={700} gutterBottom>
        Order Summary
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography>Subtotal</Typography>
        <Typography fontWeight={500}>${subtotal.toFixed(2)}</Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography>Tax (5%)</Typography>
        <Typography fontWeight={500}>${tax.toFixed(2)}</Typography>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h6" fontWeight={600}>
          Total
        </Typography>
        <Typography variant="h6" fontWeight={700}>
          ${total.toFixed(2)}
        </Typography>
      </Box>
      <Button
        component={Link}
        href="/checkout"
        variant="contained"
        fullWidth
        size="large"
      >
        Proceed to Checkout
      </Button>
    </Paper>
  );
};
