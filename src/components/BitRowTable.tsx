import React from 'react';

import { TableRow, TableCell, TextField } from '@material-ui/core';

import MapBit from './interfaces/MapBit';

interface BitRowProps {
  bit: MapBit;
  handleChange: CallableFunction;
  index: number;
}

function BitRowTable(props: BitRowProps) {
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
          name="content"
          error={bit.error}
          type={bit.formato === 'N' ? 'number' : 'text'}
          value={bit.content}
          onChange={e => handleChange(bit, e)}
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
