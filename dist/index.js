"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contatos_1 = __importDefault(require("./contatos")); // Importa o roteador de contatos
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
// Middleware para interpretar JSON no corpo das requisições
app.use(express_1.default.json());
// Rota principal
app.get('/', (_req, res) => {
    return res.send('Express Typescript on Vercel');
});
// Rota de ping
app.get('/ping', (_req, res) => {
    return res.send('pong 🏓');
});
// Rota de contatos
app.use('/contatos', contatos_1.default);
app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});
//# sourceMappingURL=index.js.map