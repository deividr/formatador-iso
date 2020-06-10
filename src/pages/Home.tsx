import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';

import LogoVisa from '../assets/visa.png';
import LogoElo from '../assets/elo.png';
import { makeStyles, createStyles } from '@material-ui/core';

const useStyles = makeStyles(
  (): Record<any, any> =>
    createStyles({
      container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      },
    })
);

export default (): JSX.Element => {
  const classes = useStyles();

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Typography align="center" variant="h6" color="inherit">
        <Link component={RouterLink} to="/visa">
          <img src={LogoVisa} alt="Logo da Visa" height={150} width={500} />
        </Link>
        <Link component={RouterLink} to="/elo">
          <img src={LogoElo} alt="Logo da Elo" height={250} width={500} />
        </Link>
      </Typography>
    </Container>
  );
};
