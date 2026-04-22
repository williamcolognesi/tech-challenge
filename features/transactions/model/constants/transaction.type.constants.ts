export const TRANSACTION_TYPE = {
    PIX: {
        codigo: 1,
        descricao: 'Pix',
    },
    DEPOSITO: {
        codigo: 2,
        descricao: 'Depósito',
    },
    TRANSFERENCIA: {
        codigo: 3,
        descricao: 'Transferência',
    },
    SAQUE: {
        codigo: 4,
        descricao: 'Saque',
    },
    OUTROS: {
        codigo: 5,
        descricao: 'Outros',
    },
} as const;