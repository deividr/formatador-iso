import React from 'react';
import {
  Box,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Tooltip
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      marginRight: theme.spacing(1),
      marginTop: theme.spacing(2)
    },
    textField: {
      fontFamily: 'Fira Code, Consolas, monospace'
    }
  })
);

interface CabecalhoProps {
  handlerDesmembrar: () => void;
  handlerGerarInput: () => void;
  handlerAtualizarInput: () => void;
  handlerAnularInput: () => void;
  handlerSetViaYMRB: (checked: boolean) => void;
  colunas: number;
  viaYMRB?: boolean;
  setColunas: (colunas: number) => void;
  msgIso: string;
  setMsgIso: (mensagem: string) => void;
  bitsError: boolean;
}

const Cabecalho = (props: CabecalhoProps) => {
  const classes = useStyles();
  const {
    handlerDesmembrar,
    handlerGerarInput,
    handlerAtualizarInput,
    handlerAnularInput,
    handlerSetViaYMRB,
    msgIso,
    setMsgIso,
    colunas,
    viaYMRB,
    setColunas,
    bitsError
  } = props;

  return (
    <Box boxShadow={1} marginTop={2} padding={2}>
      <Grid container spacing={1}>
        <Grid item xs={11}>
          <TextField
            id="inputIso"
            variant="outlined"
            multiline
            label="String ISO"
            rows="20"
            fullWidth
            onChange={e => setMsgIso(e.target.value)}
            value={msgIso}
            InputProps={{ className: classes.textField }}
          />
        </Grid>
        <Grid item xs={1}>
          <TextField
            type="number"
            variant="outlined"
            label="Colunas"
            fullWidth
            value={colunas}
            onChange={e => setColunas(parseInt(e.target.value))}
          />
          {viaYMRB !== undefined && (
            <Tooltip title="Indica que string é entrada do YMRB, por tanto o bit 52 tem tamanho de 8">
              <FormControlLabel
                control={
                  <Checkbox value={viaYMRB} onChange={e => handlerSetViaYMRB(e.target.checked)} />
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
        disabled={msgIso.length === 0}
        onClick={handlerDesmembrar}>
        Desmembrar
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        disabled={bitsError}
        onClick={handlerGerarInput}>
        Gerar Input
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        disabled={bitsError}
        onClick={handlerAtualizarInput}>
        Atualizar Input
      </Button>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        disabled={bitsError}
        onClick={handlerAnularInput}>
        Gerar Anulação
      </Button>
    </Box>
  );
};

class CabecalhoPure extends React.PureComponent<CabecalhoProps> {
  render() {
    return <Cabecalho {...this.props} />;
  }
}

export default CabecalhoPure;
