import { ContaRepository } from "../../../domain/repositories/ContaRepository";
import { UseCase } from "../common/UseCase";
import { DefinirLimiteCreditoInput } from "./DefinirLimiteCreditoInput";

export class DefinirLimiteCredito implements UseCase<DefinirLimiteCreditoInput, void> {

    private contaRepository: ContaRepository

    constructor(contaRepository: ContaRepository) {
        this.contaRepository = contaRepository
    }

    public async executar(entrada: DefinirLimiteCreditoInput): Promise<void> {
        const {id, limiteCredito} = entrada
        const conta = await this.contaRepository.findById(id)
        conta.definirLimiteCredito(limiteCredito)
        this.contaRepository.save(conta)
    }
}