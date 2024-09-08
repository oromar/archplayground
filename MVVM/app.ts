import express from "express"
import { ContaViewModel } from "./viewModels/ContaViewModel"
import { ContaModel } from "./models/ContaModel"
import { ContaView } from "./views/ContaView"


const PORTA = 3000
const app = express()

app.use(express.json())


const contaModel = new ContaModel(0,0)
const contaViewModel = new ContaViewModel(contaModel)
const contaView = new ContaView(contaViewModel)

contaView.registrar(app)



app.listen(PORTA, () => {
    console.log(`🔥 Servidor executando na porta ${PORTA}!`)
})