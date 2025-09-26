import { NivelPermissao } from "./enum";

export default class Funcionario {
    protected id: string;
    protected nome: string;
    protected telefone: string;
    protected endereco: string;
    protected usuario: string;
    protected senha: string;
    protected nivelPermissao: NivelPermissao;

    constructor(id: string, nome: string, telefone: string, endereco: string, usuario: string, senha: string, nivelPermissao: NivelPermissao) {
        this.id = id;
        this.nome = nome;
        this.telefone = telefone;
        this.endereco = endereco;
        this.usuario = usuario;
        this.senha = senha;
        this.nivelPermissao = nivelPermissao;
    };

    autenticar(usuario: string, senha: string): boolean {};

    salvar(): void{};

    carregar(): void{};
    
}