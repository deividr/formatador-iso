import React, { ChangeEvent } from 'react';
import { Theme, withStyles, createStyles } from '@material-ui/core/styles';

import {
  Table,
  TableHead,
  TableRow,
  Box,
  TableCell,
  TableBody,
  TextField,
  InputAdornment,
  IconButton
} from '@material-ui/core';

import Menu from '@material-ui/icons/Menu';

import BitRowTable from './BitRowTable';
import MapBit from './interfaces/MapBit';
import DialogBit from './DialogBit';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: '#ab003c',
      color: theme.palette.common.white,
      fontSize: 16
    }
  })
)(TableCell);

interface BitTableProps {
  bandeira: string;
  bits: MapBit[];
  setBits: CallableFunction;
  codigoMensagem: number;
  setCodigoMensagem: CallableFunction;
  primeiroMapaBits: string;
  setPrimeiroMapaBits: CallableFunction;
}

class BitTable extends React.PureComponent<BitTableProps, { open: boolean }> {
  constructor(props: BitTableProps) {
    super(props);
    this.state = { open: false };
  }

  handleChange = (bit: MapBit, e: ChangeEvent<any>) => {
    let { value, name } = e.target;

    const tam = bit.formato === 'B' || bit.formato === 'AB' ? bit.tamanho * 2 : bit.tamanho;
    value = value.toString().slice(0, tam);

    let error =
      (bit.tipo === 'fixo' && value.length < tam) || (bit.tipo !== 'fixo' && value.length === 0);

    this.props.setBits(
      this.props.bits.map(bitAtual => {
        if (bitAtual.bit === bit.bit) {
          return { ...bit, [name]: value, error: error };
        } else {
          return bitAtual;
        }
      })
    );
  };

  render() {
    const {
      bits,
      setBits,
      codigoMensagem,
      setCodigoMensagem,
      primeiroMapaBits,
      setPrimeiroMapaBits
    } = this.props;

    const handleClickOpen = () => {
      this.setState({ open: true });
    };

    const handleClose = () => {
      this.setState({ open: false });
    };

    return (
      <React.Fragment>
        <Box boxShadow={1} marginTop={2} padding={2}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <StyledTableCell style={{ width: 10 }}>Bit</StyledTableCell>
                <StyledTableCell style={{ width: 200 }}>Descrição</StyledTableCell>
                <StyledTableCell style={{ width: 70 }}>Tamanho</StyledTableCell>
                <StyledTableCell>Conteúdo</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key="1000">
                <TableCell />
                <TableCell>Código da Mensagem</TableCell>
                <TableCell>4</TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    value={codigoMensagem}
                    onChange={e => setCodigoMensagem(e.target.value.toString().slice(0, 4))}
                  />
                </TableCell>
              </TableRow>
              <TableRow key="1001">
                <TableCell />
                <TableCell>Primeiro Mapa de Bits</TableCell>
                <TableCell>16</TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    value={primeiroMapaBits}
                    onChange={e => setPrimeiroMapaBits(e.target.value.toString().slice(0, 16))}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            aria-label="toggle password visibility"
                            onClick={handleClickOpen}>
                            <Menu color="secondary" />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </TableCell>
              </TableRow>
              {bits
                .filter(bit => bit.checked)
                .map((bit: MapBit, index: number) => (
                  <BitRowTable
                    key={bit.bit}
                    index={index}
                    bit={bit}
                    handleChange={this.handleChange}
                  />
                ))}
            </TableBody>
          </Table>
        </Box>
        <DialogBit
          open={this.state.open}
          bits={bits}
          setBitsChecked={setBits}
          onClose={handleClose}
        />
      </React.Fragment>
    );
  }
}

export default BitTable;
