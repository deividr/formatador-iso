import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { AppBar, Toolbar, Button, Typography, Box, Link } from '@material-ui/core';

import visaLogo from '../assets/visa_p.png';
import eloLogo from '../assets/elo_p.png';

interface HeaderProps {
  bandeira: 'visa' | 'elo';
}

function Header(props: HeaderProps) {
  const { bandeira } = props;

  const titulo = bandeira === 'visa' ? 'Formatador de Mensagem' : 'Formatador de Mensagem - vrs. 16.2';

  return (
    <header>
      <AppBar position="static">
        <Toolbar>
          <Box flexGrow={1}>
            <img src={bandeira === 'visa' ? visaLogo : eloLogo} alt="Logo Bandeira" />
          </Box>
          <Box flexGrow={1}>
            <Typography variant="h4">{titulo}</Typography>
          </Box>
          <Link color="inherit" component={RouterLink} to="/" underline="none">
            <Button color="inherit">Sair</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </header>
  );
}

export default Header;
