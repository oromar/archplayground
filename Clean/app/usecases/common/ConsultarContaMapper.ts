import { Conta } from "../../../domain/entities/Conta";
import { ConsultarContaOutput } from "../consultar/ConsultarContaOutput";

export class ConsultarContaMapper {
    
    public map(conta: Conta) : ConsultarContaOutput {
        return new ConsultarContaOutput(
            conta.getId(), 
            conta.getSaldo().getValor(), 
            conta.getLimiteCredito().getValor(), 
            conta.getSaldo().getMoeda()
        )
        
    }
}