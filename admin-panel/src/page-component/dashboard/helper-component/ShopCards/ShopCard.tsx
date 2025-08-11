// ShopCard.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  StyledCard,
  StyledCardMedia,
  StyledCardContent,
  StyledChip,
  StyledTypography,
  StyledTitleTypography,
  StyledLocationBox,
} from "./ShopCard.styled";
import { Box } from "@mui/material";

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 14,
    },
  },
} as const;

interface ShopCardProps {
  id: number | string;
  name: string;
  category: string;
  description: string;
  location?: string;
  image: string;
}

export const ShopCard = ({
  id,
  name,
  category,
  description,
  location,
  image,
}: ShopCardProps) => {
  const router = useRouter();
  const handleNavigate = () => router.push(`/shop/${id}`);

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -10,
        scale: 1.03,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ width: "100%", height: "100%", cursor: "pointer" }}
      onClick={handleNavigate}
    >
      <StyledCard>
        <StyledCardMedia image={image} />
        <StyledCardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 1,
            }}
          >
            <StyledTitleTypography variant="h6" fontWeight="bold">
              {name}
            </StyledTitleTypography>
            <StyledChip label={category} size="small" />
          </Box>
          <StyledTypography variant="body2">{description}</StyledTypography>
          {location && (
            <StyledLocationBox>
              <LocationOnIcon sx={{ fontSize: "1rem", mr: 0.5 }} />
              <StyledTypography variant="caption">{location}</StyledTypography>
            </StyledLocationBox>
          )}
        </StyledCardContent>
      </StyledCard>
    </motion.div>
  );
};
