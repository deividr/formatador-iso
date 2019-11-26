/**
 * Configuração dos bits tratados na mensagem ISO-8583 da ELO.
 *
 * Descrição dos domínios do formato:
 *    A = Alfanumérico
 *    N = Numérico
 *    B = Binário
 *    AB = Alfanumérico e Binário
 *    T = TLF (Tag, Length, Value) **** Ainda não implementado ****
 */
export default [
  {
    bit: 1,
    tipo: 'fixo',
    formato: 'A',
    tamanho: 16,
    descricao: 'Segundo Mapa de bits',
  },

  {
    bit: 2,
    tipo: 'llvar',
    formato: 'N',
    tamanho: 19,
    descricao: 'Número do Cartão (PAN)',
  },

  {
    bit: 3,
    tipo: 'fixo',
    formato: 'N',
    tamanho: 6,
    descricao: 'Código de Processamento',
  },

  {
    bit: 4,
    tipo: 'fixo',
    formato: 'N',
    tamanho: 12,
    descricao: 'Valor Transação na Moeda Local (Valor Solicitado)',
  },

  {
    bit: 5,
    tipo: 'fixo',
    formato: 'N',
    tamanho: 12,
    descricao: 'Valor Transação na Moeda da Liquidação',
  },

  {
    bit: 7,
    tipo: 'fixo',
    formato: 'N',
    tamanho: 10,
    descricao: 'Data e Hora de Transmissão (MMDDHHMMSS)',
  },

  {
    bit: 9,
    tipo: 'fixo',
    formato: 'N',
    tamanho: 8,
    descricao: 'Taxa de Conversão da Moeda Local para Moeda de Liquidação',
  },

  {
    bit: 11,
    tipo: 'fixo',
    formato: 'N',
    tamanho: 6,
    descricao:
      'Número de Identificação da Transação da Solução de Captura (STAN)',
  },

  {
    bit: 12,
    tipo: 'fixo',
    formato: 'N',
    tamanho: 6,
    descricao: 'Hora Local da Transação (HHMMSS)',
  },

  {
    bit: 13,
    tipo: 'fixo',
    formato: 'N',
    tamanho: 4,
    descricao: 'Data Local da transação (MMDD)',
  },

  {
    bit: 14,
    tipo: 'fixo',
    formato: 'N',
    tamanho: 4,
    descricao: 'Data de Validade de Cartão (AAMM)',
  },

  {
    bit: 15,
    tipo: 'fixo',
    formato: 'N',
    tamanho: 4,
    descricao: 'Data da Liquidação (MMDD)',
  },

  {
    bit: 16,
    tipo: 'fixo',
    formato: 'N',
    tamanho: 4,
    descricao: 'Data de Conversão (MMDD)',
  },

  {
    bit: 18,
    tipo: 'fixo',
    formato: 'N',
    tamanho: 4,
    descricao: 'MCC (Merchant Category Code)',
  },

  {
    bit: 19,
    tipo: 'fixo',
    formato: 'N',
    tamanho: 3,
    descricao: 'Código do País do Adquirente',
  },

  {
    bit: 22,
    tipo: 'fixo',
    formato: 'N',
    tamanho: 3,
    descricao: 'Modo de Entrada do PAN',
  },

  {
    bit: 23,
    tipo: 'fixo',
    formato: 'N',
    tamanho: 3,
    descricao: 'Número de Sequência do Cartão',
  },

  {
    bit: 24,
    tipo: 'fixo',
    formato: 'N',
    tamanho: 3,
    descricao: 'Código de Função',
  },

  {
    bit: 25,
    tipo: 'fixo',
    formato: 'N',
    tamanho: 2,
    descricao: 'Código de Motivo da Mensagem',
  },

  {
    bit: 26,
    tipo: 'fixo',
    formato: 'N',
    tamanho: 2,
    descricao: 'Código de Captura do PIN no POS',
  },

  {
    bit: 28,
    tipo: 'fixo',
    formato: 'A',
    tamanho: 9,
    descricao: 'Valor da taxa da transação',
  },

  {
    bit: 32,
    tipo: 'llvar',
    formato: 'N',
    tamanho: 11,
    descricao: 'Código de Identificação da Rede de Captura',
  },

  {
    bit: 33,
    tipo: 'llvar',
    formato: 'N',
    tamanho: 11,
    descricao: 'Código de Identificação da Instituição de Repasse',
  },

  {
    bit: 35,
    tipo: 'llvar',
    formato: 'A',
    tamanho: 37,
    descricao: 'Trilha 2 do Cartão',
  },

  {
    bit: 36,
    tipo: 'lllvar',
    formato: 'A',
    tamanho: 104,
    descricao: 'Trilha 3 do Cartão',
  },

  {
    bit: 37,
    tipo: 'fixo',
    formato: 'A',
    tamanho: 12,
    descricao: 'NSU da Rede de Captura',
  },

  {
    bit: 38,
    tipo: 'fixo',
    formato: 'A',
    tamanho: 6,
    descricao: 'Código de Autorização',
  },

  {
    bit: 39,
    tipo: 'fixo',
    formato: 'A',
    tamanho: 2,
    descricao: 'Código de Resposta',
  },

  {
    bit: 41,
    tipo: 'fixo',
    formato: 'A',
    tamanho: 8,
    descricao: 'Identificação do Terminal do Estabelecimento Comercial',
  },

  {
    bit: 42,
    tipo: 'fixo',
    formato: 'A',
    tamanho: 15,
    descricao: 'Código de Identificação do Estabelecimento',
  },

  {
    bit: 43,
    tipo: 'fixo',
    formato: 'A',
    tamanho: 40,
    descricao: 'Dados do Estabelecimento',
  },

  {
    bit: 45,
    tipo: 'llvar',
    formato: 'A',
    tamanho: 76,
    descricao: 'Trilha 1 do Cartão',
  },

  {
    bit: 46,
    tipo: 'lllvar',
    formato: 'A',
    tamanho: 999,
    descricao: 'Informações Adicionais de Resposta',
  },

  {
    bit: 48,
    tipo: 'lllvar',
    formato: 'A',
    tamanho: 999,
    descricao: 'Informações Adicionais',
  },

  {
    bit: 49,
    tipo: 'fixo',
    formato: 'N',
    tamanho: 3,
    descricao: 'Código da Moeda',
  },

  {
    bit: 50,
    tipo: 'fixo',
    formato: 'N',
    tamanho: 3,
    descricao: 'Código da Moeda de Liquidação',
  },

  {
    bit: 52,
    tipo: 'fixo',
    formato: 'AB',
    tamanho: 16,
    descricao: 'Dados do PIN',
  },

  {
    bit: 53,
    tipo: 'fixo',
    formato: 'A',
    tamanho: 16,
    descricao: 'Informação de Controle Relacionada à Segurança',
  },

  {
    bit: 54,
    tipo: 'lllvar',
    formato: 'A',
    tamanho: 120,
    descricao: 'Valores Adicionais',
  },

  {
    bit: 55,
    tipo: 'lllvar',
    formato: 'B',
    tamanho: 999,
    descricao: 'Codificação das Informações EMV',
  },

  {
    bit: 58,
    tipo: 'lllvar',
    formato: 'A',
    tamanho: 999,
    descricao: 'Dados geográficos',
  },

  {
    bit: 60,
    tipo: 'lllvar',
    formato: 'A',
    tamanho: 13,
    descricao: 'Dados Adicionais de Terminal',
  },

  {
    bit: 62,
    tipo: 'lllvar',
    formato: 'A',
    tamanho: 999,
    descricao: 'Dados para Identificar Transações Online',
  },

  {
    bit: 63,
    tipo: 'lllvar',
    formato: 'A',
    tamanho: 547,
    descricao: 'Serviço de Verificação de Endereço (AVS)',
  },

  {
    bit: 90,
    tipo: 'fixo',
    formato: 'N',
    tamanho: 42,
    descricao: 'Dados para Identificar Transação Original',
  },

  {
    bit: 106,
    tipo: 'lllvar',
    formato: 'B',
    tamanho: 999,
    descricao: 'Dados Transacionais',
  },

  {
    bit: 107,
    tipo: 'lllvar',
    formato: 'B',
    tamanho: 999,
    descricao: 'Dados de Transações Específicas',
  },

  {
    bit: 126,
    tipo: 'lllvar',
    formato: 'A',
    tamanho: 5,
    descricao: 'Identificador do Cartão (CVE2)',
  },

  {
    bit: 127,
    tipo: 'lllvar',
    formato: 'A',
    tamanho: 5,
    descricao: 'Indicador de Versão',
  },
];
