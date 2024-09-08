import { Conta } from "../../domain/entities/Conta";
import { ContaRepository } from "../../domain/repositories/ContaRepository";
import { Dinheiro } from "../../domain/value-objects/Dinheiro";
import { TipoTransacao, Transacao } from "../../domain/value-objects/Transacao";

export class ContaService {

    private contaRepository: ContaRepository

    constructor(repository: ContaRepository) {
        this.contaRepository = repository
    }

    public realizarDebito(id: number, valor: Dinheiro) {
        const conta = this.getConta(id)
        conta.realizarTransacao(TipoTransacao.debito, valor)
        this.contaRepository.save(conta)
    }

    public realizarCredito(id: number, valor: Dinheiro) {
        const conta = this.getConta(id)
        conta.realizarTransacao(TipoTransacao.credito, valor)
        this.contaRepository.save(conta)
    }

    public definirLimiteCredito(id: number, limiteCredito: Dinheiro) {
        const conta = this.getConta(id)
        conta.definirLimiteCredito(limiteCredito)
        this.contaRepository.save(conta)
    }

    public getLimiteCredito(id: number) : Dinheiro {
        const conta = this.getConta(id)
        return conta.getLimiteCredito()
    }

    public getSaldoTotal(id: number) : Dinheiro {
        const conta = this.getConta(id)
        return new Dinheiro(conta.getSaldo().getValor() + conta.getLimiteCredito().getValor(), conta.getSaldo().getMoeda())
    }

    public getSaldo(id: number) : Dinheiro {
        const conta = this.getConta(id)
        return conta.getSaldo()
    }

    public getTransacoes(id: number) : Transacao[] {
        const conta = this.getConta(id)
        return conta.getTransacoes()
    }

    public getConta(id: number): Conta {
        const conta = this.contaRepository.findById(id)
        if (!conta){
            throw new Error("Id inválido")
        }
        return conta
    }
}