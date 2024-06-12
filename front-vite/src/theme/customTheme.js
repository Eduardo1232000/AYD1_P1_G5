import { createTheme } from '@mui/material/styles'

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#3498DB',
    },
    secondary: {
      main: '#85929E',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ff9800',
    },
    info: {
      main: '#2196f3',
    },
  },
})

export default customTheme