import fs from "fs";
import { StatusPeca, TipoPeca } from "./enum";

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

    salvar(): void {
        const filePath = "pecas.json";

        let pecas: any[] = [];
        if (fs.existSync(filePath)) {
            pecas = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        }

        pecas = pecas .filter((p) => p.nome !== this.nome);
        pecas.push({
            nome: this.nome,
            tipo: this.tipo,
            fornecedor: this.fornecedor,
            status: this.status
        });

        fs.writeFileSync(filePath, JSON.stringify(pecas, null, 2), "utf-8");
        console.log(`✅ Peça ${this.nome} salva.`);

    }

    carregar(): void {
        const filePath = "pecas.json";

        if (!fs.existsSync(filePath)) {
        console.log("❌ Nenhuma peça cadastrada.");
        return;
        }

        const pecas = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        const encontrada = pecas.find((p: any) => p.nome === this.nome);

         if (encontrada) {
            this.tipo = encontrada.tipo;
            this.fornecedor = encontrada.fornecedor;
            this.status = encontrada.status;
            console.log(`✅ Peça ${this.nome} carregada.`);
        } else {
            console.log(`❌ Peça ${this.nome} não encontrada.`);
        }
    }
}