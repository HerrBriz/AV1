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
exports.Relatorio = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class Relatorio {
    /**
     
     * @param aeronave O objeto da aeronave.
     * @param nomeCliente O nome do cliente final.
     * @param dataEntrega A data de entrega combinada.
     */
    gerarEsalvar(aeronave, nomeCliente, dataEntrega) {
        let conteudo = '=========================================\n';
        conteudo += '    RELATÓRIO FINAL DE PRODUÇÃO\n';
        conteudo += '=========================================\n\n';
        conteudo += `Cliente: ${nomeCliente}\n`;
        conteudo += `Data de Entrega: ${dataEntrega.toLocaleDateString('pt-BR')}\n\n`;
        conteudo += `--- Ficha Técnica da Aeronave ---\n`;
        conteudo += `Código: ${aeronave.codigo}\n`;
        conteudo += `Modelo: ${aeronave.modelo}\n`;
        conteudo += `Tipo: ${aeronave.tipo}\n`;
        conteudo += `Capacidade: ${aeronave.capacidade} passageiros\n`;
        conteudo += `Alcance: ${aeronave.alcance} km\n\n`;
        conteudo += `--- Peças Associadas ---\n`;
        aeronave.pecas.forEach(p => {
            conteudo += `- ${p.nome} (Fornecedor: ${p.fornecedor}) - Status: ${p.status}\n`;
        });
        conteudo += `\n--- Plano de Produção (Etapas) ---\n`;
        aeronave.etapas.forEach(e => {
            conteudo += `- ${e.nome} (Prazo: ${e.prazo.toLocaleDateString('pt-BR')}) - Status: ${e.status}\n`;
        });
        conteudo += `\n--- Testes Realizados ---\n`;
        aeronave.testes.forEach(t => {
            conteudo += `- Teste ${t.tipo}: ${t.resultado}\n`;
        });
        conteudo += '\n=========================================\n';
        this.salvarEmArquivo(conteudo, aeronave.codigo);
    }
    salvarEmArquivo(conteudo, codigoAeronave) {
        const diretorioRelatorios = path.join(__dirname, '..', 'relatorios');
        const caminhoArquivo = path.join(diretorioRelatorios, `Relatorio-${codigoAeronave}.txt`);
        try {
            if (!fs.existsSync(diretorioRelatorios)) {
                fs.mkdirSync(diretorioRelatorios, { recursive: true });
            }
            fs.writeFileSync(caminhoArquivo, conteudo, 'utf-8');
            console.log(`\n*** Relatório salvo com sucesso em: ${caminhoArquivo} ***`);
        }
        catch (error) {
            console.error('Erro ao salvar o relatório em arquivo:', error);
        }
    }
}
exports.Relatorio = Relatorio;
