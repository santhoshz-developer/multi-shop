// src/components/categories/CategoryCard.tsx
import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import { Category } from "@/service/api/categories";

interface CategoryCardProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (id: number) => void;
}

const StyledCard = styled(Card)({
  backgroundColor: "#ffffff",
  color: "#000000",
  borderRadius: "16px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 12px 28px rgba(0,0,0,0.12)",
  },
});

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onEdit,
  onDelete,
}) => (
  <StyledCard>
    <CardMedia
      component="img"
      height="180"
      image={category.image_url || "https://via.placeholder.com/300"}
      alt={category.name}
    />
    <CardContent>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Typography gutterBottom variant="h6" component="div" fontWeight="bold">
          {category.name}
        </Typography>
        <Chip
          label={category.is_active ? "Active" : "Inactive"}
          color={category.is_active ? "success" : "default"}
          size="small"
        />
      </Box>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ minHeight: "40px" }}
      >
        {category.description}
      </Typography>
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <IconButton onClick={() => onEdit(category)} aria-label="edit">
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => onDelete(category.id)} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </Box>
    </CardContent>
  </StyledCard>
);
