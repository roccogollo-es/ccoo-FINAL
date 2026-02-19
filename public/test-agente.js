// Test simple del agente
require('dotenv').config();
const OpenAI = require('openai');

console.log('🔍 Verificando configuración...\n');

// 1. Verificar API Key
const apiKey = process.env.OPENAI_API_KEY;
console.log('1️⃣ API Key:', apiKey ? `✅ Configurada (${apiKey.substring(0, 10)}...)` : '❌ NO configurada');

// 2. Verificar OpenAI
try {
    const openai = new OpenAI({ apiKey });
    console.log('2️⃣ Cliente OpenAI: ✅ Inicializado');
} catch (error) {
    console.log('2️⃣ Cliente OpenAI: ❌ Error:', error.message);
    process.exit(1);
}

// 3. Test de conexión
async function testConexion() {
    try {
        const openai = new OpenAI({ apiKey });
        console.log('\n3️⃣ Probando conexión con OpenAI...');

        const models = await openai.models.list();
        console.log('✅ Conexión exitosa! Modelos disponibles:', models.data.length);

        console.log('\n✅ TODO LISTO - Puedes usar el agente');
        console.log('\nPara iniciarlo ejecuta:');
        console.log('   npm run agent');
        console.log('   o');
        console.log('   node agent-server.js');

    } catch (error) {
        console.log('❌ Error de conexión:', error.message);

        if (error.message.includes('401')) {
            console.log('\n⚠️  PROBLEMA: API Key inválida');
            console.log('Solución: Verifica tu API key en el archivo .env');
        } else if (error.message.includes('quota')) {
            console.log('\n⚠️  PROBLEMA: Cuota excedida');
            console.log('Solución: Añade créditos en https://platform.openai.com/account/billing');
        } else {
            console.log('\n⚠️  Error desconocido:', error);
        }
    }
}

testConexion();
