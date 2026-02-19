// ============================================
// CONFIGURACIÓN DE IA CON n8n
// ============================================

const N8N_CONFIG = {
    enabled: true,
    webhookUrl: 'http://localhost:3000/chat'  // Servidor local Node.js
};

// Función para llamar a n8n
async function callN8N(userMessage) {
    if (!N8N_CONFIG.enabled) {
        throw new Error('n8n no está habilitado');
    }

    if (!N8N_CONFIG.webhookUrl || N8N_CONFIG.webhookUrl === 'TU_URL_DE_n8n_AQUI') {
        throw new Error('Por favor, configura la URL del webhook de n8n');
    }

    try {
        const response = await fetch(N8N_CONFIG.webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: userMessage
            })
        });

        if (!response.ok) {
            throw new Error('Error al llamar a n8n');
        }

        const data = await response.json();
        return data.reply;

    } catch (error) {
        console.error('Error n8n:', error);
        throw error;
    }
}

// ============================================
// FUNCIÓN PRINCIPAL
// ============================================

async function getAIResponse(userMessage) {
    try {
        if (N8N_CONFIG.enabled) {
            console.log('🤖 Usando n8n + GPT...');
            return await callN8N(userMessage);
        }

        // Fallback a respuestas predefinidas
        console.warn('⚠️ n8n no configurado. Usando respuestas predefinidas.');
        return getPredefinedResponse(userMessage);

    } catch (error) {
        console.error('Error al obtener respuesta:', error);
        return `Lo siento, ha ocurrido un error al procesar tu pregunta. Por favor, inténtalo de nuevo o contacta con tu delegado sindical.`;
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
    module.exports = { getAIResponse, N8N_CONFIG };
}
