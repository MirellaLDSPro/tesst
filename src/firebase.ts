import dotenv from 'dotenv';
dotenv.config();

import admin from 'firebase-admin';
import { cert } from 'firebase-admin/app';
import { ServiceAccount } from 'firebase-admin';

console.log('Iniciando Firebase...');

// Objeto de configuração do Firebase
const serviceAccount: ServiceAccount = {
    projectId: 'residence-back',
    // privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID || '',
    privateKey: process.env.TESTE_KEY?.replace(/\|\|\|/g, '\n').replace(/\\n/g, '\n') || '',
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL || '',
};

admin.initializeApp({
    credential: cert(serviceAccount),
});

const db = admin.firestore();

export { db };