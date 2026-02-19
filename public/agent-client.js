// ============================================
// CLIENTE DEL AGENTE IA
// Integración con el servidor de agentes
// ============================================

const AGENT_CONFIG = {
    // Si estamos en localhost, usamos el puerto 3000 (o 3001 si lo cambiaste). 
    // Si estamos en producción (Render), usamos ruta relativa vacía para que vaya al mismo dominio.
    serverUrl: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:3000'
        : '',
    enabled: true,
    userId: null // Se genera automáticamente
};

// Generar ID único para el usuario
function obtenerUserId() {
    if (!AGENT_CONFIG.userId) {
        // En producción, esto vendría de tu sistema de autenticación
        AGENT_CONFIG.userId = localStorage.getItem('agentUserId') ||
            'user_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('agentUserId', AGENT_CONFIG.userId);
    }
    return AGENT_CONFIG.userId;
}

// ============================================
// FUNCIÓN PRINCIPAL: Enviar mensaje al agente
// ============================================

async function enviarMensajeAlAgente(mensaje, onProgress = null) {
    if (!AGENT_CONFIG.enabled) {
        throw new Error('El agente no está habilitado');
    }

    try {
        if (onProgress) onProgress('Conectando con el agente...');

        const response = await fetch(`${AGENT_CONFIG.serverUrl}/agent/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: mensaje,
                userId: obtenerUserId()
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.details || 'Error al comunicarse con el agente');
        }

        if (onProgress) onProgress('Procesando respuesta...');

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

// ============================================
// FUNCIÓN: Reiniciar conversación
// ============================================

async function reiniciarConversacion() {
    try {
        await fetch(`${AGENT_CONFIG.serverUrl}/agent/reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: obtenerUserId()
            })
        });

        console.log('✅ Conversación reiniciada');
        return true;
    } catch (error) {
        console.error('❌ Error al reiniciar:', error);
        return false;
    }
}

// ============================================
// FUNCIÓN: Verificar estado del servidor
// ============================================

async function verificarServidor() {
    try {
        const response = await fetch(`${AGENT_CONFIG.serverUrl}/`);
        if (response.ok) {
            const data = await response.json();
            console.log('✅ Servidor del agente activo:', data);
            return true;
        }
        return false;
    } catch (error) {
        console.warn('⚠️ Servidor del agente no disponible');
        return false;
    }
}

// ============================================
// EJEMPLO DE USO EN TU APLICACIÓN
// ============================================

// Ejemplo 1: Integración básica en el chat
async function ejemploChat() {
    const pregunta = "¿Cuántos días de vacaciones me corresponden?";

    try {
        // Mostrar indicador de carga
        mostrarCargando(true);

        // Enviar al agente
        const resultado = await enviarMensajeAlAgente(pregunta, (estado) => {
            console.log('📊', estado);
        });

        // Mostrar respuesta
        mostrarRespuesta(resultado.respuesta);

    } catch (error) {
        mostrarError('No se pudo contactar con el asistente. Inténtalo de nuevo.');
    } finally {
        mostrarCargando(false);
    }
}

// Ejemplo 2: Integración con el botón de ayuda
function integrarEnBotonAyuda() {
    const botonAyuda = document.getElementById('btn-ayuda');
    if (botonAyuda) {
        botonAyuda.addEventListener('click', async () => {
            const pregunta = prompt('¿En qué necesitas ayuda?');
            if (pregunta) {
                const respuesta = await enviarMensajeAlAgente(pregunta);
                alert(respuesta.respuesta);
            }
        });
    }
}

