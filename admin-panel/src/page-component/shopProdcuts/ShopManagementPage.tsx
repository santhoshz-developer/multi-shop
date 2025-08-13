"use client";

import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";

import { ProductTabs } from "./management/ProductTabs";
import { ProductList } from "./management/ProductList";
import { AddProductModal } from "./management/AddProductModal";
import { useShopManagement } from "@/hooks/useShopManagement";
import { ShopHeader } from "./management/ShopHeader";

const ShopManagementPage = () => {
  const {
    state: { activeTab, isModalOpen, selectedProduct, qrModalOpen },
    shop,
    filteredProducts,
    categories,
    isProductsLoading,
    isAllShopsLoading,
    openProductModal,
    deleteProduct,
    handleTabChange,
    closeProductModal,
    handleProductSubmit,
    openQrModal,
    closeQrModal,
    handleDownloadQR,
  } = useShopManagement();

  // Loading state for the entire page
  if (isAllShopsLoading) {
    return (
      <Box
        sx={{
          display: "grid",
          placeContent: "center",
          // Adjust height to account for AppBar and Container padding
          minHeight: "calc(100vh - 64px - 64px)",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress />
          <Typography variant="h6" color="#333" sx={{ mt: 2 }}>
            Loading Shop...
          </Typography>
        </Box>
      </Box>
    );
  }

  // Shop not found state
  if (!shop) {
    return (
      <Box
        sx={{
          display: "grid",
          placeContent: "center",
          minHeight: "calc(100vh - 64px - 64px)",
        }}
      >
        <Typography variant="h4" color="#1c274c">
          Shop not found.
        </Typography>
      </Box>
    );
  }

  return (
    // The Container is no longer needed here
    <>
      {/* <ShopHeader
        shop={shop}
        onAddProductClick={openProductModal}
        qrModalOpen={qrModalOpen}
        onQrModalOpen={openQrModal}
        onQrModalClose={closeQrModal}
        onDownloadQR={handleDownloadQR}
      /> */}

      <Typography
        variant="h4"
        component="h1"
        sx={{ mb: 4, fontWeight: "bold", color: "#1c274c" }}
      >
        Products
      </Typography>

      {categories && categories.length > 0 && (
        <ProductTabs
          categories={categories}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      )}

      {isProductsLoading ? (
        <Box
          sx={{
            display: "grid",
            placeContent: "center",
            p: 5,
            minHeight: "300px",
            bgcolor: "#fff",
            borderRadius: "12px",
            mt: 3,
          }}
        >
          <CircularProgress />
          <Typography color="text.secondary" sx={{ mt: 2 }}>
            Loading products...
          </Typography>
        </Box>
      ) : (
        <ProductList
          products={filteredProducts || []}
          onEditProduct={openProductModal}
          onDeleteProduct={deleteProduct}
        />
      )}

      <AddProductModal
        open={isModalOpen}
        onClose={closeProductModal}
        onSubmit={handleProductSubmit}
        categories={categories || []}
        initialProduct={selectedProduct}
      />
    </>
  );
};

export default ShopManagementPage;
