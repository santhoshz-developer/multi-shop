"use client";

import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Grid,
  Chip,
  CircularProgress,
  AppBar,
  Toolbar,
  Container,
  Alert,
  AlertTitle,
  Button,
  Paper,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useShopManagement } from "@/hooks/useShopManagement";

const pageVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
  out: { opacity: 0 },
};

const itemVariants: any = {
  initial: { opacity: 0, y: 30 },
  in: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

const imageVariants: any = {
  initial: { opacity: 0, scale: 1.05 },
  in: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] },
  },
};

const LoadingState = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
    }}
  >
    <CircularProgress />
  </Box>
);

const ErrorState = ({ error }) => (
  <Container sx={{ textAlign: "center", mt: 10 }}>
    <Alert severity="error" variant="outlined">
      <AlertTitle sx={{ fontWeight: "bold" }}>
        Oops! Something went wrong.
      </AlertTitle>
      {error.message ||
        "We couldn't load the shop details. Please try again later."}
    </Alert>
  </Container>
);

const ShopDetailView = ({ shop, onNavigate }) => {
  return (
    <Container maxWidth="lg" sx={{ my: { xs: 3, md: 6 } }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 4 },
          borderRadius: 4,
          background: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(0, 0, 0, 0.08)",
          overflow: "hidden",
        }}
      >
        <Grid container spacing={{ xs: 3, md: 5 }}>
          {/* Left Column: Image */}
          <Grid
            item
            xs={12}
            md={6}
            {...({} as any)}
            sx={{
              flexBasis: { xs: "100%", md: "50%" },
              maxWidth: { xs: "100%", md: "50%" },
            }}
          >
            <motion.div
              variants={imageVariants}
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
              }}
            >
              <Box
                component="img"
                src={
                  shop.logo_image ||
                  "https://via.placeholder.com/600x450?text=Shop+Image"
                }
                alt={`${shop.name} view`}
                sx={{
                  width: "100%",
                  height: { xs: 250, sm: 400, md: 450 },
                  objectFit: "cover",
                }}
              />
            </motion.div>
          </Grid>

          {/* Right Column: Details */}
          <Grid
            item
            xs={12}
            md={6}
            {...({} as any)}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <motion.div variants={itemVariants}>
                <Chip label={shop.category} color="primary" size="small" />
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography
                  variant="h3"
                  component="h1"
                  fontWeight="bold"
                  sx={{ mt: 2, mb: 1 }}
                >
                  {shop.name}
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "text.secondary",
                    mb: 3,
                  }}
                >
                  <LocationOnIcon fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="body1">{shop.location}</Typography>
                </Box>
              </motion.div>

              <Divider sx={{ my: 3 }} />

              <motion.div variants={itemVariants}>
                <Typography variant="h6" fontWeight="medium" gutterBottom>
                  About the Shop
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ lineHeight: 1.7 }}
                >
                  {shop.description}
                </Typography>
              </motion.div>
            </Box>

            {/* Bottom Right Aligned Button */}
            <motion.div
              variants={itemVariants}
              style={{ marginTop: "auto", alignSelf: "flex-end" }}
            >
              <Button
                variant="contained"
                color="primary"
                size="large"
                endIcon={<ArrowForwardIcon />}
                onClick={() => onNavigate(shop.shop_id)}
                sx={{
                  mt: 4,
                  borderRadius: "999px",
                  px: 4,
                  py: 1.5,
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                Go to Shop Panel
              </Button>
            </motion.div>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

/**
 * Main Page Component
 * Orchestrates the entire page view.
 */
export default function ShopDashboard() {
  const router = useRouter();
  const { getShopDetails, shopDetailsLoading, shopDetailsError } =
    useShopManagement();

  const handleNavigation = (shopId) => {
    router.push(`/shop/${shopId}/products`);
    // Example: router.push('/shop/shop-006');
    console.log(`Navigating to /shop/${shopId}`);
  };

  if (shopDetailsLoading) {
    return <LoadingState />;
  }

  if (shopDetailsError) {
    return <ErrorState error={shopDetailsError} />;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #F5F7FA 0%, #E0E8F0 100%)",
      }}
    >
      <AppBar
        position="sticky"
        elevation={0}
        sx={{ background: "transparent", boxShadow: "none" }}
      >
        <Toolbar>
          <StorefrontIcon sx={{ color: "primary.main", mr: 2 }} />
          <Typography variant="h6" color="text.primary" fontWeight="bold">
            Shop Details
          </Typography>
        </Toolbar>
      </AppBar>

      <motion.main
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
      >
        {getShopDetails ? (
          <ShopDetailView shop={getShopDetails} onNavigate={handleNavigation} />
        ) : (
          <Container sx={{ textAlign: "center", mt: 10 }}>
            <Alert severity="info">No shop details available to display.</Alert>
          </Container>
        )}
      </motion.main>
    </Box>
  );
}
