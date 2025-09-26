import { StatusPeca, TipoPeca    } from "./enum";

class Peca {
    protected nome: string 
    protected tipo: TipoPeca 
    protected fornecedor: string
    protected status: StatusPeca

    constructor(nome: string, tipo: TipoPeca, fornecedor: string, status: StatusPeca) {
        this.nome = nome;
        this.tipo = tipo;
        this.fornecedor = fornecedor;
        this.status = status;
    };

    atualizarSatus(novoStatus: StatusPeca): void;

    salvar(): void{};

    carregar(): void{};

}