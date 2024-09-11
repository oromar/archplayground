import { ContaRepository } from "../../../domain/repositories/ContaRepository";
import { UseCase } from "../common/UseCase";
import { TransferirEntreContasInput } from "./TransferirEntreContasInput";


export class TransferirEntreContas implements UseCase<TransferirEntreContasInput, void> {
    private readonly repository: ContaRepository

    constructor(contaRepository: ContaRepository) {
        this.repository = contaRepository
    }

    async executar(entrada: TransferirEntreContasInput): Promise<void> {
        const contaOrigem = await this.repository.findById(entrada.origem)
        const contaDestino = await this.repository.findById(entrada.destino)
        contaOrigem.transfereSaldo(entrada.dinheiro, contaDestino)
        this.repository.update(contaOrigem.getId(), contaOrigem)
        this.repository.update(contaDestino.getId(), contaDestino)
    }

}