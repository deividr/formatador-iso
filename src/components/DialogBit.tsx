import React from 'react';

import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  DialogContent,
  DialogActions,
  Button
} from '@material-ui/core';

import MapBit from './interfaces/MapBit';

export interface DialogBitProps {
  open: boolean;
  bits: MapBit[];
  setBits: CallableFunction;
  onClose: CallableFunction;
  handleChange1Mapa: CallableFunction;
  handleChange2Mapa: CallableFunction;
}

const DialogBit = (props: DialogBitProps) => {
  const { open, bits, onClose, handleChange1Mapa, handleChange2Mapa } = props;

  const handleToggle = (value: MapBit) => () => {
    const currentIndex = bits.indexOf(value);

    let newbits = [...bits];

    newbits[currentIndex] = { ...newbits[currentIndex], checked: !newbits[currentIndex].checked };
    
    const binario = new Array(128).fill("0");
    
    newbits.forEach(bit => {
      binario[bit.bit - 1] = bit.checked ? 1 : 0;
    });
    
    const hexa = convertToHexa(binario.join(''));
    
    if (value.bit < 65) {
      handleChange1Mapa(hexa.slice(0, 16));
    } else {
      handleChange2Mapa(hexa.slice(16,));
      /*
      newbits[0] = {...newbits[0], content: hexa.slice(16,)};
      setBits(newbits);
      */
    }
  };

  const convertToHexa = (value: string) => {
    const array = value.match(/.{1,4}/g) as RegExpMatchArray;
    return array.map(value => parseInt(value, 2).toString(16)).join('');
  };

  return (
    <Dialog onClose={() => onClose()} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle>Selecione os Bits</DialogTitle>
      <DialogContent>
        <List>
          {bits.map((bit: MapBit) => (
            <ListItem button onClick={handleToggle(bit)} key={bit.bit}>
              <ListItemIcon>
                <Checkbox edge="start" checked={bit.checked} disableRipple />
              </ListItemIcon>
              <ListItemText primary={bit.bit + ' - ' + bit.descricao} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()} color="primary">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogBit;
