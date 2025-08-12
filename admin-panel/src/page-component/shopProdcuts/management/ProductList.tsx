// src/app/shops/[id]/management/ProductList.tsx
"use client";

import React from "react";
import { Box, Paper, Typography, Avatar, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { AnimatePresence, motion } from "framer-motion";
import { FormattedProduct } from "@/hooks/useShopManagement";

interface ProductListProps {
  products: FormattedProduct[];
  onEditProduct: (product: FormattedProduct) => void;
  onDeleteProduct: (productId: string) => void;
}

export const ProductList = ({
  products,
  onEditProduct,
  onDeleteProduct,
}: ProductListProps) => {
  if (products.length === 0) {
    return (
      <Box
        sx={{
          display: "grid",
          placeContent: "center",
          p: 5,
          minHeight: "300px",
          bgcolor: "#fff",
          borderRadius: "12px",
          border: "1px solid #e0e0e0",
          mt: 3,
        }}
      >
        <Typography color="text.secondary">
          No products found in this category.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}>
      <AnimatePresence>
        {products.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            layout
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                gap: 2,
                bgcolor: "#ffffff",
                color: "text.primary",
                transition: "background-color 0.2s",
                border: "1px solid #e0e0e0",
                borderRadius: "12px",
                "&:hover": { bgcolor: "#f5f5f5" },
              }}
            >
              <Avatar
                src={product.image}
                alt={product.name}
                sx={{ width: 56, height: 56, bgcolor: "#e0e0e0" }}
                variant="rounded"
              >
                {!product.image && product.name.charAt(0)}
              </Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <Typography sx={{ fontWeight: "bold" }}>
                  {product.name}
                </Typography>
                {product.description && (
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {product.description}
                  </Typography>
                )}
              </Box>
              <Typography
                sx={{
                  minWidth: "80px",
                  textAlign: "right",
                  fontWeight: "bold",
                }}
              >
                ₹{product.price.toFixed(2)}
              </Typography>
              <Typography
                sx={{
                  minWidth: "100px",
                  textAlign: "right",
                  color: "text.secondary",
                }}
              >
                {product.stock} in stock
              </Typography>
              <Box>
                <IconButton
                  size="small"
                  onClick={() => onEditProduct(product)}
                  aria-label="Edit product"
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => onDeleteProduct(product.id)}
                  aria-label="Delete product"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Paper>
          </motion.div>
        ))}
      </AnimatePresence>
    </Box>
  );
};
