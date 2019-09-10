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

export interface Mensagem {
  variant: 'error' | 'success' | 'warning' | 'info';
  mensagem: string;
}

export interface FieldDefault {
  content: string;
  error: boolean;
}
