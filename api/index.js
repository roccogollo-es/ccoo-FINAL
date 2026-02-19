// ============================================
// SERVIDOR DE AGENTES IA - CCOO HÁBITAT
// Sistema avanzado con OpenAI Assistants API
// ============================================

const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar CORS y JSON
app.use(cors());
app.use(express.json());

// Servir archivos estáticos del frontend (HTML, CSS, JS) - IMPORTANTE PARA RENDER
app.use(express.static(__dirname));

// Inicializar OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Cargar configuración del vector store (si existe)
let vectorStoreConfig = null;
try {
    if (fs.existsSync('./vector-store-config.json')) {
        vectorStoreConfig = JSON.parse(fs.readFileSync('./vector-store-config.json', 'utf8'));
        console.log('✅ Vector Store configurado:', vectorStoreConfig.vectorStoreId);
    }
} catch (error) {
    console.log('ℹ️  No hay vector store configurado (opcional)');
}

// ============================================
// ALMACENAR ASISTENTE Y THREADS
// ============================================
let assistantId = null;
const userThreads = new Map(); // Guardar conversaciones por usuario

// ============================================
// FUNCIONES DISPONIBLES PARA EL AGENTE
// ============================================

const AGENT_FUNCTIONS = [
    // {
    //     type: "function",
    //     function: { ... buscar_convenio eliminada ... }
    // },
    {
        type: "function",
        function: {
            name: "calcular_horas_extra",
            description: "Calcula las horas extra, festivos y nocturnidad registradas por un trabajador",
            parameters: {
                type: "object",
                properties: {
                    mes: {
                        type: "string",
                        description: "Mes a consultar (ej: '2026-02')"
                    },
                    tipo: {
                        type: "string",
                        enum: ["extra", "festivo", "nocturnidad", "todas"],
                        description: "Tipo de horas a calcular"
                    }
                },
                required: ["mes"]
            }
        }
    },
    {
        type: "function",
        function: {
            name: "consultar_documentos",
            description: "Consulta los documentos disponibles en la aplicación (convenios, actas, vídeos, presentaciones)",
            parameters: {
                type: "object",
                properties: {
                    categoria: {
                        type: "string",
                        enum: ["convenios", "actas", "videos", "presentaciones", "todos"],
                        description: "Categoría de documentos a consultar"
                    }
                },
                required: ["categoria"]
            }
        }
    },
    {
        type: "function",
        function: {
            name: "generar_informe_laboral",
            description: "Genera un informe o documento jurídico (reclamación, impugnación, etc.)",
            parameters: {
                type: "object",
                properties: {
                    tipo_documento: {
                        type: "string",
                        enum: ["reclamacion", "impugnacion_despido", "escrito_inspección", "conciliacion", "demanda"],
                        description: "Tipo de documento a generar"
                    },
                    datos: {
                        type: "object",
                        description: "Datos necesarios para el documento",
                        properties: {
                            nombre_trabajador: { type: "string" },
                            empresa: { type: "string" },
                            motivo: { type: "string" },
                            fecha_incidente: { type: "string" }
                        }
                    }
                },
                required: ["tipo_documento", "datos"]
            }
        }
    },
    {
        type: "function",
        function: {
            name: "contactar_delegado",
            description: "Proporciona información de contacto del delegado sindical apropiado",
            parameters: {
                type: "object",
                properties: {
                    motivo: {
                        type: "string",
                        description: "Motivo de la consulta para dirigir al delegado correcto"
                    },
                    urgente: {
                        type: "boolean",
                        description: "Si el caso es urgente"
                    }
                },
                required: ["motivo"]
            }
        }
    }
];

// ============================================
// IMPLEMENTACIÓN DE FUNCIONES
// ============================================

