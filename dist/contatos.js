"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const firebase_1 = require("./firebase");
function testarFirestore() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const docRef = yield firebase_1.db.collection('contatos').add({
                nome: 'Teste',
                email: 'teste@email.com',
                criadoEm: new Date().toISOString(),
            });
            console.log(`Documento criado com ID: ${docRef.id}`);
        }
        catch (error) {
            console.error('Erro ao testar Firestore:', error);
        }
    });
}
testarFirestore();
const router = express_1.default.Router();
// Rota para listar todos os contatos
router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Lê o header "Authorization"
    const authorizationHeader = _req.headers.authorization;
    if (!authorizationHeader) {
        return res.status(401).json({ error: 'Authorization header is missing' });
    }
    console.log(`Token recebido: ${authorizationHeader}`);
    try {
        // Busca todos os documentos da coleção "contatos"
        const contatosSnapshot = yield firebase_1.db.collection('contatos').get();
        // Converte os documentos em um array de objetos
        const contatos = contatosSnapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
        // Retorna os contatos como resposta
        res.status(200).json(contatos);
    }
    catch (error) {
        console.error('Erro ao buscar contatos:', error);
        res.status(500).json({ error: 'Erro ao buscar contatos' });
    }
}));
// Rota para cadastrar um novo contato
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome, email } = req.body;
    if (!nome || !email) {
        return res.status(400).json({ error: 'Nome e email são obrigatórios' });
    }
    const novoContato = {
        nome,
        email,
        criadoEm: new Date().toISOString(),
    };
    console.log('Novo contato:', novoContato);
    try {
        // Salva o contato no Firestore
        const docRef = yield firebase_1.db.collection('contatos').add(novoContato);
        console.log(`Contato salvo com ID: ${docRef.id}`);
        res.status(201).json(Object.assign({ id: docRef.id }, novoContato));
    }
    catch (error) {
        console.error('Erro ao salvar contato:', error);
        res.status(500).json({ error: 'Erro ao salvar contato' });
    }
}));
exports.default = router;
//# sourceMappingURL=contatos.js.map