// ============================================
// CCOO HÁBITAT - SECCIÓN SINDICAL ALCOBENDAS
// Main JavaScript Application
// ============================================

// DOM Elements
const aiBtn = document.getElementById('aiBtn');
const aiModal = document.getElementById('aiModal');
const modalOverlay = document.getElementById('modalOverlay');
const closeModal = document.getElementById('closeModal');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const chatContainer = document.getElementById('chatContainer');
const resourceCards = document.querySelectorAll('.resource-card');
const quickQuestions = document.querySelectorAll('.quick-question');
const notificationBtn = document.getElementById('notificationBtn');
const menuBtn = document.getElementById('menuBtn');
const searchInput = document.querySelector('.search-input');

// ============================================
// Modal Management
// ============================================

function openModal() {
    aiModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    chatInput.focus();
}

function closeModalFunc() {
    aiModal.classList.remove('active');
    document.body.style.overflow = 'auto';

    // Resetear para una consulta nueva
    setTimeout(() => {
        // Limpiar chat
        chatContainer.innerHTML = `
            <div class="welcome-message">
                <div class="bot-avatar">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="11" width="18" height="10" rx="2"></rect>
                        <circle cx="12" cy="5" r="2"></circle>
                        <path d="M12 7v4"></path>
                        <line x1="8" y1="16" x2="8" y2="16"></line>
                        <line x1="16" y1="16" x2="16" y2="16"></line>
                    </svg>
                </div>
                <p><strong>¡Hola!</strong> Soy tu asistente virtual. Para empezar, selecciona tu convenio:</p>
                <div class="chat-options" id="initialOptions">
                    <button class="chat-option-btn primary" data-value="alcobendas">🏢 Convenio Alcobendas</button>
                </div>
            </div>
        `;
        // Resetear contexto
        currentContext = {
            convenio: null,
            tipo: null
        };
        // Limpiar input
        chatInput.value = '';
    }, 300); // Esperar a que termine la animación de cierre
}

// Event Listeners for Modal
aiBtn.addEventListener('click', openModal);
closeModal.addEventListener('click', closeModalFunc);
modalOverlay.addEventListener('click', closeModalFunc);

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && aiModal.classList.contains('active')) {
        closeModalFunc();
    }
});

// ============================================
// Chat Functionality
// ============================================

