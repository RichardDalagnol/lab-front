export default interface IPathogen {
  id?: string,
  nome: string,
  descricao: string,
  created_at?: string,
  updated_at?: string,
}


export interface IPathogenList {
  id: string,
  nome: string,
  descricao: string,
  created_at: string,
  updated_at: string,
}
