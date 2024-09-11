import { Conta } from "../../domain/entities/Conta";
import { ContaRepository } from "../../domain/repositories/ContaRepository";

export class ContaRepositoryImpl implements ContaRepository {
    private contas: Conta[]

    constructor() {
        this.contas = []
    }
    save(conta: Conta): void {
        this.contas.push(conta)
    }

    update(id: string, conta: Conta): void {
        this.contas = this.contas.filter(a => a.getId() !== id)
        this.contas.push(conta)
    }

    async findById(id: string): Promise<Conta> {
        return this.contas.find(a => a.getId() == id);
    }

    async findAll(): Promise<Conta[]> {
        return this.contas
    }
}