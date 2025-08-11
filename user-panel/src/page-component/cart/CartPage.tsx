"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  Divider,
} from "@mui/material";
import Link from "next/link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CartItemCard } from "./helper-component/CartItemCard";
import { OrderSummary } from "./helper-component/OrderSummary";
import React from "react";

const CartPage = () => {
  const { cartItems } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (!cartItems || cartItems.length === 0) {
    // Added null check
    return (
      <Box textAlign="center" py={10}>
        <ShoppingCartIcon sx={{ fontSize: 80, color: "grey.300" }} />
        <Typography variant="h5" fontWeight={600} mt={2}>
          Your Cart is Empty
        </Typography>
        <Typography color="text.secondary" mt={1}>
          Looks like you haven't added anything to your cart yet.
        </Typography>
        <Button component={Link} href="/" variant="contained" sx={{ mt: 3 }}>
          Start Shopping
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        bgcolor: "var(--background-start)",
        minHeight: "100vh",
        py: { xs: 2, md: 5 },
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
          Shopping Cart
        </Typography>
        <Grid container spacing={4}>
          <Grid
            sx={{
              bgcolor: "background.paper",
              p: { xs: 1, sm: 2 },
              borderRadius: "16px",
            }}
          >
            <Paper
              elevation={0}
              sx={{ p: { xs: 1, sm: 2 }, borderRadius: "16px" }}
            >
              {cartItems.map((item, index) => (
                <React.Fragment key={`${item.id}-${index}`}>
                  <CartItemCard item={item} />
                  {index < cartItems.length - 1 && <Divider sx={{ my: 1.5 }} />}
                </React.Fragment>
              ))}
            </Paper>
          </Grid>
          <Grid
            sx={{
              bgcolor: "background.default",
              p: { xs: 1, sm: 2 },
              borderRadius: "16px",
            }}
          >
            <OrderSummary />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CartPage;
