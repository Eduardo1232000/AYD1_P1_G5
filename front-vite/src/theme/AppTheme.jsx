import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import PropTypes from 'prop-types'
import customTheme from './customTheme'

function AppTheme({ children }) {
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

AppTheme.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AppTheme