import React from 'react';
import { Box, Grid, TextField, FormControlLabel, Checkbox, Button } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      marginRight: theme.spacing(1),
      marginTop: theme.spacing(2)
    }
  })
);

interface CabecalhoProps {
  desmembrar: CallableFunction;
  msgIso: string;
  setMsgIso: CallableFunction;
}

const Cabecalho = (props: CabecalhoProps) => {
  const classes = useStyles();

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
            onChange={e => props.setMsgIso(e.target.value)}
            value={props.msgIso}
          />
        </Grid>
        <Grid item xs={1}>
          <TextField variant="outlined" label="Colunas" type="number" fullWidth />
          <FormControlLabel control={<Checkbox />} label="YMRB" />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        onClick={() => props.desmembrar()}
        className={classes.button}>
        Desmembrar
      </Button>
      <Button variant="contained" color="primary" className={classes.button}>
        Gerar Input
      </Button>
      <Button variant="contained" color="primary" className={classes.button}>
        Atualizar Input
      </Button>
      <Button variant="contained" color="default" className={classes.button}>
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
