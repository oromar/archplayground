import express from "express"
import { Conta } from "./model/Conta"
import { ContaView } from "./view/ContaView"
import { ContaController } from "./controller/ContaController"

const PORT = 3000

const app = express()

app.use(express.json())


const conta = new Conta(0,0)
const contaView = new ContaView()
const contaController = new ContaController(conta, contaView)

contaController.registrar(app)


app.listen(PORT, ()=> {
    console.log(`🔥 Servidor executando na porta ${PORT}!`)
})
