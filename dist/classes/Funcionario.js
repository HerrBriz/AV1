"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Funcionario = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class Funcionario {
    constructor(id, nome, telefone, endereco, usuario, senha_hash, nivel) {
        this.id = id;
        this.nome = nome;
        this.telefone = telefone;
        this.endereco = endereco;
        this.usuario = usuario;
        this.senha_hash = senha_hash;
        this.nivelPermissao = nivel;
    }
    autenticarUsuario(usuario, senha_hash_fornecida) {
        console.log("-> Lógica de autenticação a ser implementada!");
        return this.usuario === usuario && this.senha_hash === senha_hash_fornecida;
    }
    static salvarTodos(funcionarios) {
        const caminhoArquivo = path.join(__dirname, '..', 'dados', 'funcionarios.json');
        try {
            const dadosJson = JSON.stringify(funcionarios, null, 2);
            fs.writeFileSync(caminhoArquivo, dadosJson, 'utf-8');
        }
        catch (err) {
            console.error('Erro ao salvar os funcionários:', err);
        }
    }
    static carregar() {
        const caminhoArquivo = path.join(__dirname, '..', 'dados', 'funcionarios.json');
        try {
            if (!fs.existsSync(caminhoArquivo)) {
                return [];
            }
            const dadosJson = fs.readFileSync(caminhoArquivo, 'utf-8');
            const funcionariosDados = JSON.parse(dadosJson);
            return funcionariosDados.map((dado) => new Funcionario(dado.id, dado.nome, dado.telefone, dado.endereco, dado.usuario, dado.senha_hash, dado.nivelPermissao));
        }
        catch (err) {
            console.error(`Erro ao carregar os funcionários: ${err}`);
            return [];
        }
    }
}
exports.Funcionario = Funcionario;
