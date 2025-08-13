import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Divider,
  CardHeader,
  Modal,
  TextField,
} from "@mui/material";
import { Shop } from "../types";
import { styled } from '@mui/material/styles';

interface DangerZoneProps {
  shop: Shop;
}

const StyledCard = styled(Card)(({ theme }) => ({
  border: `1px solid ${theme.palette.error.main}`,
}));


const ModalBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  backgroundColor: theme.palette.background.paper,
  border: '1px solid #000',
  boxShadow: theme.shadows[24],
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
}));

const DangerZone: React.FC<DangerZoneProps> = ({ shop }) => {
  const [open, setOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setConfirmText("");
  };

  const handleDeactivate = () => {
    console.log("Deactivating shop...");
    // Add logic here: e.g., call an API to deactivate the shop
  };

  const handleDelete = () => {
    console.log("Deleting shop...");
    // Add logic here: e.g., call an API to delete the shop
    handleClose();
  };

  return (
    <>
      <StyledCard>
        <CardHeader
          title="Danger Zone"
          titleTypographyProps={{ color: "error", fontWeight: "bold" }}
          subheader="These actions are irreversible. Please proceed with caution."
        />
        <Divider />
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            gap={2}
          >
            <Box>
              <Typography variant="h6">Deactivate this shop</Typography>
              <Typography variant="body2" color="text.secondary">
                Your shop will be temporarily hidden from the public and all listings will be inactive.
              </Typography>
            </Box>
            <Button
              variant="outlined"
              color="warning"
              onClick={handleDeactivate}
              disabled={!shop.is_active}
              sx={{ flexShrink: 0 }}
            >
              Deactivate Shop
            </Button>
          </Box>
          <Divider sx={{ my: 3 }} />
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            gap={2}
          >
            <Box>
              <Typography variant="h6">Delete this shop</Typography>
              <Typography variant="body2" color="text.secondary">
                This action is permanent and cannot be undone. All data will be lost.
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="error"
              onClick={handleOpen}
              sx={{ flexShrink: 0 }}
            >
              Delete Shop
            </Button>
          </Box>
        </CardContent>
      </StyledCard>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="delete-confirmation-modal-title"
        aria-describedby="delete-confirmation-modal-description"
      >
        <ModalBox>
          <Typography id="delete-confirmation-modal-title" variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
            Are you absolutely sure?
          </Typography>
          <Typography id="delete-confirmation-modal-description" sx={{ mt: 2 }}>
            This action cannot be undone. This will permanently delete the <strong>{shop.name}</strong> shop and all of its data.
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Please type <strong>{shop.name}</strong> to confirm.
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            sx={{ my: 2 }}
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
             <Button onClick={handleClose} variant="outlined">
                Cancel
             </Button>
             <Button
                variant="contained"
                color="error"
                onClick={handleDelete}
                disabled={confirmText !== shop.name}
              >
                I understand, delete this shop
              </Button>
          </Box>
        </ModalBox>
      </Modal>
    </>
  );
};

export default DangerZone;