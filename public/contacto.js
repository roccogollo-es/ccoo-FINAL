// ============================================
// CONTACTO Y REGISTRO GOOGLE SHEETS - JavaScript
// ============================================

const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');
const submitBtn = document.getElementById('submitBtn');
const btnText = document.getElementById('btnText');

// URL de tu API de Google Sheets
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwZ0YyQOqu9PqAzsATEfNUYljA0ns1S0ZKbM9i5V2kiOZuYjlGB_kiW3hIT9Pq_THU/exec';

if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        // 1. Bloquear botón y mostrar carga
        submitBtn.disabled = true;
        btnText.textContent = 'Enviando y Registrando...';
        submitBtn.style.opacity = '0.7';

        // 2. Recoger datos
        const formData = {
            fecha: new Date().toLocaleString('es-ES'),
            nombre: document.getElementById('userName').value,
            categoria: document.getElementById('userCategory').value,
            asunto: document.getElementById('userSubject').value,
            mensaje: document.getElementById('userMessage').value
        };

        try {
            // 3. Enviar a Google Sheets vía fetch
            // Usamos 'no-cors' si el script no devuelve JSON correctamente, 
            // pero con el código que te di debería funcionar con el modo normal.
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Importante para evitar bloqueos CORS con Google Apps Script
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            console.log('Datos enviados a Google Sheets');

            // 4. Preparar el Email (esto se abre en una ventana nueva/gestor)
            sendEmail(formData);

            // 5. Mostrar éxito en la interfaz
            contactForm.style.display = 'none';
            successMessage.style.display = 'block';

        } catch (error) {
            console.error('Error al enviar:', error);
            alert('Hubo un problema al registrar en Google Sheets, pero intentaremos abrir el correo de todos modos.');
            sendEmail(formData);
        }
    });
}

/**
 * Abre el cliente de correo con los datos autorrellenados
 */
function sendEmail(data) {
    const email = "comiteaccionaalcobendas@gmail.com";
    const subject = `CONSULTA WEB: ${data.asunto} (${data.nombre})`;

    const body = `HOLA COMITÉ,\n\n` +
        `He enviado una nueva consulta a través de la aplicación:\n\n` +
        `-------------------------------------------\n` +
        `NOMBRE: ${data.nombre}\n` +
        `AFILIACIÓN: ${data.categoria}\n` +
        `FECHA: ${data.fecha}\n` +
        `ASUNTO: ${data.asunto}\n` +
        `MENSAJE:\n${data.mensaje}\n` +
        `-------------------------------------------\n\n` +
        `Un saludo.`;

    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Pequeño delay para dejar que el usuario vea el mensaje de éxito antes
    setTimeout(() => {
        window.location.href = mailtoUrl;
    }, 500);
}
