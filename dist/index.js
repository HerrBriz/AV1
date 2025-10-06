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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
const Aeronave_1 = require("./classes/Aeronave");
const Funcionario_1 = require("./classes/Funcionario");
const Peca_1 = require("./classes/Peca");
const Etapa_1 = require("./classes/Etapa");
const Teste_1 = require("./classes/Teste");
const Enum_1 = require("./classes/Enum");
const Relatorio_1 = require("./classes/Relatorio");
const aeronaves = Aeronave_1.Aeronave.carregar();
const funcionarios = Funcionario_1.Funcionario.carregar();
const pecas = Peca_1.Peca.carregar();
const etapas = Etapa_1.Etapa.carregar();
const testes = Teste_1.Teste.carregar();
// salva o  usuario atual do bagui
let usuarioLogado = null;
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function perguntar(pergunta) {
    return new Promise((resolve) => {
        rl.question(pergunta, (resposta) => {
            resolve(resposta);
        });
    });
}
//func para logar 
function realizarLogin() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('\n--- Autenticação AeroCode ---');
        const usuario = yield perguntar('Digite seu usuário: ');
        const senha = yield perguntar('Digite sua senha: ');
        // procura o funcionário pelo nome de usuário
        const funcionarioEncontrado = funcionarios.find(f => f.usuario === usuario);
        if (funcionarioEncontrado && funcionarioEncontrado.autenticarUsuario(usuario, senha)) {
            usuarioLogado = funcionarioEncontrado;
            console.log(`\nBem-vindo, ${usuarioLogado.nome}! Nível de acesso: ${usuarioLogado.nivelPermissao}`);
            yield menuPrincipal(); // 
        }
        else {
            console.log('Usuário ou senha inválidos. Tente novamente.');
            yield realizarLogin();
        }
    });
}
function exibirMenu() {
    console.log('\n========= Menu Principal AeroCode =========');
    console.log(`Usuário: ${usuarioLogado === null || usuarioLogado === void 0 ? void 0 : usuarioLogado.nome} | Nível: ${usuarioLogado === null || usuarioLogado === void 0 ? void 0 : usuarioLogado.nivelPermissao}`);
    console.log('-----------------------------------------');
    console.log('--- Visualizações e Consultas ---');
    console.log('1. Listar Todas as Aeronaves');
    console.log('2. Ver Detalhes de uma Aeronave');
    console.log('3. Listar Funcionários de uma Etapa');
    const isOperadorOuSuperior = (usuarioLogado === null || usuarioLogado === void 0 ? void 0 : usuarioLogado.nivelPermissao) === Enum_1.NivelPermissao.OPERADOR || (usuarioLogado === null || usuarioLogado === void 0 ? void 0 : usuarioLogado.nivelPermissao) === Enum_1.NivelPermissao.ENGENHEIRO || (usuarioLogado === null || usuarioLogado === void 0 ? void 0 : usuarioLogado.nivelPermissao) === Enum_1.NivelPermissao.ADMINISTRADOR;
    const isEngenheiroOuSuperior = (usuarioLogado === null || usuarioLogado === void 0 ? void 0 : usuarioLogado.nivelPermissao) === Enum_1.NivelPermissao.ENGENHEIRO || (usuarioLogado === null || usuarioLogado === void 0 ? void 0 : usuarioLogado.nivelPermissao) === Enum_1.NivelPermissao.ADMINISTRADOR;
    const isAdmin = (usuarioLogado === null || usuarioLogado === void 0 ? void 0 : usuarioLogado.nivelPermissao) === Enum_1.NivelPermissao.ADMINISTRADOR;
    if (isOperadorOuSuperior) {
        console.log('\n--- Ações de Produção ---');
        console.log('4. Iniciar Etapa de Produção');
        console.log('5. Finalizar Etapa de Produção');
        console.log('6. Atualizar Status de uma Peça');
    }
    if (isEngenheiroOuSuperior) {
        console.log('\n--- Cadastros e Associações ---');
        console.log('7. Cadastrar Nova Aeronave');
        console.log('8. Cadastrar Nova Peça');
        console.log('9. Cadastrar Nova Etapa');
        console.log('10. Cadastrar Novo Teste');
        console.log('11. Associar Peça a uma Aeronave');
        console.log('12. Associar Etapa a uma Aeronave');
        console.log('13. Associar Teste a uma Aeronave');
        console.log('14. Associar Funcionário a uma Etapa');
    }
    if (isAdmin) {
        console.log('\n--- Administração ---');
        console.log('15. Cadastrar Novo Funcionário');
        console.log('16. Gerar Relatório Final de Entrega');
    }
    console.log('\n--- Sistema ---');
    console.log('0. Sair');
    console.log('=========================================');
}
function cadastrarAeronave() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('--- Cadastro de Nova Aeronave ---');
        const codigo = yield perguntar('Digite o código da aeronave: ');
        const modelo = yield perguntar('Digite o modelo: ');
        console.log('Escolha o tipo:');
        console.log('1. Comercial');
        console.log('2. Militar');
        const tipoInput = yield perguntar('Opção: ');
        const tipo = tipoInput === '1' ? Enum_1.TipoAeronave.COMERCIAL : Enum_1.TipoAeronave.MILITAR;
        const capacidadeStr = yield perguntar('Digite a capacidade de passageiros: ');
        const capacidade = parseInt(capacidadeStr);
        const alcanceStr = yield perguntar('Digite o alcance (km): ');
        const alcance = parseInt(alcanceStr);
        const novaAeronave = new Aeronave_1.Aeronave(codigo, modelo, tipo, capacidade, alcance);
        aeronaves.push(novaAeronave);
        console.log(`\n*** Aeronave '${modelo}' cadastrada com sucesso! ***`);
    });
}
//funcao nova pra cadastro de func
function cadastrarFuncionario() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('\n--- Cadastro de Novo Funcionário ---');
        const id = yield perguntar('Digite o ID único do funcionário: ');
        const nome = yield perguntar('Digite o nome: ');
        const telefone = yield perguntar('Digite o telefone: ');
        const endereco = yield perguntar('Digite o endereço: ');
        const usuario = yield perguntar('Digite o nome de usuário: ');
        const senha = yield perguntar('Digite a senha: '); // Em um sistema real, faríamos um hash aqui
        const nivelInput = yield perguntar('Nível (1-Admin, 2-Engenheiro, 3-Operador): ');
        let nivel;
        if (nivelInput === '1')
            nivel = Enum_1.NivelPermissao.ADMINISTRADOR;
        else if (nivelInput === '2')
            nivel = Enum_1.NivelPermissao.ENGENHEIRO;
        else
            nivel = Enum_1.NivelPermissao.OPERADOR;
        const novoFuncionario = new Funcionario_1.Funcionario(id, nome, telefone, endereco, usuario, senha, nivel);
        funcionarios.push(novoFuncionario);
        console.log(`\n*** Funcionário '${nome}' cadastrado com sucesso! ***`);
    });
}
//cadastrar peca
function cadastrarPeca() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('\n--- Cadastro de Nova Peça ---');
        const nome = yield perguntar('Digite o nome da peça: ');
        const tipoInput = yield perguntar('Escolha o tipo (1-Nacional, 2-Importada): ');
        const tipo = tipoInput === '1' ? Enum_1.TipoPeca.NACIONAL : Enum_1.TipoPeca.IMPORTADA;
        const fornecedor = yield perguntar('Digite o nome do fornecedor: ');
        const novaPeca = new Peca_1.Peca(nome, tipo, fornecedor);
        pecas.push(novaPeca);
        console.log(`\n*** Peça '${nome}' cadastrada com sucesso! ***`);
    });
}
// cadastra Etapa
function cadastrarEtapa() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('\n--- Cadastro de Nova Etapa de Produção ---');
        const nome = yield perguntar('Digite o nome da etapa (ex: Montagem da Fuselagem): ');
        const prazoStr = yield perguntar('Digite o prazo de conclusão (formato AAAA-MM-DD): ');
        // Coverte a string pra objeto data
        const prazo = new Date(prazoStr);
        if (isNaN(prazo.getTime())) {
            console.log('Formato de data inválido! Use AAAA-MM-DD. A etapa não foi cadastrada.');
            return;
        }
        const novaEtapa = new Etapa_1.Etapa(nome, prazo);
        etapas.push(novaEtapa);
        console.log(`\n*** Etapa '${nome}' cadastrada com sucesso! ***`);
    });
}
//cadastro de teste 
function cadastrarTeste() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('\n--- Cadastro de Novo Teste ---');
        console.log('Escolha o tipo de teste:');
        console.log(`1. ${Enum_1.TipoTeste.ELETRICO}`);
        console.log(`2. ${Enum_1.TipoTeste.HIDRAULICO}`);
        console.log(`3. ${Enum_1.TipoTeste.AERODINAMICO}`);
        const tipoInput = yield perguntar('Opção: ');
        let tipo;
        if (tipoInput === '1')
            tipo = Enum_1.TipoTeste.ELETRICO;
        else if (tipoInput === '2')
            tipo = Enum_1.TipoTeste.HIDRAULICO;
        else
            tipo = Enum_1.TipoTeste.AERODINAMICO;
        console.log('\nEscolha o resultado do teste:');
        console.log(`1. ${Enum_1.ResultadoTeste.APROVADO}`);
        console.log(`2. ${Enum_1.ResultadoTeste.REPROVADO}`);
        const resultadoInput = yield perguntar('Opção: ');
        const resultado = resultadoInput === '1' ? Enum_1.ResultadoTeste.APROVADO : Enum_1.ResultadoTeste.REPROVADO;
        const novoTeste = new Teste_1.Teste(tipo, resultado);
        testes.push(novoTeste);
        //remove
        console.log(`\n*** Teste '${tipo}' cadastrado com sucesso! ***`);
    });
}
//func  para mostras detelhe das aero--estava faltando
function verDetalhesAeronave() {
    return __awaiter(this, void 0, void 0, function* () {
        const codigo = yield perguntar('\nDigite o código da aeronave que deseja ver: ');
        const aeronaveEncontrada = aeronaves.find(a => a.codigo === codigo);
        if (aeronaveEncontrada) {
            aeronaveEncontrada.detalhes();
        }
        else {
            console.log('Aeronave não encontrada.');
        }
    });
}
function associarPecaAAeronave() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('\n--- Associar Peça a uma Aeronave ---');
        if (aeronaves.length === 0 || pecas.length === 0) {
            console.log('É necessário ter ao menos uma aeronave e uma peça cadastradas para realizar a associação.');
            return;
        }
        console.log('Aeronaves disponíveis:');
        aeronaves.forEach((a, index) => console.log(`${index + 1}. ${a.modelo} (Código: ${a.codigo})`));
        const aeroIndex = parseInt(yield perguntar('Escolha o número da aeronave: ')) - 1;
        console.log('\nPeças disponíveis:');
        pecas.forEach((p, index) => console.log(`${index + 1}. ${p.nome}`));
        const pecaIndex = parseInt(yield perguntar('Escolha o número da peça a ser associada: ')) - 1;
        //  Validar e Associar
        if (aeronaves[aeroIndex] && pecas[pecaIndex]) {
            const aeronaveEscolhida = aeronaves[aeroIndex];
            const pecaEscolhida = pecas[pecaIndex];
            aeronaveEscolhida.adicionarPeca(pecaEscolhida);
            console.log(`\n*** Peça '${pecaEscolhida.nome}' associada à aeronave '${aeronaveEscolhida.modelo}' com sucesso! ***`);
        }
        else {
            console.log('Seleção inválida. Operação cancelada.');
        }
    });
}
//associar Etapa - mesma base da funcao de associar peca
function associarEtapaAAeronave() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('\n--- Associar Etapa de Produção a uma Aeronave ---');
        if (aeronaves.length === 0 || etapas.length === 0) {
            console.log('É necessário ter ao menos uma aeronave e uma etapa cadastradas para realizar a associação.');
            return;
        }
        console.log('Aeronaves disponíveis:');
        aeronaves.forEach((a, index) => console.log(`${index + 1}. ${a.modelo} (Código: ${a.codigo})`));
        const aeroIndex = parseInt(yield perguntar('Escolha o número da aeronave: ')) - 1;
        console.log('\nEtapas de Produção disponíveis:');
        etapas.forEach((e, index) => console.log(`${index + 1}. ${e.nome}`));
        const etapaIndex = parseInt(yield perguntar('Escolha o número da etapa a ser associada: ')) - 1;
        if (aeronaves[aeroIndex] && etapas[etapaIndex]) {
            const aeronaveEscolhida = aeronaves[aeroIndex];
            const etapaEscolhida = etapas[etapaIndex];
            aeronaveEscolhida.adicionarEtapa(etapaEscolhida);
            console.log(`\n*** Etapa '${etapaEscolhida.nome}' associada à aeronave '${aeronaveEscolhida.modelo}' com sucesso! ***`);
        }
        else {
            console.log('Seleção inválida. Operação cancelada.');
        }
    });
}
function associarTesteAAeronave() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('\n--- Associar Teste a uma Aeronave ---');
        if (aeronaves.length === 0 || testes.length === 0) {
            console.log('É necessário ter ao menos uma aeronave e um teste cadastrados para realizar a associação.');
            return;
        }
        // 
        console.log('Aeronaves disponíveis:');
        aeronaves.forEach((a, index) => console.log(`${index + 1}. ${a.modelo} (Código: ${a.codigo})`));
        const aeroIndex = parseInt(yield perguntar('Escolha o número da aeronave: ')) - 1;
        // 
        console.log('\nTestes disponíveis:');
        testes.forEach((t, index) => console.log(`${index + 1}. ${t.tipo} - ${t.resultado}`));
        const testeIndex = parseInt(yield perguntar('Escolha o número do teste a ser associado: ')) - 1;
        if (aeronaves[aeroIndex] && testes[testeIndex]) {
            const aeronaveEscolhida = aeronaves[aeroIndex];
            const testeEscolhido = testes[testeIndex];
            aeronaveEscolhida.adicionarTeste(testeEscolhido);
            console.log(`\n*** Teste '${testeEscolhido.tipo}' associado à aeronave '${aeronaveEscolhida.modelo}' com sucesso! ***`);
        }
        else {
            console.log('Seleção inválida. Operação cancelada.');
        }
    });
}
//associa func a etapa , pois a lista tava salvando vazia
function associarFuncionarioAEtapa() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('\n--- Associar Funcionário a uma Etapa ---');
        if (etapas.length === 0 || funcionarios.length === 0) {
            console.log('É necessário ter ao menos uma etapa e um funcionário cadastrados para realizar a associação.');
            return;
        }
        console.log('Etapas de Produção disponíveis:');
        etapas.forEach((e, index) => console.log(`${index + 1}. ${e.nome}`));
        const etapaIndex = parseInt(yield perguntar('Escolha o número da etapa: ')) - 1;
        console.log('\nFuncionários disponíveis:');
        funcionarios.forEach((f, index) => console.log(`${index + 1}. ${f.nome} (ID: ${f.id})`));
        const funcIndex = parseInt(yield perguntar('Escolha o número do funcionário a ser associado: ')) - 1;
        if (etapas[etapaIndex] && funcionarios[funcIndex]) {
            const etapaEscolhida = etapas[etapaIndex];
            const funcionarioEscolhido = funcionarios[funcIndex];
            etapaEscolhida.associarFuncionario(funcionarioEscolhido);
        }
        else {
            console.log('Seleção inválida. Operação cancelada.');
        }
    });
}
//alterar status da peca
function atualizarStatusPeca() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('\n--- Atualizar Status de uma Peça ---');
        if (pecas.length === 0) {
            console.log('Nenhuma peça cadastrada para atualizar.');
            return;
        }
        console.log('Peças disponíveis:');
        pecas.forEach((p, index) => console.log(`${index + 1}. ${p.nome} (Status atual: ${p.status})`));
        const pecaIndex = parseInt(yield perguntar('Escolha o número da peça que deseja atualizar: ')) - 1;
        if (pecas[pecaIndex]) {
            const pecaEscolhida = pecas[pecaIndex];
            console.log('\nEscolha o novo status:');
            console.log(`1. ${Enum_1.StatusPeca.EM_PRODUCAO}`);
            console.log(`2. ${Enum_1.StatusPeca.EM_TRANSPORTE}`);
            console.log(`3. ${Enum_1.StatusPeca.PRONTA}`);
            const statusInput = yield perguntar('Opção: ');
            let novoStatus;
            if (statusInput === '1')
                novoStatus = Enum_1.StatusPeca.EM_PRODUCAO;
            else if (statusInput === '2')
                novoStatus = Enum_1.StatusPeca.EM_TRANSPORTE;
            else
                novoStatus = Enum_1.StatusPeca.PRONTA;
            pecaEscolhida.atualizarStatus(novoStatus);
        }
        else {
            console.log('Seleção de peça inválida. Operação cancelada.');
        }
    });
}
function iniciarEtapaProducao() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('\n--- Iniciar Etapa de Produção ---');
        const codigoAeronave = yield perguntar('Digite o código da aeronave cuja etapa deseja iniciar: ');
        const aeronave = aeronaves.find(a => a.codigo === codigoAeronave);
        if (!aeronave) {
            console.log('Aeronave não encontrada.');
            return;
        }
        if (aeronave.etapas.length === 0) {
            console.log('Esta aeronave não possui etapas de produção associadas.');
            return;
        }
        // Filtra apenas as etapas que ainda estão "Pendentes"
        const etapasPendentes = aeronave.etapas.filter(e => e.status === Enum_1.StatusEtapa.PENDENTE);
        if (etapasPendentes.length === 0) {
            console.log('Não há etapas pendentes para iniciar nesta aeronave.');
            return;
        }
        console.log('Qual etapa pendente você deseja iniciar?');
        etapasPendentes.forEach((e, index) => console.log(`${index + 1}. ${e.nome}`));
        const etapaIndex = parseInt(yield perguntar('Escolha o número da etapa: ')) - 1;
        if (etapasPendentes[etapaIndex]) {
            etapasPendentes[etapaIndex].iniciar();
        }
        else {
            console.log('Seleção inválida.');
        }
    });
}
function finalizarEtapaProducao() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('\n--- Finalizar Etapa de Produção ---');
        const codigoAeronave = yield perguntar('Digite o código da aeronave cuja etapa deseja finalizar: ');
        const aeronave = aeronaves.find(a => a.codigo === codigoAeronave);
        if (!aeronave) {
            console.log('Aeronave não encontrada.');
            return;
        }
        const indicePrimeiraEtapaNaoConcluida = aeronave.etapas.findIndex(e => e.status !== Enum_1.StatusEtapa.CONCLUIDA);
        if (indicePrimeiraEtapaNaoConcluida === -1) {
            console.log('Todas as etapas desta aeronave já foram concluídas!');
            return;
        }
        const etapaParaFinalizar = aeronave.etapas[indicePrimeiraEtapaNaoConcluida];
        // ve qual  n ta finalizada
        if (etapaParaFinalizar.status === Enum_1.StatusEtapa.EM_ANDAMENTO) {
            etapaParaFinalizar.finalizar();
        }
        else {
            console.log(`Não é possível finalizar a etapa '${etapaParaFinalizar.nome}'. O seu status é '${etapaParaFinalizar.status}'. É preciso iniciá-la primeiro.`);
        }
    });
}
function listarFuncionariosDeEtapa() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('\n--- Listar Funcionários de uma Etapa ---');
        if (etapas.length === 0) {
            console.log('Nenhuma etapa cadastrada.');
            return;
        }
        // 1. Escolher a Etapa
        console.log('Etapas de Produção disponíveis:');
        etapas.forEach((e, index) => console.log(`${index + 1}. ${e.nome}`));
        const etapaIndex = parseInt(yield perguntar('Escolha o número da etapa para ver os funcionários: ')) - 1;
        if (etapas[etapaIndex]) {
            const etapaEscolhida = etapas[etapaIndex];
            etapaEscolhida.listarFuncionarios();
        }
        else {
            console.log('Seleção de etapa inválida.');
        }
    });
}
function gerarRelatorioFinal() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('\n--- Gerar Relatório Final de Entrega ---');
        if (aeronaves.length === 0) {
            console.log('Nenhuma aeronave cadastrada para gerar relatório.');
            return;
        }
        console.log('Aeronaves disponíveis:');
        aeronaves.forEach((a, index) => console.log(`${index + 1}. ${a.modelo} (Código: ${a.codigo})`));
        const aeroIndex = parseInt(yield perguntar('Escolha o número da aeronave para o relatório: ')) - 1;
        if (aeronaves[aeroIndex]) {
            const aeronaveEscolhida = aeronaves[aeroIndex];
            const nomeCliente = yield perguntar('Digite o nome do cliente: ');
            const dataEntregaStr = yield perguntar('Digite a data de entrega (AAAA-MM-DD): ');
            const dataEntrega = new Date(dataEntregaStr);
            const relatorio = new Relatorio_1.Relatorio();
            relatorio.gerarEsalvar(aeronaveEscolhida, nomeCliente, dataEntrega);
        }
        else {
            console.log('Seleção de aeronave inválida.');
        }
    });
}
//salvardados
function salvarDados() {
    console.log('\nSalvando todos os dados...');
    Aeronave_1.Aeronave.salvarTodos(aeronaves);
    Funcionario_1.Funcionario.salvarTodos(funcionarios);
    Peca_1.Peca.salvarTodos(pecas);
    Etapa_1.Etapa.salvarTodos(etapas);
    Teste_1.Teste.salvarTodos(testes);
    console.log('Dados salvos com sucesso!');
}
function menuPrincipal() {
    return __awaiter(this, void 0, void 0, function* () {
        exibirMenu();
        const opcao = yield perguntar('Escolha uma opção: ');
        switch (opcao) {
            case '1':
                console.log('\n--- Aeronaves Cadastradas ---');
                if (aeronaves.length === 0) {
                    console.log('Nenhuma aeronave cadastrada.');
                }
                else {
                    aeronaves.forEach(a => console.log(`- Código: ${a.codigo}, Modelo: ${a.modelo}`));
                }
                break;
            case '2':
                yield verDetalhesAeronave();
                break;
            case '3':
                yield listarFuncionariosDeEtapa();
                break;
            case '4':
                yield iniciarEtapaProducao();
                salvarDados();
                break;
            case '5':
                yield finalizarEtapaProducao();
                salvarDados();
                break;
            case '6':
                yield atualizarStatusPeca();
                salvarDados();
                break;
            case '7':
                yield cadastrarAeronave();
                salvarDados();
                break;
            case '8':
                yield cadastrarPeca();
                salvarDados();
                break;
            case '9':
                yield cadastrarEtapa();
                salvarDados();
                break;
            case '10':
                yield cadastrarTeste();
                salvarDados();
                break;
            case '11':
                yield associarPecaAAeronave();
                salvarDados();
                break;
            case '12':
                yield associarEtapaAAeronave();
                salvarDados();
                break;
            case '13':
                yield associarTesteAAeronave();
                salvarDados();
                break;
            case '14':
                yield associarFuncionarioAEtapa();
                salvarDados();
                break;
            case '15':
                yield cadastrarFuncionario();
                salvarDados();
                break;
            case '16':
                yield gerarRelatorioFinal();
                break;
            case '0':
                salvarDados();
                console.log('Encerrando o sistema AeroCode...');
                rl.close();
                return;
            default:
                console.log('Opção inválida! Tente novamente.');
                break;
        }
        yield menuPrincipal();
    });
}
function iniciarSistema() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Bem-vindo ao Sistema de Gestão AeroCode!');
        if (funcionarios.length === 0) {
            console.log('\nNenhum funcionário cadastrado. Por favor, cadastre o primeiro administrador:');
            yield cadastrarFuncionario();
            salvarDados();
        }
        yield realizarLogin();
    });
}
iniciarSistema();
