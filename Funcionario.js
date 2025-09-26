"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enum_ts_1 = require("./enum.ts");
class Funcionario {
    id;
    nome;
    telefone;
    endereco;
    usuario;
    senha;
    nivelPermissao;
    constructor(id, nome, telefone, endereco, usuario, senha, nivelPermissao) {
        this.id = id;
        this.nome = nome;
        this.telefone = telefone;
        this.endereco = endereco;
        this.usuario = usuario;
        this.senha = senha;
        this.nivelPermissao = nivelPermissao;
    }
    ;
    autenticar(usuario, senha) { }
    ;
    salvar() { }
    ;
    carregar() { }
    ;
}
exports.default = Funcionario;
//# sourceMappingURL=Funcionario.js.map