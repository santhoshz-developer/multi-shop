"use client";

import { Dialog, DialogTitle, DialogContent, Typography, Box, Button, Chip } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { SlotDetails } from "@/page-component/checkout/CheckoutPage";

interface Props {
  open: boolean;
  onClose: () => void;
  slotDetails: SlotDetails | null;
}

export const OrderSuccessModal = ({ open, onClose, slotDetails }: Props) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogContent sx={{ textAlign: 'center', p: {xs: 3, sm: 4} }}>
        <CheckCircleOutlineIcon sx={{ fontSize: 70, color: 'success.main', mb: 2 }} />
        <Typography variant="h5" component="h2" fontWeight={700}>
          Order Confirmed!
        </Typography>
        <Typography color="text.secondary" mt={1}>
          Thank you for your purchase. Your order is being processed.
        </Typography>

        {slotDetails && (
          <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.100', borderRadius: '12px', textAlign: 'left' }}>
            <Typography fontWeight={600} mb={1.5}>Fulfilment Details</Typography>
            <Chip
                icon={slotDetails.type === 'Delivery' ? <DeliveryDiningIcon /> : <StorefrontIcon />}
                label={slotDetails.type}
                color="primary"
                variant="outlined"
                size="small"
                sx={{ mr: 1, mb: 1 }}
            />
            <Chip
                icon={<AccessTimeIcon />}
                label={slotDetails.time}
                variant="outlined"
                size="small"
                sx={{ mb: 1 }}
            />
          </Box>
        )}

        <Button onClick={onClose} variant="contained" fullWidth sx={{ mt: 3 }}>
          Continue Shopping
        </Button>
      </DialogContent>
    </Dialog>
  );
};