import React, { useState } from 'react';
import Header from '../components/Header';
import Cabecalho from '../components/Cabecalho';
import BitTable from '../components/BitTable';
import MapBit from '../components/interfaces/MapBit';
import mapBitElo from '../components/MapBitsElo';
import Message from '../components/Message';
import { Snackbar } from '@material-ui/core';
import { gerarMapaDeBits } from '../components/FuncoesComuns';

export interface Mensagem {
  variant: 'error' | 'success' | 'warning' | 'info';
  mensagem: string;
}

export interface FieldDefault {
  content: string;
  error: boolean;
}

export default () => {
  const patt = new RegExp('[^0-9]');

  const initialList = mapBitElo.map<MapBit>((bit: any) => {
    bit.content = '';
    bit.checked = false;
    bit.error = true;
    return bit;
  });

  const queueRef = React.useRef<Mensagem[]>([]);
  const [open, setOpen] = useState(false);
  const [msgIso, setMsgIso] = useState('');
  const [bits, setBits] = useState<MapBit[]>(initialList);
  const [codigoMensagem, setCodigoMensagem] = useState<FieldDefault>({ content: '', error: true });
  const [primeiroMapaBits, setPrimeiroMapaBits] = useState<FieldDefault>({
    content: '',
    error: true
  });
  const [colunas, setColunas] = useState(32);
  const [viaYMRB, setViaYMRB] = useState(false);
  const [bitsError, setBitsError] = useState(true);

  const [mensagem, setMensagem] = useState<Mensagem | undefined>({
    variant: 'error',
    mensagem: ''
  });

  const processQueue = () => {
    if (queueRef.current.length > 0) {
      setMensagem(queueRef.current.shift());
      setOpen(true);
    }
  };

  const showMensagem = (newMsg: Mensagem) => {
    queueRef.current.push(newMsg);

    if (open) {
      // immediately begin dismissing current message
      // to start showing new one
      setOpen(false);
    } else {
      processQueue();
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleExited = () => {
    processQueue();
  };

  const handlerSetBits = (newBits: MapBit[]) => {
    setBits(newBits);
    setBitsError(newBits.some(bit => bit.checked && bit.error));
  };

  const handlerSetViaYMRB = (checked: boolean) => {
    setViaYMRB(checked);

    const tam = checked ? 4 : 16;

    setBits(
      bits.map(bit => {
        if (bit.bit === 52) return { ...bit, tamanho: tam };
        return bit;
      })
    );
  };

  /**
   * Desmembrar a string que está no campo "String ISO", valorizando os campos
   * da tabela de BITS.
   */
  const handlerDesmembrar = () => {
    //Obter o texto da área de input retirando as quebras de linhas e os espaços:
    let msgFormatada = msgIso.replace(/\n/g, '').replace(/\s/g, '');
    //Posição do cursor na string
    let pos = 0;

    //Obter o código da mensagem:
    let convertido = hexToAscii(msgFormatada.substr(pos, 8));
    setCodigoMensagem({ content: convertido, error: parseInt(convertido) ? false : true });
    pos += 8;

    //Obter o primeiro mapa de bits:
    convertido = hexToAscii(msgFormatada.substr(pos, 32));
    setPrimeiroMapaBits({ content: convertido, error: false });
    pos += 32;

    //Efetuar a conversão para binário considerando o segundo mapa de bits todo zerado.
    let mapBits = hexToBinario(convertido + '0000000000000000');

    let newBits = [...bits];

    //Se o segundo mapa de bits está presente então descompacta.
    if (mapBits[0] === '1') {
      convertido = hexToAscii(msgFormatada.substr(pos, 32));

      newBits[0] = { ...newBits[0], content: convertido, checked: true, error: false };

      pos += 32;

      //Reformata o mapa de bits completo com as informações do segundo mapa de bits.
      mapBits = mapBits.slice(0, 64).concat(hexToBinario(convertido));
    }

    const bitsUndefined: number[] = [];

    mapBits.forEach((bit, index) => {
      if (bit === '1') {
        index++;
        if (!newBits.some(mapBit => mapBit.bit === index)) bitsUndefined.push(index);
      }
    });

    if (bitsUndefined.length > 0) {
      showMensagem({
        variant: 'error',
        mensagem: `Os Bits ${bitsUndefined.join(',')} não constam mapeados atualmente!`
      });
      return;
    }

    newBits = newBits.map(bit => {
      if (bit.bit === 1) return bit;

      if (mapBits[bit.bit - 1] === '1') {
        //Verificar se o bin tem um formato binário:
        let ehBinario = bit.formato === 'B' || bit.formato === 'AB';

        if (bit.tipo === 'llvar' || bit.tipo === 'lllvar') {
          const tamField = bit.tipo === 'llvar' ? 4 : 6;

          const tam = ehBinario
            ? parseInt(hexToAscii(msgFormatada.substr(pos, tamField)))
            : parseInt(hexToAscii(msgFormatada.substr(pos, tamField))) * 2;

          pos += tamField;

          convertido = ehBinario
            ? msgFormatada.substr(pos, tam)
            : hexToAscii(msgFormatada.substr(pos, tam));

          pos += tam;
        } else {
          const tam = bit.tamanho * 2;

          convertido = ehBinario
            ? msgFormatada.substr(pos, tam)
            : hexToAscii(msgFormatada.substr(pos, tam));

          pos += tam;
        }

        const error =
          (bit.formato === 'N' && patt.test(convertido)) ||
          (bit.tipo === 'fixo' && convertido.length < bit.tamanho);

        return { ...bit, content: convertido, checked: true, error: error };
      } else {
        return { ...bit, content: '', checked: false, error: true };
      }
    });

    handlerSetBits(newBits);

    //Quebrar as linhas no número de definido de colunas.
    msgFormatada = quebrarLinhas(msgFormatada, colunas);

    setMsgIso(msgFormatada);

    //Se existir algum bit com erro formata a mensagem com alerta:
    newBits.some(bit => bit.checked && bit.error)
      ? showMensagem({
          variant: 'warning',
          mensagem: 'Área desmembrada, porém existem bits com erros!'
        })
      : showMensagem({ variant: 'success', mensagem: 'Área desmembrada com sucesso!' });
  };

  /**
   * Setar os bits que foram ligados como 'checked = true'.
   *
   * @param value Valor do mapa de bits em formato hexadecimal
   * @param newBits Lista completa dos bits
   */
  const setCheckedBits = (value: string, newBits: MapBit[]) => {
    let binario = hexToBinario(value);

    // Verificar se o segundo mapa de bits está selecionado e não está com erro;
    binario[0] === '1' && !newBits[0].error
      ? (binario = binario.concat(hexToBinario(newBits[0].content)))
      : (binario = binario.concat(hexToBinario('0000000000000000')));

    handlerSetBits(
      newBits.map(bit => {
        if (binario[bit.bit - 1] === '1') {
          return { ...bit, checked: true };
        }
        return { ...bit, checked: false, content: '', error: true };
      })
    );
  };

  const handlerGerarInput = (
    newBits?: MapBit[],
    cdMsg?: FieldDefault,
    priMapBits?: FieldDefault
  ) => {
    //Se o parâmetro não foi passado, definir o default:
    newBits = newBits === undefined || newBits[0] === undefined ? [...bits] : newBits;
    cdMsg = cdMsg === undefined ? codigoMensagem : cdMsg;
    priMapBits = priMapBits === undefined ? primeiroMapaBits : priMapBits;

    //Se existir bits com erro não prosseguir com a geração da input:
    if (cdMsg.error || priMapBits.error || newBits.some(bit => bit.checked && bit.error)) {
      showMensagem({
        variant: 'error',
        mensagem:
          'Existem bits que estão com informações inválidas, verificar os destaques em vermelho!'
      });
      return;
    }

    let msgFormatada = convertAsciiToHex(cdMsg.content);

    msgFormatada += convertAsciiToHex(priMapBits.content);

    newBits
      .filter(bit => bit.checked)
      .forEach(bit => {
        let ehBinario = bit.formato === 'B' || bit.formato === 'AB';

        switch (bit.tipo) {
          case 'llvar':
            msgFormatada += convertAsciiToHex(bit.content.length.toString().padStart(2, '0'));
            msgFormatada += ehBinario ? bit.content : convertAsciiToHex(bit.content);
            break;

          case 'lllvar':
            msgFormatada += convertAsciiToHex(bit.content.length.toString().padStart(3, '0'));
            msgFormatada += ehBinario ? bit.content : convertAsciiToHex(bit.content);
            break;

          default:
            msgFormatada += ehBinario ? bit.content : convertAsciiToHex(bit.content);
            break;
        }
      });

    //Quebrar as linhas no número de definido de colunas.
    msgFormatada = quebrarLinhas(msgFormatada, colunas);

    setMsgIso(msgFormatada.toUpperCase());
    showMensagem({ variant: 'success', mensagem: 'Input gerado com sucesso!' });
  };

  const handlerAtualizarInput = () => {
    const newBits = [...bits];

    //Atualizar o bit 4, valor da transação, acrescentando 10 centavos.
    let idx = newBits.findIndex(bit => bit.bit === 4);
    let content = (parseInt(newBits[idx].content) + 10).toString().padStart(12, '0');
    newBits[idx] = { ...newBits[idx], content: content };

    //Se está presente, atualizar o bit 5, também com 10 centavos.
    idx = newBits.findIndex(bit => bit.bit === 5);
    if (newBits[idx].checked) {
      content = (parseInt(newBits[idx].content) + 10).toString().padStart(12, '0');
      newBits[idx] = { ...newBits[idx], content: content };
    }

    //Atualizar o bit 7, data e hora:
    let hoje = new Date();
    let dia = hoje
      .getDate()
      .toString()
      .padStart(2, '0');
    let mes = (hoje.getMonth() + 1).toString().padStart(2, '0');

    let hora = hoje
      .getHours()
      .toString()
      .padStart(2, '0');

    hora += hoje
      .getMinutes()
      .toString()
      .padStart(2, '0');

    hora += hoje
      .getSeconds()
      .toString()
      .padStart(2, '0');

    idx = newBits.findIndex(bit => bit.bit === 7);
    newBits[idx] = { ...newBits[idx], content: mes + dia + hora };

    //Atualizar o bit 11:
    idx = newBits.findIndex(bit => bit.bit === 11);
    content = (parseInt(newBits[idx].content) + 1).toString().padStart(6, '0');
    const bit11 = content;
    newBits[idx] = { ...newBits[idx], content: content };

    //Atualizar o bit 12:
    idx = newBits.findIndex(bit => bit.bit === 12);
    newBits[idx] = { ...newBits[idx], content: hora };

    //Atualizar o bit 13:
    idx = newBits.findIndex(bit => bit.bit === 13);
    newBits[idx] = { ...newBits[idx], content: mes + dia };

    //Obter informações do bit 41:
    idx = newBits.findIndex(bit => bit.bit === 41);
    const bit41 = newBits[idx];

    //Atualizar o bit 37:
    idx = newBits.findIndex(bit => bit.bit === 37);
    content = bit41.content.substr(0, 2) + bit41.content.substr(4, 4) + bit11;
    newBits[idx] = { ...newBits[idx], content: content };

    setBits(newBits);
    handlerGerarInput();
  };

  const handlerAnularInput = () => {
    let bit11 = '';
    let bit12 = '';
    let bit13 = '';
    let bit32 = '';
    let bit33 = '';
    let bit38 = '';
    let bit49 = '';

    const newBits = bits.map(bit => {
      //Desmarcar os bits que não devem vir:
      if (bit.checked && [26, 39, 46, 52, 53, 62, 63, 126].some(bitNum => bitNum === bit.bit)) {
        return { ...bit, checked: false, content: '', error: true };
      }

      if (bit.bit === 11) bit11 = bit.content;

      if (bit.bit === 12) bit12 = bit.content;

      if (bit.bit === 13) bit13 = bit.content;

      if (bit.bit === 25) {
        const content = bit.content === '' ? '00' : bit.content;
        return { ...bit, checked: true, content: content, error: false };
      }

      if (bit.bit === 32) bit32 = bit.content === '' ? '00000000000' : bit.content;

      if (bit.bit === 33) bit33 = bit.content === '' ? '00000000000' : bit.content;

      if (bit.bit === 38) {
        bit38 = bit.content === '' ? '000000' : bit.content;
        return { ...bit, checked: true, content: bit38, error: false };
      }

      if (bit.bit === 49) bit49 = bit.content;

      if (bit.bit === 90) {
        let content = codigoMensagem.content + bit11 + bit12 + bit13;
        content += bit49 === '846' ? bit38.concat('0000000000000000') : bit32.concat(bit33);
        const error = content.length < bit.tamanho;
        return { ...bit, checked: true, content: content, error: error };
      }

      return bit;
    });

    //Valorizar o código da mensagem como anulação = 0400.
    const cdMsg = { content: '0400', error: false };
    setCodigoMensagem(cdMsg);
    
    const mapaCompleto = gerarMapaDeBits(newBits);

    //Valorizar o primeiro mapa de bits com os novos bits de anulação.
    const priMapBits = { content: mapaCompleto.slice(0, 16), error: false };
    setPrimeiroMapaBits(priMapBits);

    //Atualizar o segundo mapa de bits se ele estiver chekado:
    if (newBits[0].checked)
      newBits[0] = { ...newBits[0], content: mapaCompleto.slice(16) };

    setBits(newBits);
    handlerGerarInput(newBits, cdMsg, priMapBits);
  };

  return (
    <div className="elo-container">
      <Header bandeira="elo" />
      <Cabecalho
        handlerDesmembrar={handlerDesmembrar}
        handlerGerarInput={handlerGerarInput}
        handlerAtualizarInput={handlerAtualizarInput}
        handlerAnularInput={handlerAnularInput}
        handlerSetViaYMRB={handlerSetViaYMRB}
        colunas={colunas}
        viaYMRB={viaYMRB}
        setColunas={setColunas}
        msgIso={msgIso}
        setMsgIso={setMsgIso}
        bitsError={bitsError}
      />
      <BitTable
        bandeira="elo"
        bits={bits}
        setBits={handlerSetBits}
        codigoMensagem={codigoMensagem}
        setCodigoMensagem={setCodigoMensagem}
        primeiroMapaBits={primeiroMapaBits}
        setPrimeiroMapaBits={setPrimeiroMapaBits}
        setCheckedBits={setCheckedBits}
      />
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        onExited={handleExited}>
        <Message
          onClose={handleClose}
          variant={mensagem ? mensagem.variant : 'error'}
          message={mensagem ? mensagem.mensagem : ''}
        />
      </Snackbar>
    </div>
  );
};

//Converter a String em HEX para ASCII
function hexToAscii(txt_hex: string) {
  let txt_ascii = '';

  for (let i = 0; i < txt_hex.length; i += 2) {
    txt_ascii += String.fromCharCode(parseInt(txt_hex.substr(i, 2), 16));
  }

  return txt_ascii;
}

//Converter a String de ASCII para HEX
function convertAsciiToHex(txt_ascii: string) {
  let txt_hex = '';

  for (let i = 0; i < txt_ascii.length; i++) {
    txt_hex += Number(txt_ascii.charCodeAt(i)).toString(16);
  }

  return txt_hex;
}

//Converter a String em HEX para Binário
function hexToBinario(value: string) {
  return [].map
    .call(value, byte =>
      parseInt(byte, 16)
        .toString(2)
        .padStart(4, '0')
    )
    .join('')
    .split('');
}

//Irá formatar a input com o número de colunas informado no campo Colunas.
function quebrarLinhas(txtInput: string, colunas: number) {
  if (colunas === 0) {
    // Se o número de colunas for igual zeros, não quebra o texto
    return txtInput;
  }

  let txtOutput = '';

  for (let i = 0; i < txtInput.length; i += colunas) {
    txtOutput += txtInput.substr(i, colunas) + '\n';
  }

  return txtOutput;
}
