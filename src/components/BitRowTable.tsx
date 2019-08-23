import React from 'react';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import MapBit from './interfaces/MapBit';

interface BitRowProps {
  bit: MapBit;
  handleChange: CallableFunction;
  content: {};
  index: number;
}

function BitRowTable(props: BitRowProps) {
  const { bit, content, index, handleChange } = props;

  return (
    <TableRow>
      <TableCell>
        <Checkbox checked={bit.checked} />
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
            onChange={e => {
              const tam = bit.tipo === 'llvar' ? 2 : 3;
              e.target.value = e.target.value.toString().slice(0, tam);
            }}
          />
        )}
      </TableCell>
      <TableCell>
        <TextField
          variant="outlined"
          margin="dense"
          fullWidth
          type={bit.formato === 'N' ? 'number' : 'text'}
          value={content}
          onChange={e => {
            const tam = bit.formato === 'B' || bit.formato === 'AB' ? bit.tamanho * 2 : bit.tamanho;
            const value = e.target.value.toString().slice(0, tam);
            handleChange(index, value);
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
