// src/page-component/landing/LandingPage.tsx
"use client";

import {
  Typography,
  Button,
  TextField,
  Stack,
  useMediaQuery,
  useTheme,
  InputAdornment,
  Box,
} from "@mui/material";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import { motion } from "framer-motion";
import {
  containerVariants,
  itemVariants,
  LandingCard,
} from "./LandingPage.styled";
import QuickAccessItem from "../quickAccess/QuickAccessItem";
import ScannerDialog from "../ScannerDialog";
import { useLandingHooks } from "@/hooks/useLandingHooks";

const LandingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const {
    state: { scannerOpen, shopId, error },
    fileInputRef,
    quickAccessItems,
    handleOpenScanner,
    handleCloseScanner,
    handleScanSuccess,
    handleScanError,
    handleInputChange,
    handleFormSubmit,
    handleUploadClick,
    handleUpload,
    handleQuickAccessClick,
  } = useLandingHooks();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        p: 2,
      }}
    >
      <LandingCard elevation={0}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ width: "100%" }}
        >
          <Stack spacing={isMobile ? 3 : 3.5} alignItems="center">
            {/* Header */}
            <Stack
              component={motion.div}
              variants={itemVariants}
              spacing={1.5}
              alignItems="center"
              textAlign="center"
            >
              <QrCodeScannerIcon
                sx={{ fontSize: 56, color: "var(--accent-color)" }}
              />
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                Shop Portal
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Scan a QR code or enter your Shop ID to begin.
              </Typography>
            </Stack>

            {/* Actions */}
            <Stack
              component={motion.div}
              variants={itemVariants}
              direction="row"
              spacing={2}
              width="100%"
            >
              <Button fullWidth variant="contained" onClick={handleOpenScanner}>
                Scan QR Code
              </Button>
              <Button fullWidth variant="outlined" onClick={handleUploadClick}>
                Upload Image
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleUpload}
                hidden
              />
            </Stack>

            {/* Divider */}
            <motion.div variants={itemVariants} style={{ width: "100%" }}>
              <Typography
                sx={{
                  textAlign: "center",
                  color: "text.secondary",
                  fontWeight: 500,
                }}
              >
                OR
              </Typography>
            </motion.div>

            {/* Form */}
            <Box
              component={motion.form}
              variants={itemVariants}
              onSubmit={handleFormSubmit}
              width="100%"
            >
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  label="Enter Shop ID"
                  value={shopId}
                  onChange={handleInputChange}
                  error={!!error}
                  helperText={error}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FingerprintIcon
                          sx={{ color: "var(--text-secondary)" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ py: 1.5 }}
                >
                  Access Shop
                </Button>
              </Stack>
            </Box>

            {/* Quick Access */}
            {quickAccessItems.length > 0 && (
              <Stack
                component={motion.div}
                variants={itemVariants}
                spacing={2}
                width="100%"
              >
                <Typography variant="h6" sx={{ fontWeight: "600", pt: 1 }}>
                  Quick Access
                </Typography>
                {quickAccessItems.map((item) => (
                  <QuickAccessItem
                    key={item.id}
                    item={item}
                    onClick={() => handleQuickAccessClick(item.id)}
                    isMobile={isMobile}
                  />
                ))}
              </Stack>
            )}
          </Stack>
        </motion.div>
      </LandingCard>

      <ScannerDialog
        open={scannerOpen}
        onClose={handleCloseScanner}
        onScan={handleScanSuccess}
        onError={handleScanError}
      />
    </Box>
  );
};

export default LandingPage;
