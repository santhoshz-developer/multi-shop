'use client';

import { createTheme } from '@mui/material/styles';

export const authTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#66b2ff', // A vibrant, accessible blue
    },
    background: {
      paper: 'rgba(255, 255, 255, 0.05)',
    },
    text: {
      primary: '#e0e0e0',
      secondary: '#b3b3b3',
    }
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            transition: 'all 0.3s ease',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.2)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(102, 178, 255, 0.7)',
            },
            '&.Mui-focused': {
              boxShadow: '0 0 10px 2px rgba(102, 178, 255, 0.3)',
              '& fieldset': {
                borderColor: '#66b2ff',
              },
            },
          },
          '& .MuiInputLabel-root': {
            color: 'rgba(255, 255, 255, 0.6)',
            '&.Mui-focused': {
              color: '#66b2ff',
            }
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
            textTransform: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            padding: '10px 20px',
            transition: 'all 0.3s ease-in-out',
        },
        containedPrimary: {
            boxShadow: '0 4px 15px 0 rgba(102, 178, 255, 0.3)',
            '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 20px 0 rgba(102, 178, 255, 0.5)',
            }
        },
        outlined: {
            borderColor: 'rgba(255, 255, 255, 0.3)',
            color: '#e0e0e0',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              borderColor: 'rgba(255, 255, 255, 0.7)',
              transform: 'translateY(-2px)',
            }
        }
      }
    }
  },
});