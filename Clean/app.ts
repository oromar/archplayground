import express from  "express"
import {Endpoints} from "./infrastructure/server/Endpoints"

const app = express()
app.use(express.json())

new Endpoints().registrar(app)


app.listen(3000, () => console.log("Servidor escutando na porta 3000"))