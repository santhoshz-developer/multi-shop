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
        }}
      >
        <Typography color="rgba(255, 255, 255, 0.5)">
          No products in this category.
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
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                gap: 2,
                bgcolor: "rgba(28, 37, 61, 0.8)",
                color: "white",
                transition: "background-color 0.2s",
                "&:hover": { bgcolor: "rgba(40, 51, 80, 0.9)" },
              }}
            >
              <Avatar
                src={product.image}
                alt={product.name}
                sx={{ width: 56, height: 56 }}
              >
                {!product.image && product.name.charAt(0)}
              </Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <Typography sx={{ fontWeight: "bold" }}>
                  {product.name}
                </Typography>
                {product.description && (
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    {product.description}
                  </Typography>
                )}
              </Box>
              <Typography sx={{ minWidth: "80px", textAlign: "right" }}>
                ₹{product.price.toFixed(2)}
              </Typography>
              <Typography
                sx={{
                  minWidth: "100px",
                  textAlign: "right",
                  color: "rgba(255,255,255,0.7)",
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
                  <EditIcon fontSize="small" sx={{ color: "white" }} />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => onDeleteProduct(product.id)}
                  aria-label="Delete product"
                >
                  <DeleteIcon fontSize="small" sx={{ color: "white" }} />
                </IconButton>
              </Box>
            </Paper>
          </motion.div>
        ))}
      </AnimatePresence>
    </Box>
  );
};
