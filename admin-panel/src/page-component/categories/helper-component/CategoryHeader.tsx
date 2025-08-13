// src/components/categories/CategoryHeader.tsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface CategoryHeaderProps {
  onAddCategory: () => void;
}

export const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  onAddCategory,
}) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      mb: 4,
    }}
  >
    <Typography
      variant="h4"
      component="h1"
      sx={{ color: "#000000", fontWeight: "bold" }}
    >
      Manage Categories
    </Typography>
    <Button
      variant="contained"
      startIcon={<AddIcon />}
      onClick={onAddCategory}
      sx={{
        bgcolor: "#000000",
        color: "#ffffff",
        "&:hover": { bgcolor: "#333333" },
      }}
    >
      New Category
    </Button>
  </Box>
);
