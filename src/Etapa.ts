import { StatusEtapa } from "./enum";
import Funcionario from "./Funcionario";

class Etapa {
    protected nome: string
    protected prazo: string
    protected status: StatusEtapa
    protected funcionarios: Array<Funcionario>

    constructor(nome: string, prazo: string, status: StatusEtapa, funcionarios: Array<Funcionario>) {
        this.nome = nome;
        this.prazo = prazo;
        this.status = status;
        this.funcionarios = funcionarios;
    }

    iniciar(){
        this.status = StatusEtapa.ANDAMENTO; 
    };

    finalizar(){
        this.status = StatusEtapa.CONCLUIDO
    };

    associarFuncionario(funcionario: Funcionario){
        this.funcionarios.push(funcionario);
    };

    listaFuncionarios(){
        return this.funcionarios.map(funcionario => funcionario.nome).join(", ");
    }
}