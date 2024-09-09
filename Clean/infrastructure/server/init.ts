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

export function registrar(app: Express) : void {

    const contaRepository: ContaRepository = new ContaRepositoryImpl()
    const consultarConta: ConsultarConta = new ConsultarConta(contaRepository)
    const creditarEmConta: CreditarEmConta = new CreditarEmConta(contaRepository)
    const debitarEmConta: DebitarEmConta = new DebitarEmConta(contaRepository)
    const definirLimiteCredito: DefinirLimiteCredito = new DefinirLimiteCredito(contaRepository)
    const listarContas: ListarContas = new ListarContas(contaRepository)
    const criarConta: CriarConta = new CriarConta(contaRepository)

    const contaController: ContaController = new ContaController(
        consultarConta, 
        creditarEmConta, 
        debitarEmConta,
        definirLimiteCredito,
        listarContas,
        criarConta
    )

    app.get("/contas", contaController.listar.bind(contaController))
    app.post("/contas", contaController.criar.bind(contaController))
    app.get("/contas/consultar", contaController.consultar.bind(contaController))
    app.post("/contas/credito", contaController.creditar.bind(contaController))
    app.post("/contas/debito", contaController.debitar.bind(contaController))
    app.post("/contas/limite", contaController.definirLimite.bind(contaController))
}
