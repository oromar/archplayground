import { Dinheiro } from "../value-objects/Dinheiro"
import { TipoTransacao } from "../value-objects/TipoTransacao"
import { Transacao } from "../value-objects/Transacao"

export class Conta {
    private id: number
    private saldo: Dinheiro
    private limiteCredito: Dinheiro
    private transacoes: Transacao[]


    constructor(valor: Dinheiro, limiteCredito: Dinheiro) {
        this.saldo = valor
        this.limiteCredito = limiteCredito
        this.transacoes = []
    }

    public getId() : number {
        return this.id
    }

    public getSaldo(): Dinheiro {
        return this.saldo
    }

    public getLimiteCredito(): Dinheiro {
        return this.limiteCredito
    }
    
    public getTransacoes(): Transacao[] {
        return this.transacoes
    }

    public definirLimiteCredito(limiteCredito: Dinheiro) {
        this.limiteCredito = limiteCredito
    }

    public creditar(dinheiro: Dinheiro) {
        this.saldo = this.saldo.somar(dinheiro)
        this.registrarTransacao(dinheiro, TipoTransacao.CREDITO)
    }

    public debitar(dinheiro: Dinheiro) {
        if (dinheiro.getValor() > this.saldo.getValor()) {
            throw new Error("Saldo insuficiente")
        }
        this.saldo = this.saldo.subtrair(dinheiro)
        this.registrarTransacao(dinheiro, TipoTransacao.CREDITO)
    }

    private registrarTransacao(dinheiro: Dinheiro, tipo: TipoTransacao) {
        const transacao: Transacao = { valor: dinheiro, tipo, data: new Date() }
        this.transacoes.push(transacao)
    }
}
