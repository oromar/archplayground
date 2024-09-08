import { ContaModel } from "../models/ContaModel";
import { TipoTransacao } from "../models/TipoTransacao";

export class ContaViewModel {
    private contaModel: ContaModel

    constructor(contaModel: ContaModel) {
        this.contaModel = contaModel
    }

    public realizarCredito(valor: number): number {
        return this.contaModel.realizarCredito(valor)
    }

    public realizarDebito(valor: number): boolean {
        return this.contaModel.realizarDebito(valor)
    }

    public realizarTransacao(tipo: TipoTransacao, valor: number): boolean {
        return this.contaModel.realizarTransacao(tipo, valor)
    }

    public definirLimiteCredito(limiteCredito: number) {
        this.contaModel.definirLimiteCredito(limiteCredito)
    }

    public getLimiteCredito(){
        return this.contaModel.getLimiteCredito()
    }

    public getSaldo() {
        return this.contaModel.getSaldo()
    }

    public getTransacoes(){
        return this.contaModel.getTransacoes()
    }

    public transfereSaldo(valor: number, conta: ContaModel) : boolean {
        return this.contaModel.transfereSaldo(valor, conta)
    }
}