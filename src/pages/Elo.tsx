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
    bit.error = true;
    return bit;
  });

  const [bits, setBits] = useState(initialList);
  const [codigoMensagem, setCodigoMensagem] = useState({ content: '', error: true });
  const [primeiroMapaBits, setPrimeiroMapaBits] = useState({ content: '', error: true });

  const handleChangeCodigo = (value: string) => {
    const patt = new RegExp('[^0-9]');
    if (patt.test(value)) return;

    const error = value.length < 4;

    setCodigoMensagem({ content: value, error: error });
  };

  const handleChange1Mapa = (value: string) => {
    value = value.toUpperCase();

    const patt = new RegExp('[^0-9ABCDEF]');
    if (patt.test(value)) return;

    const error = value.length < 16;

    setPrimeiroMapaBits({ content: value, error: error });

    if (!error) setCheckedBits(value);
  };

  // Setar os bits que foram ligados como 'checked = true';
  const setCheckedBits = (value: string) => {
    let binario = convertToBinario(value);

    // Verificar se o segundo mapa de bits está selecionado e não está com erro;
    binario[0] === '1' && !bits[0].error
      ? binario = binario.concat(convertToBinario(bits[0].content.toString()))
      : binario = binario.concat(convertToBinario('0000000000000000'));

    const newBits = bits.map(bit => {
      if (binario[bit.bit - 1] === '1') {
        return { ...bit, checked: true };
      }
      return { ...bit, checked: false, content: '', error: true };
    });

    setBits(newBits);
  };

  const convertToBinario = (value: string) =>
    [].map
      .call(value, byte =>
        parseInt(byte, 16)
          .toString(2)
          .padStart(4, '0')
      )
      .join('')
      .split('');

  //const convertToHexa = (value: string) => parseInt(value, 2).toString(16);

  const desmembrar = () => {};

  return (
    <div className="elo-container">
      <Header bandeira="elo" />
      <Cabecalho desmembrar={desmembrar} msgIso={msgIso} setMsgIso={setMsgIso} />
      <BitTable
        bandeira="elo"
        bits={bits}
        setBits={setBits}
        codigoMensagem={codigoMensagem}
        handleChangeCodigo={handleChangeCodigo}
        primeiroMapaBits={primeiroMapaBits}
        handleChange1Mapa={handleChange1Mapa}
      />
    </div>
  );
};
