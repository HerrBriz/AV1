import { NivelPermissao } from "./enum.ts";
export default class Funcionario {
    protected id: string;
    protected nome: string;
    protected telefone: string;
    protected endereco: string;
    protected usuario: string;
    protected senha: string;
    protected nivelPermissao: NivelPermissao;
    constructor(id: string, nome: string, telefone: string, endereco: string, usuario: string, senha: string, nivelPermissao: NivelPermissao);
    autenticar(usuario: string, senha: string): boolean;
    salvar(): void;
    carregar(): void;
}
//# sourceMappingURL=Funcionario.d.ts.map