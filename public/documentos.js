// ============================================
// DOCUMENTOS - JavaScript
// ============================================

const sampleDocuments = {
    convenios: [
        {
            id: 1,
            title: 'Convenio Colectivo LV y RSU Alcobendas 2024-2027',
            type: 'pdf',
            date: '2024-11-29',
            size: '2.4 MB',
            url: 'documentos/convenios/convenio_alcobendas_2024-2027.pdf'
        },
        {
            id: 2,
            title: 'Calendario Laboral 2026',
            type: 'pdf',
            date: '2026-01-01',
            size: '500 KB',
            url: 'documentos/convenios/CALENDARIO_LABORAL_2026.pdf'
        },
        {
            id: 3,
            title: 'Tablas Salariales 2026 (Excel)',
            type: 'document',
            date: '2026-01-01',
            size: '150 KB',
            url: 'documentos/convenios/Tablas 2026 (Solo RSU y categoria carton).xlsx'
        },
        {
            id: 4,
            title: 'Protocolo Ola de Calor Alcobendas 2025',
            type: 'pdf',
            date: '2025-01-01',
            size: '320 KB',
            url: 'documentos/convenios/protocolo_calor_2025.pdf'
        },
        {
            id: 5,
            title: 'Tablas Salariales 2025',
            type: 'pdf',
            date: '2026-01-01',
            size: '293 KB',
            url: 'documentos/convenios/tablas_2026.pdf'
        },
        {
            id: 6,
            title: 'Pluses 2026 (Imagen)',
            type: 'image',
            date: '2026-01-01',
            size: '500 KB',
            url: 'documentos/convenios/pluses 2026.jpg'
        },
    ],
    actas: [
        // --- 2025 ---
        {
            id: 2501,
            title: 'Acta Comisión Mixta Paritaria I (29.01.2025)',
            type: 'pdf',
            date: '2025-01-29',
            url: 'documentos/actas/ACTAS 2025/Acta comision mixta paritaria I 29.01.2025.pdf'
        },
        {
            id: 2502,
            title: 'Acta Comisión Mixta Paritaria II (29.01.2025)',
            type: 'pdf',
            date: '2025-01-29',
            url: 'documentos/actas/ACTAS 2025/Acta comision mixta paritaria II 29.01.2025.pdf'
        },
        {
            id: 2503,
            title: 'Acta Reunión Comité (23.01.2025)',
            type: 'pdf',
            date: '2025-01-23',
            url: 'documentos/actas/ACTAS 2025/Acta reunion comité 23.01.25.pdf'
        },
        {
            id: 2504,
            title: 'Acta Reunión Comité (19.03.2025)',
            type: 'pdf',
            date: '2025-03-19',
            url: 'documentos/actas/ACTAS 2025/Acta reunion comité 19.03.25.pdf'
        },
        {
            id: 2505,
            title: 'Acta Reunión Comité (05.05.2025)',
            type: 'pdf',
            date: '2025-05-05',
            url: 'documentos/actas/ACTAS 2025/Acta reunion comité 05.05.2025.pdf'
        },
        {
            id: 2506,
            title: 'Acta Reunión Comité (23.06.2025)',
            type: 'pdf',
            date: '2025-06-23',
            url: 'documentos/actas/ACTAS 2025/Acta reunion comité 23.06.2025.pdf'
        },

        // --- 2024 ---
        {
            id: 2401,
            title: 'Acta Comisión Mixta Paritaria (2) (18.12.2024)',
            type: 'pdf',
            date: '2024-12-18',
            url: 'documentos/actas/ACTAS 2024/Acta comision mixta paritaria (2) 18.12.2024.pdf'
        },
        {
            id: 2402,
            title: 'Acta Comisión Mixta Paritaria (18.12.2024)',
            type: 'pdf',
            date: '2024-12-18',
            url: 'documentos/actas/ACTAS 2024/Acta comision mixta paritaria 18.12.2024.pdf'
        },
        {
            id: 2403,
            title: 'Acta Comité Alcobendas (13.05.2024)',
            type: 'pdf',
            date: '2024-05-13',
            url: 'documentos/actas/ACTAS 2024/Acta comité Alcobendas 13.05.2024.pdf'
        },
        {
            id: 2404,
            title: 'Acta Firma Convenio (29.11.2024)',
            type: 'pdf',
            date: '2024-11-29',
            url: 'documentos/actas/ACTAS 2024/Acta firma convenio 29.11.2024.pdf'
        },
        {
            id: 2405,
            title: 'Acta Negociación Convenio (13.11.2024)',
            type: 'pdf',
            date: '2024-11-13',
            url: 'documentos/actas/ACTAS 2024/Acta negociacion convenio 13.11.24.pdf'
        },
        {
            id: 2406,
            title: 'Acta Negociación Convenio Completa (22.11.2024)',
            type: 'pdf',
            date: '2024-11-22',
            url: 'documentos/actas/ACTAS 2024/Acta negociacion convenio 22.11.2024-completa.pdf'
        },
        {
            id: 2407,
            title: 'Acta Negociación Convenio (27.11.2024)',
            type: 'pdf',
            date: '2024-11-27',
            url: 'documentos/actas/ACTAS 2024/Acta negociacion convenio 27.11.24.pdf'
        },
        {
            id: 2408,
            title: 'Acta Preacuerdo (31.10.2024)',
            type: 'pdf',
            date: '2024-10-31',
            url: 'documentos/actas/ACTAS 2024/Acta preacuerdo 31.10.2024.pdf'
        },
        {
            id: 2409,
            title: 'Acta Reunión Comité (18.04.2024) y Tablas',
            type: 'pdf',
            date: '2024-04-18',
            url: 'documentos/actas/ACTAS 2024/Acta reunion comité 18.04 y tablas 2024.pdf'
        },
        {
            id: 2410,
            title: 'Acta Reunión Comité (24.06.2024)',
            type: 'pdf',
            date: '2024-06-24',
            url: 'documentos/actas/ACTAS 2024/Acta reunion comité 24.06.2024.pdf'
        },
        {
            id: 2411,
            title: 'Prima de Productividad y Constancia',
            type: 'pdf',
            date: '2024-04-29',
            url: 'documentos/actas/ACTAS 2024/Prima de productividad y constancia 29.04.pdf'
        },
        {
            id: 2412,
            title: 'Reglamento Ampliación Peones Fines de Semana',
            type: 'pdf',
            date: '2024-01-01',
            url: 'documentos/actas/ACTAS 2024/Reglamento ampliacion peones fines de semana.pdf'
        },
        {
            id: 2413,
            title: 'Reglamento Ascenso a Conductor',
            type: 'pdf',
            date: '2024-01-01',
            url: 'documentos/actas/ACTAS 2024/Reglamento ascenso a conductor.pdf'
        },

        // --- 2023 ---
        {
            id: 2301,
            title: 'Acta Convenio Alcobendas (21.09.2023)',
            type: 'pdf',
            date: '2023-09-21',
            url: 'documentos/actas/ACTAS 2023/ACTA CONVENIO ALCOBENDAS 21.09.2023.pdf'
        },
        {
            id: 2302,
            title: 'Acta Modificada Convenio (20.07.2023)',
            type: 'pdf',
            date: '2023-07-20',
            url: 'documentos/actas/ACTAS 2023/ACTA modificada CONVENIO ALCOBENDAS 20.07.2023.pdf'
        },
        {
            id: 2303,
            title: 'Acta Constitución Convenio (20.06.2023)',
            type: 'pdf',
            date: '2023-06-20',
            url: 'documentos/actas/ACTAS 2023/Acta constitucion convenio Alcobendas firmada 20.06.2023.pdf'
        },
        {
            id: 2304,
            title: 'Acta Reunión Comité (04.05.2023)',
            type: 'pdf',
            date: '2023-05-04',
            url: 'documentos/actas/ACTAS 2023/Acta reunion comite Alcobendas 04.05.23 firmada.pdf'
        },
        {
            id: 2305,
            title: 'Acta Presentación Comité (17.04.2023)',
            type: 'pdf',
            date: '2023-04-17',
            url: 'documentos/actas/ACTAS 2023/Acta reunion presentacion Comité 17.04.23.pdf'
        },
        {
            id: 2306,
            title: 'Acta Comité Firmada (20.07.2023)',
            type: 'pdf',
            date: '2023-07-20',
            url: 'documentos/actas/ACTAS 2023/acta comité firmada 20.07.pdf'
        }
    ],
    videos: [
        {
            id: 20,
            title: 'Formación derechos laborales',
            type: 'video',
            date: '2024-01-10',
            duration: '45:30',
            url: 'documentos/videos/formacion_derechos.mp4'  // Puede ser MP4, o un enlace de YouTube
        },
    ],
    presentaciones: [
        {
            id: 30,
            title: 'Presentación negociación colectiva',
            type: 'presentation',
            date: '2024-01-25',
            size: '5.2 MB',
            url: 'documentos/presentaciones/negociacion_colectiva.pptx'
        },
    ]
};

