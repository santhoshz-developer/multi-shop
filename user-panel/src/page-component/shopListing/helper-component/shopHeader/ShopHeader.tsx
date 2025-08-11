import { Box, Typography, Avatar, Chip } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Shop } from '@/service/api/shopApi';

export const ShopHeader = ({ shop }: { shop: Shop }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: { xs: 2, sm: 3 },
      pb: { xs: 3, md: 4 },
    }}
  >
    <Avatar
      src={shop?.logo_image}
      alt={`${shop?.name} logo`}
      sx={{
        width: { xs: 60, sm: 80 },
        height: { xs: 60, sm: 80 },
        bgcolor: 'grey.200',
        border: '1px solid var(--border-color)',
      }}
    >
      {shop.name.charAt(0).toUpperCase()}
    </Avatar>
    <Box>
      <Typography variant="h4" component="h1" fontWeight={700}>
        {shop.name}
      </Typography>
      <Chip
        icon={<LocationOnIcon sx={{ fontSize: '1rem' }} />}
        label={shop.location || 'Location not available'}
        size="small"
        variant="outlined"
        sx={{ mt: 0.5 }}
      />
    </Box>
  </Box>
);