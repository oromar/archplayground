import { Conta } from "../../../domain/entities/Conta";
import { ContaRepository } from "../../../domain/repositories/ContaRepository";
import { UseCase } from "../common/UseCase";

export class ConsultarConta implements UseCase<number, Conta> {

    private contaRepository: ContaRepository

    constructor(repository: ContaRepository) {
        this.contaRepository = repository
    }

    public async executar(entrada: number): Promise<Conta> {
        const conta = await this.contaRepository.findById(entrada)
        if (!conta) {
            throw new Error("Conta não encontrada")
        }
        return conta
    }
}