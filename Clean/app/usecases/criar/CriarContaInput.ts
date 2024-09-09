import { Dinheiro } from "../../../domain/value-objects/Dinheiro";

export class CriarContaInput {
    public readonly saldoInicial: Dinheiro
    public readonly limiteCredito: Dinheiro

    constructor(saldoIncial: Dinheiro, limiteCredito: Dinheiro) {
        this.saldoInicial = saldoIncial
        this.limiteCredito = limiteCredito
    }
}