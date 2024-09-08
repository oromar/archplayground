

import { ContaService } from "../../application/services/ContaService";

export class ContaController {
    private contaService: ContaService

    constructor(contaService: ContaService) {
        this.contaService = contaService
    }

    public renderConta(req: Request, res: Response) {
    }

    public realizarDebito(req: Request, res: Response) {
    }

    public realizarCredito(req: Request, res: Response) {
    }

    public definirLimiteCredito(req: Request, res: Response) {
    }

    public getLimiteCredito(req: Request, res: Response) {
    }

    public getSaldoTotal(req: Request, res: Response) {
    }

    public getSaldo(req: Request, res: Response) {
    }

    public getTransacoes(req: Request, res: Response) {
    }

    public getConta(req: Request, res: Response) {
    }
}