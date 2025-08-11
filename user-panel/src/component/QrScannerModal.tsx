// src/components/QrScannerModal.tsx
// This seems duplicate to ScannerDialog, perhaps remove or integrate. For now, keep as is if needed.
"use client";
import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useRef } from "react";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface QrScannerModalProps {
  open: boolean;
  onClose: () => void;
  onScanSuccess: (result: string) => void;
}

const QrScannerModal = ({
  open,
  onClose,
  onScanSuccess,
}: QrScannerModalProps) => {
  const scannerRef = useRef<HTMLDivElement>(null);
  const html5QrCode = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    if (open && scannerRef.current) {
      html5QrCode.current = new Html5Qrcode("qr-reader");
      Html5Qrcode.getCameras().then((devices) => {
        if (devices && devices.length) {
          html5QrCode.current?.start(
            devices[0].id,
            { fps: 10, qrbox: 250 },
            (decodedText) => {
              onScanSuccess(decodedText);
              onClose();
              html5QrCode.current?.stop();
            },
            (err) => console.log("Scanning error", err)
          );
        }
      });
    }

    return () => {
      html5QrCode.current?.stop().catch(() => {});
    };
  }, [onClose, onScanSuccess, open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogContent>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 10, right: 10 }}
        >
          <CloseIcon />
        </IconButton>
        <div id="qr-reader" ref={scannerRef} style={{ width: "100%" }} />
      </DialogContent>
    </Dialog>
  );
};

export default QrScannerModal;