function createMessageElement(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${isUser ? 'user' : 'bot'}`;

    const avatarDiv = document.createElement('div');
    avatarDiv.className = `message-avatar ${isUser ? 'user' : 'bot'}`;

    if (!isUser) {
        avatarDiv.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="10" rx="2"></rect>
                <circle cx="12" cy="5" r="2"></circle>
                <path d="M12 7v4"></path>
                <line x1="8" y1="16" x2="8" y2="16"></line>
                <line x1="16" y1="16" x2="16" y2="16"></line>
            </svg>
        `;
    } else {
        avatarDiv.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
            </svg>
        `;
    }

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';

    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = 'message-bubble';
    bubbleDiv.textContent = text;

    contentDiv.appendChild(bubbleDiv);
    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(contentDiv);

    return messageDiv;
}

function addMessage(text, isUser = false) {
    // Remove welcome message if it exists
    const welcomeMessage = chatContainer.querySelector('.welcome-message');
    if (welcomeMessage && isUser) {
        welcomeMessage.style.display = 'none';
    }

    const messageElement = createMessageElement(text, isUser);
    chatContainer.appendChild(messageElement);

    // Scroll to bottom
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Estado de la conversación
let currentContext = {
    convenio: null,
    tipo: null
};

// Modificar simulateTyping para aceptar texto personalizado
function simulateTyping(text) {
    // Si no se pasa texto, usar valor por defecto
    const loadingText = text || "Escribiendo...";

    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message bot typing-indicator';
    typingDiv.innerHTML = `
        <div class="message-avatar bot">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="10" rx="2"></rect>
                <circle cx="12" cy="5" r="2"></circle>
            </svg>
        </div>
        <div class="message-content">
            <div class="message-bubble">
                <span style="opacity: 0.5;">${loadingText}</span>
            </div>
        </div>
    `;
    chatContainer.appendChild(typingDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    return typingDiv;
}

// AI Response Handler - now imported from ai-config.js
// La función getAIResponse() ahora está en ai-config.js y soporta:
// - Tu GPT personalizado de OpenAI
// - Gemini AI de Google
// - Respuestas predefinidas como fallback

function cleanResponse(text) {
    if (!text) return "";
    // Eliminar anotaciones de citas de OpenAI (ej: 【12:0†convenio.pdf】)
    return text.replace(/【\d+:\d+†[^】]+】/g, '').trim();
}

async function handleSendMessage() {
    const message = chatInput.value.trim();

    if (!message) return;

    // Add user message
    addMessage(message, true);
    chatInput.value = '';

    // Si ya tenemos contexto, lo incluimos con el nombre del archivo específico
    let contextMessage = message;
    if (currentContext.convenio) {
        let fileName = "";
        const c = currentContext.convenio.toLowerCase();

        if (c.includes("alcobendas")) fileName = "convenio_alcobendas_2024-2027.pdf";

        contextMessage = `[Contexto: El usuario pregunta sobre el convenio "${currentContext.convenio}". IMPORTANTE: Busca la respuesta ÚNICAMENTE en el archivo "${fileName}"] ${message}`;
    }

    // Show typing indicator
    const typingIndicator = simulateTyping();

    // Get AI response
    const response = await getAIResponse(contextMessage);

    // Remove typing indicator
    typingIndicator.remove();

    // Add AI response
    addMessage(cleanResponse(response), false);
}

// Event Listeners for Chat
sendBtn.addEventListener('click', handleSendMessage);

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
    }
});

// Manejo de opciones del chat
document.addEventListener('click', async (e) => {
    const btn = e.target.closest('.chat-option-btn');

    if (btn) {
        const value = btn.getAttribute('data-value');
        const text = btn.textContent;
        const parent = btn.parentElement;

        // Si el botón ya está deshabilitado o seleccionado, ignorar
        if (btn.disabled || btn.classList.contains('selected')) return;

        // Deshabilitar botones hermanos
        const siblings = parent.querySelectorAll('.chat-option-btn');
        siblings.forEach(b => {
            b.disabled = true;
            b.style.opacity = "0.5";
            b.style.cursor = "not-allowed";
        });
        btn.classList.add('selected');
        btn.style.opacity = "1";

        // Añadir mensaje visual del usuario
        addMessage(text, true);

        // Lógica de flujo
        if (value === 'reiniciar') {
            // Caso especial: Reiniciar
            handleActionSelection('reiniciar');
        } else if (!currentContext.convenio) {
            // Paso 1: Selección de Convenio
            currentContext.convenio = text.replace(/🏢 /g, '').trim(); // Limpiar emojis

            // Simular pensamiento breve
            setTimeout(() => {
                showActionOptions(currentContext.convenio);
            }, 600);
        } else {
            // Paso 2: Selección de Acción
            handleActionSelection(value);
        }
    }
});

function createBotMessageElement(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message bot';

    // Avatar
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'message-avatar bot';
    avatarDiv.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="11" width="18" height="10" rx="2"></rect>
            <circle cx="12" cy="5" r="2"></circle>
            <path d="M12 7v4"></path>
            <line x1="8" y1="16" x2="8" y2="16"></line>
            <line x1="16" y1="16" x2="16" y2="16"></line>
        </svg>
    `;

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';

    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = 'message-bubble';
    bubbleDiv.innerHTML = text; // Allow HTML for buttons

    contentDiv.appendChild(bubbleDiv);
    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(contentDiv);

    return messageDiv;
}

