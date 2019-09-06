import MapBit from './interfaces/MapBit';

/**
 * Gerar o valor do primeiro e segundo mapa de bits.
 *
 * @param newBits Mapa de bits completo
 */
export const gerarMapaDeBits = (newBits: MapBit[]) => {
  const binario = new Array(128).fill('0');

  newBits.forEach(bit => {
    binario[bit.bit - 1] = bit.checked ? 1 : 0;
  });

  return binario2hexa(binario.join('')).toUpperCase();
};

/**
 * Converter uma string de binário em informação hexadecimal.
 *
 * @param value Valor binário a serem convertidos.
 */
export const binario2hexa = (value: string) => {
  const array = value.match(/.{1,4}/g) as RegExpMatchArray;
  return array.map(value => parseInt(value, 2).toString(16)).join('');
};

/**
 * Converter string em binário.
 * 
 * @param value String a ser convertida em binário.
 */
export const hexa2Binario = (value: string) => {
  return [].map
    .call(value, byte =>
      parseInt(byte, 16)
        .toString(2)
        .padStart(4, '0')
    )
    .join('')
    .split('');
}

/**
 * Converter um caracter ASCII em EBCDIC.
 * 
 * @param char_ascii Caracter ASCII que será convertido em EBCDIC
 */
export const ascii2ebcdic = (char_ascii: string) => {
  let char_ebcdic;

  switch (char_ascii.toUpperCase()) {
    case '00':
      char_ebcdic = '00';
      break;
    case '01':
      char_ebcdic = '01';
      break;
    case '02':
      char_ebcdic = '02';
      break;
    case '03':
      char_ebcdic = '03';
      break;
    case '04':
      char_ebcdic = '37';
      break;
    case '05':
      char_ebcdic = '2D';
      break;
    case '06':
      char_ebcdic = '2E';
      break;
    case '07':
      char_ebcdic = '2F';
      break;
    case '08':
      char_ebcdic = '16';
      break;
    case '09':
      char_ebcdic = '05';
      break;
    case '0A':
      char_ebcdic = '25';
      break;
    case '0B':
      char_ebcdic = '0B';
      break;
    case '0C':
      char_ebcdic = '0C';
      break;
    case '0D':
      char_ebcdic = '0D';
      break;
    case '0E':
      char_ebcdic = '0E';
      break;
    case '0F':
      char_ebcdic = '0F';
      break;
    case '10':
      char_ebcdic = '10';
      break;
    case '11':
      char_ebcdic = '11';
      break;
    case '12':
      char_ebcdic = '12';
      break;
    case '13':
      char_ebcdic = '13';
      break;
    case '14':
      char_ebcdic = '3C';
      break;
    case '15':
      char_ebcdic = '3D';
      break;
    case '16':
      char_ebcdic = '32';
      break;
    case '17':
      char_ebcdic = '26';
      break;
    case '18':
      char_ebcdic = '18';
      break;
    case '19':
      char_ebcdic = '19';
      break;
    case '1A':
      char_ebcdic = '3F';
      break;
    case '1B':
      char_ebcdic = '27';
      break;
    case '1C':
      char_ebcdic = '22';
      break;
    case '1D':
      char_ebcdic = '00';
      break;
    case '1E':
      char_ebcdic = '00';
      break;
    case '1F':
      char_ebcdic = '00';
      break;
    case '20':
      char_ebcdic = '40';
      break;
    case '21':
      char_ebcdic = '5A';
      break;
    case '22':
      char_ebcdic = '7F';
      break;
    case '23':
      char_ebcdic = '7B';
      break;
    case '24':
      char_ebcdic = '5B';
      break;
    case '25':
      char_ebcdic = '6C';
      break;
    case '26':
      char_ebcdic = '50';
      break;
    case '27':
      char_ebcdic = '7D';
      break;
    case '28':
      char_ebcdic = '4D';
      break;
    case '29':
      char_ebcdic = '5D';
      break;
    case '2A':
      char_ebcdic = '5C';
      break;
    case '2B':
      char_ebcdic = '4E';
      break;
    case '2C':
      char_ebcdic = '6B';
      break;
    case '2D':
      char_ebcdic = '60';
      break;
    case '2E':
      char_ebcdic = '4B';
      break;
    case '2F':
      char_ebcdic = '61';
      break;
    case '30':
      char_ebcdic = 'F0';
      break;
    case '31':
      char_ebcdic = 'F1';
      break;
    case '32':
      char_ebcdic = 'F2';
      break;
    case '33':
      char_ebcdic = 'F3';
      break;
    case '34':
      char_ebcdic = 'F4';
      break;
    case '35':
      char_ebcdic = 'F5';
      break;
    case '36':
      char_ebcdic = 'F6';
      break;
    case '37':
      char_ebcdic = 'F7';
      break;
    case '38':
      char_ebcdic = 'F8';
      break;
    case '39':
      char_ebcdic = 'F9';
      break;
    case '3A':
      char_ebcdic = '7A';
      break;
    case '3B':
      char_ebcdic = '5E';
      break;
    case '3C':
      char_ebcdic = '4C';
      break;
    case '3D':
      char_ebcdic = '7E';
      break;
    case '3E':
      char_ebcdic = '6E';
      break;
    case '3F':
      char_ebcdic = '6F';
      break;
    case '40':
      char_ebcdic = '7C';
      break;
    case '41':
      char_ebcdic = 'C1';
      break;
    case '42':
      char_ebcdic = 'C2';
      break;
    case '43':
      char_ebcdic = 'C3';
      break;
    case '44':
      char_ebcdic = 'C4';
      break;
    case '45':
      char_ebcdic = 'C5';
      break;
    case '46':
      char_ebcdic = 'C6';
      break;
    case '47':
      char_ebcdic = 'C7';
      break;
    case '48':
      char_ebcdic = 'C8';
      break;
    case '49':
      char_ebcdic = 'C9';
      break;
    case '4A':
      char_ebcdic = 'D1';
      break;
    case '4B':
      char_ebcdic = 'D2';
      break;
    case '4C':
      char_ebcdic = 'D3';
      break;
    case '4D':
      char_ebcdic = 'D4';
      break;
    case '4E':
      char_ebcdic = 'D5';
      break;
    case '4F':
      char_ebcdic = 'D6';
      break;
    case '50':
      char_ebcdic = 'D7';
      break;
    case '51':
      char_ebcdic = 'D8';
      break;
    case '52':
      char_ebcdic = 'D9';
      break;
    case '53':
      char_ebcdic = 'E2';
      break;
    case '54':
      char_ebcdic = 'E3';
      break;
    case '55':
      char_ebcdic = 'E4';
      break;
    case '56':
      char_ebcdic = 'E5';
      break;
    case '57':
      char_ebcdic = 'E6';
      break;
    case '58':
      char_ebcdic = 'E7';
      break;
    case '59':
      char_ebcdic = 'E8';
      break;
    case '5A':
      char_ebcdic = 'E9';
      break;
    case '5B':
      char_ebcdic = 'AD';
      break;
    case '5C':
      char_ebcdic = '00';
      break;
    case '5D':
      char_ebcdic = 'BD';
      break;
    case '5E':
      char_ebcdic = '5F';
      break;
    case '5F':
      char_ebcdic = '6D';
      break;
    case '60':
      char_ebcdic = '7D';
      break;
    case '61':
      char_ebcdic = '81';
      break;
    case '62':
      char_ebcdic = '82';
      break;
    case '63':
      char_ebcdic = '83';
      break;
    case '64':
      char_ebcdic = '84';
      break;
    case '65':
      char_ebcdic = '85';
      break;
    case '66':
      char_ebcdic = '86';
      break;
    case '67':
      char_ebcdic = '87';
      break;
    case '68':
      char_ebcdic = '88';
      break;
    case '69':
      char_ebcdic = '89';
      break;
    case '6A':
      char_ebcdic = '91';
      break;
    case '6B':
      char_ebcdic = '92';
      break;
    case '6C':
      char_ebcdic = '93';
      break;
    case '6D':
      char_ebcdic = '94';
      break;
    case '6E':
      char_ebcdic = '95';
      break;
    case '6F':
      char_ebcdic = '96';
      break;
    case '70':
      char_ebcdic = '97';
      break;
    case '71':
      char_ebcdic = '98';
      break;
    case '72':
      char_ebcdic = '99';
      break;
    case '73':
      char_ebcdic = 'A2';
      break;
    case '74':
      char_ebcdic = 'A3';
      break;
    case '75':
      char_ebcdic = 'A4';
      break;
    case '76':
      char_ebcdic = 'A5';
      break;
    case '77':
      char_ebcdic = 'A6';
      break;
    case '78':
      char_ebcdic = 'A7';
      break;
    case '79':
      char_ebcdic = 'A8';
      break;
    case '7A':
      char_ebcdic = 'A9';
      break;
    case '7B':
      char_ebcdic = '8B';
      break;
    case '7C':
      char_ebcdic = '00';
      break;
    case '7D':
      char_ebcdic = '9B';
      break;
    case '7E':
      char_ebcdic = '00';
      break;
    case '7F':
      char_ebcdic = '07';
      break;
    default:
      char_ebcdic = char_ascii;
  }

  return char_ebcdic;
}

