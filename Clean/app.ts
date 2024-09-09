import express from  "express"
import {registrar} from "./infrastructure/server/init"

const app = express()
app.use(express.json())

registrar(app)

app.listen(3000, () => console.log("Servidor escutando na porta 3000"))