import React, { useRef, useEffect, useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { motion } from "framer-motion";
import { ShopCategory } from "@/hooks/useShopManagement";

interface ProductTabsProps {
  categories: ShopCategory[];
  activeTab: number;
  onTabChange: (event: React.SyntheticEvent, newValue: number) => void;
}

export const ProductTabs = ({
  categories,
  activeTab,
  onTabChange,
}: ProductTabsProps) => {
  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [gliderStyle, setGliderStyle] = useState<{ x: number; width: number }>({
    x: 0,
    width: 0,
  });

  useEffect(() => {
    const tabElement = tabRefs.current[activeTab];
    if (tabElement) {
      const { offsetLeft, offsetWidth } = tabElement;
      setGliderStyle({ x: offsetLeft, width: offsetWidth });
    }
  }, [activeTab, categories]);

  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: "rgba(255, 255, 255, 0.12)",
        position: "relative",
      }}
    >
      <Tabs
        value={activeTab}
        onChange={onTabChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="Product categories"
        sx={{ "& .MuiTabs-indicator": { display: "none" } }}
      >
        {categories.map((cat, index) => (
          <Tab
            key={cat.id}
            label={cat.name}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              fontWeight: "bold",
              position: "relative",
              zIndex: 1,
              "&.Mui-selected": { color: "white" },
            }}
          />
        ))}
      </Tabs>
      <motion.div
        style={{
          position: "absolute",
          bottom: 0,
          height: "2px",
          backgroundColor: "#2563eb",
          zIndex: 0,
        }}
        animate={{ x: gliderStyle.x, width: gliderStyle.width }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </Box>
  );
};
