import {Request, Response} from "express"
import UUID from "crypto"

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
import { Dinheiro } from "../../domain/value-objects/Dinheiro";
import { ConsultarContaOutput } from "../../app/usecases/consultar/ConsultarContaOutput";

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
        const {moeda, valor, limite} = req.body
        
        const input = new CriarContaInput(new Dinheiro(valor, moeda), new Dinheiro(limite, moeda))
        await this.criarConta.executar(input)
        return res.status(201).json({message: "Conta cadastrada com sucesso"})
    }

    public async consultar(req: Request, res: Response) {
        const {idString} = req.query
        try {

            const conta = await this.consultarConta.executar(idString as string)
            this.render(conta, res)
        } catch (e) {
            res.status(400).json({message: e.message})
        }
    }

    public async creditar(req: Request, res: Response) {
        const {id, valor, moeda} = req.body
        await this.creditarEmConta.executar(new OperacaoEmContaInput(id, new Dinheiro(valor, moeda)))
        return res.status(200).json({message: "Crédito efetuado com sucesso"})
    }

    public async debitar(req: Request, res: Response) {
        const {id, valor, moeda} = req.body
        try {
            await this.debitarEmConta.executar(new OperacaoEmContaInput(id, new Dinheiro(valor, moeda)))
        }catch (e) {
            return res.status(400).json({message: e?.message})
        }
        return res.status(200).json({message: "Débito efetuado com sucesso"})
    }

    public async definirLimite(req: Request, res: Response) {
        const {id, valor, moeda} = req.body
        await this.definirLimiteCredito.executar(new DefinirLimiteCreditoInput(id, new Dinheiro(valor, moeda)))
        return res.status(200).json({message: "Limite alterado com sucesso"})
    }

    public async listar(req: Request, res: Response) {
        const contas = await this.listarContas.executar()
        return res.status(200).json(contas)
    }

    public render(output: ConsultarContaOutput, res: Response) {
        return res.status(200).json({ ...output })
    }
}