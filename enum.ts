export enum TipoAeronave {
    COMERCIAL = "COMERCIAL",
    MILITAR = "MILITAR"
}

export enum TipoPeca {
    NACIONAL = "NACIONAL",
    IMPORTADA = "IMPORTADA"
}

export enum StatusPeca {
    EM_PRODUCAO = "EM PRODUÇÃO",
    EM_TRANSPORTE = "EM TRANSPORTE",
    PRONTA = "PRONTA"
}

export enum StatusEtapa {
    PENDENTE = "PENDENTE",
    ANDAMENTO = "ANDAMENTO",
    CONCLUIDO = "CONCLUIDO"
}

export enum NivelPermissao {
    ADMINISTRADOR = "ADMINISTRADOR",
    ENGENHEIRO = "ENGENHEIRO",
    OPERADOR = "OPERADOR"
}

export enum TipoTeste {
    ELETRICO = "ELETRICO",
    HIDRAULICO = "HIDRAULICO",
    AERODINAMICO = "AERODINAMICO"
}

export enum ResultadoTeste {
    APROVADO = "APROVADO",
    REPROVADO = "REPROVADO"
}