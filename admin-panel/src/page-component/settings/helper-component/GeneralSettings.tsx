import React from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Button,
  InputAdornment,
  Divider,
} from "@mui/material";
import { Shop } from "../types";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import SaveIcon from "@mui/icons-material/Save";

interface GeneralSettingsProps {
  shop: Shop;
}

const GeneralSettings: React.FC<GeneralSettingsProps> = ({ shop }) => {
  return (
    <Box component="form" noValidate autoComplete="off">
      <Grid container spacing={4}>
        {/* Column 1: Shop Info & Contact */}
        <Grid>
          <Card>
            <CardHeader
              title="Shop Information"
              subheader="Basic details of your shop."
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid>
                  <TextField
                    fullWidth
                    required
                    label="Shop Name"
                    defaultValue={shop.name}
                    variant="outlined"
                  />
                </Grid>
                <Grid>
                  <TextField
                    fullWidth
                    label="Category"
                    defaultValue={shop.category}
                    variant="outlined"
                    helperText="e.g., Electronics, Books, Clothing"
                  />
                </Grid>
                <Grid>
                  <TextField
                    fullWidth
                    label="Description"
                    defaultValue={shop.description}
                    variant="outlined"
                    multiline
                    rows={4}
                    helperText="A brief description of what your shop sells."
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Column 2: Address & Contact */}
        <Grid>
          <Grid container spacing={4}>
            <Grid>
              <Card>
                <CardHeader
                  title="Contact Details"
                  subheader="How customers can reach you."
                />
                <Divider />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid>
                      <TextField
                        fullWidth
                        required
                        type="email"
                        label="Contact Email"
                        defaultValue={shop.contact_email}
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <MailOutlineIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid>
                      <TextField
                        fullWidth
                        label="Contact Phone"
                        defaultValue={shop.contact_phone}
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PhoneOutlinedIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid>
              <Card>
                <CardHeader
                  title="Business Address"
                  subheader="The physical location of your shop."
                />
                <Divider />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid>
                      <TextField
                        fullWidth
                        label="Address"
                        defaultValue={shop.address}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid>
                      <TextField
                        fullWidth
                        label="City"
                        defaultValue={shop.city}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid>
                      <TextField
                        fullWidth
                        label="State"
                        defaultValue={shop.state}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid>
                      <TextField
                        fullWidth
                        label="Postal Code"
                        defaultValue={shop.postal_code}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid>
                      <TextField
                        fullWidth
                        label="Country"
                        defaultValue={shop.country}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
        <Button variant="contained" color="primary" startIcon={<SaveIcon />}>
          Save Changes
        </Button>
      </Box>
    </Box>
  );
};

export default GeneralSettings;
