export default interface MapBit {
  bit: number;
  tipo: string;
  formato: string;
  tamanho: number;
  descricao: string;
  content: string;
  checked: boolean;
  error: boolean;
}

export type State = {
  msgIso: string;
  bits: MapBit[];
  headerMensagem: FieldDefault;
  codigoMensagem: FieldDefault;
  primeiroMapaBits: FieldDefault;
  colunas: number;
  viaYMRB?: boolean;
};

export type FieldDefault = {
  content: string;
  error: boolean;
};

export type Mensagem = {
  variant: 'error' | 'success' | 'warning' | 'info';
  mensagem: string;
};
