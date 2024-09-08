import { Express } from "express"

export interface Controller {
    registrar(app: Express): void
}