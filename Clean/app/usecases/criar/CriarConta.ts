import { Conta } from "../../../domain/entities/Conta";
import { ContaRepository } from "../../../domain/repositories/ContaRepository";
import { UseCase } from "../common/UseCase";
import { CriarContaInput } from "./CriarContaInput";

export class CriarConta implements UseCase<CriarContaInput, void> {

    private contaRepository: ContaRepository

    constructor(contaRepository: ContaRepository) {
        this.contaRepository = contaRepository
    }

    public async executar(entrada: CriarContaInput): Promise<void> {
        const conta: Conta = new Conta(entrada.saldoInicial, entrada.limiteCredito)
        this.contaRepository.save(conta)
    }

}