import React, { useState } from 'react';
import api from '../services/api';

import {
  Container,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  Button,
} from '@material-ui/core';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { makeStyles, createStyles } from '@material-ui/styles';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import { login } from '../services/auth';

const useStyles = makeStyles(
  (): Record<any, any> =>
    createStyles({
      container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '90vh',
      },
      paper: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px 20px',
        '& img': { width: '200px', height: '150px', marginBottom: '20px' },
      },
      formControl: {
        width: '100%',
        marginBottom: '20px',
      },
      bottom: {
        marginTop: '10px',
        height: '50px',
        width: '100%',
      },
      titulo: {
        marginBottom: '20px',
      },
      icon: {
        fontSize: '80px',
        marginBottom: '10px',
      },
    })
);

export type State = {
  usuario: string;
  password: string;
  showPassword: boolean;
  error: string;
};

export default (props: any): JSX.Element => {
  const classes = useStyles();

  const [state, setState] = useState<State>({
    usuario: '',
    password: '',
    showPassword: false,
    error: '',
  });

  const handleChange = (
    prop: keyof State
  ): ((event: React.ChangeEvent<HTMLInputElement>) => void) => (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setState({ ...state, [prop]: event.target.value });
  };

  const handleClickShowPassword = (): void => {
    setState({ ...state, showPassword: !state.showPassword });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();
  };

  const handleEntrar = async (e: React.FormEvent): Promise<any> => {
    e.preventDefault();

    const { usuario, password } = state;

    if (!usuario || !password) {
      setState({ ...state, error: 'Preencher usuário e senha' });
    } else {
      try {
        const res = await api.post('/auth', {
          login: usuario,
          password,
        });

        const { token, expiresIn } = res.data;

        login({ token, expiresIn });

        props.history.push('/home');
      } catch (err) {
        setState({ ...state, error: 'Usuário ou senha inválida!' });
      }
    }
  };

  return (
    <Container className={classes.container}>
      <form onSubmit={handleEntrar}>
        <Paper className={classes.paper} elevation={10}>
          <Typography variant="h6" className={classes.titulo}>
            Formatador ISO-8583
          </Typography>
          <FingerprintIcon className={classes.icon} color="primary" />
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="usuario">Usuário</InputLabel>
            <Input
              id="usuario"
              onChange={handleChange('usuario')}
              value={state.usuario}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              type={state.showPassword ? 'text' : 'password'}
              onChange={handleChange('password')}
              value={state.password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {!state.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {state.error && <Typography color="error">{state.error}</Typography>}
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            className={classes.bottom}
          >
            Entrar
          </Button>
        </Paper>
      </form>
    </Container>
  );
};
