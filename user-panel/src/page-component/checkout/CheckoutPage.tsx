"use client";

import { useCart } from "@/context/CartContext";
import { Container, Typography, Box, Grid, Paper, Button } from "@mui/material";

import { useState } from "react";

import { useRouter } from "next/navigation";
import { OrderSuccessModal } from "./helper-component/slotBooking/OrderSuccessModal";
import { SlotBooking } from "./helper-component/slotBooking/SlotBooking";

export interface SlotDetails {
  type: "Delivery" | "Pickup";
  time: "Now" | string; // 'Now' or a specific time slot string
}

const CheckoutPage = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const router = useRouter();
  const [slotDetails, setSlotDetails] = useState<SlotDetails | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handlePlaceOrder = () => {
    if (!slotDetails) {
      alert("Please select a delivery or pickup slot.");
      return;
    }

    // --- Mock API Call ---
    setIsSubmitting(true);
    console.log("Placing Order:", {
      items: cartItems,
      total: getCartTotal(),
      slot: slotDetails,
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setOrderSuccess(true); // Trigger success modal
      // Do not clear cart here, clear it when the modal is closed.
    }, 1500); // Simulate network delay
  };

  const handleCloseSuccessModal = () => {
    setOrderSuccess(false);
    clearCart();
    router.push("/");
  };

  // Redirect if cart is empty
  if (cartItems.length === 0 && !orderSuccess) {
    if (typeof window !== "undefined") {
      router.push("/cart");
    }
    return null; // Return null while redirecting
  }

  return (
    <>
      <Box
        sx={{
          bgcolor: "var(--background-start)",
          minHeight: "100vh",
          py: { xs: 2, md: 5 },
        }}
      >
        <Container maxWidth="md">
          <Paper
            elevation={0}
            sx={{ p: { xs: 2, sm: 3, md: 4 }, borderRadius: "16px" }}
          >
            <Typography
              variant="h4"
              component="h1"
              fontWeight={700}
              gutterBottom
            >
              Confirm Your Order
            </Typography>

            {/* In a real app, you might show a summary of items here */}
            {/* For now, we focus on the slot booking */}

            <SlotBooking onSlotSelect={setSlotDetails} />

            <Box sx={{ mt: 4, textAlign: "right" }}>
              <Button
                variant="contained"
                size="large"
                onClick={handlePlaceOrder}
                disabled={!slotDetails || isSubmitting}
              >
                {isSubmitting
                  ? "Placing Order..."
                  : `Confirm & Pay $${(getCartTotal() * 1.05).toFixed(2)}`}
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>

      <OrderSuccessModal
        open={orderSuccess}
        onClose={handleCloseSuccessModal}
        slotDetails={slotDetails}
      />
    </>
  );
};

export default CheckoutPage;
