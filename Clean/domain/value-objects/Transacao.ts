import { Dinheiro } from "./Dinheiro";
import { TipoTransacao } from "./TipoTransacao";

export interface Transacao {
    valor: Dinheiro
    tipo: TipoTransacao
    data: Date
}