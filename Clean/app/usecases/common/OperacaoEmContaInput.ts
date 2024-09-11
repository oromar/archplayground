import { Dinheiro } from "../../../domain/value-objects/Dinheiro"

export class OperacaoEmContaInput {
    public readonly id: string
    public readonly dinheiro: Dinheiro

    constructor(id: string, dinheiro: Dinheiro) {
        this.id = id
        this.dinheiro = dinheiro
    }
}