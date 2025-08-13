// src/components/categories/CategoryModal.tsx
import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { Category } from "@/service/api/categories";

interface CategoryModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
  category: Category | null;
}

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
};

export const CategoryModal: React.FC<CategoryModalProps> = ({
  open,
  onClose,
  onSubmit,
  category,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    if (category) {
      setName(category.name);
      setDescription(category.description);
      setIsActive(category.is_active);
    } else {
      setName("");
      setDescription("");
      setIsActive(true);
      setImage(null);
    }
  }, [category, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("is_active", isActive ? "1" : "0");
    if (image) {
      formData.append("image", image);
    }
    onSubmit(formData);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle} component="form" onSubmit={handleSubmit}>
        <Typography variant="h6" component="h2" mb={2}>
          {category ? "Edit Category" : "Create Category"}
        </Typography>
        <TextField
          fullWidth
          label="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
          multiline
          rows={3}
        />
        <FormControlLabel
          control={
            <Switch
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
          }
          label="Active"
        />
        <Button variant="outlined" component="label" fullWidth sx={{ mt: 2 }}>
          Upload Image
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) =>
              setImage(e.target.files ? e.target.files[0] : null)
            }
          />
        </Button>
        <Box
          sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 1 }}
        >
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            {category ? "Save" : "Create"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
