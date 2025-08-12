// src/app/shops/[id]/management/ExcelUploadModal.tsx
"use client";

import React, { useCallback, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
  styled,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import { Close, CloudUpload } from "@mui/icons-material";

interface ExcelUploadModalProps {
  open: boolean;
  onClose: () => void;
  onFileUpload: (file: File) => void;
}

const StyledDropzone = styled("div")(({ theme }) => ({
  border: `2px dashed ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(4),
  textAlign: "center",
  cursor: "pointer",
  "&:hover": {
    borderColor: theme.palette.primary.main,
  },
}));

export const ExcelUploadModal = ({
  open,
  onClose,
  onFileUpload,
}: ExcelUploadModalProps) => {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]);
      }
    },
    []
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "application/vnd.ms-excel": [".xls"],
    },
    multiple: false,
  });

  const handleUpload = () => {
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Upload Excel File</Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
        <StyledDropzone {...getRootProps()}>
          <input {...getInputProps()} />
          <CloudUpload sx={{ fontSize: 64, color: "text.secondary" }} />
          {isDragActive ? (
            <Typography>Drop the files here ...</Typography>
          ) : (
            <Typography>
              Drag & drop a file here or click to select a file
            </Typography>
          )}
        </StyledDropzone>
        {file && (
          <Box sx={{ mt: 2 }}>
            <Typography>Selected file: {file.name}</Typography>
          </Box>
        )}
        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={!file}
            sx={{ ml: 2 }}
          >
            Upload
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};