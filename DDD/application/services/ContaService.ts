import { ContaRepository } from "../../domain/repositories/ContaRepository";
import { Dinheiro } from "../../domain/value-objects/Dinheiro";

export class ContaService {
    private repository: ContaRepository

    constructor(repository: ContaRepository) {
        this.repository = repository
    }

    public realizarDebito(id: number, valor: Dinheiro) {
        const conta = this.repository.findById(id)
        if (!conta){
            throw new Error("Id inválido")
        }

        conta.realizarDebito(valor)
        this.repository.save(conta)
    }

    public realizarCredito(id: number, valor: Dinheiro) {
        const conta = this.repository.findById(id)
        if (!conta) {
            throw new Error("Id inválido")
        }
        conta.realizarCredito(valor)
        this.repository.save(conta)
    }

    
}