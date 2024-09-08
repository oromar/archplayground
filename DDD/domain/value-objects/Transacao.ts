import { Dinheiro } from "./Dinheiro"

export enum TipoTransacao {
    debito,
    credito
}

export interface Transacao {
    tipo: TipoTransacao
    valor: Dinheiro
    data: Date
}