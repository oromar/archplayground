import { Dinheiro } from "../../../domain/value-objects/Dinheiro"

export class DefinirLimiteCreditoInput {
    public readonly id: string
    public readonly limiteCredito: Dinheiro

    constructor(id: string, limiteCredito: Dinheiro) {
        this.id = id
        this.limiteCredito = limiteCredito
    }
}