async function ejecutarFuncion(nombreFuncion, argumentos) {
    console.log(`🔧 Ejecutando función: ${nombreFuncion}`, argumentos);

    switch (nombreFuncion) {
        // Función: buscar_convenio eliminada
        case 'calcular_horas_extra':
            return calcularHorasExtra(argumentos);

        case 'consultar_documentos':
            return consultarDocumentos(argumentos);

        case 'generar_informe_laboral':
            return generarInforme(argumentos);

        case 'contactar_delegado':
            return contactarDelegado(argumentos);

        default:
            return { error: 'Función no reconocida' };
    }
}

// Función eliminada para favorecer file_search

// Función: Calcular horas extra
function calcularHorasExtra(args) {
    const { mes, tipo = 'todas' } = args;

    // Simulación - En producción conectaría con tu base de datos
    const datos = {
        mes: mes,
        resumen: {
            horas_extra: 12.5,
            festivos: 8,
            nocturnidad: 16,
            total: 36.5
        },
        compensacion: {
            horas_extra: 12.5 * 18.5, // Ejemplo: 18.5€/hora extra
            festivos: 8 * 25.0,
            nocturnidad: 16 * 15.0
        },
        desglose: [
            { fecha: '2026-02-08', tipo: 'extra', horas: 4.5, descripcion: 'Servicio urgente' },
            { fecha: '2026-02-14', tipo: 'festivo', horas: 8, descripcion: 'San Valentín' },
            { fecha: '2026-02-20', tipo: 'extra', horas: 8, descripcion: 'Mantenimiento especial' }
        ]
    };

    return {
        ...datos,
        mensaje: `📊 Has registrado ${datos.resumen.total} horas especiales en ${mes}`,
        recordatorio: "Recuerda que puedes revisar y exportar tu calendario completo desde la sección 'Calendario de Extras'"
    };
}

// Función: Consultar documentos
function consultarDocumentos(args) {
    const { categoria } = args;

    const documentos = {
        convenios: [
            { titulo: "Convenio Colectivo LV y RSU Alcobendas 2024-2027", url: "documentos/convenios/convenio_alcobendas_2024-2027.pdf", fecha: "2024-11-29" },
            { titulo: "Tablas Salariales 2026", url: "documentos/convenios/tablas_2026.pdf", fecha: "2026-01-01" },
            { titulo: "Protocolo Ola de Calor Alcobendas 2025", url: "documentos/convenios/protocolo_calor_2025.pdf", fecha: "2025-01-01" }
        ],
        actas: [
            { titulo: "Acta Comité de Empresa - Enero 2026", url: "documentos/actas/acta_enero_2026.pdf", fecha: "2026-01-20" },
            { titulo: "Acta Negociación Colectiva 2025", url: "documentos/actas/negociacion_2025.pdf", fecha: "2025-11-15" }
        ],
        videos: [
            { titulo: "Derechos del Trabajador - Formación CCOO", url: "https://youtube.com/....", duracion: "15:30" },
            { titulo: "Cómo enfrentar un despido", url: "https://youtube.com/....", duracion: "12:45" }
        ],
        presentaciones: [
            { titulo: "Reforma Laboral 2022 - Guía Práctica", url: "documentos/presentaciones/reforma_2022.pdf", paginas: 45 }
        ]
    };

    if (categoria === 'todos') {
        return {
            categorias: Object.keys(documentos),
            total_documentos: Object.values(documentos).flat().length,
            mensaje: "📚 Hay documentos disponibles en todas las categorías",
            acceso: "Puedes acceder a todos desde la sección 'Documentos' en el menú principal"
        };
    }

    return {
        categoria: categoria,
        documentos: documentos[categoria] || [],
        cantidad: (documentos[categoria] || []).length,
        acceso: "Accede desde la sección 'Documentos' > '" + categoria.charAt(0).toUpperCase() + categoria.slice(1) + "'"
    };
}

