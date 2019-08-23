import React, { useState } from 'react';
import Header from '../components/Header';
import Cabecalho from '../components/Cabecalho';
import BitTable from '../components/BitTable';
import MapBit from '../components/interfaces/MapBit';
import mapBitElo from '../components/MapBitsElo';

export default () => {
  const [msgIso, setMsgIso] = useState('');

  const initialList = mapBitElo.map<MapBit>((bit: any) => {
    bit.content = '';
    bit.checked = false;
    return bit;
  });

  const [bits, setBits] = useState(initialList);
  const [codigoMensagem, setCodigoMensagem] = useState('');
  const [primeiroMapaBits, setPrimeiroMapaBits] = useState('');

  const desmembrar = () => {};

  return (
    <div className="elo-container">
      <Header bandeira="elo" />
      <Cabecalho desmembrar={desmembrar} msgIso={msgIso} setMsgIso={setMsgIso} />
      <BitTable bandeira="elo" bits={bits} setBits={setBits} />
    </div>
  );
};
