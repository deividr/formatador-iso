import React from 'react';

import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { Container, TextField } from '@material-ui/core';

import teal from '@material-ui/core/colors/teal';
import Header from '../components/Header';

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: {
      main: '#f44336'
    }
  }
});

export default () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Header bandeira="visa" />
        <Container fixed>
          <TextField variant="outlined" margin="dense" multiline label="String ISO" rows="20" />
        </Container>
      </ThemeProvider>
    </div>
  );
};
