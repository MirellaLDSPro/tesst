"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Lista de contatos (simulação de banco de dados)
const contatos = [
    { id: 1, nome: 'João', email: 'joao@email.com' },
    { id: 2, nome: 'Maria', email: 'maria@email.com' },
];
// Rota para listar todos os contatos
router.get('/', (_req, res) => {
    const authorizationHeader = _req.headers.authorization;
    if (!authorizationHeader) {
        return res.status(401).json({ error: 'Authorization header is missing' });
    }
    // Exemplo: Log do token recebido
    console.log(`Token recebido: ${authorizationHeader}`);
    res.set('v-cliente', 'valor');
    res.json(contatos);
});
// Rota para cadastrar um novo contato
router.post('/', (req, res) => {
    const { nome, email } = req.body;
    if (!nome || !email) {
        return res.status(400).json({ error: 'Nome e email são obrigatórios' });
    }
    const novoContato = {
        id: contatos.length + 1,
        nome,
        email,
    };
    contatos.push(novoContato);
    res.status(201).json(novoContato);
});
exports.default = router;
//# sourceMappingURL=contatos.js.map