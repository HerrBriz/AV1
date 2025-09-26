import { TipoAeronave } from "./enum";

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
        console.log("--- Detalhes da Aeronave ---");
        console.log(`Código: ${this.codigo}\nModelo: ${this.modelo}\nTipo: ${this.tipo}\nCapacidade: ${this.capacidade} passageiros\nAlcance: ${this.alcance} km`);
        console.log("--- --- ---");
    };

    salvar(): void{};

    carregar(): void{};

}