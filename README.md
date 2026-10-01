# ToolDrive - Suite de Productividad y Herramientas Web

Una aplicación web de herramientas y productividad con la interfaz, estilo visual y usabilidad exacta de **Google Drive** (Material Design 3).

---

## 🚀 Cómo abrir y usar

No requiere instalación de dependencias ni conexión a servidores externos.

### Opción 1: Abrir directamente
Haz doble clic en el archivo **`index.html`** para abrirlo en cualquier navegador web moderno (Google Chrome, Microsoft Edge, Mozilla Firefox o Safari).

### Opción 2: Servidor local (opcional)
Si prefieres servirlo mediante un servidor local:
```bash
# Con Python
python -m http.server 8000

# O con Node.js
npx serve .
```
Luego visita `http://localhost:8000` en tu navegador.

---

## 🛠️ Herramientas incluidas (30 herramientas completas)

### 1. Gestión de PDF y Documentos
- **Doc to PDF / PDF to Doc**: Convierte documentos de Word (.docx) a PDF o viceversa conservando formato y tablas.
- **Merge PDF (Unir PDF)**: Combina varios archivos PDF individuales en un solo documento organizado.
- **Split PDF (Dividir PDF)**: Extrae páginas específicas o rangos de un archivo PDF.
- **Compress PDF (Comprimir PDF)**: Reduce el peso de un archivo PDF hasta un 60-80% para enviar por correo.
- **PDF to JPEG**: Extrae cada página del PDF en imágenes JPG de alta resolución.
- **Sign PDF (Firmar PDF)**: Pad de firma digital interactivo con dibujo manuscrito y descarga en PNG transparente o estampado en PDF.
- **Unlock PDF (Desbloquear PDF)**: Elimina restricciones de copia, impresión y contraseñas de archivos PDF.

### 2. Edición y Conversión de Imágenes
- **PNG to JPG / JPG to PNG**: Conversor universal de formatos gráficos.
- **Remove Background (Eliminar fondo)**: Aislamiento automático de siluetas y fondos transparentes.
- **Image Compressor (Comprimir imágenes)**: Reduce el peso de imágenes JPEG/PNG/WebP con control de calidad en tiempo real.
- **Image Resizer (Redimensionar)**: Ajusta ancho y alto a dimensiones exactas o proporciones personalizadas.
- **Crop Image (Recortar imagen)**: Encuadre en proporciones 1:1 (Instagram), 16:9 (Banners) o libre.
- **HEIC to JPG**: Convierte fotos de iPhone (.heic) a formato JPEG compatible universalmente.
- **SVG to PNG**: Renderiza gráficos vectoriales SVG en imágenes ráster PNG nítidas.
- **WebP to JPG**: Convierte el formato web moderno de Google a JPEG estándar.
- **Upscale Image (Agrandar imagen)**: Aumenta la resolución 2x o 4x con algoritmos de superresolución y mejora de nitidez.

### 3. Audio y Video
- **Video to MP3**: Extrae pistas de audio en calidad MP3 (128, 192 o 320 kbps).
- **MP4 to GIF**: Convierte fragmentos de video en clips animados GIF en bucle.
- **Video Compressor (Comprimir video)**: Reduce el peso de videos para WhatsApp (límite 16MB) o correo.
- **Audio Converter (Convertidor de audio)**: Transcodificación entre MP3, WAV, FLAC, M4A y OGG.
- **Video Cutter (Recortar video)**: Corta segmentos de video con selector visual de inicio y fin.

### 4. Texto y Productividad
- **OCR (Texto desde imagen)**: Reconoce ópticamente y extrae texto de capturas, fotos y escaneos.
- **Word Counter (Contador de palabras)**: Conteo en vivo de palabras, caracteres, frases, párrafos y tiempo estimado de lectura.
- **Speech to Text (Dictado por voz)**: Transcribe tu voz en tiempo real con Web Speech API en español e inglés.
- **Case Converter (Cambiar mayúsculas)**: Convierte a MAYÚSCULAS, minúsculas, Formato De Título, camelCase, snake_case y kebab-case.
- **Lorem Ipsum Generator**: Generador de texto ficticio configurable en párrafos, frases o palabras.

### 5. Utilidades Web y Desarrollador
- **QR Code Generator (Generador de QR)**: Genera códigos QR instantáneos en PNG con colores personalizados (100% offline).
- **URL Shortener (Acortador de enlaces)**: Genera enlaces cortos tipo Bitly con QR descargable.
- **Color Picker (Selector de color)**: Cuentagotas de pantalla, selector de color y códigos HEX, RGB y HSL con un clic.
- **JSON Formatter (Formateador JSON)**: Validador de sintaxis, formateo con sangría (2/4 espacios) y minificación de JSON.

---

## ✨ Características de diseño estilo Google Drive & iOS
- **Barra de búsqueda superior**: Búsqueda ancha en tiempo real con atajo de teclado (`/`).
- **Interruptor Modo Oscuro tipo iPhone**: Switch deslizante suave con iconos vectoriales de sol y luna diseñados a medida.
- **Scrollbar flotante estilo iPhone / iOS**: Barra de desplazamiento vertical ultra delgada, cápsula flotante translúcida y pista transparente.
- **Vista de Lista y Cuadrícula**: Alternador moderno (tabla limpia con columnas de Nombre, Motivo y Ubicación, o cuadrícula de tarjetas).
- **Favoritos (Destacados)**: Guarda tus herramientas favoritas con persistencia local en `localStorage`.
- **Privacidad Total**: Todo el procesamiento se realiza localmente en el navegador, tus archivos nunca se suben a ningún servidor externo.
