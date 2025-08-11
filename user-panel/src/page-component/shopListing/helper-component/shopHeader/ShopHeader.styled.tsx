import { Box, Avatar, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { CSSObject } from "@mui/system";

export const HeaderContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: { xs: 2, sm: 3 },
  pb: { xs: 3, md: 4 },
} as any);

export const StyledAvatar = styled(Avatar)({
  width: { xs: 60, sm: 80 },
  height: { xs: 60, sm: 80 },
  bgcolor: "grey.200",
  border: "1px solid var(--border-color)",
} as any);

export const InfoBox = styled(Box)({} as CSSObject);

export const StyledChip = styled(Chip)({
  mt: 0.5,
} as CSSObject);
