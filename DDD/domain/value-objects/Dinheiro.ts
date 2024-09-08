export class Dinheiro {
    private valor: number
    private moeda: string

    constructor(valor: number, moeda: string) {
        this.valor = valor
        this.moeda = moeda
    }

    public getValor(): number {
        return this.valor
    }

    public getMoeda() : string {
        return this.moeda
    }

    public descontar(dinheiro: Dinheiro) : Dinheiro {
        this.validarMoeda(dinheiro)
        if (dinheiro.getValor() > this.valor) {
            throw new Error("Valor insuficiente")
        }
        return new Dinheiro(this.valor - dinheiro.getValor(), this.moeda)
    }

    public somar(dinheiro: Dinheiro) : Dinheiro {
        this.validarMoeda(dinheiro)
        return new Dinheiro(this.valor + dinheiro.getValor(), this.moeda)
        
    }

    private validarMoeda(dinheiro: Dinheiro){
        if (dinheiro.getMoeda() !== this.moeda) {
            throw new Error("Não é possível somar dinheiro de moedas diferentes")
        }
    }
}