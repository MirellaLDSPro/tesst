import express, { Request, Response } from 'express';
import { db } from './firebase';

async function testarFirestore() {
    try {
        const docRef = await db.collection('contatos').add({
            nome: 'Teste',
            email: 'teste@email.com',
            criadoEm: new Date().toISOString(),
        });
        console.log(`Documento criado com ID: ${docRef.id}`);
    } catch (error) {
        console.error('Erro ao testar Firestore:', error);
    }
}

testarFirestore();

const router = express.Router();

// Rota para listar todos os contatos
router.get('/', async (_req: Request, res: Response) => {
    // Lê o header "Authorization"
    const authorizationHeader = _req.headers.authorization;

    if (!authorizationHeader) {
        return res.status(401).json({ error: 'Authorization header is missing' });
    }

    console.log(`Token recebido: ${authorizationHeader}`);

    try {
        // Busca todos os documentos da coleção "contatos"
        const contatosSnapshot = await db.collection('contatos').get();

        // Converte os documentos em um array de objetos
        const contatos = contatosSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        // Retorna os contatos como resposta
        res.status(200).json(contatos);
    } catch (error) {
        console.error('Erro ao buscar contatos:', error);
        res.status(500).json({ error: 'Erro ao buscar contatos' });
    }
});

// Rota para cadastrar um novo contato
router.post('/', async (req: Request, res: Response) => {
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
        const docRef = await db.collection('contatos').add(novoContato);
        console.log(`Contato salvo com ID: ${docRef.id}`);

        res.status(201).json({ id: docRef.id, ...novoContato });
    } catch (error) {
        console.error('Erro ao salvar contato:', error);
        res.status(500).json({ error: 'Erro ao salvar contato' });
    }
});

export default router;