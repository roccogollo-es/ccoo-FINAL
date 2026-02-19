// ============================================
// CONFIGURACIÓN DE IA
// ============================================

/*
 * Este archivo contiene la configuración para integrar tu GPT personalizado o Gemini AI.
 * Elige una de las dos opciones según tu preferencia.
 */

// ============================================
// OPCIÓN A: GPT PERSONALIZADO DE OPENAI
// ============================================

// ============================================
// OPCIÓN A: GPT PERSONALIZADO DE OPENAI
// ============================================

const OPENAI_CONFIG = {
    enabled: true, // ✅ ACTIVADO: Usar OpenAI (requiere servidor funcionando)
    serverUrl: '/agent/chat', // Ruta relativa funciona tanto en local como en producción

    model: 'gpt-4-turbo-preview',
    maxTokens: 500,
    temperature: 0.7,
    systemPrompt: `Eres un asistente virtual especializado en temas laborales y sindicales de CC.OO. Hábitat.
Estás entrenado en:
- Convenios colectivos del sector
- Derechos laborales
- Normativas sindicales
- Procedimientos administrativos

Responde de forma clara, concisa y profesional.
Siempre cita las fuentes cuando menciones artículos o normativas específicas.`
};

// ============================================
// OPCIÓN B: GEMINI AI (GOOGLE) - OPCIONAL
// ============================================

const GEMINI_CONFIG = {
    enabled: false, // ❌ DESACTIVADO (Usando OpenAI)
    apiKey: 'AIzaSyB6JD17T1pk7EaH6QKzf9si7nqctVuJJxA',

    model: 'gemini-1.5-pro',
    maxTokens: 1000,
    temperature: 0.7,

    // ⚠️ PASO 2: PEGA AQUÍ LAS INSTRUCCIONES DE TU GPT DE CHATGPT
    // (Ve a ChatGPT → Tu GPT → Edit → Copia las "Instructions")
    systemPrompt: `Eres un abogado laboralista experto en legislación española. Dominas reformas laborales, convenios colectivos, jurisprudencia del Tribunal Supremo y Tribunal de Justicia de la Unión Europea, doctrina sindical y de la Inspección de Trabajo.

Tu misión es ayudar a trabajadores, delegados sindicales y profesionales a:

Entender sus derechos laborales y obligaciones.

Interpretar convenios colectivos con claridad.

Redactar documentos jurídicos sólidos (impugnaciones, reclamaciones, escritos ante inspección, conciliaciones, demandas).

Comprender reformas laborales recientes y sus implicaciones.

Conocer sentencias clave y aplicarlas en casos concretos.

Estás actualizado en:

Estatuto de los Trabajadores

Reforma laboral 2021-2022

Ley de Jurisdicción Social

Ley de Prevención de Riesgos Laborales

Doctrina del TJUE sobre temporalidad

Negociación colectiva y jurisprudencia

Estilo: claro, directo, legalmente preciso, pero comprensible incluso para quien no es jurista. Usas ejemplos cuando conviene. Siempre avisas si una respuesta requiere confirmación en fuentes oficiales.

Funciones especiales:

Redactar modelos de escritos jurídicos

Explicar sentencias y artículos del Estatuto

Analizar cláusulas de convenios

Ofrecer consejos prácticos para defenderse ante despidos, sanciones o abusos

Simular estrategias jurídicas ante conflictos laborales


Contexto específico: Trabajas para CCOO Hábitat - Sección Sindical de Alcobendas.

💬 ESTILO DE RESPUESTA:
- Responde SIEMPRE en español
- Sé claro, conciso y profesional
- Usa emojis apropiados (📄, ⚖️, 👥, etc.) para mayor claridad
- Cita artículos específicos cuando menciones normativas (ejemplo: "Según el artículo 23 del Convenio...")
- Si no sabes algo con certeza, di "Te recomiendo consultar con el delegado sindical para confirmar"
- NUNCA inventes información legal o normativa

✅ EJEMPLOS DE RESPUESTAS:
- "📄 Según el artículo 15 del Convenio Colectivo Estatal..."
- "⏰ El tiempo de trabajo ordinario es de X horas según..."
- "👥 Para este tema específico, te sugiero contactar con tu delegado sindical en..."
- "⚖️ En caso de despido, tienes 20 días hábiles para impugnar desde la fecha de notificación"

🚫 RESTRICCIONES:
- NO des consejos legales definitivos, solo información orientativa
- NO tomes decisiones por el trabajador
- NO inventes artículos o normativas
- Siempre sugiere contactar con el delegado para casos complejos

🔗 RECURSOS DISPONIBLES:
Recuerda al usuario que puede:
- Ver convenios en la sección "Documentos"
- Registrar horas extra en "Calendario de Extras"
- Contactar con el delegado sindical desde el botón "Contacto"`
};

// ============================================
// FUNCIÓN PARA LLAMAR A OPENAI GPT
// ============================================

async function callOpenAI(userMessage) {
    if (!OPENAI_CONFIG.enabled) {
        throw new Error('OpenAI no está habilitado. Activa OPENAI_CONFIG.enabled');
    }

    if (!OPENAI_CONFIG.serverUrl) {
        throw new Error('Por favor, configura serverUrl en OPENAI_CONFIG');
    }

    try {
        const response = await fetch(OPENAI_CONFIG.serverUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: userMessage
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Error al llamar al servidor');
        }

        const data = await response.json();
        return data.reply;

    } catch (error) {
        console.error('Error OpenAI:', error);
        throw error;
    }
}

