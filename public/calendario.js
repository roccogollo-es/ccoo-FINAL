// ============================================
// CALENDARIO DE EXTRAS - JavaScript
// ============================================

// State
let currentDate = new Date();
currentDate.setDate(1); // Forzar día 1 para evitar problemas de desbordamiento
let selectedDate = null;
let entries = loadEntries();

// DOM Elements
const calendarGrid = document.getElementById('calendarGrid');
const currentMonthEl = document.getElementById('currentMonth');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');
const entryModal = document.getElementById('entryModal');
const entryOverlay = document.getElementById('entryOverlay');
const closeEntryModalBtn = document.getElementById('closeEntryModal');
const saveEntryBtn = document.getElementById('saveEntry');
const deleteEntryBtn = document.getElementById('deleteEntry');
const entryDateInput = document.getElementById('entryDate');
const entryAmountInput = document.getElementById('entryAmount');
const entryTypeSelect = document.getElementById('entryType');
const entryNotesInput = document.getElementById('entryNotes');
const monthTotalEl = document.getElementById('monthTotal');
const daysWorkedEl = document.getElementById('daysWorked');
const avgPerDayEl = document.getElementById('avgPerDay');
const recentListEl = document.getElementById('recentList');

// Modal Toggle Elements
const viewTablesBtn = document.getElementById('viewTablesBtn');
const backToFormBtn = document.getElementById('backToForm');
const tableImageContainer = document.getElementById('tableImageContainer');
const entryFormActions = document.getElementById('entryFormActions');

// Month names in Spanish
const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const monthNamesShort = [
    'ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN',
    'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'
];

const typeLabels = {
    'horas-extra': 'Horas extra',
    'sabado': 'Sábado',
    'domingo': 'Domingo',
    'suplencia-rsu-noche': 'Suplencia RSU noche',
    'suplencia-rsu-dia': 'Suplencia RSU día',
    'suplencia-carton': 'Suplencia cartón',
    'festivo': 'Festivo',
    'nocturnidad': 'Nocturnidad',
    'plus': 'Plus especial',
    'otro': 'Otro'
};

// ============================================
// Local Storage Functions
// ============================================

function loadEntries() {
    const stored = localStorage.getItem('ccoo_extras');
    return stored ? JSON.parse(stored) : {};
}

function saveEntries() {
    localStorage.setItem('ccoo_extras', JSON.stringify(entries));
}

