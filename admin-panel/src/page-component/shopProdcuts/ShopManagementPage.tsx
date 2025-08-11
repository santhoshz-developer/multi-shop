// src/app/shops/[id]/page.tsx
"use client";

import React from "react";
import { Container, Box, Typography } from "@mui/material";

import { ProductTabs } from "./management/ProductTabs";
import { ProductList } from "./management/ProductList";
import { AddProductModal } from "./management/AddProductModal";
import { useShopManagement } from "@/hooks/useShopManagement";
import { ShopHeader } from "./management/ShopHeader";

const ShopManagementPage = () => {
  const {
    state: { activeTab, isModalOpen, selectedProduct, qrModalOpen },
    shop,
    allShops,
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

  if (isAllShopsLoading) {
    return (
      <Box
        sx={{
          display: "grid",
          placeContent: "center",
          height: "100vh",
          bgcolor: "#0f172a",
        }}
      >
        <Typography variant="h4" color="white">
          Loading shops...
        </Typography>
      </Box>
    );
  }

  if (!shop) {
    return (
      <Box
        sx={{
          display: "grid",
          placeContent: "center",
          height: "100vh",
          bgcolor: "#0f172a",
        }}
      >
        <Typography variant="h4" color="white">
          Shop not found.
        </Typography>
      </Box>
    );
  }
console.log('selectedProduct',selectedProduct);

  return (
    <>
      <Box sx={{ width: "100%", minHeight: "100vh", bgcolor: "#0f172a" }}>
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <ShopHeader
            shop={shop}
            onAddProductClick={openProductModal}
            qrModalOpen={qrModalOpen}
            onQrModalOpen={openQrModal}
            onQrModalClose={closeQrModal}
            onDownloadQR={handleDownloadQR}
          />
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
              }}
            >
              <Typography color="rgba(255, 255, 255, 0.5)">
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
        </Container>
      </Box>
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
