"use client";

import React from "react";
import {
  Box,
  Typography,
  Button,
  Modal,
  CircularProgress,
} from "@mui/material";
import { useShopManagement } from "@/hooks/useShopManagement";

const QrDownload = ({ shop }: any) => {
  const {
    state,
    openQrModal,
    closeQrModal,
    handleDownloadQR,
    isAllShopsLoading,
  } = useShopManagement();

  if (isAllShopsLoading || !shop) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" fontWeight="bold" mb={2}>
        {shop.name} QR Code
      </Typography>

      {shop.qr_code_url ? (
        <>
          <Button variant="contained" onClick={openQrModal}>
            View QR Code
          </Button>

          <Modal open={state.qrModalOpen} onClose={closeQrModal}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
                textAlign: "center",
              }}
            >
              <Typography variant="h6" gutterBottom>
                {shop.name} QR Code
              </Typography>
              <img
                src={shop.qr_code_url}
                alt={`QR Code for ${shop.name}`}
                style={{ width: "100%", height: "auto", maxWidth: "250px" }}
              />
              <Typography
                variant="body2"
                sx={{ mt: 2, color: "text.secondary" }}
              >
                Scan this code to view shop details
              </Typography>

              <Button
                variant="contained"
                sx={{ mt: 3, mr: 2 }}
                onClick={handleDownloadQR}
              >
                Download QR
              </Button>

              <Button variant="outlined" sx={{ mt: 3 }} onClick={closeQrModal}>
                Close
              </Button>
            </Box>
          </Modal>
        </>
      ) : (
        <Typography color="text.secondary">
          No QR code available for this shop.
        </Typography>
      )}
    </Box>
  );
};

export default QrDownload;
