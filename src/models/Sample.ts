import Requester from './Requester'
import SampleItem from './SampleItem'

export default interface ISample {
  id: string,
  descricao: string,
  especie: string,
  raca: string,
  sexo: 'masculino' | 'feminino',
  idade: string,
  proprietario: string,
  numero: number,
  ano: number,
  observacao: string,
  flagTratamento: boolean,
  flagAcondicionada: boolean,
  valor: number,
  flagPago: boolean,
  dataRecebimento: string,
  amostraItens: SampleItem[],
  requisitante: Requester,
  created_at?: string,
  updated_at?: string,
}


export interface ISampleList {
  id: string,
  descricao: string,
  especie: string,
  raca: string,
  sexo: 'masculino' | 'feminino',
  idade: string,
  proprietario: string,
  numero: number,
  ano: number,
  observacao: string,
  flagTratamento: boolean,
  flagAcondicionada: boolean,
  valor: number,
  flagPago: boolean,
  dataRecebimento: string,
  amostraItens: SampleItem[],
  requisitante: Requester,
  created_at: string,
  updated_at: string,
}
