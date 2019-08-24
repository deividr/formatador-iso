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
  setBitsChecked: CallableFunction;
  onClose: CallableFunction;
}

const DialogBit = (props: DialogBitProps) => {
  const { open, bits, setBitsChecked, onClose } = props;

  const handleToggle = (value: MapBit) => () => {
    const currentIndex = bits.indexOf(value);
    let newbits = [...bits];

    newbits[currentIndex] = { ...newbits[currentIndex], checked: !newbits[currentIndex].checked };

    setBitsChecked(newbits);
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
