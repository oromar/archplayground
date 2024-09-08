import { Conta } from "../entities/Conta";
import { Dinheiro } from "../value-objects/Dinheiro";

export interface ContaRepository {
    save(conta: Conta): void
    findById(id:number) : Conta
    findBySaldo(saldo: Dinheiro): Conta | undefined
    findAll(): Conta[]
}