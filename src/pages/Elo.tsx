import React, { useState } from 'react';
import Header from '../components/Header';
import Cabecalho from '../components/Cabecalho';
import BitTable from '../components/BitTable';

export default () => {
  const [msgIso, setMsgIso] = useState('');
  const [bits, setBits] = useState([
    { content: '' },
    {
      content: 'Esse é o bit 1'
    },
    {
      content: 64654654654654
    }
  ]);

  const desmembrar = () => {
    console.log(bits[1].content);
  };

  return (
    <div className="elo-container">
      <Header bandeira="elo" />
      <Cabecalho desmembrar={desmembrar} msgIso={msgIso} setMsgIso={setMsgIso} />
      <BitTable bandeira="elo" bits={bits} setBits={setBits} />
    </div>
  );
};
