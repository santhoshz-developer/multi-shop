// src/config/landing/LandingConfig.tsx
// Remains the same
import { QuickAccessItemData } from "@/page-component/landing/types";
import { JSX, memo } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import KingBedIcon from "@mui/icons-material/KingBed";

export const quickAccessItems: QuickAccessItemData[] = [
  {
    name: "Fresh Mart Supermarket",
    type: "Supermarket",
    icon: "ShoppingCart",
    id: "shop-123",
  },
  {
    name: "Style Studio Salon",
    type: "Salon",
    icon: "ContentCut",
    id: "shop-456",
  },
];

// Icon mapping component
export const IconRenderer = memo(function IconRenderer({
  iconName,
}: {
  iconName: string;
}) {
  const icons: Record<string, JSX.Element> = {
    ShoppingCart: (
      <ShoppingCartIcon
        sx={{ fontSize: "1.2rem", color: "var(--text-secondary)" }}
      />
    ),
    ContentCut: (
      <ContentCutIcon
        sx={{ fontSize: "1.2rem", color: "var(--text-secondary)" }}
      />
    ),
    KingBed: (
      <KingBedIcon
        sx={{ fontSize: "1.2rem", color: "var(--text-secondary)" }}
      />
    ),
  };

  return icons[iconName] || null;
});
IconRenderer.displayName = "IconRenderer";
