// src/page-component/landing/ScannerDialog.tsx
"use client";
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import dynamic from "next/dynamic";
import { OnResultFunction } from "react-qr-reader";
import { useCallback } from "react";
import { ScannerOverlay } from "./landing/LandingPage.styled";
import { ScannerDialogProps } from "./types";
import {
  StyledDialog,
  StyledDialogContent,
  StyledIconButton,
  StyledTypography,
  StyledScannerBox,
} from "./ScannerDialog.styled";

const QrScanner = dynamic(
  () => import("react-qr-reader").then((mod) => mod.QrReader),
  { ssr: false }
);

const ScannerDialog = ({
  open,
  onClose,
  onScan,
  onError,
}: ScannerDialogProps) => {
  const handleResult = useCallback<OnResultFunction>(
    (result, error) => {
      if (result) {
        onScan(result.getText());
      }
      if (error && error.name !== "NotFoundException") {
        onError(error);
      }
    },
    [onScan, onError]
  );

  return (
    <StyledDialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <StyledDialogContent>
        <StyledIconButton onClick={onClose}>
          <CloseIcon />
        </StyledIconButton>
        <StyledTypography variant="h6">
          Point Camera at QR Code
        </StyledTypography>
        <StyledScannerBox>
          {open && (
            <>
              <QrScanner
                onResult={handleResult}
                constraints={{ facingMode: "environment" }}
                videoContainerStyle={{ paddingTop: "100%" }}
                videoStyle={{ objectFit: "cover" }}
              />
              <ScannerOverlay />
            </>
          )}
        </StyledScannerBox>
      </StyledDialogContent>
    </StyledDialog>
  );
};

ScannerDialog.displayName = "ScannerDialog";

export default ScannerDialog;
