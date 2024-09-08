
import { Express, Request, Response } from "express"
import { ContaViewModel } from "../viewModels/ContaViewModel";
import { View } from "./View";
import { TipoTransacao } from "../models/TipoTransacao";

export class ContaView implements View {
    private contaViewModel: ContaViewModel

    constructor(contaViewModel: ContaViewModel) {
        this.contaViewModel = contaViewModel
    }
    
    registrar(app: Express): void {
        app.get("/conta", this.renderConta.bind(this))
        app.post("/realizarTransacao", this.realizarTransacao.bind(this))
        app.post("/limiteCredito", this.definirLimiteCredito.bind(this))
    }

    public renderConta(req: Request, res: Response) {
        const saldo = this.contaViewModel.getSaldo()
        const limiteCredito = this.contaViewModel.getLimiteCredito()
        const transacoes = this.contaViewModel.getTransacoes()

        res.json({saldo, limiteCredito, transacoes})
    }

    public realizarTransacao(req: Request, res: Response) {
        const { tipo, valor} = req.body
        const sucesso = this.contaViewModel.realizarTransacao(tipo, valor)
        if (!sucesso) {
            if (tipo === TipoTransacao.debito) {
                return res.status(400).json({ error: "Saldo insuficiente"})
            } else if (tipo === TipoTransacao.credito) {
                return res.status(400).json({ error: "Não foi possíve realizar o crédito"})
            } else {
                return res.status(400).json({ error: "Tipo de transacao inválido"})
            }
        } else {
            this.renderConta(req, res)
        }
    }

    public definirLimiteCredito(req: Request, res: Response) {
        const { limiteCredito } = req.body
        this.contaViewModel.definirLimiteCredito(limiteCredito)
        this.renderConta(req, res)
    }
}