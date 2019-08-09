export default [
  {
    bit: 1,
    tipo: 'fixo',
    formato: 'B',
    tamanho: 8,
    descricao: 'Segundo Mapa de bits'
  },

  {
    bit: 2,
    tipo: 'llvar',
    formato: 'P',
    tamanho: 19,
    descricao: 'Primary Account Number (PAN)'
  },

  {
    bit: 3,
    tipo: 'fixo',
    formato: 'P',
    tamanho: 6,
    descricao: 'Processing Code'
  },

  {
    bit: 4,
    tipo: 'fixo',
    formato: 'P',
    tamanho: 12,
    descricao: 'Transaction Amount'
  },

  {
    bit: 5,
    tipo: 'fixo',
    formato: 'P',
    tamanho: 12,
    descricao: 'Settlement Amount'
  },

  {
    bit: 6,
    tipo: 'fixo',
    formato: 'P',
    tamanho: 12,
    descricao: 'Cardholder Billing Amount'
  },

  {
    bit: 7,
    tipo: 'fixo',
    formato: 'P',
    tamanho: 10,
    descricao: 'Transmission Date and Time (MMDDHHMMSS)'
  },

  {
    bit: 10,
    tipo: 'fixo',
    formato: 'P',
    tamanho: 8,
    descricao: 'Conversion Rate, Cardholder Billing'
  },

  {
    bit: 11,
    tipo: 'fixo',
    formato: 'P',
    tamanho: 6,
    descricao: 'System Trace Audit Number'
  },

  {
    bit: 12,
    tipo: 'fixo',
    formato: 'P',
    tamanho: 6,
    descricao: 'Time, Local Transaction (HHMMSS)'
  },

  {
    bit: 13,
    tipo: 'fixo',
    formato: 'P',
    tamanho: 4,
    descricao: 'Date, Local Transaction (MMDD)'
  },

  {
    bit: 14,
    tipo: 'fixo',
    formato: 'P',
    tamanho: 4,
    descricao: 'Date, Expiration (AAMM)'
  },

  {
    bit: 18,
    tipo: 'fixo',
    formato: 'P',
    tamanho: 4,
    descricao: 'Merchant Type'
  },

  {
    bit: 19,
    tipo: 'fixo',
    formato: 'P',
    tamanho: 3,
    descricao: 'Acquiring Institution Country Code'
  },

  {
    bit: 22,
    tipo: 'fixo',
    formato: 'P',
    tamanho: 4,
    descricao: 'Point-of-Service Entry Mode Code  '
  },

  {
    bit: 23,
    tipo: 'fixo',
    formato: 'P',
    tamanho: 3,
    descricao: 'Card Sequence Number  '
  },

  {
    bit: 25,
    tipo: 'fixo',
    formato: 'P',
    tamanho: 2,
    descricao: 'Point-of-Service Condition Code'
  },

  {
    bit: 26,
    tipo: 'fixo',
    formato: 'P',
    tamanho: 2,
    descricao: 'Point-of-Service PIN Capture Code'
  },

  {
    bit: 32,
    tipo: 'llvar',
    formato: 'P',
    tamanho: 11,
    descricao: 'Acquiring Institution Identification Code'
  },

  {
    bit: 35,
    tipo: 'llvar',
    formato: 'P',
    tamanho: 37,
    descricao: 'Track 2 Data'
  },

  {
    bit: 36,
    tipo: 'lllvar',
    formato: 'A',
    tamanho: 16,
    descricao: 'P.I.N. DATA'
  },

  {
    bit: 37,
    tipo: 'fixo',
    formato: 'A',
    tamanho: 12,
    descricao: 'Retrieval Reference Number'
  },

  {
    bit: 38,
    tipo: 'fixo',
    formato: 'A',
    tamanho: 6,
    descricao: 'Authorization Identification Response'
  },

  {
    bit: 39,
    tipo: 'fixo',
    formato: 'A',
    tamanho: 2,
    descricao: 'Response Code'
  },

  {
    bit: 41,
    tipo: 'fixo',
    formato: 'A',
    tamanho: 8,
    descricao: 'Card Acceptor Terminal Identification'
  },

  {
    bit: 42,
    tipo: 'fixo',
    formato: 'A',
    tamanho: 15,
    descricao: 'Card Acceptor Identification Code'
  },

  {
    bit: 43,
    tipo: 'fixo',
    formato: 'A',
    tamanho: 40,
    descricao: 'Card Acceptor Name/Location'
  },

  {
    bit: 44,
    tipo: 'llvar',
    formato: 'A',
    tamanho: 25,
    descricao: 'Additional Response Data'
  },

  {
    bit: 45,
    tipo: 'llvar',
    formato: 'A',
    tamanho: 76,
    descricao: 'Track 1 Data'
  },

  {
    bit: 48,
    tipo: 'lllvar',
    formato: 'A',
    tamanho: 255,
    descricao: 'Additional Data—Private'
  },

  {
    bit: 49,
    tipo: 'fixo',
    formato: 'P',
    tamanho: 3,
    descricao: 'Currency Code, Transaction'
  },

  {
    bit: 51,
    tipo: 'fixo',
    formato: 'P',
    tamanho: 3,
    descricao: 'Currency Code, Cardholder Billing'
  },

  {
    bit: 52,
    tipo: 'fixo',
    formato: 'B',
    tamanho: 8,
    descricao: 'Personal Identification Number (PIN) Data'
  },

  {
    bit: 53,
    tipo: 'fixo',
    formato: 'P',
    tamanho: 16,
    descricao: 'Security-Related Control Information'
  },

  {
    bit: 55,
    tipo: 'lllvar',
    formato: 'B',
    tamanho: 255,
    descricao: 'Integrated Circuit Card (ICC)-Related Data'
  },

  {
    bit: 59,
    tipo: 'llvar',
    formato: 'A',
    tamanho: 14,
    descricao: 'National Point-of-Service Geographic Data'
  },

  {
    bit: 60,
    tipo: 'lllvar',
    formato: 'B',
    tamanho: 12,
    descricao: 'Additional POS Information'
  },

  {
    bit: 61,
    tipo: 'lllvar',
    formato: 'P',
    tamanho: 19,
    descricao: 'Other Amounts'
  },

  {
    bit: 62,
    tipo: 'lllvar',
    formato: 'B',
    tamanho: 255,
    descricao: 'Custom Payment Service Fields (Bitmap Format)'
  },

  {
    bit: 63,
    tipo: 'lllvar',
    formato: 'B',
    tamanho: 255,
    descricao: 'V.I.P. Private-Use Field'
  },

  {
    bit: 90,
    tipo: 'fixo',
    formato: 'P',
    tamanho: 42,
    descricao: 'Original Data Elements'
  },

  {
    bit: 104,
    tipo: 'lllvar',
    formato: 'B',
    tamanho: 255,
    descricao: 'Transaction Description & Transaction-Specific Data'
  },

  {
    bit: 123,
    tipo: 'lllvar',
    formato: 'B',
    tamanho: 255,
    descricao: 'Verification Data'
  },

  {
    bit: 126,
    tipo: 'lllvar',
    formato: 'B',
    tamanho: 255,
    descricao: 'Visa Private-Use Fields'
  }
];
