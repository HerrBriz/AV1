import { NivelPermissao } from "./enum";
import fs from "fs";

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

    autenticar(usuario: string, senha: string): boolean {
        return this.usuario === usuario && this.senha === senha;
    };

    salvar(): void{
        const filePath = "funcionarios.json";

        let funcionarios: any[] = [];
        if (FileSystem.existsSync(filePath)){
            funcionarios = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        }

        funcionarios = funcionarios.filter(f => f.id !== this.id);

        funcionarios.push({
            id: this.id,
            nome: this.nome,
            telefone: this.telefone,
            endereco: this.endereco,
            usuario: this.usuario,
            senha: this.senha,
            nivelPermissao: this.nivelPermissao 
        });

        fs.writeFileSync(filePath, JSON.stringify(funcionarios, null, 2), "utf-8");
        console.log(`✅ Funcionário ${this.nome} salvo.`)
    };

    carregar(): void{
        const filePath = "funcionarios.json";

        if (!fs.existsSync(filePath)) {
            console.log("❌ Nenhum funcionário cadastrado.");
            return;
        }

        const funcionarios = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        const encontrado = funcionarios.find((f: any) => f.id === this.id);

        if (encontrado) {
            this.nome = encontrado.nome;
            this.telefone = encontrado.telefone;
            this.endereco = encontrado.endereco;
            this.usuario = encontrado.usuario;
            this.senha = encontrado.senha;
            this.nivelPermissao = encontrado.nivelPermissao;
            console.log(`✅ Funcionário ${this.nome} carregado.`);
        } else {
            console.log("❌ Funcionário não encontrado.");
        }
    };
    
}