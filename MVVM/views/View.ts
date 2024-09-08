import {Express} from "express"

export interface View {
    registrar(app: Express): void
}