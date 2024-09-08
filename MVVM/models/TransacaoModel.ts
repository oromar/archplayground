import { TipoTransacao } from "./TipoTransacao"


export interface Transacao {
    tipo: TipoTransacao
    valor: number
    data: Date
}