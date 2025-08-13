"use client";

import React, { useState } from "react";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CategoryIcon from "@mui/icons-material/Category";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { usePathname, useRouter } from "next/navigation";
import { useShopManagement } from "@/hooks/useShopManagement";
import Link from "next/link";

const drawerWidth = 280;

const ShopLayout = ({ children }: { children: React.ReactNode }) => {
  const { shop } = useShopManagement();
  const router = useRouter();
  const pathname = usePathname();

  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  const handleDrawerToggle = () => setIsDrawerOpen((prev) => !prev);

  const menuItems = shop?.shop_id
    ? [
        {
          text: "Products",
          icon: <StorefrontIcon />,
          path: `/shop/${shop.shop_id}`,
        },
        {
          text: "Categories",
          icon: <CategoryIcon />,
          path: `/shop/${shop.shop_id}/categories`,
        },
        {
          text: "Settings",
          icon: <SettingsIcon />,
          path: `/shop/${shop.shop_id}/settings`,
        },
      ]
    : [];

  const drawerContent = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Toolbar sx={{ display: "flex", alignItems: "center", px: 1, py: 2 }}>
        <Avatar
          src={shop?.logoUrl || "/default-logo.png"}
          sx={{ width: 48, height: 48, mr: 2, border: "2px solid #e0e0e0" }}
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h6" noWrap>
            {shop?.name || "My Shop"}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {shop?.location || "My location"}
          </Typography>
        </Box>
      </Toolbar>

      <Divider />

      <List sx={{ flexGrow: 1 }}>
        {menuItems.map(({ text, icon, path }) => (
          <ListItem key={text} disablePadding>
          <ListItemButton
  component={Link}
  href={path}
  selected={pathname.startsWith(path)}
>
  <ListItemIcon>{icon}</ListItemIcon>
  <ListItemText primary={text} />
</ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => console.log("Logout clicked")}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Top Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: {
            md: isDrawerOpen ? `calc(100% - ${drawerWidth}px)` : "100%",
          },
          ml: { md: isDrawerOpen ? `${drawerWidth}px` : 0 },
          bgcolor: "#fff",
          color: "#000",
          boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Box
        component="nav"
        sx={{
          width: { md: isDrawerOpen ? drawerWidth : 0 },
          flexShrink: { md: 0 },
        }}
      >
        <Drawer
          variant={isLargeScreen ? "persistent" : "temporary"}
          open={isDrawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              borderRight: "1px solid #e0e0e0",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Page Content */}
      <Box component="main" sx={{ flexGrow: 1, bgcolor: "#f0f2f5" }}>
        <Toolbar />
        <Container maxWidth="xl" sx={{ py: 4 }}>
          {children}
        </Container>
      </Box>
    </Box>
  );
};

export default ShopLayout;
