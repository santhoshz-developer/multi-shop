// AddShopModal.tsx
"use client";

import React, { useCallback, useReducer } from "react";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  StyledDialog,
  StyledTextField,
  StyledUploadButton,
  StyledIconButton,
  StyledTypography,
  VisuallyHiddenInput,
} from "./AddShopModal.styled";

interface ShopDataProps {
  name: string;
  category: string;
  description: string;
  location: string;
  image: string | undefined;
}

interface AddShopModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ShopDataProps) => void;
}

interface ShopFormState {
  shopName: string;
  category: string;
  location: string;
  description: string;
  imageFile: File | null;
}

type ShopFormAction =
  | { type: "SET_SHOP_NAME"; payload: string }
  | { type: "SET_CATEGORY"; payload: string }
  | { type: "SET_LOCATION"; payload: string }
  | { type: "SET_DESCRIPTION"; payload: string }
  | { type: "SET_IMAGE_FILE"; payload: File | null }
  | { type: "CLEAR" };

const initialFormState: ShopFormState = {
  shopName: "",
  category: "",
  location: "",
  description: "",
  imageFile: null,
};

const formReducer = (
  state: ShopFormState,
  action: ShopFormAction
): ShopFormState => {
  switch (action.type) {
    case "SET_SHOP_NAME":
      return { ...state, shopName: action.payload };
    case "SET_CATEGORY":
      return { ...state, category: action.payload };
    case "SET_LOCATION":
      return { ...state, location: action.payload };
    case "SET_DESCRIPTION":
      return { ...state, description: action.payload };
    case "SET_IMAGE_FILE":
      return { ...state, imageFile: action.payload };
    case "CLEAR":
      return initialFormState;
    default:
      return state;
  }
};

export const AddShopModal = ({
  open,
  onClose,
  onSubmit,
}: AddShopModalProps) => {
  const [formState, dispatch] = useReducer(formReducer, initialFormState);

  const handleImageChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        dispatch({ type: "SET_IMAGE_FILE", payload: event.target.files[0] });
      }
    },
    []
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const shopData: ShopDataProps = {
        name: formState.shopName,
        category: formState.category,
        description: formState.description,
        location: formState.location,
        image: formState.imageFile
          ? URL.createObjectURL(formState.imageFile)
          : "",
      };
      onSubmit(shopData);
      dispatch({ type: "CLEAR" });
    },
    [formState, onSubmit]
  );

  return (
    <StyledDialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ m: 0, p: 2, fontWeight: "bold" }}>
        Add a New Shop
        <StyledIconButton aria-label="close" onClick={onClose}>
          <CloseIcon />
        </StyledIconButton>
      </DialogTitle>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent
          dividers
          sx={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
        >
          <Stack spacing={3} sx={{ pt: 1 }}>
            <StyledTextField
              required
              id="shop-name"
              label="Shop Name (e.g., D-Mart, Lulu Mall)"
              value={formState.shopName}
              onChange={(e) =>
                dispatch({ type: "SET_SHOP_NAME", payload: e.target.value })
              }
            />
            <StyledTextField
              required
              id="shop-category"
              label="Category (e.g., Supermarket, Department Store)"
              value={formState.category}
              onChange={(e) =>
                dispatch({ type: "SET_CATEGORY", payload: e.target.value })
              }
            />
            <StyledTextField
              id="shop-location"
              label="Location (e.g., City, Area)"
              value={formState.location}
              onChange={(e) =>
                dispatch({ type: "SET_LOCATION", payload: e.target.value })
              }
            />
            <StyledTextField
              required
              id="shop-description"
              label="Description"
              value={formState.description}
              onChange={(e) =>
                dispatch({ type: "SET_DESCRIPTION", payload: e.target.value })
              }
              multiline
              rows={3}
            />
            <StyledUploadButton
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              fullWidth
            >
              Upload Shop Image
              <VisuallyHiddenInput
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </StyledUploadButton>
            {formState.imageFile && (
              <StyledTypography variant="body2">
                Selected: {formState.imageFile.name}
              </StyledTypography>
            )}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: "16px 24px" }}>
          <Button onClick={onClose} sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" sx={{ fontWeight: "bold" }}>
            Add Shop
          </Button>
        </DialogActions>
      </Box>
    </StyledDialog>
  );
};
