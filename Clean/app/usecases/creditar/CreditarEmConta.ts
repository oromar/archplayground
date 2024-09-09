import { ContaRepository } from "../../../domain/repositories/ContaRepository";
import { Dinheiro } from "../../../domain/value-objects/Dinheiro";
import { UseCase } from "../common/UseCase";
import { OperacaoEmContaInput } from "../common/OperacaoEmContaInput";


export class CreditarEmConta implements UseCase<OperacaoEmContaInput, void> {

    private contaRepository: ContaRepository

    constructor(repository: ContaRepository) {
        this.contaRepository = repository
    }

    public async executar(entrada: OperacaoEmContaInput): Promise<void> {
        const {id, dinheiro} = entrada
        const conta = await this.contaRepository.findById(id)
        conta.creditar(dinheiro)
        this.contaRepository.save(conta)
    }

    
}