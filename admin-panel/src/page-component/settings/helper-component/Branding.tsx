import React, { useState, ChangeEvent } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  Grid,
  Avatar,
  styled,
  Paper,
  Tooltip,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Shop } from "../types";

interface BrandingProps {
  shop: Shop;
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const UploadBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  textAlign: "center",
  border: `3px dashed ${theme.palette.primary.main}`,
  backgroundColor: theme.palette.grey[100],
  cursor: "pointer",
  borderRadius: theme.shape.borderRadius,
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
  },
}));

const ImagePreviewContainer = styled("div")({
  position: "relative",
  height: "200px",
  borderRadius: 12,
  overflow: "hidden",
  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  "&:hover .overlay": {
    opacity: 1,
  },
});

const PreviewOverlay = styled("div")(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0, 0, 0, 0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(2),
  opacity: 0,
  transition: "opacity 0.3s ease",
}));

const Branding: React.FC<BrandingProps> = ({ shop }) => {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setLogoPreview(previewUrl);
    }
  };

  const handleBannerChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setBannerPreview(previewUrl);
    }
  };

  const handleRemoveLogo = () => {
    setLogoPreview(null);
    // optionally clear original logo from shop if editable here
  };

  const handleRemoveBanner = () => {
    setBannerPreview(null);
    // optionally clear original banner from shop if editable here
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", px: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, color: "text.primary" }}>
        Shop Branding
      </Typography>

      <Grid container spacing={5}>
        {/* Shop Logo Section */}
        <Grid >
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              p: 3,
              borderRadius: 3,
              boxShadow: 4,
            }}
          >
            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                Shop Logo
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Recommended size: 200x200px (1:1 aspect ratio). Max file size: 5MB.
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
              }}
            >
              {logoPreview || shop.logo_image ? (
                <ImagePreviewContainer>
                  <Avatar
                    src={logoPreview || shop.logo_image || undefined}
                    alt="Shop Logo"
                    sx={{
                      width: 200,
                      height: 200,
                      fontSize: 64,
                      bgcolor: "grey.200",
                      color: "grey.600",
                    }}
                  >
                    {!logoPreview && !shop.logo_image && "Logo"}
                  </Avatar>

                  <PreviewOverlay className="overlay">
                    <Tooltip title="Change Logo">
                      <Button
                        component="label"
                        variant="contained"
                        color="primary"
                        size="medium"
                        startIcon={<EditIcon />}
                        sx={{ px: 2 }}
                      >
                        Change
                        <VisuallyHiddenInput
                          type="file"
                          accept="image/*"
                          onChange={handleLogoChange}
                        />
                      </Button>
                    </Tooltip>

                    <Tooltip title="Remove Logo">
                      <Button
                        variant="outlined"
                        color="inherit"
                        size="medium"
                        startIcon={<DeleteIcon />}
                        onClick={handleRemoveLogo}
                        sx={{
                          color: "white",
                          borderColor: "rgba(255,255,255,0.7)",
                          "&:hover": {
                            borderColor: "white",
                            backgroundColor: "rgba(255,255,255,0.15)",
                            color: "white",
                          },
                        }}
                      >
                        Remove
                      </Button>
                    </Tooltip>
                  </PreviewOverlay>
                </ImagePreviewContainer>
              ) : (
                <Button
                  component="label"
                  fullWidth
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  sx={{ py: 1.8, fontWeight: 700, fontSize: "1rem" }}
                >
                  Upload New Logo
                  <VisuallyHiddenInput
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                  />
                </Button>
              )}
            </Box>
          </Card>
        </Grid>

        {/* Shop Banner Section */}
        <Grid >
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              p: 3,
              borderRadius: 3,
              boxShadow: 4,
            }}
          >
            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                Shop Banner
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Recommended dimensions: 1200x400px (3:1 aspect ratio). Max file size:
                10MB.
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 1 }}>
              {bannerPreview || shop.banner_image ? (
                <ImagePreviewContainer>
                  <Box
                    component="img"
                    src={bannerPreview || shop.banner_image}
                    alt="Shop Banner"
                    sx={{
                      width: "100%",
                      height: 300,
                      objectFit: "cover",
                      borderRadius: 2,
                      userSelect: "none",
                    }}
                  />
                  <PreviewOverlay className="overlay">
                    <Tooltip title="Change Banner">
                      <Button
                        component="label"
                        variant="contained"
                        color="primary"
                        size="medium"
                        startIcon={<EditIcon />}
                        sx={{ px: 2 }}
                      >
                        Change
                        <VisuallyHiddenInput
                          type="file"
                          accept="image/*"
                          onChange={handleBannerChange}
                        />
                      </Button>
                    </Tooltip>

                    <Tooltip title="Remove Banner">
                      <Button
                        variant="outlined"
                        color="inherit"
                        size="medium"
                        startIcon={<DeleteIcon />}
                        onClick={handleRemoveBanner}
                        sx={{
                          color: "white",
                          borderColor: "rgba(255,255,255,0.7)",
                          "&:hover": {
                            borderColor: "white",
                            backgroundColor: "rgba(255,255,255,0.15)",
                            color: "white",
                          },
                        }}
                      >
                        Remove
                      </Button>
                    </Tooltip>
                  </PreviewOverlay>
                </ImagePreviewContainer>
              ) : (
                <Button component="label" sx={{ width: "100%" }}>
                  <UploadBox>
                    <CloudUploadIcon
                      sx={{ fontSize: 60, mb: 1, color: "primary.main" }}
                    />
                    <Typography
                      variant="h6"
                      color="primary"
                      gutterBottom
                      sx={{ fontWeight: 700 }}
                    >
                      Upload Banner Image
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Drag & drop image here or click to browse
                    </Typography>
                    <VisuallyHiddenInput
                      type="file"
                      accept="image/*"
                      onChange={handleBannerChange}
                    />
                  </UploadBox>
                </Button>
              )}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Branding;
