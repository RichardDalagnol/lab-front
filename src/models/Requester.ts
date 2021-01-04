export default interface IRequester {
  id: string,
  nome: string,
  email: string,
  cidade: string,
  numero: number,
  telefone: string,
  rua: string,
  bairro: string,
  created_at?: string,
  updated_at?: string,
}

export interface IRequesterList {
  id: string,
  nome: string,
  email: string,
  cidade: string,
  numero: number,
  telefone: string,
  rua: string,
  bairro: string,
  created_at: string,
  updated_at: string,
}
