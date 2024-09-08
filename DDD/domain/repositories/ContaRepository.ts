import { Conta } from "../entities/Conta";
import { Dinheiro } from "../value-objects/Dinheiro";

export interface ContaRepository {
    save(conta: Conta): void
    findBySaldo(saldo: Dinheiro): Conta | undefined
    findAll(): Conta[]
}