// Función: Generar informe
function generarInforme(args) {
    const { tipo_documento, datos } = args;

    const plantillas = {
        impugnacion_despido: `
IMPUGNACIÓN DE DESPIDO

D./Dña. ${datos.nombre_trabajador || '[NOMBRE]'}
Empresa: ${datos.empresa || '[EMPRESA]'}
Fecha de despido: ${datos.fecha_incidente || '[FECHA]'}

EXPONE:

Primero.- Que el día ${datos.fecha_incidente}, recibí carta de despido por parte de la empresa ${datos.empresa}, alegando como causa: ${datos.motivo || '[MOTIVO]'}.

Segundo.- Que el despido es IMPROCEDENTE por las siguientes razones:
[AQUÍ DEBES DETALLAR LOS MOTIVOS ESPECÍFICOS]

Por todo ello, SOLICITO:

Que se declare la IMPROCEDENCIA del despido y se condene a la empresa a la readmisión o indemnización correspondiente.

En ___________, a ___ de _________ de 202__

Fdo: ${datos.nombre_trabajador || '[FIRMA]'}

⚠️ IMPORTANTE: Este es un modelo orientativo. Debes acudir a tu delegado sindical o asesor jurídico para revisar y completar el documento antes de presentarlo.
        `,
        reclamacion: `
RECLAMACIÓN DE CANTIDAD

Trabajador: ${datos.nombre_trabajador || '[NOMBRE]'}
Empresa: ${datos.empresa || '[EMPRESA]'}
Asunto: ${datos.motivo || '[CONCEPTO A RECLAMAR]'}

Por medio del presente escrito, RECLAMO:

${datos.motivo || '[DETALLE DE LO RECLAMADO]'}

Adjunto: [DOCUMENTACIÓN JUSTIFICATIVA]

Fecha: ${new Date().toLocaleDateString('es-ES')}

⚠️ Consulta con tu delegado antes de presentar
        `
    };

    return {
        tipo: tipo_documento,
        documento_generado: plantillas[tipo_documento] || 'Plantilla no disponible para este tipo de documento',
        siguiente_paso: "1. Revisa el borrador\n2. Completa los datos faltantes\n3. Contacta con tu delegado sindical para revisión legal\n4. Presenta el escrito en el plazo correspondiente",
        aviso_legal: "Este documento es orientativo. Requiere revisión por asesor jurídico antes de su presentación oficial."
    };
}

// Función: Contactar delegado
function contactarDelegado(args) {
    const { motivo, urgente } = args;

    return {
        delegado: {
            nombre: "Delegado Sindical CCOO Hábitat Alcobendas",
            email: "ccoo.habitat.alcobendas@example.com",
            telefono: "+34 XXX XXX XXX",
            horario_atencion: "L-V: 9:00-14:00 y 16:00-18:00"
        },
        mensaje: urgente
            ? "🚨 Para casos urgentes, llama directamente al teléfono de contacto"
            : "📧 Puedes enviar un email o usar el botón 'Contacto' en la app",
        motivo_consulta: motivo,
        tiempo_respuesta: urgente ? "< 24 horas" : "2-3 días laborables"
    };
}

// ============================================
// CREAR O OBTENER ASISTENTE
// ============================================

