/* eslint-disable @next/next/no-img-element */
// src/app/shops/[id]/management/ShopHeader.tsx
"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Modal,
  IconButton,
  styled,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import { Shop } from "@/hooks/useShopManagement";
import { ExcelUploadModal } from "./ExcelUploadModal";
import { UploadFile } from "@mui/icons-material";

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
  const [excelModalOpen, setExcelModalOpen] = useState(false);

  const handleExcelModalOpen = () => {
    setExcelModalOpen(true);
  };

  const handleExcelModalClose = () => {
    setExcelModalOpen(false);
  };

  const handleFileUpload = (file: File) => {
    // Implement your file upload logic here
    console.log(file);
    handleExcelModalClose();
  };

  return (
    <>
      <Box
        sx={{
          p: 3,
          mb: 3,
          background: "#ffffff",
          borderRadius: "12px",
          border: "1px solid #e0e0e0",
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
              color="#1c274c"
            >
              {shop.name}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                color: "text.secondary",
                mt: 0.5,
              }}
            >
              <LocationOnIcon fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="body1">{shop.location}</Typography>
            </Box>
          </Box>

          <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
            {shop.qr_code_url && (
              <IconButton
                onClick={onQrModalOpen}
                sx={{
                  color: "text.primary",
                  "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
                }}
              >
                <QrCode2Icon fontSize="large" />
              </IconButton>
            )}
            <IconButton
              onClick={handleExcelModalOpen}
              sx={{
                color: "text.primary",
                "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
              }}
            >
              <UploadFile fontSize="large" />
            </IconButton>
          </Box>
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
          Add
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
              style={{ width: "100%", height: "auto", maxWidth: "250px" }}
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

      <ExcelUploadModal
        open={excelModalOpen}
        onClose={handleExcelModalClose}
        onFileUpload={handleFileUpload}
      />
    </>
  );
};