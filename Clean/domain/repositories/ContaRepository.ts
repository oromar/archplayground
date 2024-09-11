import { Conta } from "../entities/Conta";

export interface ContaRepository {
    save(conta: Conta): void
    update(id: string, conta: Conta): void
    findById(id: string) : Promise<Conta | undefined>
    findAll(): Promise<Conta[]>
}