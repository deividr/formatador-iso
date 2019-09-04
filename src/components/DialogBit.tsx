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
import { gerarMapaDeBits } from './FuncoesComuns';

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

    let newBits = [...bits];

    newBits[currentIndex] = { ...newBits[currentIndex], checked: !newBits[currentIndex].checked };
    
    const hexa = gerarMapaDeBits(newBits);
    
    if (value.bit < 65) {
      handleChange1Mapa(hexa.slice(0, 16));
    } else {
      handleChange2Mapa(hexa.slice(16,));
    }
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
