// ShopListingPage.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { motion } from "framer-motion";
import { ShopCard } from "./helper-component/ShopCards/ShopCard";
import { AddShopModal } from "./helper-component/addShopModel/AddShopModal";
import { useShopManagement } from "@/hooks/useShopManagement";
import {
  StyledBox,
  StyledContainer,
  StyledHeaderBox,
  StyledAddButton,
  StyledGridBox,
  StyledTypography,
} from "./ShopListingPage.styled";

interface ShopData {
  name: string;
  description: string;
  category: string;
  location?: string;
  image?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
} as const;

const ShopListingPage = () => {
  const {
    state,
    allShops,
    isAllShopsLoading,
    openProductModal,
    closeProductModal,
  } = useShopManagement();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleShopSubmit = (shopData: ShopData) => {
    console.log("New Shop Data:", shopData);
    closeProductModal();
  };

  if (!isClient || isAllShopsLoading) {
    return (
      <StyledBox
        sx={{ display: "grid", placeContent: "center", height: "100vh" }}
      >
        <Typography variant="h4">Loading shops...</Typography>
      </StyledBox>
    );
  }

  return (
    <StyledBox>
      <StyledContainer maxWidth="lg">
        <StyledHeaderBox>
          <Box>
            <Typography variant="h4" component="h1" fontWeight="bold">
              Popular Shops
            </Typography>
            <StyledTypography>
              Discover the best shops in your area
            </StyledTypography>
          </Box>
          <StyledAddButton
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => openProductModal()}
          >
            Add New Shop
          </StyledAddButton>
        </StyledHeaderBox>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <StyledGridBox>
            {allShops?.data?.map((shop) => (
              <Box key={shop.shop_id} sx={{ height: 380 }}>
                <ShopCard
                  id={shop.shop_id}
                  name={shop.name}
                  category={shop?.categories?.[0]?.name || "General"}
                  description={shop.description}
                  location={shop.location}
                  image={shop.logo_image || shop.banner_image}
                />
              </Box>
            ))}
          </StyledGridBox>
        </motion.div>
      </StyledContainer>

      <AddShopModal
        open={state.isModalOpen}
        onClose={closeProductModal}
        onSubmit={handleShopSubmit}
      />
    </StyledBox>
  );
};

export default ShopListingPage;
