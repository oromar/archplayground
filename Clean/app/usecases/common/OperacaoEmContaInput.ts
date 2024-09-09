import { Dinheiro } from "../../../domain/value-objects/Dinheiro"

export class OperacaoEmContaInput {
    public readonly id: number
    public readonly dinheiro: Dinheiro

    constructor(id: number, dinheiro: Dinheiro) {
        this.id = id
        this.dinheiro = dinheiro
    }
}