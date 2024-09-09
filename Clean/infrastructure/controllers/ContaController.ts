import {Request, Response} from "express"

import { OperacaoEmContaInput } from "../../app/usecases/common/OperacaoEmContaInput";
import { ConsultarConta } from "../../app/usecases/consultar/ConsultarConta";
import { CreditarEmConta } from "../../app/usecases/creditar/CreditarEmConta";
import { DebitarEmConta } from "../../app/usecases/debitar/DebitarEmConta";
import { DefinirLimiteCredito } from "../../app/usecases/definirLimiteCredito/DefinirLimiteCredito";
import { DefinirLimiteCreditoInput } from "../../app/usecases/definirLimiteCredito/DefinirLimiteCreditoInput";
import { Conta } from "../../domain/entities/Conta";
import { ListarContas } from "../../app/usecases/listar/ListarContas";
import { CriarConta } from "../../app/usecases/criar/CriarConta";
import { CriarContaInput } from "../../app/usecases/criar/CriarContaInput";

export class ContaController {

    private consultarConta: ConsultarConta
    private creditarEmConta: CreditarEmConta
    private debitarEmConta: DebitarEmConta
    private definirLimiteCredito: DefinirLimiteCredito
    private listarContas: ListarContas
    private criarConta: CriarConta

    constructor(consultarConta: ConsultarConta,
        creditarEmConta: CreditarEmConta,
        debitarEmConta: DebitarEmConta,
        definirLimiteCredito: DefinirLimiteCredito,
        listarContas: ListarContas,
        criarConta: CriarConta
    ) {
        this.consultarConta = consultarConta,
        this.creditarEmConta= creditarEmConta,
        this.debitarEmConta = debitarEmConta,
        this.definirLimiteCredito = definirLimiteCredito
        this.listarContas = listarContas
        this.criarConta = criarConta
    }

    public async criar(req: Request, res: Response) {
        const {valor, limite} = req.body
        const input = new CriarContaInput(valor, limite)
        await this.criarConta.executar(input)
        return res.status(201).json({message: "Conta cadastradao com sucesso"})
    }

    public async consultar(req: Request, res: Response) {
        const idString = req.query.id
        const id = +idString
        const conta = await this.consultarConta.executar(id)
        this.render(conta, res)
    }

    public async creditar(req: Request, res: Response) {
        const {id, dinheiro} = req.body
        await this.creditarEmConta.executar(new OperacaoEmContaInput(id, dinheiro))
    }

    public async debitar(req: Request, res: Response) {
        const {id, dinheiro} = req.body
        await this.debitarEmConta.executar(new OperacaoEmContaInput(id, dinheiro))
    }

    public async definirLimite(req: Request, res: Response) {
        const {id, limiteCredito} = req.body
        await this.definirLimiteCredito.executar(new DefinirLimiteCreditoInput(id, limiteCredito))
    }

    public async listar(req: Request, res: Response) {
        const contas = await this.listarContas.executar()
        return res.status(200).json(contas)
    }

    public render(conta: Conta, res: Response) {
        return res.status(200).json({
            saldo: conta.getSaldo(),
            transacoes: conta.getTransacoes(),
            id: conta.getId()
        })
    }
}