
import {Express, Request, Response} from 'express'

import { Conta } from "../model/Conta";
import { ContaView } from "../view/ContaView";
import { Controller } from './Controller';

export class ContaController implements Controller {
   
    conta: Conta
    contaView: ContaView

    private HTTP_STATUS_CODE_BAD_REQUEST: number = 400

    constructor(conta: Conta, contaView: ContaView) {
        this.conta = conta
        this.contaView = contaView
    }

    public registrar(app: Express): void {
        app.get("/conta", this.getConta.bind(this))
        app.post("/transacao", this.realizarTransacao.bind(this))
        app.post("/limiteCredito", this.definirLimiteCredito.bind(this))
    }

    public getConta(req: Request, res: Response) {
        this.render(res)
    }

    public realizarTransacao(req: Request, res: Response) {
        const {tipo, valor} =  req.body
        const sucesso = this.conta.realizarTransacao(tipo, valor)
        if (!sucesso) {
            if (tipo === "débito") {
                return res.status(this.HTTP_STATUS_CODE_BAD_REQUEST).json({
                    error: "Limite de crédito excedido"
                })
            } else if (tipo == "crédito") {
                return res.status(this.HTTP_STATUS_CODE_BAD_REQUEST).json({
                    error: "Não foi possível realizar o crédito na conta"
                })
            } else  {
                return res.status(this.HTTP_STATUS_CODE_BAD_REQUEST).json({
                    error: "Tipo transação  inválido"
                })
            }
        }

       this.render(res)
    }

    public definirLimiteCredito(req: Request, res: Response) {
        const { limiteCredito } = req.body
        this.conta.definirLimiteCredito(limiteCredito)
        this.render(res)
    }

    public realizarTransferencia(req: Request, res: Response) {
        const { valor, conta } = req.body
        this.conta.transfereSaldo(valor, conta)
        this.render(res)
    }

    private render(res: Response){
        const saldo = this.conta.getSaldo()
        const limiteCredito = this.conta.getLimiteCredito()
        const transacoes = this.conta.getTransacoes()
        this.contaView.render(res, {saldo, limiteCredito, transacoes})
    }
}