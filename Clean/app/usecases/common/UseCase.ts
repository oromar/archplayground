export interface UseCase<Input, Output> {
    executar(entrada: Input) : Promise<Output>
}

