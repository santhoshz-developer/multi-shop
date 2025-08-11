/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Box, Typography, Button, Modal, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import { Shop } from "@/hooks/useShopManagement";

interface ShopHeaderProps {
  shop: Shop;
  onAddProductClick: () => void;
  qrModalOpen: boolean;
  onQrModalOpen: () => void;
  onQrModalClose: () => void;
  onDownloadQR: () => void;
}

export const ShopHeader = ({
  shop,
  onAddProductClick,
  qrModalOpen,
  onQrModalOpen,
  onQrModalClose,
  onDownloadQR,
}: ShopHeaderProps) => {
  return (
    <>
      <Box
        sx={{
          p: 3,
          mb: 3,
          background: "rgba(28, 37, 61, 0.6)",
          backdropFilter: "blur(12px)",
          borderRadius: "16px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 2, flexGrow: 1 }}
        >
          <Box>
            <Typography
              variant="h4"
              component="h1"
              fontWeight="bold"
              color="white"
            >
              {shop.name}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                color: "rgba(255, 255, 255, 0.7)",
                mt: 0.5,
              }}
            >
              <LocationOnIcon fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="body1">{shop.location}</Typography>
            </Box>
          </Box>

          {shop.qr_code_url && (
            <Box sx={{ ml: "auto" }}>
              <IconButton
                onClick={onQrModalOpen}
                sx={{
                  color: "white",
                  "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
                }}
              >
                <QrCode2Icon fontSize="large" />
              </IconButton>
            </Box>
          )}
        </Box>

        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          onClick={onAddProductClick}
          sx={{
            fontWeight: "bold",
            bgcolor: "#2563eb",
            "&:hover": { bgcolor: "#1d4ed8" },
          }}
        >
          Add Product
        </Button>
      </Box>

      <Modal open={qrModalOpen} onClose={onQrModalClose}>
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
          {shop.qr_code_url && (
            <img
              src={shop.qr_code_url}
              alt={`QR Code for ${shop.name}`}
              width={250}
              height={250}
              style={{ width: "100%", height: "auto" }}
            />
          )}
          <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
            Scan this code to view shop details
          </Typography>

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3, mr: 2 }}
            onClick={onDownloadQR}
          >
            Download QR
          </Button>

          <Button variant="outlined" sx={{ mt: 3 }} onClick={onQrModalClose}>
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
};
