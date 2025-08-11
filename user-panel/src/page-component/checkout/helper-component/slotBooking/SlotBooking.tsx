"use client";

import { useState, useEffect, ReactNode } from "react";
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Paper,
  Grid,
  Chip,
} from "@mui/material";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { SlotDetails } from "@/page-component/checkout/CheckoutPage";

// Mock data for available slots
const timeSlots = [
  "10:00 AM - 12:00 PM",
  "12:00 PM - 02:00 PM",
  "02:00 PM - 04:00 PM",
  "04:00 PM - 06:00 PM",
];

interface Props {
  onSlotSelect: (details: SlotDetails | null) => void;
}

export const SlotBooking = ({ onSlotSelect }: Props) => {
  const [option, setOption] = useState<
    "delivery-now" | "delivery-later" | "pickup-later"
  >("delivery-now");
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  useEffect(() => {
    // Update parent component whenever the selection changes
    if (option === "delivery-now") {
      onSlotSelect({ type: "Delivery", time: "Now" });
      setSelectedSlot(null);
    } else if (option === "delivery-later" && selectedSlot) {
      onSlotSelect({ type: "Delivery", time: selectedSlot });
    } else if (option === "pickup-later" && selectedSlot) {
      onSlotSelect({ type: "Pickup", time: selectedSlot });
    } else {
      onSlotSelect(null); // Selection is incomplete
    }
  }, [option, selectedSlot, onSlotSelect]);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOption(event.target.value as any);
    setSelectedSlot(null); // Reset slot when changing main option
  };

  return (
    <FormControl component="fieldset" fullWidth sx={{ mt: 3 }}>
      <FormLabel
        component="legend"
        sx={{
          fontWeight: 600,
          fontSize: "1.2rem",
          mb: 2,
          color: "text.primary",
        }}
      >
        Choose Fulfilment Option
      </FormLabel>
      <RadioGroup value={option} onChange={handleOptionChange}>
        <StyledPaper selected={option === "delivery-now"}>
          <FormControlLabel
            value="delivery-now"
            control={<Radio />}
            label={<Typography fontWeight={600}>Delivery Now</Typography>}
          />
          <Typography variant="body2" color="text.secondary" pl={4}>
            Estimated arrival: 30-45 minutes
          </Typography>
        </StyledPaper>

        <StyledPaper selected={option === "delivery-later"}>
          <FormControlLabel
            value="delivery-later"
            control={<Radio />}
            label={<Typography fontWeight={600}>Schedule Delivery</Typography>}
          />
          {option === "delivery-later" && (
            <SlotPicker
              onSlotSelect={setSelectedSlot}
              selectedSlot={selectedSlot}
            />
          )}
        </StyledPaper>

        <StyledPaper selected={option === "pickup-later"}>
          <FormControlLabel
            value="pickup-later"
            control={<Radio />}
            label={<Typography fontWeight={600}>Schedule Pickup</Typography>}
          />
          {option === "pickup-later" && (
            <SlotPicker
              onSlotSelect={setSelectedSlot}
              selectedSlot={selectedSlot}
            />
          )}
        </StyledPaper>
      </RadioGroup>
    </FormControl>
  );
};

// Helper component for picking a time slot
const SlotPicker = ({
  onSlotSelect,
  selectedSlot,
}: {
  onSlotSelect: (slot: string) => void;
  selectedSlot: string | null;
}) => (
  <Box pl={4} pt={1}>
    <Typography variant="body2" fontWeight={500} mb={1.5}>
      Select a time slot for today:
    </Typography>
    <Grid container spacing={1}>
      {timeSlots.map((slot) => (
        <Grid key={slot}>
          <Chip
            icon={<AccessTimeIcon />}
            label={slot}
            clickable
            color={selectedSlot === slot ? "primary" : "default"}
            onClick={() => onSlotSelect(slot)}
            variant={selectedSlot === slot ? "filled" : "outlined"}
          />
        </Grid>
      ))}
    </Grid>
  </Box>
);

// Styled paper for radio options
const StyledPaper = ({
  children,
  selected,
}: {
  children: ReactNode;
  selected: boolean;
}) => (
  <Paper
    elevation={0}
    sx={{
      p: 2,
      mb: 1.5,
      borderRadius: "12px",
      border: "2px solid",
      borderColor: selected ? "primary.main" : "grey.200",
      transition: "border-color 0.2s ease",
    }}
  >
    {children}
  </Paper>
);
