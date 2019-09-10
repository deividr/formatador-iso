import React, { useState } from 'react';

import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { Container, TextField, TableRow, TableCell } from '@material-ui/core';

import teal from '@material-ui/core/colors/teal';
import Header from '../components/Header';
import Cabecalho from '../components/Cabecalho';
import BitTable from '../components/BitTable';
import MapBit from '../components/interfaces/Interfaces';
import mapBitVisa from '../components/MapBitsVisa';
import Message from '../components/Message';
import { Snackbar } from '@material-ui/core';
import { gerarMapaDeBits, hexa2Binario } from '../components/FuncoesComuns';

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: {
      main: '#f44336'
    }
  }
});

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

  const initialList = mapBitVisa.map<MapBit>((bit: any) => {
    bit.content = '';
    bit.checked = false;
    bit.error = true;
    return bit;
  });

  const queueRef = React.useRef<Mensagem[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [msgIso, setMsgIso] = useState<string>('');
  const [bits, setBits] = useState<MapBit[]>(initialList);
  const [codigoMensagem, setCodigoMensagem] = useState<FieldDefault>({ content: '', error: true });

  const [primeiroMapaBits, setPrimeiroMapaBits] = useState<FieldDefault>({
    content: '',
    error: true
  });

  const [colunas, setColunas] = useState<number>(32);
  const [bitsError, setBitsError] = useState<boolean>(true);

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

  /**
   * Setar os bits que foram ligados como 'checked = true'.
   *
   * @param value Valor do mapa de bits em formato hexadecimal
   * @param newBits Lista completa dos bits
   */
  const setCheckedBits = (value: string, newBits: MapBit[]) => {
    let binario = hexa2Binario(value);

    // Verificar se o segundo mapa de bits está selecionado e não está com erro;
    binario[0] === '1' && !newBits[0].error
      ? (binario = binario.concat(hexa2Binario(newBits[0].content)))
      : (binario = binario.concat(hexa2Binario('0000000000000000')));

    handlerSetBits(
      newBits.map(bit => {
        if (binario[bit.bit - 1] === '1') {
          return { ...bit, checked: true };
        }
        return { ...bit, checked: false, content: '', error: true };
      })
    );
  };

  /**
   * Desmembrar a string que está no campo "String ISO", valorizando os campos
   * da tabela de BITS.
   */
  /*
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
    let mapBits = hexa2Binario(convertido + '0000000000000000');

    let newBits = [...bits];

    //Se o segundo mapa de bits está presente então descompacta.
    if (mapBits[0] === '1') {
      convertido = hexToAscii(msgFormatada.substr(pos, 32));

      newBits[0] = { ...newBits[0], content: convertido, checked: true, error: false };

      pos += 32;

      //Reformata o mapa de bits completo com as informações do segundo mapa de bits.
      mapBits = mapBits.slice(0, 64).concat(hexa2Binario(convertido));
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
*/
  return (<div></div>);
  /*
  (
    <div className="visa-container">
      <ThemeProvider theme={theme}>
        <Header bandeira="visa" />
        
        <Cabecalho
          handlerDesmembrar={() => null}
          handlerGerarInput={() => null}
          handlerAtualizarInput={() => null}
          handlerAnularInput={() => null}
          handlerSetViaYMRB={() => null}
          colunas={colunas}
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
          setCheckedBits={setCheckedBits}>
          <TableRow key="headerMsg">
            <TableCell />
            <TableCell>Header da Mensagem (Desprezado)</TableCell>
            <TableCell>22</TableCell>
            <TableCell>
              <TextField
                variant="outlined"
                margin="dense"
                fullWidth
                inputProps={{ maxLength: 44 }}
                error={true}
                value={''}
                onChange={() => null}
              />
            </TableCell>
          </TableRow>
        </BitTable>
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
      </ThemeProvider>
    </div>
  );
  */
};
