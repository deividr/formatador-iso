import React from 'react';
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

import mapBitElo from './MapBitsElo';
import mapBitVisa from './MapBitsVisa';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: '#ab003c',
      color: theme.palette.common.white,
      fontSize: 16
    }
  })
)(TableCell);

// Tabela dos bits da mensagem
let mapBit: MapBit[];

interface BitProps {
  bandeira: string;
  bits: { content: string | number }[];
  setBits: CallableFunction;
}

class BitTable extends React.PureComponent<BitProps> {
  constructor(props: BitProps) {
    super(props);

    // Importar os bits da mensagem
    if (this.props.bandeira === 'visa') {
      mapBit = mapBitVisa;
    } else {
      mapBit = mapBitElo;
    }
  }

  handleChange = (bit: number, content: string | number) => {
    let newBits = [...this.props.bits];
    newBits[bit].content = content;
    this.props.setBits(newBits);
  };

  render() {
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
                  onChange={e => (e.target.value = e.target.value.toString().slice(0, 4))}
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
                  onChange={e => (e.target.value = e.target.value.toString().slice(0, 16))}
                />
              </TableCell>
            </TableRow>
            {mapBit.map((row: MapBit) => (
              <BitRowTable
                key={row.bit}
                bit={row}
                content={
                  this.props.bits[row.bit]
                    ? this.props.bits[row.bit].content
                    : ''
                }
                handleChange={this.handleChange}
              />
            ))}
          </TableBody>
        </Table>
      </Box>
    );
  }
}

export default BitTable;
