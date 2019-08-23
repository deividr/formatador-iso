import React, { ChangeEvent } from 'react';
import { Theme, withStyles, createStyles } from '@material-ui/core/styles';
import {
  Table,
  TableHead,
  TableRow,
  Box,
  TableCell,
  TableBody,
  TextField
} from '@material-ui/core';
import BitRowTable from './BitRowTable';
import MapBit from './interfaces/MapBit';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: '#ab003c',
      color: theme.palette.common.white,
      fontSize: 16
    }
  })
)(TableCell);

interface BitProps {
  bandeira: string;
  bits: MapBit[];
  setBits: CallableFunction;
  codigoMensagem: number;
  setCodigoMensagem: CallableFunction;
  primeiroMapaBits: string;
  setPrimeiroMapaBits: CallableFunction;
}

class BitTable extends React.PureComponent<BitProps> {
  handleChange = (index: number, e: ChangeEvent<any>) => {
    const target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    const bit = this.props.bits[index];

    const tam = bit.formato === 'B' || bit.formato === 'AB' ? bit.tamanho * 2 : bit.tamanho;
    value = value.toString().slice(0, tam);

    let error =
      (bit.tipo === 'fixo' && value.length < tam) || (bit.tipo !== 'fixo' && value.length === 0);

    this.props.setBits(
      this.props.bits.map((bit, index2) => {
        if (index === index2) {
          return { ...bit, [name]: value, error: error };
        } else {
          return bit;
        }
      })
    );
  };

  render() {
    const { codigoMensagem, setCodigoMensagem, primeiroMapaBits, setPrimeiroMapaBits } = this.props;

    return (
      <Box boxShadow={1} marginTop={2} padding={2}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell style={{ width: 10 }}>Sel.</StyledTableCell>
              <StyledTableCell style={{ width: 10 }}>Bit</StyledTableCell>
              <StyledTableCell style={{ width: 200 }}>Descrição</StyledTableCell>
              <StyledTableCell style={{ width: 70 }}>Tamanho</StyledTableCell>
              <StyledTableCell>Conteúdo</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key="1000">
              <TableCell />
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
                />
              </TableCell>
            </TableRow>
            {this.props.bits.map((row: MapBit, index: number) => (
              <BitRowTable key={row.bit} index={index} bit={row} handleChange={this.handleChange} />
            ))}
          </TableBody>
        </Table>
      </Box>
    );
  }
}

export default BitTable;