// DOM Elements
const tabBtns = document.querySelectorAll('.tab-btn');
const documentsContainer = document.getElementById('documentsContainer');
const searchInput = document.getElementById('searchDocs');
const uploadBtn = document.getElementById('uploadBtn');
const uploadModal = document.getElementById('uploadModal');
const uploadOverlay = document.getElementById('uploadOverlay');
const closeUploadModalBtn = document.getElementById('closeUploadModal');
const cancelUploadBtn = document.getElementById('cancelUpload');
const confirmUploadBtn = document.getElementById('confirmUpload');
const docFileInput = document.getElementById('docFile');
const fileNameDisplay = document.getElementById('fileName');
const pageTitle = document.getElementById('pageTitle');

// Current state
let currentCategory = 'convenios';
let currentDocuments = [];
let currentYearFilter = null; // Para la navegación por carpetas en Actas

// ============================================
// Tab Management
// ============================================

function switchTab(category) {
    currentCategory = category;
    currentYearFilter = null; // Resetear filtro al cambiar de pestaña

    // Update active tab
    tabBtns.forEach(btn => {
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Update page title
    const titles = {
        convenios: 'Convenios Colectivos',
        actas: 'Actas de Comité',
        videos: 'Vídeos',
        presentaciones: 'Presentaciones'
    };
    pageTitle.textContent = titles[category];

    // Load documents for this category
    loadDocuments(category);
}

// ============================================
// Document Loading
// ============================================

function loadDocuments(category, searchTerm = '') {
    let docs = sampleDocuments[category] || [];

    // Si estamos en actas y no hay filtro de año, mostramos las "carpetas"
    if (category === 'actas' && !currentYearFilter && !searchTerm) {
        renderFolders();
        return;
    }

    // Filtrar por año si hay un filtro activo
    if (category === 'actas' && currentYearFilter) {
        docs = docs.filter(doc => doc.url.includes(`ACTAS ${currentYearFilter}`));
    }

    // Filter by search term
    if (searchTerm) {
        docs = docs.filter(doc =>
            doc.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    currentDocuments = docs;
    renderDocuments();
}

function renderFolders() {
    const years = ['2025', '2024', '2023'];
    const grid = document.createElement('div');
    grid.className = 'documents-grid';

    years.forEach(year => {
        const folder = document.createElement('div');
        folder.className = 'document-card folder-card';
        folder.onclick = () => {
            currentYearFilter = year;
            loadDocuments('actas');
        };

        folder.innerHTML = `
            <div class="doc-icon-wrapper folder">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                </svg>
            </div>
            <div class="doc-info">
                <h3>Actas Año ${year}</h3>
                <p>Ver actas del comité de empresa</p>
            </div>
        `;
        grid.appendChild(folder);
    });

    documentsContainer.innerHTML = '';
    documentsContainer.appendChild(grid);
}

function renderDocuments() {
    if (currentDocuments.length === 0) {
        documentsContainer.innerHTML = `
            <div class="empty-state-docs">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                    <polyline points="13 2 13 9 20 9"></polyline>
                </svg>
                <h3>No hay documentos</h3>
                <p>No se encontraron documentos en esta categoría</p>
                <button class="btn-primary" onclick="document.getElementById('uploadBtn').click()">
                    Subir primer documento
                </button>
            </div>
        `;
        return;
    }

    const container = document.createElement('div');

    // Añadir botón de volver si estamos filtrando por año
    if (currentCategory === 'actas' && currentYearFilter) {
        const backBtn = document.createElement('button');
        backBtn.className = 'back-folder-btn';
        backBtn.innerHTML = '⬅️ Volver a Carpetas';
        backBtn.onclick = () => {
            currentYearFilter = null;
            loadDocuments('actas');
        };
        container.appendChild(backBtn);
    }

    const grid = document.createElement('div');
    grid.className = 'documents-grid';

    currentDocuments.forEach(doc => {
        grid.appendChild(createDocumentCard(doc));
    });

    container.appendChild(grid);
    documentsContainer.innerHTML = '';
    documentsContainer.appendChild(container);
}

function createDocumentCard(doc) {
    const card = document.createElement('div');
    card.className = 'document-card';

    const iconClass = getIconClass(doc.type);
    const icon = getDocumentIcon(doc.type);

    card.innerHTML = `
        <div class="doc-icon-wrapper ${iconClass}">
            ${icon}
        </div>
        <div class="doc-info">
            <h3>${doc.title}</h3>
            <div class="doc-meta">
                <div class="doc-meta-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    <span>${formatDate(doc.date)}</span>
                </div>
                ${doc.size ? `
                    <div class="doc-meta-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        <span>${doc.size}</span>
                    </div>
                ` : ''}
                ${doc.duration ? `
                    <div class="doc-meta-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        <span>${doc.duration}</span>
                    </div>
                ` : ''}
            </div>
        </div>
        <div class="doc-actions">
            <button class="doc-action-btn" onclick="viewDocument(${doc.id})">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                </svg>
                <span>Ver</span>
            </button>
            <button class="doc-action-btn" onclick="downloadDocument(${doc.id})">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                <span>Descargar</span>
            </button>
        </div>
    `;

    return card;
}

// ============================================
// Helper Functions
// ============================================

function getIconClass(type) {
    const classes = {
        pdf: 'pdf',
        video: 'video',
        presentation: 'presentation',
        document: 'document'
    };
    return classes[type] || 'document';
}

function getDocumentIcon(type) {
    const icons = {
        pdf: `
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
            </svg>
        `,
        video: `
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="23 7 16 12 23 17 23 7"></polygon>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
            </svg>
        `,
        presentation: `
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <rect x="7" y="7" width="3" height="9"></rect>
                <rect x="14" y="7" width="3" height="5"></rect>
            </svg>
        `
    };
    return icons[type] || icons.pdf;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
}

// ============================================
// Document Actions
// ============================================

function viewDocument(id) {
    const doc = findDocument(id);
    if (doc) {
        // Abrir el documento en una nueva pestaña
        window.open(doc.url, '_blank');
    }
}

function downloadDocument(id) {
    const doc = findDocument(id);
    if (doc) {
        // Crear un enlace temporal para forzar la descarga
        const link = document.createElement('a');
        link.href = doc.url;
        link.download = doc.title + '.pdf'; // Nombre del archivo descargado
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

function findDocument(id) {
    for (let category in sampleDocuments) {
        const doc = sampleDocuments[category].find(d => d.id === id);
        if (doc) return doc;
    }
    return null;
}

// ============================================
// Modal Management
// ============================================

function openUploadModal() {
    uploadModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeUploadModal() {
    uploadModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    // Reset form
    document.getElementById('docTitle').value = '';
    document.getElementById('docCategory').value = currentCategory;
    docFileInput.value = '';
    fileNameDisplay.textContent = 'Ningún archivo seleccionado';
}

function handleUpload() {
    const title = document.getElementById('docTitle').value.trim();
    const category = document.getElementById('docCategory').value;
    const file = docFileInput.files[0];

    if (!title) {
        alert('Por favor, introduce un título para el documento');
        return;
    }

    if (!file) {
        alert('Por favor, selecciona un archivo');
        return;
    }

    alert(`📤 Subida simulada:\n\nTítulo: ${title}\nCategoría: ${category}\nArchivo: ${file.name}\n\n⚠️ Para implementar la subida real, necesitas un servidor backend.`);

    closeUploadModal();
}

// ============================================
// Event Listeners
// ============================================

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        switchTab(btn.dataset.category);
    });
});

searchInput.addEventListener('input', (e) => {
    loadDocuments(currentCategory, e.target.value);
});

uploadBtn.addEventListener('click', openUploadModal);
closeUploadModalBtn.addEventListener('click', closeUploadModal);
uploadOverlay.addEventListener('click', closeUploadModal);
cancelUploadBtn.addEventListener('click', closeUploadModal);
confirmUploadBtn.addEventListener('click', handleUpload);

docFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        fileNameDisplay.textContent = file.name;
    } else {
        fileNameDisplay.textContent = 'Ningún archivo seleccionado';
    }
});

// Escape key to close modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && uploadModal.classList.contains('active')) {
        closeUploadModal();
    }
});

// ============================================
// Initialize
// ============================================

// Check URL hash for category
const urlHash = window.location.hash.substring(1); // Remove the #
const initialCategory = ['convenios', 'actas', 'videos', 'presentaciones'].includes(urlHash)
    ? urlHash
    : 'convenios';

switchTab(initialCategory);

console.log('📄 Sistema de documentos inicializado');
console.log(`Categorías disponibles: ${Object.keys(sampleDocuments).length}`);
console.log(`Categoría inicial: ${initialCategory}`);
