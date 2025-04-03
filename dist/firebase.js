"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const app_1 = require("firebase-admin/app");
console.log('Iniciando Firebase...');
// Objeto de configuração do Firebase
const serviceAccount = {
    projectId: 'residence-back',
    // privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID || '',
    privateKey: ((_a = process.env.TESTE_KEY) === null || _a === void 0 ? void 0 : _a.replace(/\|\|\|/g, '\n').replace(/\\n/g, '\n')) || '',
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL || '',
};
firebase_admin_1.default.initializeApp({
    credential: (0, app_1.cert)(serviceAccount),
});
const db = firebase_admin_1.default.firestore();
exports.db = db;
//# sourceMappingURL=firebase.js.map