# GUÍA DE DESPLIEGUE EN VERCEL
# ===========================

¡Tu aplicación está lista para despegar! 🚀

Sigue estos pasos EXACTOS para subirla a la nube:

1. **Abre GitHub Desktop**
2. **Arrastra** la carpeta `CCOO-FINAL` dentro de la ventana de GitHub Desktop.
3. Te preguntará si quieres crear un repositorio. Di que **SÍ** ("Create a repository").
4. Dale al botón azul **Publish repository**.

---

## CONECTAR CON VERCEL

1. Ve a https://vercel.com/new
2. Importa el repositorio `CCOO-FINAL` que acabas de subir.
3. En la configuración del proyecto, busca la sección **Environment Variables**.
4. Añade esta variable (copia la clave de tu archivo `.env` original):
   - **Nombre:** `OPENAI_API_KEY`
   - **Valor:** `sk-proj-tu-clave-secreta...`

5. Dale a **Deploy**.

¡Y LISTO! 🎉 En 1 minuto tendrás tu IA funcionando en internet pa' todo el mundo.
