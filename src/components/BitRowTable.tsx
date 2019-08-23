import React from 'react';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import MapBit from './interfaces/MapBit';

interface BitRowProps {
  bit: MapBit;
  handleChange: CallableFunction;
  index: number;
}

function BitRowTable(props: BitRowProps) {
  const { bit, index, handleChange } = props;

  return (
    <TableRow>
      <TableCell>
        <Checkbox name="checked" checked={bit.checked} onChange={e => handleChange(index, e)} />
      </TableCell>
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
          onChange={e => handleChange(index, e)}
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
