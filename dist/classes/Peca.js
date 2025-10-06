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
    return function mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Peca = void 0;
const Enums_1 = require("./Enum");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class Peca {
    constructor(nome, tipo, fornecedor) {
        this.nome = nome;
        this.tipo = tipo;
        this.fornecedor = fornecedor;
        this.status = Enums_1.StatusPeca.EM_PRODUCAO;
    }
    atualizarStatus(novoStatus) {
        console.log(`Status da peça '${this.nome}' atualizado de '${this.status}' para '${novoStatus}'.`);
        this.status = novoStatus;
    }
    static salvarTodos(pecas) {
        const caminhoArquivo = path.join(__dirname, '..', 'dados', 'pecas.json');
        try {
            const dadosJson = JSON.stringify(pecas, null, 2);
            fs.writeFileSync(caminhoArquivo, dadosJson, 'utf-8');
        }
        catch (err) {
            console.error('Erro ao salvar as peças:', err);
        }
    }
    static carregar() {
        const caminhoArquivo = path.join(__dirname, '..', 'dados', 'pecas.json');
        try {
            if (!fs.existsSync(caminhoArquivo)) {
                return [];
            }
            const dadosJson = fs.readFileSync(caminhoArquivo, 'utf-8');
            const pecasDados = JSON.parse(dadosJson);
            return pecasDados.map((dado) => {
                const peca = new Peca(dado.nome, dado.tipo, dado.fornecedor);
                peca.status = dado.status;
                return peca;
            });
        }
        catch (err) {
            console.error(`Erro ao carregar as peças: ${err}`);
            return [];
        }
    }
}
exports.Peca = Peca;
