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
}

class BitTable extends React.PureComponent<BitProps> {
  handleChange = (index: number, content: string | number) => {
    this.props.setBits(
      this.props.bits.map((bit, index2) => {
        if (index === index2) {
          return { ...bit, content: content };
        } else {
          return bit;
        }
      })
    );
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
            {this.props.bits.map((row: MapBit, index: number) => (
              <BitRowTable
                key={row.bit}
                index={index}
                bit={row}
                content={row.content}
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
