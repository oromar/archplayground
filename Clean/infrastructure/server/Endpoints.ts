import {Express} from "express"
import { ContaRepository } from "../../domain/repositories/ContaRepository"
import { ContaRepositoryImpl } from "../repositories/ContaRepositoryImpl"
import { ConsultarConta } from "../../app/usecases/consultar/ConsultarConta"
import { CreditarEmConta } from "../../app/usecases/creditar/CreditarEmConta"
import { DefinirLimiteCredito } from "../../app/usecases/definirLimiteCredito/DefinirLimiteCredito"
import { ContaController } from "../controllers/ContaController"
import { DebitarEmConta } from "../../app/usecases/debitar/DebitarEmConta"
import { ListarContas } from "../../app/usecases/listar/ListarContas"
import { CriarConta } from "../../app/usecases/criar/CriarConta"

export class Endpoints {

    private contaRepository: ContaRepository
    private consultarConta: ConsultarConta 
    private creditarEmConta: CreditarEmConta
    private debitarEmConta: DebitarEmConta
    private definirLimiteCredito: DefinirLimiteCredito
    private listarContas: ListarContas
    private criarConta: CriarConta
    private contaController: ContaController

    constructor() {
        this.contaRepository = new ContaRepositoryImpl()
        this.consultarConta = new ConsultarConta(this.contaRepository)
        this.creditarEmConta = new CreditarEmConta(this.contaRepository)
        this.debitarEmConta = new DebitarEmConta(this.contaRepository)
        this.definirLimiteCredito = new DefinirLimiteCredito(this.contaRepository)
        this.listarContas=  new ListarContas(this.contaRepository)
        this.criarConta = new CriarConta(this.contaRepository)
        
        this.contaController = new ContaController(
            this.consultarConta,
            this.creditarEmConta,
            this.debitarEmConta, 
            this.definirLimiteCredito,
            this.listarContas,
            this.criarConta
        )
    }

    public registrar (app: Express) : void {

        app.get("/contas", this.contaController.listar.bind(this.contaController))
        app.post("/contas", this.contaController.criar.bind(this.contaController))
        app.get("/contas/consultar", this.contaController.consultar.bind(this.contaController))
        app.post("/contas/credito", this.contaController.creditar.bind(this.contaController))
        app.post("/contas/debito", this.contaController.debitar.bind(this.contaController))
        app.post("/contas/limite", this.contaController.definirLimite.bind(this.contaController))
    }
}
