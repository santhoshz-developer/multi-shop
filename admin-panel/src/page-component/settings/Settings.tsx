"use client";

import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Card,
  CircularProgress,
  Fade,
  Slide,
  styled,
  useTheme,
  useMediaQuery,
  Container,
  CardContent,
  IconButton,
} from "@mui/material";
import { useShopManagement } from "@/hooks/useShopManagement";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import GeneralSettings from "./helper-component/GeneralSettings";
import Branding from "./helper-component/Branding";
import DangerZone from "./helper-component/DangerZone";
import QrDownload from "./helper-component/QrDownload";
import { useRouter } from "next/navigation";

// INTERFACES
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// STYLED COMPONENTS
const StyledTabs = styled(Tabs)(({ theme }) => ({
  "& .MuiTabs-indicator": {
    backgroundColor: theme.palette.primary.main,
    height: 3,
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  minWidth: 0,
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(3),
  color: theme.palette.text.secondary,
  "&:hover": {
    color: theme.palette.primary.main,
    opacity: 1,
  },
  "&.Mui-selected": {
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.primary.main,
  },
  "& .MuiTab-iconWrapper": {
    marginRight: theme.spacing(1),
  },
}));

const PageContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.grey[50],
  minHeight: "100vh",
}));

// MAIN COMPONENT
const AnimatedTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Fade in={value === index} timeout={500}>
          <Box sx={{ pt: 3 }}>
            <Typography component="div">{children}</Typography>
          </Box>
        </Fade>
      )}
    </div>
  );
};

const ShopSettingsPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { shop, isAllShopsLoading } = useShopManagement();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  if (isAllShopsLoading || !shop) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Fade in={true}>
      <PageContainer>
        <Container maxWidth="lg">
          <Box display="flex" alignItems="center" mb={2}>
            <IconButton
              onClick={() => router.back()}
              sx={{ mr: 1, color: "text.primary" }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: "black" }}
            >
              Shop Settings
            </Typography>
          </Box>

          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
            Manage your shop's details, branding, and other configurations.
          </Typography>

          <Card>
            <CardContent>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <StyledTabs
                  value={activeTab}
                  onChange={handleTabChange}
                  aria-label="shop settings tabs"
                  variant={isMobile ? "scrollable" : "standard"}
                  scrollButtons="auto"
                >
                  <StyledTab
                    icon={<AccountBoxOutlinedIcon />}
                    iconPosition="start"
                    label="General"
                    id="tab-0"
                    aria-controls="tabpanel-0"
                  />
                  <StyledTab
                    icon={<PaletteOutlinedIcon />}
                    iconPosition="start"
                    label="Branding"
                    id="tab-1"
                    aria-controls="tabpanel-1"
                  />
                  <StyledTab
                    icon={<QrCode2Icon />}
                    iconPosition="start"
                    label="Qr Code"
                    id="tab-2"
                    aria-controls="tabpanel-2"
                  />
                  <StyledTab
                    icon={<WarningAmberOutlinedIcon />}
                    iconPosition="start"
                    label="Danger Zone"
                    id="tab-3"
                    aria-controls="tabpanel-3"
                  />
                </StyledTabs>
              </Box>

              <AnimatedTabPanel value={activeTab} index={0}>
                <GeneralSettings shop={shop} />
              </AnimatedTabPanel>
              <AnimatedTabPanel value={activeTab} index={1}>
                <Branding shop={shop} />
              </AnimatedTabPanel>
              <AnimatedTabPanel value={activeTab} index={2}>
                <QrDownload shop={shop} />
              </AnimatedTabPanel>
              <AnimatedTabPanel value={activeTab} index={3}>
                <DangerZone shop={shop} />
              </AnimatedTabPanel>
            </CardContent>
          </Card>
        </Container>
      </PageContainer>
    </Fade>
  );
};

export default ShopSettingsPage;
