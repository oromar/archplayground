export class Conta {
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
        this.registrarTransacao("débito", valor)
        return true
    }

    public realizarCredito(valor: number): number{
        if (valor > 0) {
            this.saldo += valor
        }
        this.registrarTransacao("crédito", valor)
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

    public getTransacoes(): Transacao[]{
        return this.transacoes
    }

    public transfereSaldo(valor: number, conta: Conta) : boolean {
        if (this.realizarDebito(valor)) {
            conta.realizarCredito(valor)
        } else {
            return false
        }
        return true
    }

    public realizarTransacao(tipo: "débito" | "crédito", valor: number) : boolean {
        const saldoAnterior = this.saldo
        if (tipo === "débito")
            return this.realizarDebito(valor)
        else 
            return this.realizarCredito(valor) === saldoAnterior + valor
    }

    private registrarTransacao(tipo: "débito" | "crédito", valor : number) {
        const transacao: Transacao = { tipo: tipo, valor: valor, data: new Date() }
        this.transacoes.push(transacao)
    }
}

export interface Transacao {
    tipo: "débito" | "crédito"
    valor: number
    data: Date
}