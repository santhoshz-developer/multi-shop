/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  IconButton,
  styled,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { ShopCategory, FormattedProduct } from "@/hooks/useShopManagement";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  categories: ShopCategory[];
  initialProduct?: FormattedProduct | null;
}

interface ProductFormValues {
  productName: string;
  selectedCategory: string;
  price: string;
  stock: string;
  description: string;
  imageFile: File | null;
}

export const AddProductModal = ({
  open,
  onClose,
  onSubmit,
  categories,
  initialProduct,
}: AddProductModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormValues>({
    defaultValues: {
      productName: "",
      selectedCategory: "",
      price: "",
      stock: "",
      description: "",
      imageFile: null,
    },
  });

  const imagePreview = watch("imageFile")
    ? URL.createObjectURL(watch("imageFile")!)
    : initialProduct?.image || null;

  useEffect(() => {
    if (initialProduct) {
      setValue("productName", initialProduct?.name);
      setValue("selectedCategory", initialProduct?.categoryId);
      setValue("price", initialProduct.price?.toString());
      setValue("stock", initialProduct.stock?.toString());
      setValue("description", initialProduct?.description || "");
    } else {
      reset();
    }
  }, [initialProduct, open, reset, setValue]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setValue("imageFile", file);
    }
  };

  const onFormSubmit = (data: ProductFormValues) => {
    if (
      !data.productName ||
      !data.selectedCategory ||
      !data.price ||
      !data.stock
    ) {
      toast.error("Please fill in all required fields");
      return;
    }
    console.log("data", data);

    const formData = new FormData();

    formData.append("name", data.productName);
    formData.append("category_id", data.selectedCategory);
    formData.append("price", data.price);
    formData.append("stock_quantity", data.stock);
    formData.append("description", data.description);
    if (data.imageFile) {
      formData.append("main_image", data.imageFile);
    }

    onSubmit(formData);
    reset();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          background:
            "linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.8))",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderRadius: "20px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
          color: "#E2E8F0",
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, fontWeight: "bold" }}>
        {initialProduct ? "Edit Product" : "Add New Product"}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 12,
            top: 12,
            color: "rgba(255,255,255,0.7)",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Box component="form" onSubmit={handleSubmit(onFormSubmit)}>
        <DialogContent
          dividers
          sx={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
        >
          <Stack spacing={3} sx={{ pt: 1 }}>
            {imagePreview && (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={imagePreview}
                  alt="Product preview"
                  style={{
                    maxHeight: "200px",
                    maxWidth: "100%",
                    borderRadius: "8px",
                  }}
                />
              </Box>
            )}
            <TextField
              required
              fullWidth
              label="Product Name"
              {...register("productName", { required: true })}
              error={!!errors.productName}
              variant="filled"
              sx={{
                bgcolor: "rgba(255,255,255,0.05)",
                input: { color: "white" },
              }}
              InputLabelProps={{ sx: { color: "rgba(255,255,255,0.7)" } }}
            />
            <TextField
              fullWidth
              label="Description"
              {...register("description")}
              variant="filled"
              multiline
              rows={3}
              sx={{
                bgcolor: "rgba(255,255,255,0.05)",
                textarea: { color: "white" },
              }}
              InputLabelProps={{ sx: { color: "rgba(255,255,255,0.7)" } }}
            />
            <FormControl
              fullWidth
              required
              variant="filled"
              sx={{ bgcolor: "rgba(255,255,255,0.05)" }}
            >
              <InputLabel
                id="category-select-label"
                sx={{ color: "rgba(255,255,255,0.7)" }}
              >
                Category
              </InputLabel>
              <Select
                labelId="category-select-label"
                {...register("selectedCategory", { required: true })}
                error={!!errors.selectedCategory}
                sx={{ color: "white" }}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat.category_id} value={cat.category_id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Stack direction="row" spacing={2}>
              <TextField
                required
                label="Price"
                type="number"
                {...register("price", { required: true })}
                error={!!errors.price}
                variant="filled"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Typography color="rgba(255,255,255,0.7)">₹</Typography>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  bgcolor: "rgba(255,255,255,0.05)",
                  input: { color: "white" },
                }}
                InputLabelProps={{ sx: { color: "rgba(255,255,255,0.7)" } }}
              />
              <TextField
                required
                label="Stock Quantity"
                type="number"
                {...register("stock", { required: true })}
                error={!!errors.stock}
                variant="filled"
                fullWidth
                sx={{
                  bgcolor: "rgba(255,255,255,0.05)",
                  input: { color: "white" },
                }}
                InputLabelProps={{ sx: { color: "rgba(255,255,255,0.7)" } }}
              />
            </Stack>
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              fullWidth
              sx={{
                justifyContent: "flex-start",
                py: 1.5,
                color: "white",
                borderColor: "rgba(255,255,255,0.3)",
                "&:hover": {
                  borderColor: "white",
                  bgcolor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              {watch("imageFile") ? "Change Image" : "Upload Product Image"}
              <VisuallyHiddenInput
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: "16px 24px" }}>
          <Button onClick={onClose} sx={{ color: "rgba(255,255,255,0.7)" }}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" sx={{ fontWeight: "bold" }}>
            {initialProduct ? "Update Product" : "Save Product"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
