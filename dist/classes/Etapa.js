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
exports.Etapa = void 0;
const Enum_1 = require("./Enum");
const Funcionario_1 = require("./Funcionario");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class Etapa {
    constructor(nome, prazo) {
        this.nome = nome;
        this.prazo = prazo;
        this.status = Enum_1.StatusEtapa.PENDENTE;
        this.funcionarios = [];
    }
    iniciar() {
        console.log(`A etapa '${this.nome}' foi iniciada.`);
        this.status = Enum_1.StatusEtapa.ANDAMENTO;
    }
    finalizar() {
        console.log(`A etapa '${this.nome}' foi concluída.`);
        this.status = Enum_1.StatusEtapa.CONCLUIDO;
    }
    associarFuncionario(funcionario) {
        const funcionarioJaExiste = this.funcionarios.find(f => f.id === funcionario.id);
        if (funcionarioJaExiste) {
            console.log(`Atenção: O funcionário ${funcionario.nome} já está alocado nesta etapa.`);
        }
        else {
            this.funcionarios.push(funcionario);
            console.log(`Funcionário ${funcionario.nome} associado com sucesso à etapa '${this.nome}'.`);
        }
    }
    listarFuncionarios() {
        console.log(`-> Listando funcionários da etapa ${this.nome}:`);
        this.funcionarios.forEach(f => console.log(` - ${f.nome}`));
        return this.funcionarios;
    }
    static salvarTodos(etapas) {
        const caminhoArquivo = path.join(__dirname, '..', 'dados', 'etapas.json');
        try {
            const dadosJson = JSON.stringify(etapas, null, 2);
            fs.writeFileSync(caminhoArquivo, dadosJson, 'utf-8');
        }
        catch (err) {
            console.error('Erro ao salvar as etapas:', err);
        }
    }
    static carregar() {
        const caminhoArquivo = path.join(__dirname, '..', 'dados', 'etapas.json');
        try {
            if (!fs.existsSync(caminhoArquivo)) {
                return [];
            }
            const dadosJson = fs.readFileSync(caminhoArquivo, 'utf-8');
            const etapasDados = JSON.parse(dadosJson);
            return etapasDados.map((dado) => {
                const etapa = new Etapa(dado.nome, new Date(dado.prazo));
                etapa.status = dado.status;
                etapa.funcionarios = dado.funcionarios.map((func) => new Funcionario_1.Funcionario(func.id, func.nome, func.telefone, func.endereco, func.usuario, func.senha_hash, func.nivelPermissao));
                return etapa;
            });
        }
        catch (err) {
            console.error(`Erro ao carregar as etapas: ${err}`);
            return [];
        }
    }
}
exports.Etapa = Etapa;
