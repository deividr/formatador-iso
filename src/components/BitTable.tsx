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
  codigoMensagem: { content: string; error: boolean };
  setCodigoMensagem: CallableFunction;
  primeiroMapaBits: { content: string; error: boolean };
  setPrimeiroMapaBits: CallableFunction;
}

class BitTable extends React.PureComponent<BitTableProps, { open: boolean }> {
  constructor(props: BitTableProps) {
    super(props);
    this.state = { open: false };
  }

  handleChangeCodigo = (value: string) => {
    const patt = new RegExp('[^0-9]');
    if (patt.test(value)) return;

    const error = value.length < 4;

    this.props.setCodigoMensagem({ content: value, error: error });
  };

  handleChange1Mapa = (value: string) => {
    value = value.toUpperCase();

    const patt = new RegExp('[^0-9ABCDEF]');

    if (patt.test(value)) return;

    const error = value.length < 16;

    this.props.setPrimeiroMapaBits({ content: value, error: error });

    if (!error) this.setCheckedBits(value, this.props.bits);
  };

  handleChange2Mapa = (value : string) => {
    value = value.toUpperCase();

    const patt = new RegExp('[^0-9ABCDEF]');

    if (patt.test(value)) return;

    let error = value.length < 16 || value === '0000000000000000';

    const newBits = [...this.props.bits];

    newBits[0] = { ...newBits[0], content: value, error: error };

    /**
     * Se o primeiro e segundo mapa de bits estão ok, então reformata a lista de bits.
     */
    if (!error && !this.props.primeiroMapaBits.error) {
      this.setCheckedBits(this.props.primeiroMapaBits.content, newBits);
      return;
    }
    this.props.setBits(newBits);
  };

  // Setar os bits que foram ligados como 'checked = true';
  setCheckedBits = (value: string, newBits: MapBit[]) => {
    let binario = this.convertToBinario(value);

    // Verificar se o segundo mapa de bits está selecionado e não está com erro;
    binario[0] === '1' && !newBits[0].error
      ? (binario = binario.concat(this.convertToBinario(newBits[0].content)))
      : (binario = binario.concat(this.convertToBinario('0000000000000000')));

    this.props.setBits(
      newBits.map(bit => {
        if (binario[bit.bit - 1] === '1') {
          return { ...bit, checked: true };
        }
        return { ...bit, checked: false, content: '', error: true };
      })
    );
  };

  convertToBinario = (value: string) =>
    [].map
      .call(value, byte =>
        parseInt(byte, 16)
          .toString(2)
          .padStart(4, '0')
      )
      .join('')
      .split('');

  handleChange = (e: ChangeEvent<any>, bit: MapBit) => {
    let { value, name, maxLength } = e.target;

    /**
     * Se o tamanho for fixo e o conteúdo digitado for menor, ou,
     * o tamanho não é fixo porém o campo não está preenchido então
     * flaga o bit com erro.
     */
    let error =
      (bit.tipo === 'fixo' && value.length < maxLength) ||
      (bit.tipo !== 'fixo' && value.length === 0);

    const newBits = this.props.bits.map(bitAtual => {
      if (bitAtual.bit === bit.bit) {
        return { ...bit, [name]: value, error: error };
      } else {
        return bitAtual;
      }
    })

    this.props.setBits(newBits);
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { bits, setBits, codigoMensagem, primeiroMapaBits } = this.props;

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
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    inputProps={{ maxLength: 4 }}
                    error={codigoMensagem.error}
                    value={codigoMensagem.content}
                    onChange={e => this.handleChangeCodigo(e.target.value)}
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
                    error={primeiroMapaBits.error}
                    value={primeiroMapaBits.content}
                    onChange={e => this.handleChange1Mapa(e.target.value)}
                    inputProps={{ maxLength: 16 }}
                    //eslint-disable-next-line
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            aria-label="toggle password visibility"
                            onClick={this.handleClickOpen}>
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
                    handleChange={bit.bit === 1 ? this.handleChange2Mapa : this.handleChange}
                  />
                ))}
            </TableBody>
          </Table>
        </Box>
        <DialogBit
          open={this.state.open}
          bits={bits}
          setBits={setBits}
          onClose={this.handleClose}
          handleChange1Mapa={this.handleChange1Mapa}
          handleChange2Mapa={this.handleChange2Mapa}
        />
      </React.Fragment>
    );
  }
}

export default BitTable;
