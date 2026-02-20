import React, { useState, useEffect, useRef } from 'react';
import { enviarMensajeAlAgente } from './agent-client';

const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --red: #D91A1A;
    --red-dark: #A01212;
    --red-light: #F5E5E5;
    --black: #111111;
    --white: #FAFAF8;
    --cream: #F2EFE9;
    --gray: #888888;
    --gray-light: #DFDFDF;
    --blue: #1A4DD9;
  }

  body { font-family: 'DM Sans', sans-serif; background: var(--cream); color: var(--black); }
  .app-root { min-height: 100vh; display: flex; flex-direction: column; }

  .app-header {
    background: var(--black); padding: 0 24px;
    position: sticky; top: 0; z-index: 200;
    border-bottom: 3px solid var(--red);
    display: flex; align-items: center; height: 60px; gap: 16px;
  }
  .header-logo { font-family: 'Bebas Neue', sans-serif; font-size: 28px; letter-spacing: 2px; color: var(--white); display: flex; align-items: center; gap: 6px; }
  .header-logo-badge { background: var(--red); padding: 2px 8px; border-radius: 3px; font-size: 24px; line-height: 1; }
  .header-subtitle { font-size: 11px; color: var(--gray); text-transform: uppercase; letter-spacing: 1px; flex: 1; }
  .header-nav { display: flex; gap: 8px; }
  .nav-btn { background: transparent; border: none; padding: 8px 14px; color: #888; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; cursor: pointer; border-radius: 4px; transition: all 0.15s; text-transform: uppercase; letter-spacing: 0.5px; }
  .nav-btn:hover { color: var(--white); }
  .nav-btn.active { color: var(--white); background: var(--red); }
  .back-btn { background: transparent; border: none; color: var(--gray); cursor: pointer; font-size: 20px; padding: 4px 8px; margin-right: 4px; transition: color 0.15s; }
  .back-btn:hover { color: var(--white); }

  .page-wrap { flex: 1; max-width: 860px; margin: 0 auto; width: 100%; padding: 32px 24px 60px; }

  .hero-banner { background: var(--black); padding: 40px 40px 36px; margin-bottom: 40px; position: relative; overflow: hidden; border-left: 8px solid var(--red); }
  .hero-banner::before { content: 'CCOO'; position: absolute; font-family: 'Bebas Neue', sans-serif; font-size: 180px; color: rgba(255,255,255,0.04); right: -10px; bottom: -20px; line-height: 1; pointer-events: none; letter-spacing: 4px; }
  .hero-tag { display: inline-block; background: var(--red); color: var(--white); font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; padding: 4px 10px; margin-bottom: 16px; }
  .hero-title { font-family: 'Bebas Neue', sans-serif; font-size: 52px; letter-spacing: 1px; line-height: 1; color: var(--white); margin-bottom: 12px; }
  .hero-title span { color: var(--red); }
  .hero-sub { color: #999; font-size: 15px; max-width: 420px; line-height: 1.6; margin-bottom: 28px; }
  .hero-cta { display: inline-flex; align-items: center; gap: 8px; background: var(--red); color: var(--white); border: none; padding: 12px 24px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 700; letter-spacing: 0.5px; cursor: pointer; text-transform: uppercase; transition: background 0.15s; border-radius: 3px; }
  .hero-cta:hover { background: var(--red-dark); }

  .ticker-bar { background: var(--red); color: var(--white); padding: 8px 0; overflow: hidden; margin-bottom: 32px; font-size: 12px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; }
  .ticker-inner { display: flex; gap: 60px; white-space: nowrap; animation: ticker 25s linear infinite; }
  @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  .ticker-item { display: flex; align-items: center; gap: 10px; }
  .ticker-dot { width: 5px; height: 5px; background: rgba(255,255,255,0.5); border-radius: 50%; }

  .section-header { display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid var(--black); padding-bottom: 8px; margin-bottom: 20px; }
  .section-title { font-family: 'Bebas Neue', sans-serif; font-size: 28px; letter-spacing: 1px; }
  .section-link { font-size: 13px; color: var(--red); font-weight: 600; cursor: pointer; }
  .section-link:hover { text-decoration: underline; }

  .quick-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; margin-bottom: 40px; }
  .quick-card { background: var(--white); padding: 24px 20px; cursor: pointer; transition: all 0.15s; border-bottom: 3px solid transparent; display: flex; flex-direction: column; gap: 10px; }
  .quick-card:hover { background: var(--black); border-bottom-color: var(--red); }
  .quick-card:hover .qc-title { color: var(--white); }
  .quick-card:hover .qc-icon { background: var(--red); color: var(--white); }
  .quick-card:hover .qc-desc { color: #888; }
  .qc-icon { width: 44px; height: 44px; background: var(--red-light); display: flex; align-items: center; justify-content: center; font-size: 20px; border-radius: 4px; transition: all 0.15s; }
  .qc-title { font-weight: 700; font-size: 15px; transition: color 0.15s; }
  .qc-desc { font-size: 12px; color: var(--gray); transition: color 0.15s; }

  .resources-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; }
  .resource-card { background: var(--white); padding: 28px 24px; display: flex; align-items: center; gap: 16px; cursor: pointer; transition: background 0.15s; border-left: 4px solid transparent; }
  .resource-card:hover { background: var(--cream); border-left-color: var(--red); }
  .rc-icon { width: 52px; height: 52px; display: flex; align-items: center; justify-content: center; font-size: 24px; flex-shrink: 0; }
  .rc-icon.red { background: var(--red); }
  .rc-icon.blue { background: var(--blue); }
  .rc-title { font-weight: 700; font-size: 16px; margin-bottom: 4px; }
  .rc-desc { font-size: 12px; color: var(--gray); }

  .cal-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; margin-bottom: 32px; }
  .stat-box { background: var(--white); padding: 20px 24px; }
  .stat-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: var(--gray); margin-bottom: 6px; }
  .stat-value { font-family: 'Bebas Neue', sans-serif; font-size: 40px; letter-spacing: 1px; line-height: 1; }
  .stat-value.red { color: var(--red); }
  .stat-unit { font-size: 16px; font-family: 'DM Sans'; font-weight: 400; color: var(--gray); margin-left: 2px; }

  .cal-card { background: var(--white); padding: 28px; }
  .cal-nav { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; border-bottom: 2px solid var(--black); padding-bottom: 20px; }
  .cal-month-title { font-family: 'Bebas Neue', sans-serif; font-size: 36px; letter-spacing: 1px; }
  .cal-arrow { width: 40px; height: 40px; background: var(--cream); border: none; cursor: pointer; font-size: 18px; display: flex; align-items: center; justify-content: center; transition: background 0.15s; border-radius: 2px; }
  .cal-arrow:hover { background: var(--black); color: var(--white); }
  .cal-headers { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; margin-bottom: 8px; }
  .cal-day-header { text-align: center; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--gray); padding: 6px 0; }
  .cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; }
  .cal-day { aspect-ratio: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; transition: all 0.12s; border-radius: 2px; background: var(--cream); border: 1px solid transparent; font-size: 14px; font-weight: 500; }
  .cal-day:hover { background: var(--black); color: var(--white); }
  .cal-day.empty { background: transparent; border: none; cursor: default; }
  .cal-day.has-entry { background: var(--red); color: var(--white); border-color: var(--red-dark); }
  .cal-day.has-entry:hover { background: var(--red-dark); }
  .cal-day.today { border: 2px solid var(--blue); font-weight: 700; }
  .cal-day.today:not(.has-entry) { color: var(--blue); }
  .cal-day-num { line-height: 1; }
  .cal-day-amt { font-size: 10px; margin-top: 2px; opacity: 0.9; font-weight: 600; }

  .modal-backdrop { 
    position: fixed; inset: 0; background: rgba(0,0,0,0.75); 
    display: flex; align-items: flex-end; justify-content: center; 
    z-index: 1000; padding: 0; animation: fadein 0.2s; 
  }
  @keyframes fadein { from { opacity: 0; } to { opacity: 1; } }
  .modal-sheet { background: var(--white); width: 100%; max-width: 520px; padding: 32px 28px 40px; animation: slideup 0.25s cubic-bezier(0.33,1,0.68,1); border-top: 5px solid var(--red); }
  @keyframes slideup { from { transform: translateY(60px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
  .modal-title { font-family: 'Bebas Neue', sans-serif; font-size: 30px; letter-spacing: 1px; }
  .modal-close { background: var(--cream); border: none; width: 36px; height: 36px; border-radius: 50%; cursor: pointer; font-size: 16px; display: flex; align-items: center; justify-content: center; transition: background 0.15s; }
  .modal-close:hover { background: var(--black); color: var(--white); }
  .form-group { margin-bottom: 18px; }
  .form-label { display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; color: var(--gray); margin-bottom: 8px; }
  .form-input, .form-select { width: 100%; padding: 12px 14px; border: 2px solid var(--gray-light); border-radius: 3px; font-family: 'DM Sans', sans-serif; font-size: 15px; background: var(--white); color: var(--black); transition: border-color 0.15s; outline: none; }
  .form-input:focus, .form-select:focus { border-color: var(--red); }
  .form-input:disabled { background: var(--cream); color: var(--gray); }
  .modal-actions { display: flex; gap: 10px; margin-top: 28px; }
  .btn-primary { flex: 1; padding: 14px; background: var(--red); color: var(--white); border: none; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; cursor: pointer; border-radius: 3px; transition: background 0.15s; }
  .btn-primary:hover { background: var(--red-dark); }
  .btn-danger { padding: 14px 20px; background: transparent; color: var(--red); border: 2px solid var(--red); font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; cursor: pointer; border-radius: 3px; transition: all 0.15s; }
  .btn-danger:hover { background: var(--red); color: var(--white); }

  /* Estilos Chat IA */
  .chat-msg {
     border-radius: 12px;
     padding: 12px;
     margin-bottom: 12px;
     font-size: 14px;
     line-height: 1.5;
     white-space: pre-wrap;
  }
  .chat-user {
     background-color: var(--red);
     color: white;
     margin-left: 20%;
  }
  .chat-bot {
     background-color: var(--cream);
     color: var(--black);
     margin-right: 20%;
     border: 1px solid var(--gray-light);
  }

  @media (max-width: 600px) {
    .hero-title { font-size: 38px; } .quick-grid { grid-template-columns: 1fr 1fr; }
    .resources-grid { grid-template-columns: 1fr; } .stat-value { font-size: 28px; }
    .page-wrap { padding: 20px 16px 60px; } .cal-card { padding: 16px; }
    .hero-banner { padding: 28px 24px; } .hero-banner::before { font-size: 100px; }
  }
`;

const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const DAYS_SHORT = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
const ENTRY_TYPES = { 'horas-extra': 'Horas extra', 'sabado': 'Sábado', 'domingo': 'Domingo', 'suplencia-rsu-noche': 'Suplencia RSU noche', 'suplencia-rsu-dia': 'Suplencia RSU día', 'suplencia-carton': 'Suplencia cartón', 'festivo': 'Festivo', 'nocturnidad': 'Nocturnidad', 'plus': 'Plus especial', 'otro': 'Otro' };
const TICKER_ITEMS = ['⚡ Próxima asamblea: 28 de febrero', '📋 Nuevo convenio colectivo disponible', '💼 Acta del comité de empresa — Enero 2026', '🔔 Período de vacaciones: solicitar antes del 15 de marzo'];

function HomeView({ setView }) {
    return (
        <div className="page-wrap">
            <div className="hero-banner">
                <div className="hero-tag">Sección Sindical · Alcobendas</div>
                <h1 className="hero-title">Tu sindicato,<br /><span>siempre contigo</span></h1>
                <p className="hero-sub">Accede a tus recursos laborales, registra tus extras y consulta las últimas novedades del comité.</p>
                <button className="hero-cta" onClick={() => setView('chat')}>🤖 Consultar al asistente</button>
            </div>
            <div className="ticker-bar">
                <div className="ticker-inner">
                    {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
                        <span key={i} className="ticker-item">{item}<span className="ticker-dot" /></span>
                    ))}
                </div>
            </div>
            <div className="section-header"><h2 className="section-title">Acceso Rápido</h2></div>
            <div className="quick-grid">
                <div className="quick-card" onClick={() => setView('calendario')}>
                    <div className="qc-icon">📅</div>
                    <div className="qc-title">Calendario de Extras</div>
                    <div className="qc-desc">Registra y controla tus horas extra</div>
                </div>
                <div className="quick-card" onClick={() => setView('contacto')}>
                    <div className="qc-icon">📞</div>
                    <div className="qc-title">Contacto</div>
                    <div className="qc-desc">Habla con el comité de empresa</div>
                </div>
                <div className="quick-card" onClick={() => setView('chat')}>
                    <div className="qc-icon">📰</div>
                    <div className="qc-title">Agente IA virtual</div>
                    <div className="qc-desc">Resuelve dudas sobre el convenio</div>
                </div>
                <div className="quick-card" onClick={() => setView('nomina')}>
                    <div className="qc-icon" style={{ background: '#10B981', color: 'white' }}>💶</div>
                    <div className="qc-title">Revisar Nómina</div>
                    <div className="qc-desc">Sube tu nómina para revisión</div>
                </div>
            </div>
            <div className="section-header"><h2 className="section-title">Recursos</h2><a className="section-link" href="/documentos/convenios/convenio_alcobendas_2024-2027.pdf" target="_blank" rel="noreferrer">Ver todo →</a></div>
            <div className="resources-grid">
                <div className="resource-card" onClick={() => window.open('/documentos/convenios/convenio_alcobendas_2024-2027.pdf', '_blank')}>
                    <div className="rc-icon red">📄</div>
                    <div><div className="rc-title">Convenio y +</div><div className="rc-desc">Consulta los convenios vigentes</div></div>
                </div>
                <div className="resource-card" onClick={() => window.open('/documentos/convenios/protocolo_ola_calor_2025.pdf', '_blank')}>
                    <div className="rc-icon" style={{ background: '#EE8000', color: 'white' }}>☀️</div>
                    <div><div className="rc-title">Protocolo Ola de Calor</div><div className="rc-desc">Normativa y actuación 2025</div></div>
                </div>
                <div className="resource-card" onClick={() => window.open('/documentos/convenios/tablas_2026.pdf', '_blank')}>
                    <div className="rc-icon blue">📝</div>
                    <div><div className="rc-title">Tablas Salariales</div><div className="rc-desc">Tablas actualizadas 2026</div></div>
                </div>
                <div className="resource-card" onClick={() => setView('actas')}>
                    <div className="rc-icon" style={{ background: '#888', color: 'white' }}>💼</div>
                    <div><div className="rc-title">Actas del Comité</div><div className="rc-desc">Últimas actas de reuniones</div></div>
                </div>
                <div className="resource-card" onClick={() => window.open('#', '_blank')}>
                    <div className="rc-icon" style={{ background: 'var(--black)', color: 'white' }}>▶️</div>
                    <div><div className="rc-title">Vídeos y Formación</div><div className="rc-desc">Material audiovisual</div></div>
                </div>
            </div>
        </div>
    );
}

function NominaView() {
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ nombre: '', telefono: '', comentarios: '' });
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => setFile(e.target.files[0]);

    const getBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return setStatus('Por favor, adjunta un archivo PDF o imagen.');

        // Poner aquí la futura URL del Google Apps Script
        const SCRIPT_URL = 'AGREGA_AQUI_LA_URL_DE_GOOGLE_SCRIPT';

        if (SCRIPT_URL === 'AGREGA_AQUI_LA_URL_DE_GOOGLE_SCRIPT') {
            setStatus('Falta configurar el enlace de Google Drive. Avisa al desarrollador.');
            return;
        }

        setLoading(true);
        setStatus('Preparando archivo... esto puede tardar unos segundos.');

        try {
            const base64Data = await getBase64(file);

            const payload = {
                nombre: formData.nombre,
                telefono: formData.telefono,
                comentarios: formData.comentarios,
                fileName: file.name,
                mimeType: file.type,
                fileBase64: base64Data
            };

            setStatus('Enviando a revisión...');

            await fetch(SCRIPT_URL, {
                method: 'POST',
                body: JSON.stringify(payload),
                mode: 'no-cors', // Evita errores de CORS de Google
                headers: { 'Content-Type': 'text/plain' }
            });

            setStatus('¡Nómina enviada con éxito! Te contactaremos pronto.');
            setFormData({ nombre: '', telefono: '', comentarios: '' });
            setFile(null);
            document.getElementById('file-input').value = '';
        } catch (error) {
            console.error(error);
            setStatus('❌ Error al enviar. Inténtalo más tarde.');
        }
        setLoading(false);
    };

    return (
        <div className="page-wrap">
            <div className="section-header"><h2 className="section-title">💶 Te revisamos tu Nómina</h2></div>
            <div style={{ background: 'var(--white)', padding: '32px 24px', borderRadius: '4px', border: '1px solid var(--gray-light)' }}>
                <p style={{ marginBottom: '24px', fontSize: '15px' }}>
                    Sube aquí tu nómina si crees que hay algún error o quieres que la revisemos para comprobar que todos los pluses y conceptos están correctos.
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Nombre Completo</label>
                        <input className="form-input" required value={formData.nombre} onChange={e => setFormData({ ...formData, nombre: e.target.value })} placeholder="Tu nombre..." />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Teléfono de Contacto</label>
                        <input className="form-input" required type="tel" value={formData.telefono} onChange={e => setFormData({ ...formData, telefono: e.target.value })} placeholder="600 000 000" />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Archivo (PDF o Foto)</label>
                        <input id="file-input" type="file" required onChange={handleFileChange} className="form-input" accept=".pdf,image/*" style={{ padding: '8px' }} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Comentarios o Dudas</label>
                        <textarea className="form-input" value={formData.comentarios} onChange={e => setFormData({ ...formData, comentarios: e.target.value })} placeholder="Escribe aquí si tienes dudas concretas sobre un plus, un día festivo..." rows="3"></textarea>
                    </div>
                    <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', opacity: loading ? 0.7 : 1 }}>
                        {loading ? 'Subiendo archivo...' : 'Enviar Nómina'}
                    </button>
                    {status && <div style={{ marginTop: '16px', fontSize: '14px', fontWeight: 'bold', color: status.includes('Error') || status.includes('Falta') ? 'var(--red)' : '#10B981', textAlign: 'center' }}>{status}</div>}
                </form>
            </div>
        </div>
    );
}

function ActasView({ setView }) {
    const actas = {
        '2025': [
            { nombre: 'Acta comisión mixta paritaria I 29.01.2025', url: '/documentos/actas/ACTAS 2025/Acta comision mixta paritaria I 29.01.2025.pdf' },
            { nombre: 'Acta comisión mixta paritaria II 29.01.2025', url: '/documentos/actas/ACTAS 2025/Acta comision mixta paritaria II 29.01.2025.pdf' },
            { nombre: 'Acta reunión comité 19.03.25', url: '/documentos/actas/ACTAS 2025/Acta reunion comité 19.03.25.pdf' },
            { nombre: 'Acta reunión comité 23.01.25', url: '/documentos/actas/ACTAS 2025/Acta reunion comité 23.01.25.pdf' },
            { nombre: 'Acta reunión comité 05.05.2025', url: '/documentos/actas/ACTAS 2025/Acta reunion comité 05.05.2025.pdf' },
            { nombre: 'Acta reunión comité 23.06.2025', url: '/documentos/actas/ACTAS 2025/Acta reunion comité 23.06.2025.pdf' },
        ],
        '2024': [
            { nombre: 'Acta firma convenio 29.11.2024', url: '/documentos/actas/ACTAS 2024/Acta firma convenio 29.11.2024.pdf' },
            { nombre: 'Acta negociación convenio 27.11.24', url: '/documentos/actas/ACTAS 2024/Acta negociacion convenio 27.11.24.pdf' },
            { nombre: 'Acta preacuerdo 31.10.2024', url: '/documentos/actas/ACTAS 2024/Acta preacuerdo 31.10.2024.pdf' },
            { nombre: 'Respuesta a escrito comité 03.10.2024', url: '/documentos/actas/ACTAS 2024/Respuesta a escrito comité 03.10.2024.pdf' },
            { nombre: 'Ver todas de 2024...', url: '/documentos/actas/ACTAS 2024/' }
        ],
        '2023': [
            { nombre: 'Acta CONVENIO ALCOBENDAS 21.09.2023', url: '/documentos/actas/ACTAS 2023/ACTA CONVENIO ALCOBENDAS 21.09.2023.pdf' },
            { nombre: 'Acta constitución convenio Alcobendas firmada', url: '/documentos/actas/ACTAS 2023/Acta constitucion convenio Alcobendas firmada 20.06.2023.pdf' },
            { nombre: 'Acta reunión presentación Comité', url: '/documentos/actas/ACTAS 2023/Acta reunion presentacion Comité 17.04.23.pdf' },
            { nombre: 'Ver todas de 2023...', url: '/documentos/actas/ACTAS 2023/' }
        ]
    };

    const [añoSeleccionado, setAñoSeleccionado] = useState('2025');

    return (
        <div className="page-wrap">
            <div className="section-header"><h2 className="section-title">💼 Actas del Comité</h2></div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
                {Object.keys(actas).sort((a, b) => b.localeCompare(a)).map(año => (
                    <button key={año} onClick={() => setAñoSeleccionado(año)} className={año === añoSeleccionado ? 'btn-primary' : 'btn-danger'} style={{ flex: 1, padding: '10px' }}>
                        {año}
                    </button>
                ))}
            </div>
            <div style={{ display: 'grid', gap: '8px' }}>
                {actas[añoSeleccionado].map((acta, i) => (
                    <div key={i} onClick={() => window.open(acta.url, '_blank')} style={{ background: 'var(--white)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', borderRadius: '4px', borderLeft: '4px solid var(--red)' }}>
                        <span style={{ fontSize: '20px' }}>📄</span>
                        <div style={{ fontWeight: '600', fontSize: '14px' }}>{acta.nombre}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ContactoView() {
    return (
        <div className="page-wrap">
            <div className="section-header"><h2 className="section-title">📞 Contacto Comité</h2></div>
            <div style={{ background: 'var(--white)', padding: '32px 24px', borderRadius: '4px', border: '1px solid var(--gray-light)' }}>
                <p style={{ marginBottom: '24px', fontSize: '16px', lineHeight: '1.5' }}>
                    <strong>Delegado Sindical CCOO Hábitat Alcobendas</strong><br />
                    Estamos aquí para ayudarte. Contáctanos por correo o teléfono.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <a href="mailto:comiteaccionaalcobendas@gmail.com" className="btn-danger" style={{ textAlign: 'center', textDecoration: 'none', display: 'block', textTransform: 'lowercase' }}>
                        ✉️ comiteaccionaalcobendas@gmail.com
                    </a>
                    <a href="tel:+34605027203" className="btn-primary" style={{ textAlign: 'center', textDecoration: 'none', display: 'block' }}>
                        📱 Llamar: 605 02 72 03
                    </a>
                </div>
                <p style={{ marginTop: '24px', fontSize: '13px', color: 'var(--gray)', textAlign: 'center' }}>
                    Horario de atención: L-V: 9:00-14:00 y 16:00-18:00
                </p>
            </div>
        </div>
    );
}

function ChatView() {
    const [messages, setMessages] = useState([{ role: 'assistant', text: '¡Hola! Soy tu asistente laboral con acceso a convenios colectivos. ¿En qué puedo ayudarte? 😊' }]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const msgsEndRef = useRef(null);

    const scrollToBottom = () => { msgsEndRef.current?.scrollIntoView({ behavior: 'smooth' }) };
    useEffect(() => { scrollToBottom(); }, [messages, loading]);

    const send = async () => {
        if (!input.trim()) return;
        const query = input;
        setMessages(p => [...p, { role: 'user', text: query }]);
        setInput('');
        setLoading(true);

        try {
            const result = await enviarMensajeAlAgente(query);
            setMessages(p => [...p, { role: 'assistant', text: result.respuesta }]);
        } catch (error) {
            setMessages(p => [...p, { role: 'assistant', text: '❌ Hubo un error al procesar tu pregunta. (Asegúrate de ejecutar el servidor IA).' }]);
        }
        setLoading(false);
    };

    return (
        <div className="page-wrap" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 60px)' }}>
            <div className="section-header"><h2 className="section-title">🤖 Asistente Virtual</h2></div>
            <div style={{ flex: 1, overflowY: 'auto', background: 'var(--white)', padding: '20px', borderRadius: '4px', border: '1px solid var(--gray-light)', marginBottom: '20px' }}>
                {messages.map((m, i) => (
                    <div key={i} className={`chat-msg ${m.role === 'user' ? 'chat-user' : 'chat-bot'}`}>
                        {m.role === 'assistant' && <strong>🤖 Asistente:</strong>}<br />
                        {m.text}
                    </div>
                ))}
                {loading && (
                    <div className="chat-msg chat-bot" style={{ opacity: 0.6 }}>
                        ⏳ Consultando convenio...
                    </div>
                )}
                <div ref={msgsEndRef} />
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
                <input className="form-input" placeholder="Escribe tu consulta laboral aquí..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} />
                <button className="btn-primary" style={{ flex: 'none', width: '120px' }} onClick={send}>Enviar</button>
            </div>
        </div>
    );
}

function CalendarioView() {
    const today = new Date();
    const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
    const [entries, setEntries] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [formData, setFormData] = useState({ amount: '', type: 'horas-extra', notes: '' });

    useEffect(() => { try { setEntries(JSON.parse(localStorage.getItem('ccoo_extras')) || {}); } catch { } }, []);

    const save = (data) => { setEntries(data); localStorage.setItem('ccoo_extras', JSON.stringify(data)); };
    const year = currentDate.getFullYear(), month = currentDate.getMonth();
    const jsFirst = new Date(year, month, 1).getDay();
    const adjustedFirst = jsFirst === 0 ? 6 : jsFirst - 1;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const getKey = (d) => `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const todayKey = today.toISOString().split('T')[0];
    let monthTotal = 0, daysWorked = 0;
    for (let d = 1; d <= daysInMonth; d++) { const e = entries[getKey(d)]; if (e) { monthTotal += parseFloat(e.amount); daysWorked++; } }
    const avg = daysWorked > 0 ? (monthTotal / daysWorked).toFixed(2) : '0.00';

    const openDay = (day) => {
        const key = getKey(day); setSelectedDate(key);
        setFormData(entries[key] || { amount: '', type: 'horas-extra', notes: '' });
        setModalOpen(true);
    };
    const handleSave = () => {
        if (!formData.amount || isNaN(formData.amount)) return;
        save({ ...entries, [selectedDate]: { ...formData, amount: parseFloat(formData.amount).toFixed(2) } });
        setModalOpen(false);
    };
    const handleDelete = () => { const n = { ...entries }; delete n[selectedDate]; save(n); setModalOpen(false); };

    return (
        <div className="page-wrap">
            <div className="cal-stats">
                <div className="stat-box"><div className="stat-label">Total mes</div><div className="stat-value red">{monthTotal.toFixed(2)}<span className="stat-unit">€</span></div></div>
                <div className="stat-box"><div className="stat-label">Días extra</div><div className="stat-value">{daysWorked}</div></div>
                <div className="stat-box"><div className="stat-label">Media/día</div><div className="stat-value">{avg}<span className="stat-unit">€</span></div></div>
            </div>
            <div className="cal-card">
                <div className="cal-nav">
                    <button className="cal-arrow" onClick={() => setCurrentDate(new Date(year, month - 1, 1))}>‹</button>
                    <h2 className="cal-month-title">{MONTHS[month]} {year}</h2>
                    <button className="cal-arrow" onClick={() => setCurrentDate(new Date(year, month + 1, 1))}>›</button>
                </div>
                <div className="cal-headers">{DAYS_SHORT.map(d => <div key={d} className="cal-day-header">{d}</div>)}</div>
                <div className="cal-grid">
                    {Array.from({ length: adjustedFirst }).map((_, i) => <div key={`e${i}`} className="cal-day empty" />)}
                    {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                        const key = getKey(day), entry = entries[key], isToday = key === todayKey;
                        return (
                            <div key={day} className={`cal-day${entry ? ' has-entry' : ''}${isToday ? ' today' : ''}`} onClick={() => openDay(day)}>
                                <span className="cal-day-num">{day}</span>
                                {entry && <span className="cal-day-amt">{entry.amount}€</span>}
                            </div>
                        );
                    })}
                </div>
            </div>
            {modalOpen && (
                <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && setModalOpen(false)}>
                    <div className="modal-sheet">
                        <div className="modal-header">
                            <h2 className="modal-title">{entries[selectedDate] ? 'Editar Extra' : 'Nuevo Extra'}</h2>
                            <button className="modal-close" onClick={() => setModalOpen(false)}>✕</button>
                        </div>
                        <div className="form-group"><label className="form-label">Fecha</label><input className="form-input" value={selectedDate} disabled /></div>
                        <div className="form-group"><label className="form-label">Cantidad (€)</label><input className="form-input" type="number" placeholder="0.00" value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })} /></div>
                        <div className="form-group"><label className="form-label">Tipo de extra</label>
                            <select className="form-select" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                                {Object.entries(ENTRY_TYPES).map(([val, label]) => <option key={val} value={val}>{label}</option>)}
                            </select>
                        </div>
                        <div className="modal-actions">
                            {entries[selectedDate] && <button className="btn-danger" onClick={handleDelete}>Eliminar</button>}
                            <button className="btn-primary" onClick={handleSave}>Guardar registro</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function AppCCOO() {
    const [view, setView] = useState('home');
    return (
        <>
            <style>{fontStyle}</style>
            <div className="app-root">
                <header className="app-header">
                    {view !== 'home' && <button className="back-btn" onClick={() => setView('home')}>‹</button>}
                    <div className="header-logo"><span className="header-logo-badge">CC</span>OO</div>
                    <div className="header-subtitle">{view === 'home' ? 'Hábitat · Alcobendas' : view === 'chat' ? 'Asistente Laboral' : view === 'contacto' ? 'Contacto' : view === 'actas' ? 'Actas' : view === 'nomina' ? 'Revisión Nóminas' : 'Calendario de Extras'}</div>
                    <nav className="header-nav">
                        <button className={`nav-btn${view === 'home' ? ' active' : ''}`} onClick={() => setView('home')}>Inicio</button>
                        <button className={`nav-btn${view === 'calendario' ? ' active' : ''}`} onClick={() => setView('calendario')}>Extras</button>
                    </nav>
                </header>
                {view === 'home' && <HomeView setView={setView} />}
                {view === 'calendario' && <CalendarioView />}
                {view === 'chat' && <ChatView />}
                {view === 'contacto' && <ContactoView />}
                {view === 'actas' && <ActasView setView={setView} />}
                {view === 'nomina' && <NominaView />}
            </div>
        </>
    );
}
