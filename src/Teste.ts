import { TipoTeste, ResultadoTeste } from "./enum";

class Teste {
    protected tipo: TipoTeste;
    protected resultado: ResultadoTeste;

    constructor(tipo: TipoTeste, resultado: ResultadoTeste) {
        this.tipo = tipo;
        this.resultado = resultado;
    }

    salvar(): void{};

    carregar():void{};

}