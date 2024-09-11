import { Conta } from "../../../domain/entities/Conta";
import { ContaRepository } from "../../../domain/repositories/ContaRepository";
import { ConsultarContaMapper } from "../common/ConsultarContaMapper";
import { UseCase } from "../common/UseCase";
import { ConsultarContaOutput } from "../consultar/ConsultarContaOutput";

export class ListarContas implements UseCase<void, ConsultarContaOutput[]> {

    private contaRepository: ContaRepository
    private mapper: ConsultarContaMapper

    constructor(contaRepository: ContaRepository) {
        this.contaRepository = contaRepository
        this.mapper = new ConsultarContaMapper()
    }

    public async executar(): Promise<ConsultarContaOutput[]> {
        const contas = await this.contaRepository.findAll()
        return contas.map(a => this.mapper.map(a))
    }

}