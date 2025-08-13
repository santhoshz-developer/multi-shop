"use client";

import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SearchIcon from "@mui/icons-material/Search";
import { Category } from "@/service/api/categories";
import { formatDistanceToNow } from "date-fns";

interface CategoryTableProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: number) => void;
  onAddCategory: () => void;
}

export const CategoryTable: React.FC<CategoryTableProps> = ({
  categories,
  onEdit,
  onDelete,
  onAddCategory,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<null | number>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    categoryId: number
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedCategoryId(categoryId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCategoryId(null);
  };

  const handleEdit = () => {
    const categoryToEdit = categories.find((c) => c.id === selectedCategoryId);
    if (categoryToEdit) {
      onEdit(categoryToEdit);
    }
    handleMenuClose();
  };

  const handleDelete = () => {
    if (selectedCategoryId) {
      onDelete(selectedCategoryId);
    }
    handleMenuClose();
  };

  const filteredCategories = useMemo(() => {
    if (!searchTerm) return categories;
    return categories.filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [categories, searchTerm]);

  return (
    <Paper sx={{ borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", p: 3 }}>
      {/* Toolbar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <TextField
          variant="outlined"
          placeholder="Search for a category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: { xs: '100%', sm: 300 } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
            variant="contained"
            onClick={onAddCategory}
            sx={{
                bgcolor: "#6200ea", // A more vibrant purple like in the image
                color: "#ffffff",
                "&:hover": { bgcolor: "#3700b3" },
                textTransform: 'none',
                fontWeight: 'bold',
                px: 3,
                display: { xs: 'none', sm: 'inline-flex' } // Hide on small screens
            }}
        >
            New Category
        </Button>
      </Box>

      {/* Table */}
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="categories table">
          <TableHead>
            <TableRow sx={{ "& .MuiTableCell-head": { fontWeight: "bold", color: 'text.secondary', border: 0 } }}>
              <TableCell>CATEGORY NAME</TableCell>
              <TableCell>IMAGE</TableCell>
              <TableCell>WEIGHTAGE</TableCell>
              <TableCell>UPDATED AT</TableCell>
              <TableCell align="right">ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCategories.map((category) => (
              <TableRow
                key={category.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, '& .MuiTableCell-root': { borderBottom: '1px solid #f0f0f0' } }}
              >
                <TableCell component="th" scope="row">
                  <Typography variant="body1" fontWeight="500">{category.name}</Typography>
                </TableCell>
                <TableCell>
                  <Avatar variant="rounded" src={category.image_url} alt={category.name} />
                </TableCell>
                <TableCell>{category.sort_order}</TableCell>
                <TableCell>
                  {formatDistanceToNow(new Date(category.created_at), { addSuffix: true })}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="more"
                    onClick={(e) => handleMenuClick(e, category.id)}
                  >
                    <MoreHorizIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>Delete</MenuItem>
      </Menu>
    </Paper>
  );
};