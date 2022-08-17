// @packages
import { createTheme } from '@mui/material/styles';

export default createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
  palette: {
    background: {
      default: '#fafafa',
    },
    primary: {
      main: '#54b8a6',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ffb81c',
    },
    google: {
      main: '#db4437',
      contrastText: '#ffffff',
    },
  },
});
