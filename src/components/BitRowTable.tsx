import React from 'react';

import { TableRow, TableCell, TextField } from '@material-ui/core';

import MapBit from './interfaces/MapBit';

interface BitRowProps {
  bit: MapBit;
  handleChange: CallableFunction;
  index: number;
}

function BitRowTable(props: BitRowProps) {
  const patt = new RegExp('[^0-9]');
  const { bit, handleChange } = props;

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
            fullWidth
            disabled
            value={bit.content.toString().length}
          />
        )}
      </TableCell>
      <TableCell>
        <TextField
          variant="outlined"
          margin="dense"
          fullWidth
          inputProps={{
            maxLength: bit.formato === 'B' || bit.formato === 'AB' ? bit.tamanho * 2 : bit.tamanho
          }}
          name="content"
          error={bit.error}
          value={bit.content}
          onChange={e => {
            if (bit.formato === 'N' || bit.formato === 'P') {
              if (patt.test(e.target.value)) return;
            }
            bit.bit === 1 ? handleChange(e.target.value) : handleChange(e, bit);
          }}
        />
      </TableCell>
    </TableRow>
  );
}

class BitRowTablePure extends React.PureComponent<BitRowProps> {
  render() {
    return <BitRowTable {...this.props} />;
  }
}

export default BitRowTablePure;
