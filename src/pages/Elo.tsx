import React, { useState } from 'react';
import Header from '../components/Header';
import Cabecalho from '../components/Cabecalho';
import BitTable from '../components/BitTable';
import mapBitElo from '../components/MapBitsElo';
import Message from '../components/Message';
import { Snackbar } from '@material-ui/core';
import {
  gerarMapaDeBits,
  hexa2Binario,
  quebrarLinhas,
} from '../components/FuncoesComuns';

import MapBit, { State, Mensagem } from '../components/interfaces/Interfaces';

// Converter a String em HEX para ASCII
function hexToAscii(txt_hex: string): string {
  let txt_ascii = '';

  for (let i = 0; i < txt_hex.length; i += 2) {
    txt_ascii += String.fromCharCode(parseInt(txt_hex.substr(i, 2), 16));
  }

  return txt_ascii;
}

// Converter a String de ASCII para HEX
function convertAsciiToHex(txt_ascii: string): string {
  let txt_hex = '';

  for (let i = 0; i < txt_ascii.length; i++) {
    txt_hex += Number(txt_ascii.charCodeAt(i)).toString(16);
  }

  return txt_hex;
}

const Elo = (): JSX.Element => {
  const patt = new RegExp('[^0-9]');

  const initialList = mapBitElo.map<MapBit>((bit: any) => {
    bit.content = '';
    bit.checked = false;
    bit.error = true;
    return bit;
  });

  const queueRef = React.useRef<Mensagem[]>([]);

  const [state, setState] = useState<State>({
    msgIso: '',
    bits: initialList,
    headerMensagem: { content: '', error: false },
    codigoMensagem: { content: '', error: true },
    primeiroMapaBits: { content: '', error: true },
    colunas: 32,
    viaYMRB: false,
  });

  const [open, setOpen] = useState<boolean>(false);

  const [mensagem, setMensagem] = useState<Mensagem | undefined>({
    variant: 'error',
    mensagem: '',
  });

  const processQueue = (): void => {
    if (queueRef.current.length > 0) {
      setMensagem(queueRef.current.shift());
      setOpen(true);
    }
  };

  const showMensagem = (newMsg: Mensagem): void => {
    queueRef.current.push(newMsg);

    if (open) {
      // immediately begin dismissing current message
      // to start showing new one
      handleClose();
    } else {
      processQueue();
    }
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleExited = (): void => {
    processQueue();
  };

  const handlerSetViaYMRB = (checked: boolean): void => {
    const tamanho = checked ? 4 : 16;

    setState({
      ...state,
      viaYMRB: checked,
      bits: state.bits.map((bit: MapBit) => {
        if (bit.bit === 52) {
          return { ...bit, tamanho };
        }
        return bit;
      }),
    });
  };

  /**
   * Desmembrar a string que está no campo "String ISO", valorizando os campos
   * da tabela de BITS.
   */
  const handlerDesmembrar = (): void => {
    // Obter o texto da área de input retirando as quebras de linhas e os espaços:
    let msgFormatada = state.msgIso.replace(/\n/g, '').replace(/\s/g, '');
    // Posição do cursor na string
    let pos = 0;

    // Obter o código da mensagem:
    let content = hexToAscii(msgFormatada.substr(pos, 8));

    const codigoMensagem = {
      content,
      error: parseInt(content, 10) ? false : true,
    };
    pos += 8;

    // Obter o primeiro mapa de bits:
    content = hexToAscii(msgFormatada.substr(pos, 32));

    const primeiroMapaBits = { content, error: false };

    pos += 32;

    // Efetuar a conversão para binário considerando o segundo mapa de bits todo zerado.
    let mapBits = hexa2Binario(content + '0000000000000000');

    let newBits = [...state.bits];

    // Se o segundo mapa de bits está presente então descompacta.
    if (mapBits[0] === '1') {
      content = hexToAscii(msgFormatada.substr(pos, 32));

      newBits[0] = {
        ...newBits[0],
        content,
        checked: true,
        error: false,
      };

      pos += 32;

      // Reformata o mapa de bits completo com as informações do segundo mapa de bits.
      mapBits = mapBits.slice(0, 64).concat(hexa2Binario(content));
    }

    const bitsUndefined: number[] = [];

    mapBits.forEach((bit: string, index: number) => {
      if (bit === '1') {
        index++;
        if (!newBits.some((mapBit: MapBit) => mapBit.bit === index)) {
          bitsUndefined.push(index);
        }
      }
    });

    if (bitsUndefined.length > 0) {
      showMensagem({
        variant: 'error',
        mensagem: `Os Bits ${bitsUndefined.join(
          ','
        )} não constam mapeados atualmente!`,
      });
      return;
    }

    newBits = newBits.map((bit: MapBit) => {
      if (bit.bit === 1) {
        return bit;
      }

      if (mapBits[bit.bit - 1] === '1') {
        // Verificar se o bin tem um formato binário:
        const ehBinario = bit.formato === 'B' || bit.formato === 'AB';

        if (bit.tipo === 'llvar' || bit.tipo === 'lllvar') {
          const tamField = bit.tipo === 'llvar' ? 4 : 6;

          const tam = ehBinario
            ? parseInt(hexToAscii(msgFormatada.substr(pos, tamField)), 10)
            : parseInt(hexToAscii(msgFormatada.substr(pos, tamField)), 10) * 2;

          pos += tamField;

          content = ehBinario
            ? msgFormatada.substr(pos, tam)
            : hexToAscii(msgFormatada.substr(pos, tam));

          pos += tam;
        } else {
          const tam = bit.tamanho * 2;

          content = ehBinario
            ? msgFormatada.substr(pos, tam)
            : hexToAscii(msgFormatada.substr(pos, tam));

          pos += tam;
        }

        const error =
          (bit.formato === 'N' && patt.test(content)) ||
          (bit.tipo === 'fixo' && content.length < bit.tamanho);

        return { ...bit, content, checked: true, error };
      } else {
        return { ...bit, content: '', checked: false, error: true };
      }
    });

    // Quebrar as linhas no número de definido de colunas.
    msgFormatada = quebrarLinhas(msgFormatada, state.colunas);

    setState({
      ...state,
      msgIso: msgFormatada,
      codigoMensagem,
      primeiroMapaBits,
      bits: newBits,
    });

    // Se existir algum bit com erro formata a mensagem com alerta:
    newBits.some((bit: MapBit) => bit.checked && bit.error)
      ? showMensagem({
          variant: 'warning',
          mensagem: 'Área desmembrada, porém existem bits com erros!',
        })
      : showMensagem({
          variant: 'success',
          mensagem: 'Área desmembrada com sucesso!',
        });
  };

  const handlerGerarInput = (): void => {
    const msgIso = formatarMensagemInput(state);

    setState({ ...state, msgIso });

    showMensagem({ variant: 'success', mensagem: 'Input gerado com sucesso!' });
  };

  const handlerAtualizarInput = (): void => {
    const bits = [...state.bits];

    // Atualizar o bit 4, valor da transação, acrescentando 10 centavos.
    let idx = bits.findIndex((bit: MapBit) => bit.bit === 4);
    let content = (parseInt(bits[idx].content, 10) + 1)
      .toString()
      .padStart(12, '0');
    bits[idx] = { ...bits[idx], content };

    // Se está presente, atualizar o bit 5, também com 10 centavos.
    idx = bits.findIndex((bit: MapBit) => bit.bit === 5);

    if (bits[idx].checked) {
      content = (parseInt(bits[idx].content, 10) + 1)
        .toString()
        .padStart(12, '0');
      bits[idx] = { ...bits[idx], content };
    }

    // Atualizar o bit 7, data e hora:
    const hoje = new Date();
    const dia = hoje
      .getDate()
      .toString()
      .padStart(2, '0');
    const mes = (hoje.getMonth() + 1).toString().padStart(2, '0');

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

    idx = bits.findIndex((bit: MapBit) => bit.bit === 7);
    bits[idx] = { ...bits[idx], content: mes + dia + hora };

    // Atualizar o bit 11:
    idx = bits.findIndex((bit: MapBit) => bit.bit === 11);
    content = (parseInt(bits[idx].content, 10) + 1).toString().padStart(6, '0');
    const bit11 = content;
    bits[idx] = { ...bits[idx], content };

    // Atualizar o bit 12:
    idx = bits.findIndex((bit: MapBit) => bit.bit === 12);
    bits[idx] = { ...bits[idx], content: hora };

    // Atualizar o bit 13:
    idx = bits.findIndex((bit: MapBit) => bit.bit === 13);
    bits[idx] = { ...bits[idx], content: mes + dia };

    // Obter informações do bit 41:
    idx = bits.findIndex((bit: MapBit) => bit.bit === 41);
    const bit41 = bits[idx];

    // Atualizar o bit 37:
    idx = bits.findIndex((bit: MapBit) => bit.bit === 37);
    content = bit41.content.substr(0, 2) + bit41.content.substr(4, 4) + bit11;
    bits[idx] = { ...bits[idx], content };

    const newState = { ...state, bits };

    newState.msgIso = formatarMensagemInput(newState);

    setState(newState);

    showMensagem({
      variant: 'success',
      mensagem: 'Mensagem atualizada com sucesso!',
    });
  };

  const handlerAnularInput = (): void => {
    let bit11 = '';
    let bit12 = '';
    let bit13 = '';
    let bit32 = '';
    let bit33 = '';
    let bit38 = '';
    let bit49 = '';

    const bits = state.bits.map((bit: MapBit) => {
      // Desmarcar os bits que não devem vir:
      if (
        bit.checked &&
        [26, 39, 46, 52, 53, 62, 63, 126].some(
          (bitNum: number) => bitNum === bit.bit
        )
      ) {
        return {
          ...bit,
          checked: false,
          content: '',
          error: true,
        };
      }

      if (bit.bit === 11) {
        bit11 = bit.content;
      }

      if (bit.bit === 12) {
        bit12 = bit.content;
      }

      if (bit.bit === 13) {
        bit13 = bit.content;
      }

      if (bit.bit === 25) {
        const content = bit.content === '' ? '00' : bit.content;
        return {
          ...bit,
          checked: true,
          content,
          error: false,
        };
      }

      if (bit.bit === 32) {
        bit32 = bit.content === '' ? '00000000000' : bit.content;
      }

      if (bit.bit === 33) {
        bit33 = bit.content === '' ? '00000000000' : bit.content;
      }

      if (bit.bit === 38) {
        bit38 = bit.content === '' ? '000000' : bit.content;
        return {
          ...bit,
          checked: true,
          content: bit38,
          error: false,
        };
      }

      if (bit.bit === 49) {
        bit49 = bit.content;
      }

      if (bit.bit === 90) {
        let content = state.codigoMensagem.content + bit11 + bit12 + bit13;

        content +=
          bit49 === '846'
            ? bit38.concat('0000000000000000')
            : bit32.concat(bit33);

        const error = content.length < bit.tamanho;

        return { ...bit, checked: true, content, error };
      }

      return bit;
    });

    // Ligar o bit 1, segundo mapa de bits.
    bits[0] = { ...bits[0], checked: true, error: false };

    const mapaCompleto = gerarMapaDeBits(bits);

    // Formatar o conteúdo do segundo mapa de bits.
    bits[0] = { ...bits[0], content: mapaCompleto.slice(16) };

    // Valorizar o código da mensagem como anulação = 0400.
    const codigoMensagem = { content: '0400', error: false };

    // Valorizar o primeiro mapa de bits com os novos bits de anulação.
    const primeiroMapaBits = {
      content: mapaCompleto.slice(0, 16),
      error: false,
    };

    const newState = { ...state, codigoMensagem, primeiroMapaBits, bits };

    newState.msgIso = formatarMensagemInput(newState);

    setState(newState);

    showMensagem({
      variant: 'success',
      mensagem: 'Mensagem anulada com sucesso!',
    });
  };

  /**
   * Gerar a sting da input da mensagem ISO.
   *
   * @param state Estado atualizado para a formatação da input.
   */
  const formatarMensagemInput = (stateAtul: State): string => {
    const { codigoMensagem, primeiroMapaBits, bits } = stateAtul;

    let msgIso = convertAsciiToHex(codigoMensagem.content);

    msgIso += convertAsciiToHex(primeiroMapaBits.content);

    bits
      .filter((bit: MapBit) => bit.checked)
      .forEach((bit: MapBit) => {
        const ehBinario = bit.formato === 'B' || bit.formato === 'AB';

        switch (bit.tipo) {
          case 'llvar':
            msgIso += convertAsciiToHex(
              bit.content.length.toString().padStart(2, '0')
            );
            msgIso += ehBinario ? bit.content : convertAsciiToHex(bit.content);
            break;

          case 'lllvar':
            msgIso += convertAsciiToHex(
              bit.content.length.toString().padStart(3, '0')
            );
            msgIso += ehBinario ? bit.content : convertAsciiToHex(bit.content);
            break;

          default:
            msgIso += ehBinario ? bit.content : convertAsciiToHex(bit.content);
            break;
        }
      });

    // Quebrar as linhas no número de definido de colunas.
    msgIso = quebrarLinhas(msgIso, state.colunas).toUpperCase();

    return msgIso;
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
        stateDefault={state}
        setStateDefault={setState}
      />
      <BitTable
        bandeira="elo"
        stateDefault={state}
        setStateDefault={setState}
      />
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        onExited={handleExited}
      >
        <Message
          onClose={handleClose}
          variant={mensagem ? mensagem.variant : 'error'}
          message={mensagem ? mensagem.mensagem : ''}
        />
      </Snackbar>
    </div>
  );
};

export default Elo;