async function obtenerOCrearAsistente() {
    if (assistantId) {
        return assistantId;
    }

    try {
        // Configurar herramientas
        const tools = [...AGENT_FUNCTIONS];
        const toolResources = {};

        // Si hay vector store, añadir file_search
        if (vectorStoreConfig && vectorStoreConfig.vectorStoreId) {
            tools.push({ type: "file_search" });
            toolResources.file_search = {
                vector_store_ids: [vectorStoreConfig.vectorStoreId]
            };
            console.log('🔍 File Search activado con Vector Store:', vectorStoreConfig.vectorStoreId);
        }

        // Crear nuevo asistente
        const assistantConfig = {
            name: "Asistente Laboral CCOO Hábitat",
            instructions: `Eres un asistente especializado en derecho laboral español para CCOO Hábitat - Alcobendas.

**Tu personalidad:**
- Profesional pero cercano
- Usas emojis apropiados (📄, ⚖️, 💼, 👥, ⏰, 💰)
- Explicas conceptos complejos de forma sencilla
- Siempre citas fuentes legales cuando sea necesario

**Tus capacidades:**
✅ Consultar convenios colectivos (usando file_search cuando esté disponible)
✅ Calcular horas extra y compensaciones
✅ Generar documentos jurídicos básicos
✅ Orientar sobre procedimientos laborales
✅ Conectar trabajadores con delegados sindicales

**IMPORTANTE - Sobre búsqueda en documentos:**
${vectorStoreConfig ? `
- TIENES ACCESO A LOS DOCUMENTOS DEL CONVENIO
- Cuando te pregunten algo sobre el convenio, USA FILE_SEARCH para buscar la información
- CITA SIEMPRE las páginas exactas donde encontraste la información
- Si file_search no encuentra algo, dilo claramente
- NO inventes información que no esté en los documentos
` : `
- NO tienes acceso directo a los documentos del convenio
- Proporciona orientación general basada en tu conocimiento
- SIEMPRE recomienda revisar el convenio completo en la sección "Documentos"
`}

**Importante:**
- SIEMPRE usa las funciones disponibles cuando necesites datos específicos
- Si no estás seguro de algo, di: "Para confirmarlo, consulta con tu delegado"
- NO inventes información legal o artículos que no conoces
- Para casos complejos, SIEMPRE recomienda contactar al delegado

**Estilo de respuesta:**
- Responde en español con claridad
- Estructura la información con bullet points cuando sea apropiado
- Usa secciones (📄, ⚠️, ✅) para organizar la información
- Sé conciso pero completo
- Si usas file_search, SIEMPRE indica de qué documento obtuviste la información

**Estrategia de Búsqueda:**
1. Si la pregunta es sobre derechos generales (vacaciones, permisos, salario), busca PRIMERO en el documento que contenga "Convenio" en el nombre.
2. Si es sobre seguridad o clima, consulta protocolos.
3. Si file_search devuelve varios fragmentos, analízalos todos antes de decir que "no hay información".
4. Si encuentras información parcial en un protocolo (ej: protocolo calor), NO asumas que es la única verdad. Busca también en el Convenio Colectivo.`,
            model: "gpt-4-turbo-preview",
            tools: tools
        };

        // Añadir tool_resources solo si hay vector store
        if (Object.keys(toolResources).length > 0) {
            assistantConfig.tool_resources = toolResources;
        }

        const assistant = await openai.beta.assistants.create(assistantConfig);

        assistantId = assistant.id;
        console.log('✅ Asistente creado:', assistantId);
        if (vectorStoreConfig) {
            console.log('📄 Con acceso a', vectorStoreConfig.filesUploaded?.length || 0, 'documentos');
        }
        return assistantId;
    } catch (error) {
        console.error('❌ Error creando asistente:', error);
        throw error;
    }
}

// ============================================
// ENDPOINTS
// ============================================

