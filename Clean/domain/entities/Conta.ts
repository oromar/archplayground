import  {v4 as uuid}  from "uuid"
import { Dinheiro } from "../value-objects/Dinheiro"
import { TipoTransacao } from "../value-objects/TipoTransacao"
import { Transacao } from "../value-objects/Transacao"

export class Conta {
    private id: string 
    private creationTime: Date
    private saldo: Dinheiro
    private limiteCredito: Dinheiro
    private transacoes: Transacao[]


    constructor(valor: Dinheiro, limiteCredito: Dinheiro) {
        this.id = uuid()
        this.creationTime = new Date()
        this.saldo = valor
        this.limiteCredito = limiteCredito
        this.transacoes = []
    }

    public getId() : string {
        return this.id
    }

    public setId(id: string): void {
        this.id = id
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

    public transfereSaldo(dinheiro: Dinheiro, conta: Conta) {
        if (conta.getSaldo().getMoeda() !== this.saldo.getMoeda() || dinheiro.getMoeda() !== this.saldo.getMoeda()) {
            throw new Error("Não é possível transferir entre contas de moedas diferentes")
        }

        this.debitar(dinheiro)
        conta.creditar(dinheiro)
    }

    private registrarTransacao(dinheiro: Dinheiro, tipo: TipoTransacao) {
        const transacao = new Transacao (dinheiro, tipo)
        this.transacoes.push(transacao)
    }
}
