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
  Button,
} from '@material-ui/core';

import MapBit from './interfaces/Interfaces';
import { gerarMapaDeBits } from './FuncoesComuns';
import { State as StateDefault } from '../pages/Elo';

export interface DialogBitProps {
  open: boolean;
  stateDefault: StateDefault;
  onClose: () => void;
  handleChange1Mapa: (value: string) => void;
  handleChange2Mapa: (value: string) => void;
}

const DialogBit = (props: DialogBitProps): JSX.Element => {
  const { open, onClose, handleChange1Mapa, handleChange2Mapa } = props;

  const handleToggle = (value: MapBit): void => {
    const currentIndex = props.stateDefault.bits.indexOf(value);

    const newBits = [...props.stateDefault.bits];

    newBits[currentIndex] = {
      ...newBits[currentIndex],
      checked: !newBits[currentIndex].checked,
    };

    const hexa = gerarMapaDeBits(newBits);

    if (value.bit < 65) {
      handleChange1Mapa(hexa.slice(0, 16));
    } else {
      handleChange2Mapa(hexa.slice(16));
    }
  };

  return (
    <Dialog
      onClose={(): void => onClose()}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle>Selecione os Bits</DialogTitle>
      <DialogContent>
        <List>
          {props.stateDefault.bits.map((bit: MapBit) => (
            <ListItem
              button={true}
              onClick={(): void => handleToggle(bit)}
              key={bit.bit}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={bit.checked}
                  disableRipple={true}
                />
              </ListItemIcon>
              <ListItemText primary={bit.bit + ' - ' + bit.descricao} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={(): void => onClose()} color="primary">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogBit;