// Endpoint principal de chat
app.post('/agent/chat', async (req, res) => {
    try {
        const { message, userId = 'default' } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Mensaje requerido' });
        }

        console.log(`\n📩 Mensaje de ${userId}:`, message);

        // Obtener o crear asistente
        const assistantId = await obtenerOCrearAsistente();

        // Obtener o crear thread para este usuario
        let threadId = userThreads.get(userId);
        if (!threadId) {
            const thread = await openai.beta.threads.create();
            threadId = thread.id;
            userThreads.set(userId, threadId);
            console.log(`🆕 Nuevo thread creado para ${userId}:`, threadId);
        }

        // Agregar mensaje al thread
        await openai.beta.threads.messages.create(threadId, {
            role: "user",
            content: message
        });

        // Ejecutar el asistente
        const run = await openai.beta.threads.runs.create(threadId, {
            assistant_id: assistantId
        });

        // Esperar a que complete (polling)
        let runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);

        while (runStatus.status !== 'completed' &&
            runStatus.status !== 'failed' &&
            runStatus.status !== 'requires_action') {
            await new Promise(resolve => setTimeout(resolve, 1000));
            runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);
            console.log('⏳ Estado del run:', runStatus.status);
        }

        // Si requiere ejecutar funciones
        if (runStatus.status === 'requires_action') {
            const toolCalls = runStatus.required_action.submit_tool_outputs.tool_calls;
            console.log(`🔧 Ejecutando ${toolCalls.length} funciones...`);

            const toolOutputs = await Promise.all(
                toolCalls.map(async (tool) => {
                    const args = JSON.parse(tool.function.arguments);
                    const output = await ejecutarFuncion(tool.function.name, args);
                    return {
                        tool_call_id: tool.id,
                        output: JSON.stringify(output)
                    };
                })
            );

            // Enviar resultados de las funciones
            await openai.beta.threads.runs.submitToolOutputs(threadId, run.id, {
                tool_outputs: toolOutputs
            });

            // Esperar a que complete con los resultados
            runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);
            while (runStatus.status !== 'completed' && runStatus.status !== 'failed') {
                await new Promise(resolve => setTimeout(resolve, 1000));
                runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);
            }
        }

        if (runStatus.status === 'failed') {
            throw new Error('El asistente falló al procesar la solicitud');
        }

        // Obtener la respuesta
        const messages = await openai.beta.threads.messages.list(threadId);
        const lastMessage = messages.data[0];
        let reply = lastMessage.content[0].text.value;

        // Limpiar anotaciones de citas de OpenAI (ej: 【12:0†convenio.pdf】)
        reply = reply.replace(/【\d+:\d+†[^】]+】/g, '');

        console.log('✅ Respuesta generada\n');

        res.json({
            reply,
            threadId,
            assistantId
        });

    } catch (error) {
        console.error('❌ Error:', error);
        res.status(500).json({
            error: 'Error al procesar la pregunta',
            details: error.message
        });
    }
});

// Endpoint para reiniciar conversación
app.post('/agent/reset', async (req, res) => {
    const { userId = 'default' } = req.body;
    userThreads.delete(userId);
    res.json({ message: 'Conversación reiniciada', userId });
});

// Endpoint de estado
app.get('/', (req, res) => {
    res.json({
        status: 'OK',
        service: 'CCOO Hábitat - Agente IA',
        version: '2.0',
        features: [
            'Búsqueda en convenios colectivos',
            'Cálculo de horas extra',
            'Generación de documentos jurídicos',
            'Consulta de recursos',
            'Contacto con delegados'
        ],
        endpoints: {
            chat: 'POST /agent/chat',
            reset: 'POST /agent/reset'
        },
        active_conversations: userThreads.size
    });
});

// Iniciar servidor solo si se ejecuta directamente
if (require.main === module) {
    app.listen(PORT, () => {
        console.log('╔════════════════════════════════════════╗');
        console.log('║  🤖 AGENTE IA - CCOO HÁBITAT          ║');
        console.log('║  Sistema Avanzado con Funciones       ║');
        console.log('╚════════════════════════════════════════╝');
        console.log('');
        console.log(`✅ Servidor escuchando en puerto ${PORT}`);
        console.log(`🌍 URL Local: http://localhost:${PORT}`);
        console.log('');
        console.log('🔧 Funciones disponibles:');
        AGENT_FUNCTIONS.forEach(func => {
            console.log(`   - ${func.function.name}`);
        });
        console.log('');
        console.log('📡 Endpoints:');
        console.log(`   - POST /agent/chat`);
        console.log(`   - POST /agent/reset`);
        console.log('');
        console.log('⚠️  Presiona Ctrl+C para detener');
        console.log('');
    });
}

// Exportar app para Vercel
module.exports = app;
