import { OperacaoEmContaInput } from "../../app/usecases/common/OperacaoEmContaInput";
import { ConsultarConta } from "../../app/usecases/consultar/ConsultarConta";
import { CreditarEmConta } from "../../app/usecases/creditar/CreditarEmConta";
import { DebitarEmConta } from "../../app/usecases/debitar/DebitarEmConta";
import { DefinirLimiteCredito } from "../../app/usecases/definirLimiteCredito/DefinirLimiteCredito";
import { DefinirLimiteCreditoInput } from "../../app/usecases/definirLimiteCredito/DefinirLimiteCreditoInput";
import { Conta } from "../../domain/entities/Conta";

export class ContaController {

    private consultarConta: ConsultarConta
    private creditarEmConta: CreditarEmConta
    private debitarEmConta: DebitarEmConta
    private definirLimiteCredito: DefinirLimiteCredito

    constructor(consultarConta: ConsultarConta,
        creditarEmConta: CreditarEmConta,
        debitarEmConta: DebitarEmConta,
        definirLimiteCredito: DefinirLimiteCredito
    ) {
        this.consultarConta = consultarConta,
        this.creditarEmConta= creditarEmConta,
        this.debitarEmConta = debitarEmConta,
        this.definirLimiteCredito = definirLimiteCredito
    }


    public async consultar(req: Request, res: Response) {
        const {id} = req.params.id
        const conta = await this.consultarConta.executar(id)
        this.render(conta, res)
    }
   

    public async creditar(req: Request, res: Response) {
        const {id, dinheiro} = req.body
        await this.creditarEmConta.executar(new OperacaoEmContaInput(id, dinheiro))
    }

    public debitar(req: Request, res: Response) {
        const {id, dinheiro} = req.body
        await this.debitarEmConta.executar(new OperacaoEmContaInput(id, dinheiro))
    }

    public async definirLimite(req: Request, res: Response) {
        const {id, limiteCredito} = req.body
        await this.definirLimiteCredito.executar(new DefinirLimiteCreditoInput(id, limiteCredito))
    }

    public render(conta: Conta, res: Response) {
        return res.status(200).json({
            saldo: conta.getSaldo(),
            transacoes: conta.getTransacoes(),
            id: conta.getId()
        })
    }
}