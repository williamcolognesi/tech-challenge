export interface IEnumDTO {
  codigo: number;
  descricao: string;
}

export interface ITransactionResponseDTO {
  id: number;
  valor: number;
  tipo: IEnumDTO;
  direcao: IEnumDTO;
  categoria?: IEnumDTO;
  descricao?: string;
  dataTransacao: string;
  dataCadastro: string;
  dataAtualizacao?: string;
}

export interface ISaldoResponseDTO {
  saldo: number;
}
