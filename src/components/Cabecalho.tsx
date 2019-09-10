import React, { ChangeEvent } from 'react';
import {
  Box,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Tooltip,
} from '@material-ui/core';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import MapBit from './interfaces/Interfaces';

import { State as StateDefault } from '../pages/Elo';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      marginRight: theme.spacing(1),
      marginTop: theme.spacing(2),
    },
    textField: {
      fontFamily: 'Fira Code, Consolas, monospace',
    },
  })
);

interface CabecalhoProps {
  handlerDesmembrar: () => void;
  handlerGerarInput: () => void;
  handlerAtualizarInput: () => void;
  handlerAnularInput: () => void;
  handlerSetViaYMRB: (checked: boolean) => void;
  stateDefault: StateDefault;
  setStateDefault: (stateDefault: StateDefault) => void;
}

const Cabecalho = (props: CabecalhoProps): JSX.Element => {
  const classes = useStyles(props);

  const {
    handlerDesmembrar,
    handlerGerarInput,
    handlerAtualizarInput,
    handlerAnularInput,
    handlerSetViaYMRB,
    stateDefault,
    setStateDefault,
  } = props;

  const bitsError =
    stateDefault.codigoMensagem.error ||
    stateDefault.primeiroMapaBits.error ||
    stateDefault.bits.some((bit: MapBit) => bit.checked && bit.error);

  return (
    <Box boxShadow={1} marginTop={2} padding={2}>
      <Grid container={true} spacing={1}>
        <Grid item={true} xs={11}>
          <TextField
            id="inputIso"
            variant="outlined"
            multiline={true}
            label="String ISO"
            rows="20"
            fullWidth={true}
            onChange={(e: ChangeEvent<HTMLInputElement>): void =>
              setStateDefault({ ...stateDefault, msgIso: e.target.value })
            }
            value={stateDefault.msgIso}
            InputProps={{ className: classes.textField }}
          />
        </Grid>
        <Grid item={true} xs={1}>
          <TextField
            type="number"
            variant="outlined"
            label="Colunas"
            fullWidth={true}
            value={stateDefault.colunas}
            onChange={(e: ChangeEvent<HTMLInputElement>): void =>
              setStateDefault({
                ...stateDefault,
                colunas: parseInt(e.target.value, 10),
              })
            }
          />
          {stateDefault.viaYMRB !== undefined && (
            <Tooltip title="Indica que string é entrada do YMRB, por tanto o bit 52 tem tamanho de 8">
              <FormControlLabel
                control={
                  <Checkbox
                    value={stateDefault.viaYMRB}
                    onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                      handlerSetViaYMRB(e.target.checked)
                    }
                  />
                }
                label="YMRB"
              />
            </Tooltip>
          )}
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        disabled={stateDefault.msgIso.length === 0}
        onClick={handlerDesmembrar}
      >
        Desmembrar
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        disabled={bitsError}
        onClick={handlerGerarInput}
      >
        Gerar Input
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        disabled={bitsError || stateDefault.codigoMensagem.content === '0400'}
        onClick={handlerAtualizarInput}
      >
        Atualizar Input
      </Button>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        disabled={bitsError || stateDefault.codigoMensagem.content === '0400'}
        onClick={handlerAnularInput}
      >
        Gerar Anulação
      </Button>
    </Box>
  );
};

class CabecalhoPure extends React.PureComponent<CabecalhoProps> {
  render(): JSX.Element {
    return <Cabecalho {...this.props} />;
  }
}

export default CabecalhoPure;
