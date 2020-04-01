import React, { ReactElement } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import 'typeface-roboto';

import Root from './Root';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: grey,
    secondary: grey,
    background: {
      default: '#303030',
      paper: '#383c45',
    },
  },
});

export default function App(): ReactElement {
  return (
    <ThemeProvider theme={theme}>
      <Root />
    </ThemeProvider>
  );
}
