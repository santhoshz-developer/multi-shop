// src/components/ProductGrid.styled.tsx
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const TabsContainer = styled(Box)({
  borderBottom: 1,
  borderColor: "divider",
  "& .MuiTabs-indicator": {
    backgroundColor: "var(--accent-color)",
    height: "2px",
  },
  "& .MuiTab-root": {
    textTransform: "none",
    fontWeight: 500,
    fontSize: { xs: "0.875rem", sm: "1rem" },
    minWidth: "auto",
    px: { xs: 2, sm: 3 },
    "&.Mui-selected": {
      color: "var(--accent-color)",
      fontWeight: 600,
    },
  },
});

export const GridContainer = styled(Box)({
  pt: { xs: 2.5, md: 3 },
});

export const NoProductsBox = styled(Box)<{ theme?: any }>({
  flexBasis: "100%",
  maxWidth: { xs: "100%" },
  textAlign: "center",
  py: 8,
} as any);