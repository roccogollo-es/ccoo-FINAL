export const AGENT_CONFIG = {
    serverUrl: '',
    enabled: true,
    userId: null
};

export function obtenerUserId() {
    if (!AGENT_CONFIG.userId) {
        AGENT_CONFIG.userId = localStorage.getItem('agentUserId') ||
            'user_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('agentUserId', AGENT_CONFIG.userId);
    }
    return AGENT_CONFIG.userId;
}

export async function enviarMensajeAlAgente(mensaje) {
    if (!AGENT_CONFIG.enabled) {
        throw new Error('El agente no está habilitado');
    }

    try {
        const response = await fetch(`${AGENT_CONFIG.serverUrl}/agent/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: mensaje,
                userId: obtenerUserId()
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.details || 'Error al comunicarse con el agente');
        }

        const data = await response.json();

        return {
            respuesta: data.reply,
            threadId: data.threadId,
            assistantId: data.assistantId,
            timestamp: new Date().toISOString()
        };
    } catch (error) {
        console.error('❌ Error al contactar con el agente:', error);
        throw error;
    }
}

export async function reiniciarConversacion() {
    try {
        await fetch(`${AGENT_CONFIG.serverUrl}/agent/reset`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: obtenerUserId() })
        });
        return true;
    } catch (error) {
        console.error('❌ Error al reiniciar:', error);
        return false;
    }
}
