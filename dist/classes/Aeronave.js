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
exports.Aeronave = void 0;
const Peca_1 = require("./Peca");
const Etapa_1 = require("./Etapa");
const Teste_1 = require("./Teste");
const Funcionario_1 = require("./Funcionario");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class Aeronave {
    constructor(codigo, modelo, tipo, capacidade, alcance) {
        this.codigo = codigo;
        this.modelo = modelo;
        this.tipo = tipo;
        this.capacidade = capacidade;
        this.alcance = alcance;
        this.pecas = [];
        this.etapas = [];
        this.testes = [];
    }
    adicionarTeste(teste) {
        this.testes.push(teste);
        console.log(`Teste de '${teste.tipo}' adicionado à aeronave ${this.codigo}.`);
    }
    adicionarPeca(peca) {
        this.pecas.push(peca);
        console.log(`Peça '${peca.nome}' adicionada à aeronave ${this.codigo}.`);
    }
    adicionarEtapa(etapa) {
        this.etapas.push(etapa);
        console.log(`Etapa '${etapa.nome}' adicionada ao plano de produção da aeronave ${this.codigo}.`);
    }
    detalhes() {
        console.log(`\n--- Ficha Técnica da Aeronave: ${this.codigo} ---`);
        console.log(`   Modelo: ${this.modelo} | Tipo: ${this.tipo}`);
        console.log(`   Capacidade: ${this.capacidade} | Alcance: ${this.alcance} km`);
        console.log('\n   --- Peças Associadas ---');
        this.pecas.forEach(p => console.log(`   - ${p.nome} (Status: ${p.status})`));
        console.log('\n   --- Etapas de Produção ---');
        this.etapas.forEach(e => console.log(`   - ${e.nome} (Status: ${e.status})`));
        console.log('\n   --- Testes Realizados ---');
        this.testes.forEach(t => console.log(`   - Teste ${t.tipo}: ${t.resultado}`));
        console.log('-------------------------------------------');
    }
    static salvarTodos(aeronaves) {
        const caminhoArquivo = path.join(__dirname, '..', 'dados', 'aeronaves.json');
        try {
            const dadosJson = JSON.stringify(aeronaves, null, 2);
            fs.writeFileSync(caminhoArquivo, dadosJson, 'utf-8');
        }
        catch (err) {
            console.error('Erro ao salvar as aeronaves:', err);
        }
    }
    static carregar() {
        const caminhoArquivo = path.join(__dirname, '..', 'dados', 'aeronaves.json');
        try {
            if (!fs.existsSync(caminhoArquivo)) {
                return [];
            }
            const dadosJson = fs.readFileSync(caminhoArquivo, 'utf-8');
            const aeronavesDados = JSON.parse(dadosJson);
            return aeronavesDados.map((dado) => {
                const aeronave = new Aeronave(dado.codigo, dado.modelo, dado.tipo, dado.capacidade, dado.alcance);
                aeronave.pecas = (dado.pecas || []).map((p) => {
                    const peca = new Peca_1.Peca(p.nome, p.tipo, p.fornecedor);
                    peca.status = p.status;
                    return peca;
                });
                aeronave.etapas = (dado.etapas || []).map((e) => {
                    const etapa = new Etapa_1.Etapa(e.nome, new Date(e.prazo));
                    etapa.status = e.status;
                    etapa.funcionarios = (e.funcionarios || []).map((func) => new Funcionario_1.Funcionario(func.id, func.nome, func.telefone, func.endereco, func.usuario, func.senha_hash, func.nivelPermissao));
                    return etapa;
                });
                aeronave.testes = (dado.testes || []).map((t) => new Teste_1.Teste(t.tipo, t.resultado));
                return aeronave;
            });
        }
        catch (err) {
            console.error(`Erro ao carregar as aeronaves: ${err}`);
            return [];
        }
    }
}
exports.Aeronave = Aeronave;
