import { TipoAeronave, TipoPeca, StatusEtapa, TipoTeste } from "./enum";
import fs from 'fs';

export default class Aeronave {
    protected codigo: string
    protected modelo: string
    protected tipo: TipoAeronave
    protected capacidade: number
    protected alcance: number

    constructor(codigo: string, modelo: string, tipo: TipoAeronave, capacidade: number, alcance: number) {
        this.codigo = codigo;
        this.modelo = modelo;
        this.tipo = tipo;
        this.capacidade = capacidade;
        this.alcance = alcance;
    };

    detalhes(): void {
        console.log("------- Detalhes da Aeronave -------");
        console.log(`Codigo: ${this.codigo}\nModelo: ${this.modelo}\nTipo: ${this.tipo}\nCapacidade: ${this.capacidade} passageiros\nAlcance: ${this.alcance} km/h`);
        console.log("------------------------------------");
        console.log("");
    };

    salvar(): void{
        const filePath = "Aeronave.json"
        let aeronaves: any[] = [];
        if (fs.existsSync(filePath)) {
            const raw = fs.readFileSync(filePath, "utf-8");
            aeronaves = JSON.parse(raw);            
        }

        aeronaves = aeronaves.filter(a => a.codigo !== this.codigo);

        aeronaves.push ({
            codigo: this.codigo,
            modelo: this.modelo,
            tipo: this.tipo,
            capacidade: this.capacidade,
            alcance: this.alcance   
        });

        fs.writeFileSync(filePath, JSON.stringify(aeronaves, null, 2), "utf-8");

        console.log("Aeronave salva com sucesso!");
    };


    carregar(): void{
        const filePath = "aeronave.json";

        if (!fs.existsSync(filePath)) {
            console.log("Arquivo de aeronaves não encontrado.");
            return;
        }

        const raw = fs.readFileSync(filePath, "utf-8");
        const aeronaves = JSON.parse(raw);

        const encontrada = aeronaves.find((a: any) => a.codigo === this.codigo);

        if (encontrada) {
            this.modelo = encontrada.modelo;
            this.tipo = encontrada.tipo;
            this.capacidade = encontrada.capacidade;
            this.alcance = encontrada.alcance;

            console.log(`✅ Aeronave ${this.codigo} carregada com sucesso.`);
            } else {
            console.log(`❌ Aeronave ${this.codigo} não encontrada.`);
        }
    };
}