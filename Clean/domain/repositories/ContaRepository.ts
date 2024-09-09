import { Conta } from "../entities/Conta";

export interface ContaRepository {
    save(conta: Conta): void
    findById(id: number) : Promise<Conta | undefined>
    findAll(): Promise<Conta[]>
}