// src/components/categories/CategoryList.tsx
import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import { CategoryCard } from "./CategoryCard";
import { Category } from "@/service/api/categories";

interface CategoryListProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: number) => void;
}

export const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  onEdit,
  onDelete,
}) => {
  if (categories.length === 0) {
    return (
      <Box textAlign="center" py={5}>
        <Typography variant="h6" color="text.secondary">
          No categories found.
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={4}>
      {categories.map((category) => (
        <Grid key={category.id}>
          <CategoryCard
            category={category}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Grid>
      ))}
    </Grid>
  );
};
