import { Conta } from "../../domain/entities/Conta"
import { ContaRepository } from "../../domain/repositories/ContaRepository"
import { Dinheiro } from "../../domain/value-objects/Dinheiro"



export class ContaRepositoryImpl implements ContaRepository {
    private contas: Conta[]

    constructor(){
        this.contas = []
    }

    findById(id: number): Conta {
        return this.contas.find(conta => conta.getId() === id)
    }

    save(conta: Conta): void {
       this.contas.push(conta)
    }

    findBySaldo(saldo: Dinheiro): Conta | undefined {
        return this.contas.find(a => a.getSaldo().getValor() == saldo.getValor())
       
    }

    findAll(): Conta[] {
        return this.contas
    }
}