import {v4 as uuid} from "uuid"
import { Dinheiro } from "./Dinheiro";
import { TipoTransacao } from "./TipoTransacao";

export class Transacao {
    private id: string
    private valor: Dinheiro
    private tipo: TipoTransacao
    private data: Date

    constructor(valor: Dinheiro, tipo: TipoTransacao) {
        this.id = uuid()
        this.data = new Date()
        this.valor = valor
        this.tipo = tipo
    }
}