/**
 * Converter um caracter EBCDIC em ASCII.
 * 
 * @param char_ascii Caracter EBCDIC que será convertido em ASCII.
 */
export const ebcdic2ascii = (char_ebcdic: string) => {
  let char_ascii;

  switch (char_ebcdic) {
    case '00':
      char_ascii = '00';
      break;
    case '01':
      char_ascii = '01';
      break;
    case '02':
      char_ascii = '02';
      break;
    case '03':
      char_ascii = '03';
      break;
    case '37':
      char_ascii = '04';
      break;
    case '2D':
      char_ascii = '05';
      break;
    case '2E':
      char_ascii = '06';
      break;
    case '2F':
      char_ascii = '07';
      break;
    case '16':
      char_ascii = '08';
      break;
    case '05':
      char_ascii = '09';
      break;
    case '25':
      char_ascii = '0A';
      break;
    case '0B':
      char_ascii = '0B';
      break;
    case '0C':
      char_ascii = '0C';
      break;
    case '0D':
      char_ascii = '0D';
      break;
    case '0E':
      char_ascii = '0E';
      break;
    case '0F':
      char_ascii = '0F';
      break;
    case '10':
      char_ascii = '10';
      break;
    case '11':
      char_ascii = '11';
      break;
    case '12':
      char_ascii = '12';
      break;
    case '13':
      char_ascii = '13';
      break;
    case '3C':
      char_ascii = '14';
      break;
    case '3D':
      char_ascii = '15';
      break;
    case '32':
      char_ascii = '16';
      break;
    case '26':
      char_ascii = '17';
      break;
    case '18':
      char_ascii = '18';
      break;
    case '19':
      char_ascii = '19';
      break;
    case '3F':
      char_ascii = '1A';
      break;
    case '27':
      char_ascii = '1B';
      break;
    case '22':
      char_ascii = '1C';
      break;
    case '40':
      char_ascii = '20';
      break;
    case '5A':
      char_ascii = '21';
      break;
    case '7F':
      char_ascii = '22';
      break;
    case '7B':
      char_ascii = '23';
      break;
    case '5B':
      char_ascii = '24';
      break;
    case '6C':
      char_ascii = '25';
      break;
    case '50':
      char_ascii = '26';
      break;
    case '7D':
      char_ascii = '27';
      break;
    case '4D':
      char_ascii = '28';
      break;
    case '5D':
      char_ascii = '29';
      break;
    case '5C':
      char_ascii = '2A';
      break;
    case '4E':
      char_ascii = '2B';
      break;
    case '6B':
      char_ascii = '2C';
      break;
    case '60':
      char_ascii = '2D';
      break;
    case '4B':
      char_ascii = '2E';
      break;
    case '61':
      char_ascii = '2F';
      break;
    case 'F0':
      char_ascii = '30';
      break;
    case 'F1':
      char_ascii = '31';
      break;
    case 'F2':
      char_ascii = '32';
      break;
    case 'F3':
      char_ascii = '33';
      break;
    case 'F4':
      char_ascii = '34';
      break;
    case 'F5':
      char_ascii = '35';
      break;
    case 'F6':
      char_ascii = '36';
      break;
    case 'F7':
      char_ascii = '37';
      break;
    case 'F8':
      char_ascii = '38';
      break;
    case 'F9':
      char_ascii = '39';
      break;
    case '7A':
      char_ascii = '3A';
      break;
    case '5E':
      char_ascii = '3B';
      break;
    case '4C':
      char_ascii = '3C';
      break;
    case '7E':
      char_ascii = '3D';
      break;
    case '6E':
      char_ascii = '3E';
      break;
    case '6F':
      char_ascii = '3F';
      break;
    case '7C':
      char_ascii = '40';
      break;
    case 'C1':
      char_ascii = '41';
      break;
    case 'C2':
      char_ascii = '42';
      break;
    case 'C3':
      char_ascii = '43';
      break;
    case 'C4':
      char_ascii = '44';
      break;
    case 'C5':
      char_ascii = '45';
      break;
    case 'C6':
      char_ascii = '46';
      break;
    case 'C7':
      char_ascii = '47';
      break;
    case 'C8':
      char_ascii = '48';
      break;
    case 'C9':
      char_ascii = '49';
      break;
    case 'D1':
      char_ascii = '4A';
      break;
    case 'D2':
      char_ascii = '4B';
      break;
    case 'D3':
      char_ascii = '4C';
      break;
    case 'D4':
      char_ascii = '4D';
      break;
    case 'D5':
      char_ascii = '4E';
      break;
    case 'D6':
      char_ascii = '4F';
      break;
    case 'D7':
      char_ascii = '50';
      break;
    case 'D8':
      char_ascii = '51';
      break;
    case 'D9':
      char_ascii = '52';
      break;
    case 'E2':
      char_ascii = '53';
      break;
    case 'E3':
      char_ascii = '54';
      break;
    case 'E4':
      char_ascii = '55';
      break;
    case 'E5':
      char_ascii = '56';
      break;
    case 'E6':
      char_ascii = '57';
      break;
    case 'E7':
      char_ascii = '58';
      break;
    case 'E8':
      char_ascii = '59';
      break;
    case 'E9':
      char_ascii = '5A';
      break;
    case 'AD':
      char_ascii = '5B';
      break;
    case 'BD':
      char_ascii = '5D';
      break;
    case '5F':
      char_ascii = '5E';
      break;
    case '6D':
      char_ascii = '5F';
      break;
    case '81':
      char_ascii = '61';
      break;
    case '82':
      char_ascii = '62';
      break;
    case '83':
      char_ascii = '63';
      break;
    case '84':
      char_ascii = '64';
      break;
    case '85':
      char_ascii = '65';
      break;
    case '86':
      char_ascii = '66';
      break;
    case '87':
      char_ascii = '67';
      break;
    case '88':
      char_ascii = '68';
      break;
    case '89':
      char_ascii = '69';
      break;
    case '91':
      char_ascii = '6A';
      break;
    case '92':
      char_ascii = '6B';
      break;
    case '93':
      char_ascii = '6C';
      break;
    case '94':
      char_ascii = '6D';
      break;
    case '95':
      char_ascii = '6E';
      break;
    case '96':
      char_ascii = '6F';
      break;
    case '97':
      char_ascii = '70';
      break;
    case '98':
      char_ascii = '71';
      break;
    case '99':
      char_ascii = '72';
      break;
    case 'A2':
      char_ascii = '73';
      break;
    case 'A3':
      char_ascii = '74';
      break;
    case 'A4':
      char_ascii = '75';
      break;
    case 'A5':
      char_ascii = '76';
      break;
    case 'A6':
      char_ascii = '77';
      break;
    case 'A7':
      char_ascii = '78';
      break;
    case 'A8':
      char_ascii = '79';
      break;
    case 'A9':
      char_ascii = '7A';
      break;
    case '8B':
      char_ascii = '7B';
      break;
    case '9B':
      char_ascii = '7D';
      break;
    case '07':
      char_ascii = '7F';
      break;
    default:
      char_ascii = char_ebcdic;
  }

  //Retorna o caracter ASCII
  return String.fromCharCode(parseInt(char_ascii, 16));
}
