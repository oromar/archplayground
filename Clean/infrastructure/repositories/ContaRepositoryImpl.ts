import { Conta } from "../../domain/entities/Conta";
import { ContaRepository } from "../../domain/repositories/ContaRepository";

export class ContaRepositoryImpl implements ContaRepository {
    private contas: Conta[]

    constructor() {
        this.contas = []
    }

    async findById(id: number): Promise<Conta> {
        return this.contas.find(a => a.getId() == id);
    }

    async findAll(): Promise<Conta[]> {
        return this.contas
    }
    
    save(conta: Conta): void {
        this.contas.push(conta)
    }

}