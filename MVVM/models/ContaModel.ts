import { TipoTransacao } from "./TipoTransacao"
import { Transacao } from "./TransacaoModel"

export class ContaModel {
    private saldo: number
    private limiteCredito: number
    private transacoes : Transacao[]

    constructor(saldo: number, limiteCredito: number){
        this.saldo = saldo
        this.limiteCredito = limiteCredito
        this.transacoes = []
    }

    public realizarDebito(valor: number): boolean{
        const saldoComLimite = this.saldo + this.limiteCredito
        if (saldoComLimite < valor){
            return false
        }
        this.saldo -= valor
        this.registrarTransacao(TipoTransacao.debito, valor)
        return true
    }

    public realizarCredito(valor: number): number{
        if (valor > 0) {
            this.saldo += valor
        }
        this.registrarTransacao(TipoTransacao.credito, valor)
        return this.saldo
    }

    public definirLimiteCredito(limiteCredito: number){
        this.limiteCredito = limiteCredito
    }

    public getLimiteCredito(): number {
        return this.limiteCredito
    }

    public getSaldo(): number {
        return this.saldo
    }

    public getTransacoes(): Transacao[] {
        return this.transacoes
    }

    public transfereSaldo(valor: number, conta: ContaModel) : boolean {
        if (this.realizarDebito(valor)) {
            conta.realizarCredito(valor)
        } else {
            return false
        }
        return true
    }

    public realizarTransacao(tipo: TipoTransacao, valor: number) : boolean {
        const saldoAnterior = this.saldo
        if (tipo === TipoTransacao.debito)
            return this.realizarDebito(valor)
        else 
            return this.realizarCredito(valor) === saldoAnterior + valor
    }

    private registrarTransacao(tipo: TipoTransacao, valor : number) {
        const transacao: Transacao = { tipo: tipo, valor: valor, data: new Date() }
        this.transacoes.push(transacao)
    }
}