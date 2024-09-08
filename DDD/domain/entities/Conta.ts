import { Dinheiro } from "../value-objects/Dinheiro"
import { TipoTransacao, Transacao } from "../value-objects/Transacao"

export class Conta {
    private id: number
    private saldo: Dinheiro
    private limiteCredito: Dinheiro
    private transacoes: Transacao[]

    constructor(saldo: Dinheiro, limiteCredito: Dinheiro) {
        this.saldo = saldo
        this.limiteCredito = limiteCredito
    }

    public definirLimiteCredito(limiteCredito: Dinheiro){
        this.limiteCredito = limiteCredito
    }

    public getLimiteCredito(): Dinheiro {
        return this.limiteCredito
    }

    public getSaldo(): Dinheiro {
        return this.saldo
    }

    public getTransacoes(): Transacao[] {
        return this.transacoes
    }

    public getId(){
        return this.id
    }

    public transfereSaldo(valor: Dinheiro, conta: Conta) : boolean {
        if (this.realizarDebito(valor)) {
            conta.realizarCredito(valor)
        } else {
            return false
        }
        return true
    }

    public realizarTransacao(tipo: TipoTransacao, dinheiro: Dinheiro) : boolean {
        const saldoAnterior = this.saldo
        if (tipo === TipoTransacao.debito)
            return this.realizarDebito(dinheiro)
        else 
            return this.realizarCredito(dinheiro).getValor() === saldoAnterior.getValor() + dinheiro.getValor()
    }

    private realizarDebito(dinheiro: Dinheiro): boolean{
        const saldoComLimite = this.saldo.getValor() + this.limiteCredito.getValor()
        if (saldoComLimite < dinheiro.getValor()){
            return false
        }
        this.saldo = this.saldo.descontar(dinheiro)
        this.registrarTransacao(TipoTransacao.debito, dinheiro)
        return true
    }

    private realizarCredito(dinheiro: Dinheiro): Dinheiro{
        if (dinheiro.getValor() > 0) {
            this.saldo = this.saldo.somar(dinheiro)
        }
        this.registrarTransacao(TipoTransacao.credito, dinheiro)
        return this.saldo
    }

    private registrarTransacao(tipo: TipoTransacao, valor : Dinheiro) {
        const transacao: Transacao = { tipo: tipo, valor: valor, data: new Date() }
        this.transacoes.push(transacao)
    }
}