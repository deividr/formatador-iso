import MapBit from "./interfaces/MapBit";

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

  return convertToHexa(binario.join('')).toUpperCase();
}

export const convertToHexa = (value: string) => {
  const array = value.match(/.{1,4}/g) as RegExpMatchArray;
  return array.map(value => parseInt(value, 2).toString(16)).join('');
};