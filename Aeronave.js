"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
import { TipoAeronave } from "./enum.js";
var Aeronave = /** @class */ (function () {
    function Aeronave(codigo, modelo, tipo, capacidade, alcance) {
        this.codigo = codigo;
        this.modelo = modelo;
        this.tipo = tipo;
        this.capacidade = capacidade;
        this.alcance = alcance;
    }
    ;
    Aeronave.prototype.detalhes = function () {
        console.log("--- Detalhes da Aeronave ---");
        console.log("C\u00F3digo: ".concat(this.codigo, "\nModelo: ").concat(this.modelo, "\nTipo: ").concat(this.tipo, "\nCapacidade: ").concat(this.capacidade, " passageiros\nAlcance: ").concat(this.alcance, " km"));
        console.log("--- --- ---");
    };
    ;
    Aeronave.prototype.salvar = function () { };
    ;
    Aeronave.prototype.carregar = function () { };
    ;
    return Aeronave;
}());

const avi = new Aeronave("A123", "Boeing 737", TipoAeronave.COMERCIAL, 189, 5600);
avi.detalhes();

exports.default = Aeronave;