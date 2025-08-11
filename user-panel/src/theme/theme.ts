"use client";

import { createTheme } from '@mui/material/styles';

// Central theme configuration for a clean, modern e-commerce site
export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: '#008060', // var(--accent-color)
    },
    secondary: {
      main: '#555555', // var(--text-secondary)
    },
    background: {
      default: '#f8f9fa', // var(--background-start)
      paper: '#ffffff',    // var(--background-end)
    },
    text: {
      primary: '#1a1a1a',   // var(--text-primary)
      secondary: '#555555', // var(--text-secondary)
    },
    divider: 'rgba(0, 0, 0, 0.1)', // var(--border-color)
  },
  typography: {
    fontFamily: 'var(--font-geist-sans), "Poppins", sans-serif',
    h2: {
      fontWeight: 700,
      fontSize: '2.2rem',
      '@media (min-width:600px)': {
        fontSize: '2.8rem',
      },
      '@media (min-width:900px)': {
        fontSize: '3.2rem',
      },
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.75rem',
       '@media (min-width:600px)': {
        fontSize: '2.125rem',
      },
    },
     h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
       '@media (min-width:600px)': {
        fontSize: '1.75rem',
      },
    },
     h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 600,
          padding: '10px 20px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        }
      }
    }
  }
});