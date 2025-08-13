"use client";
import React from "react";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { useCategories } from "@/hooks/useCategories";
import { CategoryTable } from "./helper-component/CategoryTable"; // Updated import
import { CategoryModal } from "./helper-component/CategoryModal";
const CategoriesPage = () => {
  const {
    state,
    categories,
    areCategoriesLoading,
    openModal,
    closeModal,
    handleFormSubmit,
    handleDelete,
  } = useCategories();
  if (areCategoriesLoading) {
    return (
      <Box
        sx={{
          display: "grid",
          placeContent: "center",
          minHeight: "calc(100vh - 128px)",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress />
          <Typography variant="h6" color="#000000" sx={{ mt: 2 }}>
            Loading Categories...
          </Typography>
        </Box>
      </Box>
    );
  }
  return (
    <Box sx={{ bgcolor: "#f0f2f5", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h1"
          sx={{ mb: 4, fontWeight: "bold", color: "#1c274c" }}
        >
          Categories
        </Typography>
        {/* The new table component replaces the old list and header */}
        <CategoryTable
          categories={categories}
          onEdit={openModal}
          onDelete={handleDelete}
          onAddCategory={() => openModal()}
        />

        <CategoryModal
          open={state.isModalOpen}
          onClose={closeModal}
          onSubmit={handleFormSubmit}
          category={state.selectedCategory}
        />
      </Container>
    </Box>
  );
};
export default CategoriesPage;