// ============================================
// FUNCIÓN PARA LLAMAR A GEMINI AI
// ============================================

async function callGemini(userMessage) {
    if (!GEMINI_CONFIG.enabled) {
        throw new Error('Gemini no está habilitado. Activa GEMINI_CONFIG.enabled');
    }

    if (!GEMINI_CONFIG.apiKey || GEMINI_CONFIG.apiKey === 'TU_API_KEY_DE_GEMINI_AQUI') {
        throw new Error('Por favor, configura tu API key de Gemini');
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_CONFIG.model}:generateContent?key=${GEMINI_CONFIG.apiKey}`;

    const payload = {
        contents: [{
            parts: [{
                text: `${GEMINI_CONFIG.systemPrompt}\n\nUsuario: ${userMessage}`
            }]
        }],
        generationConfig: {
            temperature: GEMINI_CONFIG.temperature,
            maxOutputTokens: GEMINI_CONFIG.maxTokens,
        }
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || 'Error al llamar a Gemini');
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;

    } catch (error) {
        console.error('Error Gemini:', error);
        throw error;
    }
}

// ============================================
// FUNCIÓN PRINCIPAL - USA ESTA EN TU APP
// ============================================

async function getAIResponse(userMessage) {
    try {
        // Intentar con OpenAI si está habilitado
        if (OPENAI_CONFIG.enabled) {
            console.log('🤖 Usando OpenAI GPT...');
            return await callOpenAI(userMessage);
        }

        // Intentar con Gemini si está habilitado
        if (GEMINI_CONFIG.enabled) {
            console.log('🤖 Usando Gemini AI...');
            return await callGemini(userMessage);
        }

        // Si ninguno está habilitado, usar respuestas predefinidas
        console.warn('⚠️ Ninguna IA está configurada. Usando respuestas predefinidas.');
        return getPredefinedResponse(userMessage);

    } catch (error) {
        console.error('Error al obtener respuesta de IA:', error);

        // Detectar si es error de conexión (servidor apagado)
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
            return `🔴 **Error de conexión**: No puedo conectar con el servidor del agente.
            
            Por favor, asegúrate de haber ejecutado el archivo **iniciar-agente.bat** y de que la ventana negra siga abierta.`;
        }

        return `Lo siento, ha ocurrido un error técnico: ${error.message}. Por favor, inténtalo de nuevo o contacta con soporte.`;
    }
}

// ============================================
// RESPUESTAS PREDEFINIDAS (FALLBACK)
// ============================================

function getPredefinedResponse(question) {
    const lowerQuestion = question.toLowerCase();

    const responses = {
        'convenio': '📄 Tu convenio colectivo está disponible en la sección de "Convenios Colectivos". El convenio aplicable depende de tu sector y empresa. ¿Necesitas ayuda para encontrar el tuyo?',
        'vacaciones': '🏖️ Según el convenio colectivo, tienes derecho a 22 días laborables de vacaciones anuales como mínimo. Este período puede variar según tu antigüedad y el convenio específico de tu empresa.',
        'horario': '⏰ El horario laboral estándar es de 40 horas semanales, aunque puede variar según tu convenio. ¿Quieres consultar los horarios específicos de tu sector?',
        'delegado': '👥 Puedes contactar con tu delegado sindical a través del apartado de "Contacto" en la aplicación. También podemos ayudarte a encontrar el delegado de tu centro de trabajo.',
        'horas extra': '⏱️ Las horas extraordinarias deben ser voluntarias y compensadas según lo establecido en tu convenio. Puedes registrarlas en el Calendario de Extras.',
        'baja': '🏥 Para tramitar una baja laboral, debes presentar el parte médico en un plazo de 3 días. Contacta con tu delegado si tienes dudas sobre el procedimiento.',
        'despido': '⚖️ Si has recibido una carta de despido, es importante actuar rápido. Tienes 20 días hábiles para impugnarlo. Contacta urgentemente con tu delegado sindical.',
        'default': '¡Hola! Soy el asistente virtual de CCOO Hábitat. Puedo ayudarte con información sobre convenios colectivos, derechos laborales, vacaciones y mucho más. ¿En qué necesitas ayuda?'
    };

    // Búsqueda simple por palabras clave
    if (lowerQuestion.includes('convenio')) return responses.convenio;
    if (lowerQuestion.includes('vacacion')) return responses.vacaciones;
    if (lowerQuestion.includes('horario')) return responses.horario;
    if (lowerQuestion.includes('delegado') || lowerQuestion.includes('contacto')) return responses.delegado;
    if (lowerQuestion.includes('extra') || lowerQuestion.includes('horas')) return responses['horas extra'];
    if (lowerQuestion.includes('baja') || lowerQuestion.includes('médic')) return responses.baja;
    if (lowerQuestion.includes('despido')) return responses.despido;

    return responses.default;
}

// Exportar para uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { getAIResponse, OPENAI_CONFIG, GEMINI_CONFIG };
}
