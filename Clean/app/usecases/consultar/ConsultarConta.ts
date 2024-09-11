import { Conta } from "../../../domain/entities/Conta";
import { ContaRepository } from "../../../domain/repositories/ContaRepository";
import { ConsultarContaMapper } from "../common/ConsultarContaMapper";
import { UseCase } from "../common/UseCase";
import { ConsultarContaOutput } from "./ConsultarContaOutput";

export class ConsultarConta implements UseCase<string, ConsultarContaOutput> {

    private contaRepository: ContaRepository
    private mapper: ConsultarContaMapper

    constructor(repository: ContaRepository) {
        this.contaRepository = repository
        this.mapper = new ConsultarContaMapper()
    }

    public async executar(entrada: string): Promise<ConsultarContaOutput> {
        const conta = await this.contaRepository.findById(entrada)
        if (!conta) {
            throw new Error("Conta não encontrada")
        }
        return this.mapper.map(conta)
    }
}