function getEntryKey(date) {
    if (!date) return "";
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

// ============================================
// Calendar Rendering
// ============================================

function renderCalendar() {
    if (!calendarGrid || !currentMonthEl) return;

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Update month display
    currentMonthEl.textContent = `${monthNames[month]} ${year}`;

    // Clear grid
    calendarGrid.innerHTML = '';

    // Get first day of month (0 = Sunday, 1 = Monday, etc.)
    const firstDay = new Date(year, month, 1).getDay();
    // Adjust so Monday is 0
    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

    // Get last day of month
    const lastDate = new Date(year, month + 1, 0).getDate();

    // Get last day of previous month
    const prevLastDate = new Date(year, month, 0).getDate();

    // Days from previous month
    for (let i = adjustedFirstDay - 1; i >= 0; i--) {
        const day = prevLastDate - i;
        const dayEl = createDayElement(day, true);
        calendarGrid.appendChild(dayEl);
    }

    // Days of current month
    const today = new Date();
    for (let day = 1; day <= lastDate; day++) {
        const date = new Date(year, month, day);
        const isToday = date.toDateString() === today.toDateString();
        const key = getEntryKey(date);
        const entry = entries[key];

        const dayEl = createDayElement(day, false, isToday, entry, date);
        calendarGrid.appendChild(dayEl);
    }

    // Days from next month
    const totalCells = calendarGrid.children.length;
    const remainingCells = 42 - totalCells; // 6 rows * 7 days
    for (let day = 1; day <= remainingCells; day++) {
        const dayEl = createDayElement(day, true);
        calendarGrid.appendChild(dayEl);
    }

    updateSummary();
    updateRecentList();
}

function createDayElement(day, isOtherMonth, isToday = false, entry = null, date = null) {
    const dayEl = document.createElement('div');
    dayEl.className = 'calendar-day';

    if (isOtherMonth) {
        dayEl.classList.add('other-month');
    }

    if (isToday) {
        dayEl.classList.add('today');
    }

    if (entry) {
        dayEl.classList.add('has-entry');
    }

    const numberEl = document.createElement('div');
    numberEl.className = 'day-number';
    numberEl.textContent = day;
    dayEl.appendChild(numberEl);

    if (entry) {
        const amountEl = document.createElement('div');
        amountEl.className = 'day-amount';
        amountEl.textContent = `${entry.amount}€`;
        dayEl.appendChild(amountEl);
    }

    if (date && !isOtherMonth) {
        dayEl.addEventListener('click', () => openEntryModal(date));
    }

    return dayEl;
}

// ============================================
// Modal Management
// ============================================

function openEntryModal(date) {
    selectedDate = date;
    const key = getEntryKey(date);
    const entry = entries[key];

    // Resetear vista al abrir (mostrar formulario, ocultar tabla)
    if (tableImageContainer) tableImageContainer.style.display = 'none';
    if (entryFormActions) entryFormActions.style.display = 'block';
    if (viewTablesBtn) viewTablesBtn.style.display = 'flex';

    // Set form values
    if (entryDateInput) entryDateInput.value = key;

    const modalTitle = document.getElementById('modalTitle');
    if (entry) {
        if (modalTitle) modalTitle.textContent = 'Editar Extra';
        if (entryAmountInput) entryAmountInput.value = entry.amount;
        if (entryTypeSelect) entryTypeSelect.value = entry.type;
        if (entryNotesInput) entryNotesInput.value = entry.notes || '';
        if (deleteEntryBtn) deleteEntryBtn.style.display = 'block';
    } else {
        if (modalTitle) modalTitle.textContent = 'Registrar Extra';
        if (entryAmountInput) entryAmountInput.value = '';
        if (entryTypeSelect) entryTypeSelect.value = 'horas-extra';
        if (entryNotesInput) entryNotesInput.value = '';
        if (deleteEntryBtn) deleteEntryBtn.style.display = 'none';
    }

    if (entryModal) entryModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Pequeño delay para el focus
    setTimeout(() => {
        if (entryAmountInput) entryAmountInput.focus();
    }, 100);
}

function closeEntryModal() {
    if (entryModal) entryModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    selectedDate = null;
}

// ============================================
// Entry Management
// ============================================

function saveEntry() {
    if (!entryAmountInput || !selectedDate) return;

    const amount = parseFloat(entryAmountInput.value);

    if (isNaN(amount) || amount <= 0) {
        alert('Por favor, introduce una cantidad válida');
        return;
    }

    const key = getEntryKey(selectedDate);

    entries[key] = {
        date: key,
        amount: amount,
        type: entryTypeSelect.value,
        notes: entryNotesInput.value.trim(),
        timestamp: new Date().toISOString()
    };

    saveEntries();
    renderCalendar();
    closeEntryModal();
}

function deleteEntry() {
    if (!selectedDate) return;
    if (!confirm('¿Estás seguro de que quieres eliminar este registro?')) {
        return;
    }

    const key = getEntryKey(selectedDate);
    delete entries[key];

    saveEntries();
    renderCalendar();
    closeEntryModal();
}

// ============================================
// Summary Calculations
// ============================================

function updateSummary() {
    if (!monthTotalEl || !daysWorkedEl || !avgPerDayEl) return;

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    let monthTotal = 0;
    let daysWorkedValue = 0;

    Object.keys(entries).forEach(key => {
        const entryDate = new Date(key);
        if (entryDate.getFullYear() === year && entryDate.getMonth() === month) {
            monthTotal += entries[key].amount;
            daysWorkedValue++;
        }
    });

    const avgPerDayValue = daysWorkedValue > 0 ? monthTotal / daysWorkedValue : 0;

    monthTotalEl.textContent = `${monthTotal.toFixed(2)}€`;
    daysWorkedEl.textContent = daysWorkedValue;
    avgPerDayEl.textContent = `${avgPerDayValue.toFixed(2)}€`;
}

function updateRecentList() {
    if (!recentListEl) return;

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Filter entries for current month
    const monthEntries = Object.keys(entries)
        .filter(key => {
            const entryDate = new Date(key);
            return entryDate.getFullYear() === year && entryDate.getMonth() === month;
        })
        .map(key => ({
            ...entries[key],
            dateObj: new Date(key)
        }))
        .sort((a, b) => b.dateObj - a.dateObj);

    if (monthEntries.length === 0) {
        recentListEl.innerHTML = `
            <div class="empty-state">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 6v6l4 2"></path>
                </svg>
                <p>Aún no hay registros este mes</p>
                <small>Haz clic en un día del calendario para añadir extras</small>
            </div>
        `;
        return;
    }

    recentListEl.innerHTML = monthEntries.map(entry => `
        <div class="entry-item" onclick="openEntryModal(new Date('${entry.date}'))">
            <div class="entry-date">
                <div class="entry-day">${entry.dateObj.getDate()}</div>
                <div class="entry-month">${monthNamesShort[entry.dateObj.getMonth()]}</div>
            </div>
            <div class="entry-details">
                <div class="entry-type">${typeLabels[entry.type]}</div>
                ${entry.notes ? `<div class="entry-notes">${entry.notes}</div>` : ''}
            </div>
            <div class="entry-amount-display">${entry.amount.toFixed(2)}€</div>
        </div>
    `).join('');
}

// ============================================
// Event Listeners
// ============================================

if (prevMonthBtn) {
    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });
}

if (nextMonthBtn) {
    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });
}

if (closeEntryModalBtn) closeEntryModalBtn.addEventListener('click', closeEntryModal);
if (entryOverlay) entryOverlay.addEventListener('click', closeEntryModal);

if (saveEntryBtn) saveEntryBtn.addEventListener('click', saveEntry);
if (deleteEntryBtn) deleteEntryBtn.addEventListener('click', deleteEntry);

if (entryAmountInput) {
    entryAmountInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            saveEntry();
        }
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && entryModal && entryModal.classList.contains('active')) {
        closeEntryModal();
    }
});

// Toggle vista tabla/formulario
if (viewTablesBtn) {
    viewTablesBtn.addEventListener('click', () => {
        if (tableImageContainer) tableImageContainer.style.display = 'block';
        if (entryFormActions) entryFormActions.style.display = 'none';
        if (viewTablesBtn) viewTablesBtn.style.display = 'none';
    });
}

if (backToFormBtn) {
    backToFormBtn.addEventListener('click', () => {
        if (tableImageContainer) tableImageContainer.style.display = 'none';
        if (entryFormActions) entryFormActions.style.display = 'block';
        if (viewTablesBtn) viewTablesBtn.style.display = 'flex';
    });
}

// ============================================
// Initialize
// ============================================

renderCalendar();

console.log('📅 Calendario de Extras inicializado correctamente');
