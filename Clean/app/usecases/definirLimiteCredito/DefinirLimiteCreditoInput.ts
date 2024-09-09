import { Dinheiro } from "../../../domain/value-objects/Dinheiro"

export class DefinirLimiteCreditoInput {
    public readonly id: number
    public readonly limiteCredito: Dinheiro

    constructor(id: number, limiteCredito: Dinheiro) {
        this.id = id
        this.limiteCredito = limiteCredito
    }
}