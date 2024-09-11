import { Dinheiro } from "../../../domain/value-objects/Dinheiro";

export class TransferirEntreContasInput { 
    public readonly dinheiro: Dinheiro
    public readonly origem: string
    public readonly destino: string

    constructor(dinheiro: Dinheiro, origem: string, destino: string) {
        this.dinheiro = dinheiro
        this.origem = origem
        this.destino = destino
    }
}