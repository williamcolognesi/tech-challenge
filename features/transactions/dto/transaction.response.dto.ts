export interface IEnumDTO {
  codigo: number;
  descricao: string;
}

export interface IComprovanteInfo {
  id: number;
  nome: string;
  contentType: string;
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
  comprovante?: IComprovanteInfo;
}

export interface ISaldoResponseDTO {
  saldo: number;
}

export interface IComprovanteResponseDTO {
  id: number;
  nome: string;
  contentType: string;
}
