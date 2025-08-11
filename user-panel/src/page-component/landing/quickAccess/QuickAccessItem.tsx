// src/page-component/landing/QuickAccessItem.tsx
"use client";
import { Box, Typography, Chip } from "@mui/material";
import {
  itemVariants,
  QuickAccessItemWrapper,
} from "../landing/LandingPage.styled";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useCallback, memo } from "react";
import { QuickAccessItemProps } from "../types";
import { IconRenderer } from "@/config/landing/LandingConfig";
import { NameBox, NameTypography, ActionsBox } from "./QuickAccessItem.styled";

const QuickAccessItem = memo(function QuickAccessItem({
  item,
  onClick,
}: QuickAccessItemProps) {
  const handleClick = useCallback(() => {
    onClick?.(item.id);
  }, [onClick, item.id]);

  return (
    <QuickAccessItemWrapper variants={itemVariants} onClick={handleClick}>
      <NameBox>
        <IconRenderer iconName={item.icon} />
        <NameTypography variant="body1">{item.name}</NameTypography>
      </NameBox>
      <ActionsBox>
        <Chip label={item.type} size="small" />
        <ArrowForwardIosIcon className="arrow-icon" sx={{ fontSize: "1rem" }} />
      </ActionsBox>
    </QuickAccessItemWrapper>
  );
});
QuickAccessItem.displayName = "QuickAccessItem";

export default QuickAccessItem;