// Ejemplo 3: Chat interactivo completo
class AgenteChatUI {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.mensajes = [];
        this.inicializar();
    }

    inicializar() {
        this.container.innerHTML = `
            <div class="agent-chat" style="
                max-width: 600px;
                margin: 20px auto;
                border: 2px solid #e53935;
                border-radius: 15px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            ">
                <!-- Header -->
                <div class="agent-header" style="
                    background: linear-gradient(135deg, #e53935, #ab1a1a);
                    color: white;
                    padding: 15px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                ">
                    <span style="font-size: 24px;">🤖</span>
                    <div>
                        <div style="font-weight: bold;">Asistente Laboral CCOO</div>
                        <div style="font-size: 12px; opacity: 0.9;">Con funciones avanzadas</div>
                    </div>
                    <button onclick="agenteChat.reiniciar()" style="
                        margin-left: auto;
                        background: rgba(255,255,255,0.2);
                        border: none;
                        color: white;
                        padding: 5px 10px;
                        border-radius: 5px;
                        cursor: pointer;
                    ">🔄 Reiniciar</button>
                </div>

                <!-- Mensajes -->
                <div class="agent-messages" id="agent-messages" style="
                    height: 400px;
                    overflow-y: auto;
                    padding: 20px;
                    background: #f5f5f5;
                "></div>

                <!-- Input -->
                <div class="agent-input" style="
                    padding: 15px;
                    background: white;
                    border-top: 1px solid #ddd;
                    display: flex;
                    gap: 10px;
                ">
                    <input 
                        type="text" 
                        id="agent-input-field"
                        placeholder="Escribe tu pregunta..."
                        style="
                            flex: 1;
                            padding: 10px;
                            border: 1px solid #ddd;
                            border-radius: 20px;
                            outline: none;
                        "
                    />
                    <button onclick="agenteChat.enviar()" style="
                        background: #e53935;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 20px;
                        cursor: pointer;
                        font-weight: bold;
                    ">Enviar</button>
                </div>
            </div>
        `;

        // Event listener para Enter
        document.getElementById('agent-input-field').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.enviar();
            }
        });

        // Mensaje de bienvenida
        this.agregarMensaje('assistant', '¡Hola! Soy tu asistente laboral con acceso a convenios colectivos, cálculo de horas extra, generación de documentos y más. ¿En qué puedo ayudarte? 😊');
    }

    agregarMensaje(role, contenido) {
        const messagesContainer = document.getElementById('agent-messages');
        const esUsuario = role === 'user';

        const mensaje = document.createElement('div');
        mensaje.style.cssText = `
            margin-bottom: 15px;
            display: flex;
            ${esUsuario ? 'justify-content: flex-end;' : 'justify-content: flex-start;'}
        `;

        mensaje.innerHTML = `
            <div style="
                max-width: 70%;
                padding: 12px 16px;
                border-radius: 15px;
                ${esUsuario
                ? 'background: #e53935; color: white;'
                : 'background: white; color: #333; border: 1px solid #ddd;'
            }
                word-wrap: break-word;
                white-space: pre-wrap;
            ">
                ${esUsuario ? '' : '<strong>🤖 Asistente:</strong><br>'}
                ${contenido}
            </div>
        `;

        messagesContainer.appendChild(mensaje);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    agregarCargando() {
        const messagesContainer = document.getElementById('agent-messages');
        const loading = document.createElement('div');
        loading.id = 'loading-indicator';
        loading.style.cssText = 'margin-bottom: 15px;';
        loading.innerHTML = `
            <div style="
                background: white;
                padding: 12px 16px;
                border-radius: 15px;
                border: 1px solid #ddd;
                max-width: 70%;
            ">
                <span style="opacity: 0.6;">⏳ Consultando información...</span>
            </div>
        `;
        messagesContainer.appendChild(loading);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    quitarCargando() {
        const loading = document.getElementById('loading-indicator');
        if (loading) loading.remove();
    }

    async enviar() {
        const input = document.getElementById('agent-input-field');
        const mensaje = input.value.trim();

        if (!mensaje) return;

        // Agregar mensaje del usuario
        this.agregarMensaje('user', mensaje);
        input.value = '';

        // Mostrar indicador de carga
        this.agregarCargando();

        try {
            // Enviar al agente
            const resultado = await enviarMensajeAlAgente(mensaje);

            // Quitar indicador y mostrar respuesta
            this.quitarCargando();
            this.agregarMensaje('assistant', resultado.respuesta);

        } catch (error) {
            this.quitarCargando();
            this.agregarMensaje('assistant', '❌ Lo siento, hubo un error al procesar tu pregunta. Asegúrate de que el servidor del agente esté ejecutándose en http://localhost:3001');
        }
    }

    async reiniciar() {
        const confirmado = confirm('¿Reiniciar la conversación? Se perderá el contexto actual.');
        if (confirmado) {
            await reiniciarConversacion();
            document.getElementById('agent-messages').innerHTML = '';
            this.agregarMensaje('assistant', '🔄 Conversación reiniciada. ¿En qué puedo ayudarte?');
        }
    }
}

// ============================================
// INICIALIZACIÓN AUTOMÁTICA
// ============================================

// Variable global para usar desde el HTML
let agenteChat;

// Verificar servidor al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
    const servidorActivo = await verificarServidor();

    if (servidorActivo) {
        console.log('✅ Agente IA disponible');

        // Si existe un contenedor con id='agent-chat-container', inicializar ahí
        const container = document.getElementById('agent-chat-container');
        if (container) {
            agenteChat = new AgenteChatUI('agent-chat-container');
        }
    } else {
        console.warn('⚠️ Agente IA no disponible. Ejecuta: iniciar-agente.bat');
    }
});

// ============================================
// FUNCIONES AUXILIARES
// ============================================

function mostrarCargando(mostrar) {
    // Implementar según tu UI
    console.log('Cargando:', mostrar);
}

function mostrarRespuesta(texto) {
    // Implementar según tu UI
    console.log('Respuesta:', texto);
}

function mostrarError(mensaje) {
    // Implementar según tu UI
    console.error('Error:', mensaje);
}

// Exportar para uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        enviarMensajeAlAgente,
        reiniciarConversacion,
        verificarServidor,
        AgenteChatUI
    };
}
