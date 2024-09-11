export class ConsultarContaOutput {
    public readonly id: string
    public readonly saldo: number
    public readonly limiteCredito: number
    public readonly limiteTotal: number
    public readonly moeda: string

    constructor(id: string, saldo: number, limiteCredito: number, moeda: string) {
        this.id = id
        this.saldo = saldo
        this.limiteCredito= limiteCredito
        this.limiteTotal = this.saldo + this.limiteCredito
        this.moeda = moeda
    }
}