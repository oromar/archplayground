import { Conta } from "../../../domain/entities/Conta";
import { ContaRepository } from "../../../domain/repositories/ContaRepository";
import { UseCase } from "../common/UseCase";

export class ListarContas implements UseCase<void, Conta[]> {

    private contaRepository: ContaRepository

    constructor(contaRepository: ContaRepository) {
        this.contaRepository = contaRepository
    }

    public async executar(): Promise<Conta[]> {
        return await this.contaRepository.findAll()
    }

}