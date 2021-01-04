import Sample from './Sample'

export default interface ISampleItem {
  descricao: string,
  amostra: Sample,
  id: string,
  created_at?: string,
  updated_at?: string,
}

export interface SampleItemList {
  descricao: string,
  amostra: Sample,
  id: string,
  created_at: string,
  updated_at: string,
}
