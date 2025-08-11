// src/components/ShopListingPage.tsx
"use client";
import React from "react";
import { CircularProgress } from "@mui/material";
import { ShopHeader } from "./helper-component/shopHeader/ShopHeader";
import { FloatingCartButton } from "./helper-component/cartFloatingButton/FloatingCartButton";
import { ProductGrid } from "./helper-component/productGrid/ProductGrid";
import { useShopListingHooks } from "@/hooks/useShopListingHooks";
import * as S from "./ShopListingPage.styled";

const ShopListingPage = () => {
  const { categories, products, shop, isLoading, isError, error } =
    useShopListingHooks();

  if (isLoading) {
    return (
      <S.LoadingContainer>
        <CircularProgress sx={{ color: "var(--accent-color)" }} />
        <S.LoadingText>Loading Shop...</S.LoadingText>
      </S.LoadingContainer>
    );
  }

  if (isError || !shop) {
    return (
      <S.ErrorContainer>
        <S.ErrorTitle variant="h5" color="error" fontWeight="600">
          {error ? error.message : "Shop Not Found"}
        </S.ErrorTitle>
        <S.ErrorMessage color="var(--text-secondary)">
          {error
            ? "Please check the Shop ID or try again."
            : "The shop you are looking for does not exist."}
        </S.ErrorMessage>
      </S.ErrorContainer>
    );
  }

  return (
    <S.PageContainer>
      <S.ContentContainer maxWidth={false}>
        <S.ContentPaper elevation={0}>
          <ShopHeader shop={shop} />
          <ProductGrid categories={categories} products={products} />
        </S.ContentPaper>
      </S.ContentContainer>
      <FloatingCartButton />
    </S.PageContainer>
  );
};

export default ShopListingPage;
