import React, { useState, ChangeEvent } from 'react';

import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { TextField, TableRow, TableCell } from '@material-ui/core';

import teal from '@material-ui/core/colors/teal';
import Header from '../components/Header';
import Cabecalho from '../components/Cabecalho';
import BitTable from '../components/BitTable';
import mapBitVisa from '../components/MapBitsVisa';
import Message from '../components/Message';
import { Snackbar } from '@material-ui/core';
import {
  gerarMapaDeBits,
  quebrarLinhas,
  hexa2Binario,
  hexa2ascii,
  ascii2hexa,
} from '../components/FuncoesComuns';

import MapBit, { State, Mensagem } from '../components/interfaces/Interfaces';

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: {
      main: '#f44336',
    },
  },
});

export default (): JSX.Element => {
  const pattNum = new RegExp('[^0-9]');
  const pattComp = new RegExp('[^0-9A-Fa-f]');

  const initialList = mapBitVisa.map<MapBit>((bit: any) => {
    bit.content = '';
    bit.checked = false;
    bit.error = true;
    return bit;
  });

  const queueRef = React.useRef<Mensagem[]>([]);

  const [state, setState] = useState<State>({
    msgIso: '',
    bits: initialList,
    headerMensagem: {
      content: '',
      error: true,
    },
    codigoMensagem: {
      content: '',
      error: true,
    },
    primeiroMapaBits: {
      content: '',
      error: true,
    },
    colunas: 32,
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

  const handlerHeaderMensagem = (value: string): void => {
    const error = value.length < 44;

    value = value.toUpperCase();

    setState({
      ...state,
      headerMensagem: { content: value, error },
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

    // Obter header da mensagem:
    let content = msgFormatada.substr(pos, 44);

    const headerMensagem = {
      content,
      error: content.length < 44,
    };

    pos += 44;

    // Obter o código da mensagem:
    content = msgFormatada.substr(pos, 4);

    const codigoMensagem = {
      content,
      error: parseInt(content, 10) ? false : true,
    };

    pos += 4;

    // Obter o primeiro mapa de bits:
    content = msgFormatada.substr(pos, 16);

    const primeiroMapaBits = {
      content,
      error: content.length < 16 ? true : false,
    };

    pos += 16;

    // Efetuar a conversão para binário considerando o segundo mapa de bits todo zerado.
    let mapBits = hexa2Binario(content + '0000000000000000');

    let newBits = [...state.bits];

    // Se o segundo mapa de bits está presente então descompacta.
    if (mapBits[0] === '1') {
      content = msgFormatada.substr(pos, 16);

      newBits[0] = {
        ...newBits[0],
        content,
        checked: true,
        error: false,
      };

      pos += 16;

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
        const ehBinario = bit.formato === 'B';
        const ehCompactado = bit.formato === 'P';

        let tam = bit.formato !== 'P' ? bit.tamanho * 2 : bit.tamanho;

        // Se for campo várivel.
        if (bit.tipo === 'llvar' || bit.tipo === 'lllvar') {
          // Se for binário ou não compactado, o tamanho tem que ser dobrado
          tam =
            ehBinario || !ehCompactado
              ? parseInt(msgFormatada.substr(pos, 2), 16) * 2
              : parseInt(msgFormatada.substr(pos, 2), 16);

          pos += 2;
        }

        // Se o campo for compactado e tamanho for impar, despreza o primeiro byte
        if (ehCompactado && tam % 2 !== 0) {
          pos++;
        }

        if (ehBinario || ehCompactado) {
          content = msgFormatada.substr(pos, tam);
        } else {
          content = hexa2ascii(msgFormatada.substr(pos, tam));
        }

        pos += tam;

        const error =
          (bit.formato === 'N' && pattNum.test(content)) ||
          (bit.formato === 'P' && pattComp.test(content)) ||
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
      headerMensagem,
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
    bits[idx] = { ...bits[idx], content };

    // Atualizar o bit 12:
    idx = bits.findIndex((bit: MapBit) => bit.bit === 12);
    bits[idx] = { ...bits[idx], content: hora };

    // Atualizar o bit 13:
    idx = bits.findIndex((bit: MapBit) => bit.bit === 13);
    bits[idx] = { ...bits[idx], content: mes + dia };

    // Atualizar o bit 37:
    idx = bits.findIndex((bit: MapBit) => bit.bit === 37);
    content = (parseInt(bits[idx].content, 10) + 1)
      .toString()
      .padStart(12, '0');
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
    let bit7 = '0000000000';
    let bit11 = '000000';
    let bit32 = '00000000000';

    const bits = state.bits.map((bit: MapBit) => {
      // Desmarcar os bits que não devem vir:
      if (
        bit.checked &&
        [26, 39, 52, 53, 55, 62, 126].some(
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

      if (bit.bit === 7 && bit.checked) {
        bit7 = bit.content;
      }

      if (bit.bit === 11 && bit.checked) {
        bit11 = bit.content;
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

      if (bit.bit === 32 && bit.checked) {
        bit32 = bit.content.padStart(11, '0');
      }

      if (bit.bit === 38) {
        const content = bit.content === '' ? '000000' : bit.content;
        return {
          ...bit,
          checked: true,
          content,
          error: false,
        };
      }

      if (bit.bit === 90) {
        const content =
          state.codigoMensagem.content + bit11 + bit7 + bit32 + '00000000000';

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
    const {
      headerMensagem,
      codigoMensagem,
      primeiroMapaBits,
      bits,
    } = stateAtul;

    let msgIso = headerMensagem.content;
    msgIso += codigoMensagem.content;
    msgIso += primeiroMapaBits.content;

    bits
      .filter((bit: MapBit) => bit.checked)
      .forEach((bit: MapBit) => {
        const ehBinario = bit.formato === 'B';
        const ehCompactado = bit.formato === 'P';

        if (bit.tipo === 'llvar' || bit.tipo === 'lllvar') {
          let tam = bit.content.length;

          if (ehBinario) {
            tam /= 2;
          }

          msgIso += tam.toString(16).padStart(2, '0');
        }

        // Se o campo for compactado e o tamanho for impar, precisa acrescentar um byte.
        if (ehCompactado && bit.content.length % 2 !== 0) {
          msgIso += '0';
        }

        if (ehBinario || ehCompactado) {
          msgIso += bit.content;
        } else {
          msgIso += ascii2hexa(bit.content);
        }
      });

    // Quebrar as linhas no número de definido de colunas.
    msgIso = quebrarLinhas(msgIso, state.colunas).toUpperCase();

    return msgIso;
  };

  return (
    <div className="visa-container">
      <ThemeProvider theme={theme}>
        <Header bandeira="visa" />
        <Cabecalho
          handlerDesmembrar={handlerDesmembrar}
          handlerGerarInput={handlerGerarInput}
          handlerAtualizarInput={handlerAtualizarInput}
          handlerAnularInput={handlerAnularInput}
          handlerSetViaYMRB={(): null => null}
          stateDefault={state}
          setStateDefault={setState}
        />
        <BitTable
          bandeira="visa"
          stateDefault={state}
          setStateDefault={setState}
        >
          <TableRow key="headerMsg">
            <TableCell />
            <TableCell>Header da Mensagem (Desprezado)</TableCell>
            <TableCell>22</TableCell>
            <TableCell>
              <TextField
                variant="outlined"
                margin="dense"
                fullWidth={true}
                inputProps={{ maxLength: 44 }}
                error={state.headerMensagem.error}
                value={state.headerMensagem.content}
                onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                  handlerHeaderMensagem(e.target.value)
                }
              />
            </TableCell>
          </TableRow>
        </BitTable>
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
      </ThemeProvider>
    </div>
  );
};
