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
  IconButton,
} from '@material-ui/core';

import { setCheckedBits } from '../components/FuncoesComuns';

import Menu from '@material-ui/icons/Menu';
import BitRowTable from './BitTableRow';
import MapBit from './interfaces/Interfaces';
import DialogBit from './DialogBit';

import { State as StateDefault } from '../pages/Elo';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: '#ab003c',
      color: theme.palette.common.white,
      fontSize: 16,
    },
  })
)(TableCell);

interface BitTableProps {
  bandeira: string;
  stateDefault: StateDefault;
  setStateDefault: (stateDefault: StateDefault) => void;
}

class BitTable extends React.PureComponent<BitTableProps, { open: boolean }> {
  pattHexa: RegExp;
  pattNumber: RegExp;

  constructor(props: BitTableProps) {
    super(props);
    this.state = { open: false };
    this.pattHexa = new RegExp('[^0-9ABCDEF]');
    this.pattNumber = new RegExp('[^0-9]');
  }

  handleChangeCodigo = (value: string): void => {
    if (this.pattNumber.test(value)) {
      return;
    }

    const error = value.length < 4;

    this.props.setStateDefault({
      ...this.props.stateDefault,
      codigoMensagem: { content: value, error },
    });
  };

  handleChange1Mapa = (value: string): void => {
    value = value.toUpperCase();

    if (this.pattHexa.test(value)) {
      return;
    }

    const error = value.length < 16;

    let newBits = [...this.props.stateDefault.bits];

    if (!error) {
      newBits = setCheckedBits(value, newBits);
    }

    this.props.setStateDefault({
      ...this.props.stateDefault,
      primeiroMapaBits: { content: value, error },
      bits: newBits,
    });
  };

  handleChange2Mapa = (content: string): void => {
    content = content.toUpperCase();

    if (this.pattHexa.test(content)) {
      return;
    }

    const error = content.length < 16 || content === '0000000000000000';

    let bits = [...this.props.stateDefault.bits];

    bits[0] = { ...bits[0], content, error };

    /**
     * Se o primeiro e segundo mapa de bits estão ok, então reformata a lista de bits.
     */
    if (!error && !this.props.stateDefault.primeiroMapaBits.error) {
      bits = setCheckedBits(
        this.props.stateDefault.primeiroMapaBits.content,
        bits
      );
    }

    this.props.setStateDefault({ ...this.props.stateDefault, bits });
  };

  handleChange = (e: ChangeEvent<any>, bit: MapBit): void => {
    const { value, name, maxLength } = e.target;

    /**
     * Se o tamanho for fixo e o conteúdo digitado for menor, ou,
     * o tamanho não é fixo porém o campo não está preenchido então
     * flaga o bit com erro.
     */
    const error =
      (bit.tipo === 'fixo' && value.length < maxLength) ||
      (bit.tipo !== 'fixo' && value.length === 0);

    const bits = this.props.stateDefault.bits.map<MapBit>(
      (bitAtual: MapBit) => {
        if (bitAtual.bit === bit.bit) {
          return { ...bit, [name]: value, error };
        } else {
          return bitAtual;
        }
      }
    );

    this.props.setStateDefault({ ...this.props.stateDefault, bits });
  };

  handleClickOpen = (): void => {
    this.setState({ open: true });
  };

  handleClose = (): void => {
    this.setState({ open: false });
  };

  render(): JSX.Element {
    const { bits, codigoMensagem, primeiroMapaBits } = this.props.stateDefault;

    return (
      <React.Fragment>
        <Box boxShadow={1} marginTop={2} padding={2}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <StyledTableCell style={{ width: 10 }}>Bit</StyledTableCell>
                <StyledTableCell style={{ width: 300 }}>
                  Descrição
                </StyledTableCell>
                <StyledTableCell style={{ width: 70 }}>Tamanho</StyledTableCell>
                <StyledTableCell>Conteúdo</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.children}
              <TableRow key="cdMsg">
                <TableCell />
                <TableCell>Código da Mensagem</TableCell>
                <TableCell>4</TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    margin="dense"
                    fullWidth={true}
                    inputProps={{ maxLength: 4 }}
                    error={codigoMensagem.error}
                    value={codigoMensagem.content}
                    onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                      this.handleChangeCodigo(e.target.value)
                    }
                  />
                </TableCell>
              </TableRow>
              <TableRow key="priMapBits">
                <TableCell />
                <TableCell>Primeiro Mapa de Bits</TableCell>
                <TableCell>16</TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    margin="dense"
                    fullWidth={true}
                    error={primeiroMapaBits.error}
                    value={primeiroMapaBits.content}
                    onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                      this.handleChange1Mapa(e.target.value)
                    }
                    inputProps={{ maxLength: 16 }}
                    // eslint-disable-next-line
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            aria-label="toggle password visibility"
                            onClick={this.handleClickOpen}
                          >
                            <Menu color="secondary" />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </TableCell>
              </TableRow>
              {bits
                .filter((bit: MapBit) => bit.checked)
                .map((bit: MapBit, index: number) => (
                  <BitRowTable
                    key={bit.bit}
                    index={index}
                    bit={bit}
                    handleChange={
                      bit.bit === 1 ? this.handleChange2Mapa : this.handleChange
                    }
                  />
                ))}
            </TableBody>
          </Table>
        </Box>
        <DialogBit
          open={this.state.open}
          stateDefault={this.props.stateDefault}
          onClose={this.handleClose}
          handleChange1Mapa={this.handleChange1Mapa}
          handleChange2Mapa={this.handleChange2Mapa}
        />
      </React.Fragment>
    );
  }
}

export default BitTable;