function showActionOptions(convenioName) {
    const optionsHtml = `
        <p>Has seleccionado: <strong>${convenioName}</strong>. ¿Qué necesitas consultar?</p>
        <div class="chat-options" style="margin-top: 10px; display: flex; flex-direction: column; gap: 8px;">
            <button class="chat-option-btn" data-value="convenio">🔎 Consulta el Convenio</button>
            <button class="chat-option-btn" data-value="tablas">💰 Tablas Salariales 2026</button>
            <button class="chat-option-btn" data-value="pluses">⭐ Consultar Pluses (Imagen)</button>
            <button class="chat-option-btn" data-value="consulta">❓ Otra Consulta</button>
            <button class="chat-option-btn secondary" data-value="reiniciar" style="margin-top: 10px; background: #fff; border: 1px dashed #ccc; justify-content: center;">⬅️ Volver atrás</button>
        </div>
    `;

    const messageDiv = createBotMessageElement(optionsHtml);
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

async function handleActionSelection(action) {
    // Si es reiniciar, recargamos la página para limpiar todo por completo
    if (action === 'reiniciar') {
        // Opción nuclear: Recargar página
        location.reload();
        return;
    }

    let prompt = "";
    let loadingText = "Escribiendo...";

    // Determinar nombre de archivo para mejorar la búsqueda
    let fileName = "";
    if (currentContext.convenio) {
        const c = currentContext.convenio.toLowerCase();
        if (c.includes("alcobendas")) fileName = "convenio_alcobendas_2024-2027.pdf";
    }

    if (action === 'tablas') {
        const tablesFile = "tablas_2026.pdf";
        prompt = `[Contexto: Busca la respuesta ÚNICAMENTE en el archivo "${tablesFile}"] El usuario quiere consultar las TABLAS SALARIALES. Muestra el salario base y complementos por categoría para 2026.`;
        loadingText = "Consultando tablas salariales...";
        processUserMessage(prompt, loadingText);
    } else if (action === 'pluses') {
        const plusesFile = "pluses 2026.jpg";
        prompt = `El usuario quiere consultar los PLUSES. Recuérdale que puede ver la imagen "${plusesFile}" en el registro de extras o en la sección de documentos para ver los importes de nocturnidad, festivos y suplencias de 2026.`;
        loadingText = "Preparando consulta de pluses...";
        processUserMessage(prompt, loadingText);
    } else if (action === 'convenio') {
        // CAMBIO: Ahora no resume, invita a preguntar
        const messageDiv = createBotMessageElement(`Perfecto. He cargado el contexto del **Convenio de ${currentContext.convenio}**.
        <br><br>
        ¿Qué quieres saber? Puedes preguntar por permisos, jornada, excedencias, etc.`);
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
        // El usuario escribirá ahora...
    } else {
        // Consulta libre (Otra consulta)
        const messageDiv = createBotMessageElement("Dime, ¿cuál es tu duda específica? Estoy aquí para ayudarte.");
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
}

async function processUserMessage(message, loadingText) {
    const typingIndicator = simulateTyping(loadingText);
    const response = await getAIResponse(message);
    typingIndicator.remove();
    addMessage(cleanResponse(response), false);
}

// ============================================
// Resource Cards Navigation
// ============================================

const resourcePages = {
    'convenios': {
        title: 'Convenios Colectivos',
        description: 'Aquí encontrarás todos los convenios colectivos vigentes.'
    },
    'actas': {
        title: 'Actas de Reuniones',
        description: 'Accede a las actas de todas las reuniones sindicales.'
    },
    'videos': {
        title: 'Material Audiovisual',
        description: 'Vídeos formativos y de información sindical.'
    },
    'powerpoint': {
        title: 'Presentaciones',
        description: 'PowerPoints y material gráfico descargable.'
    }
};

resourceCards.forEach(card => {
    card.addEventListener('click', () => {
        const resource = card.getAttribute('data-resource');
        const info = resourcePages[resource];

        // Aquí puedes agregar navegación a páginas reales
        alert(`📂 ${info.title}\n\n${info.description}\n\n(Funcionalidad en desarrollo)`);
    });
});

// ============================================
// Search Functionality
// ============================================

let searchTimeout;

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);

        searchTimeout = setTimeout(() => {
            const query = e.target.value.trim();
            if (query.length > 2) {
                console.log('Buscando:', query);
                // Aquí puedes filtrar las tarjetas de recursos o llamar a la IA
            }
        }, 500);
    });
}

// ============================================
// Notifications
// ============================================

notificationBtn.addEventListener('click', () => {
    // Simulación de notificaciones
    const notifications = [
        '📢 Nueva acta disponible',
        '📄 Actualización del convenio colectivo',
        '🎥 Nuevo vídeo formativo'
    ];

    const notifText = notifications.join('\n');
    alert(`🔔 Notificaciones:\n\n${notifText}`);
});

// ============================================
// Menu Button
// ============================================

menuBtn.addEventListener('click', () => {
    alert('📱 Menú\n\n(Funcionalidad en desarrollo)');
});

// ============================================
// Quick Actions
// ============================================

const contactBtn = document.getElementById('contactBtn');
const calendarBtn = document.getElementById('calendarBtn');
const newsBtn = document.getElementById('newsBtn');

if (contactBtn) {
    contactBtn.addEventListener('click', () => {
        window.location.href = 'contacto.html';
    });
}

if (calendarBtn) {
    calendarBtn.addEventListener('click', () => {
        alert('📅 Calendario\n\nPróximos eventos y reuniones sindicales.\n\n(Funcionalidad en desarrollo)');
    });
}

if (newsBtn) {
    newsBtn.addEventListener('click', () => {
        alert('📰 Noticias\n\nÚltimas noticias sindicales y laborales.\n\n(Funcionalidad en desarrollo)');
    });
}

// ============================================
// Salary Card Shortcut
// ============================================

// El acceso directo a pluses/tablas se puede realizar ahora a través de los recursos o el chat.



// ============================================
// Initialize App
// ============================================

console.log('🔴 CCOO Hábitat - Sección Sindical de Alcobendas');
console.log('✅ Aplicación inicializada correctamente');

// Add passive event listeners for better performance
document.addEventListener('touchstart', () => { }, { passive: true });
document.addEventListener('touchmove', () => { }, { passive: true });
