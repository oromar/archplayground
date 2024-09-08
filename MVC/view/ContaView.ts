import {Response} from "express"
import { Transacao } from "../model/Conta";

interface ContaData {
    saldo: number
    limiteCredito: number,
    transacoes: Transacao[]
}

export class ContaView {
 
    public render(res: Response, contaData: ContaData ) {
        res.json(contaData)
    }
}