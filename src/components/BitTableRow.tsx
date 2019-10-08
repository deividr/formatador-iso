import React, { ChangeEvent } from 'react';

import { TableRow, TableCell, TextField } from '@material-ui/core';

import MapBit from './interfaces/Interfaces';

interface BitRowProps {
  bit: MapBit;
  handleChange: CallableFunction;
  index: number;
}

function BitTableRow(props: BitRowProps): JSX.Element {
  const { bit, handleChange } = props;

  const patt =
    bit.formato === 'N' ? new RegExp('[^0-9]') : new RegExp('[^0-9A-Fa-f]');

  return (
    <TableRow>
      <TableCell>{bit.bit}</TableCell>
      <TableCell>{bit.descricao}</TableCell>
      <TableCell>
        {bit.tipo === 'fixo' ? (
          bit.tamanho
        ) : (
          <TextField
            type="number"
            variant="outlined"
            margin="dense"
            fullWidth={true}
            disabled={true}
            value={bit.content.toString().length}
          />
        )}
      </TableCell>
      <TableCell>
        <TextField
          variant="outlined"
          margin="dense"
          fullWidth={true}
          inputProps={{
            maxLength:
              bit.formato === 'B' || bit.formato === 'AB'
                ? bit.tamanho * 2
                : bit.tamanho,
          }}
          name="content"
          error={bit.error}
          value={bit.content}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
            if (
              (bit.formato === 'N' || bit.formato === 'P') &&
              patt.test(e.target.value)
            ) {
              return;
            }

            bit.bit === 1 ? handleChange(e.target.value) : handleChange(e, bit);
          }}
        />
      </TableCell>
    </TableRow>
  );
}

class BitRowTablePure extends React.PureComponent<BitRowProps> {
  render(): JSX.Element {
    return <BitTableRow {...this.props} />;
  }
}

export default BitRowTablePure;
