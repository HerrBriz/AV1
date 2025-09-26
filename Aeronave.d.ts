import { TipoAeronave } from "./enum";
export default class Aeronave {
    protected codigo: string;
    protected modelo: string;
    protected tipo: TipoAeronave;
    protected capacidade: number;
    protected alcance: number;
    constructor(codigo: string, modelo: string, tipo: TipoAeronave, capacidade: number, alcance: number);
    detalhes(): void;
    salvar(): void;
    carregar(): void;
}
//# sourceMappingURL=Aeronave.d.ts.map