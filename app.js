/**
 * ToolDrive - Main Application Logic
 * Implements Google Drive UI and interactive in-browser productivity tools.
 */

// ==================== ICONS DEFINITIONS (Google Drive / Material) ====================
const ICONS = {
  drive: `<svg viewBox="0 0 87.3 78" width="28" height="28"><path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da"/><path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44c-.8 1.4-1.2 2.95-1.2 4.5h27.5z" fill="#00ac47"/><path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z" fill="#ea4335"/><path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d"/><path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc"/><path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00"/></svg>`,
  pdf: `<svg viewBox="0 0 24 24" width="22" height="22" fill="#ea4335"><path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z"/></svg>`,
  doc: `<svg viewBox="0 0 24 24" width="22" height="22" fill="#4285f4"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>`,
  image: `<svg viewBox="0 0 24 24" width="22" height="22" fill="#34a853"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>`,
  video: `<svg viewBox="0 0 24 24" width="22" height="22" fill="#9c27b0"><path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/></svg>`,
  audio: `<svg viewBox="0 0 24 24" width="22" height="22" fill="#e91e63"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>`,
  text: `<svg viewBox="0 0 24 24" width="22" height="22" fill="#f57c00"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM4 20V4h9v5h5v11H4zm10-7H7v-2h7v2zm3 4H7v-2h10v2z"/></svg>`,
  code: `<svg viewBox="0 0 24 24" width="22" height="22" fill="#1a73e8"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>`,
  folder: `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>`,
  star: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  starFilled: `<svg viewBox="0 0 24 24" width="18" height="18" fill="#f29900"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  more: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>`,
  plusGoogle: `<svg viewBox="0 0 36 36" width="24" height="24"><path fill="#4285F4" d="M16 16v14h4V16h14v-4H20V2h-4v10H2v4h14z"/></svg>`,
  search: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>`,
  tune: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"/></svg>`,
  check: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`,
  cloudCheck: `<svg viewBox="0 0 24 24" width="20" height="20" fill="#34a853"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM10 17l-3.5-3.5 1.41-1.41L10 14.17 15.09 9.08 16.5 10.5 10 17z"/></svg>`,
  grid: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M4 11h5V5H4v6zm0 7h5v-6H4v6zm6 0h5v-6h-5v6zm6 0h5v-6h-5v6zm-6-7h5V5h-5v6zm6-6v6h5V5h-5z"/></svg>`,
  list: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>`,
  settings: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>`,
  help: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16h-2v-2h2v2zm1.07-7.75l-.9.92C12.45 11.9 12 12.5 12 14h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z"/></svg>`,
  apps: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"/></svg>`
};

// ==================== ALL 30 TOOLS DEFINITION ====================
const TOOLS = [
  // --- Categoría 1: Gestión de PDF y Documentos ---
  {
    id: "doc-to-pdf",
    category: "pdf",
    categoryName: "Gestión de PDF",
    title: "Doc to PDF / PDF to Doc",
    desc: "Convierte documentos DOCX a PDF (con maquetación A4 o impresión) y extrae texto de PDF a DOCX sin enviar archivos a servidores.",
    reason: "Conversión bidireccional de oficina en tu navegador",
    location: "PDFs y Documentos",
    formats: ".docx ↔ .pdf",
    iconType: "doc"
  },
  {
    id: "merge-pdf",
    category: "pdf",
    categoryName: "Gestión de PDF",
    title: "Merge PDF (Unir PDF)",
    desc: "Combina varios archivos PDF individuales en un solo documento organizado en segundos.",
    reason: "Herramienta más utilizada para consolidación",
    location: "PDFs y Documentos",
    formats: ".pdf",
    iconType: "pdf"
  },
  {
    id: "split-pdf",
    category: "pdf",
    categoryName: "Gestión de PDF",
    title: "Split PDF (Dividir PDF)",
    desc: "Extrae páginas específicas, separa rangos o elimina hojas innecesarias de archivos pesados.",
    reason: "Ideal para extraer anexos o certificados",
    location: "PDFs y Documentos",
    formats: ".pdf",
    iconType: "pdf"
  },
  {
    id: "compress-pdf",
    category: "pdf",
    categoryName: "Gestión de PDF",
    title: "Compress PDF (Comprimir PDF)",
    desc: "Reduce el peso del PDF rasterizando páginas a JPEG optimizado con resolución y calidad ajustables.",
    reason: "Compresión visual en el navegador con vista previa de tamaño",
    location: "PDFs y Documentos",
    formats: ".pdf",
    iconType: "pdf"
  },
  {
    id: "pdf-to-jpeg",
    category: "pdf",
    categoryName: "Gestión de PDF",
    title: "PDF to JPEG",
    desc: "Renderiza y extrae las páginas de un PDF a imágenes JPEG en alta resolución (1x, 2x, 3x) individuales o en ZIP.",
    reason: "Extracción gráfica para presentaciones",
    location: "PDFs y Documentos",
    formats: ".pdf → .jpg",
    iconType: "pdf"
  },
  {
    id: "sign-pdf",
    category: "pdf",
    categoryName: "Gestión de PDF",
    title: "Sign PDF (Firmar PDF)",
    desc: "Añade una firma digital o manuscrita con pad interactivo a tus contratos y documentos oficiales.",
    reason: "Trámites rápidos con firma manuscrita",
    location: "PDFs y Documentos",
    formats: ".pdf",
    iconType: "pdf"
  },
  {
    id: "unlock-pdf",
    category: "pdf",
    categoryName: "Gestión de PDF",
    title: "Unlock PDF (Desbloquear PDF)",
    desc: "Remueve restricciones de copia, edición e impresión mediante qpdf WASM, o desbloquea con tu contraseña conocida sin servidores.",
    reason: "Desbloqueo seguro y remoción de permisos locales",
    location: "PDFs y Documentos",
    formats: ".pdf",
    iconType: "pdf"
  },

  // --- Categoría 2: Edición y Conversión de Imágenes ---
  {
    id: "png-to-jpg",
    category: "image",
    categoryName: "Imágenes",
    title: "PNG to JPG / JPG to PNG",
    desc: "Cambia el formato de una imagen al instante según necesites transparencia o compresión.",
    reason: "Conversor universal de formatos gráficos",
    location: "Imágenes",
    formats: ".png ↔ .jpg",
    iconType: "image"
  },
  {
    id: "remove-bg",
    category: "image",
    categoryName: "Imágenes",
    title: "Remove Background (Eliminar fondo)",
    desc: "Quita el fondo de una foto automáticamente usando detección inteligente en tu navegador.",
    reason: "Aislamiento de producto y retratos",
    location: "Imágenes",
    formats: ".png, .jpg",
    iconType: "image",
    disabled: true
  },
  {
    id: "image-compress",
    category: "image",
    categoryName: "Imágenes",
    title: "Image Compressor (Comprimir imágenes)",
    desc: "Reduce el peso de fotos (JPEG/PNG/WebP) con control de calidad visual en tiempo real.",
    reason: "Acelera la carga web y ahorra espacio",
    location: "Imágenes",
    formats: ".jpg, .png, .webp",
    iconType: "image"
  },
  {
    id: "image-resize",
    category: "image",
    categoryName: "Imágenes",
    title: "Image Resizer (Redimensionar)",
    desc: "Cambia el ancho y alto a píxeles específicos con proporción fija o dimensiones predefinidas.",
    reason: "Ajuste para redes sociales y perfiles",
    location: "Imágenes",
    formats: ".jpg, .png, .webp",
    iconType: "image"
  },
  {
    id: "crop-image",
    category: "image",
    categoryName: "Imágenes",
    title: "Crop Image (Recortar imagen)",
    desc: "Corta los bordes de una foto para encuadrarla mejor con proporciones 1:1, 16:9 o libre.",
    reason: "Encuadre exacto para portadas y banners",
    location: "Imágenes",
    formats: ".jpg, .png",
    iconType: "image"
  },
  {
    id: "heic-to-jpg",
    category: "image",
    categoryName: "Imágenes",
    title: "HEIC to JPG",
    desc: "Convierte fotos tomadas con iPhone (formato HEIC) a JPEG con calidad ajustable, individual o en lote ZIP.",
    reason: "Compatibilidad multiplataforma de Apple a PC",
    location: "Imágenes",
    formats: ".heic → .jpg",
    iconType: "image"
  },
  {
    id: "svg-to-png",
    category: "image",
    categoryName: "Imágenes",
    title: "SVG to PNG",
    desc: "Transforma gráficos vectoriales en imágenes ráster PNG nítidas con resolución seleccionable.",
    reason: "Renderizado de logos e iconos vectoriales",
    location: "Imágenes",
    formats: ".svg → .png",
    iconType: "image"
  },
  {
    id: "webp-to-jpg",
    category: "image",
    categoryName: "Imágenes",
    title: "WebP to JPG",
    desc: "Convierte el formato web moderno de Google a un JPEG estándar listo para imprimir o enviar.",
    reason: "Conversión de descargas web a JPG común",
    location: "Imágenes",
    formats: ".webp → .jpg",
    iconType: "image"
  },
  {
    id: "upscale-image",
    category: "image",
    categoryName: "Imágenes",
    title: "Upscale Image (Ampliar - Lanczos3)",
    desc: "Aumenta el tamaño en píxeles (2x o 4x) mediante remuestreo Lanczos3 y filtro de nitidez (interpolación, no IA).",
    reason: "Ampliación de alta fidelidad sin pixelado simple",
    location: "Imágenes",
    formats: ".jpg, .png, .webp",
    iconType: "image"
  },

  // --- Categoría 3: Audio y Video ---
  {
    id: "video-to-mp3",
    category: "media",
    categoryName: "Audio y Video",
    title: "Video to MP3 (Convertidor a audio)",
    desc: "Extrae la pista de sonido de un archivo de video en calidad MP3 a 128, 192 o 320 kbps.",
    reason: "Extracción de música, conferencias y podcasts",
    location: "Audio y Video",
    formats: ".mp4 → .mp3",
    iconType: "video",
    disabled: true
  },
  {
    id: "mp4-to-gif",
    category: "media",
    categoryName: "Audio y Video",
    title: "MP4 to GIF",
    desc: "Convierte fragmentos de video en animaciones GIF livianas y en bucle para compartir en chats.",
    reason: "Creación de memes y clips animados",
    location: "Audio y Video",
    formats: ".mp4 → .gif",
    iconType: "video",
    disabled: true
  },
  {
    id: "video-compress",
    category: "media",
    categoryName: "Audio y Video",
    title: "Video Compressor (Comprimir video)",
    desc: "Reduce el peso de un archivo de video para que quepa en WhatsApp (límite 16MB/64MB) o correo.",
    reason: "Envío sin límites en mensajería móvil",
    location: "Audio y Video",
    formats: ".mp4, .mov",
    iconType: "video",
    disabled: true
  },
  {
    id: "audio-converter",
    category: "media",
    categoryName: "Audio y Video",
    title: "Audio Converter (Convertidor de audio)",
    desc: "Cambia formatos de sonido entre MP3, WAV, M4A, FLAC y OGG sin pérdida de frecuencias audibles.",
    reason: "Transcodificación universal de audio",
    location: "Audio y Video",
    formats: ".mp3, .wav, .flac...",
    iconType: "audio",
    disabled: true
  },
  {
    id: "video-cutter",
    category: "media",
    categoryName: "Audio y Video",
    title: "Video Cutter (Recortar video)",
    desc: "Corta el inicio o final de un video con vista previa y selección exacta de segundos.",
    reason: "Edición rápida de clips sin instalar software",
    location: "Audio y Video",
    formats: ".mp4, .mov, .webm",
    iconType: "video",
    disabled: true
  },

  // --- Categoría 4: Texto y Productividad ---
  {
    id: "ocr",
    category: "text",
    categoryName: "Texto y Productividad",
    title: "OCR (Texto desde imagen)",
    desc: "Escanea capturas, fotos o documentos y extrae el texto escrito para copiarlo y editarlo.",
    reason: "Digitalización de apuntes, libros y tickets",
    location: "Productividad",
    formats: ".jpg, .png, .pdf",
    iconType: "text"
  },
  {
    id: "word-counter",
    category: "text",
    categoryName: "Texto y Productividad",
    title: "Word Counter (Contador de palabras)",
    desc: "Calcula palabras, caracteres, frases, párrafos, tiempo estimado de lectura y densidad de palabras clave.",
    reason: "Redacción de ensayos, tareas y artículos",
    location: "Productividad",
    formats: "Texto en vivo",
    iconType: "text"
  },
  {
    id: "speech-to-text",
    category: "text",
    categoryName: "Texto y Productividad",
    title: "Speech to Text (Dictado por voz)",
    desc: "Transcribe tu voz en tiempo real directamente a un documento de texto editable con soporte de idiomas.",
    reason: "Dictado veloz sin usar el teclado",
    location: "Productividad",
    formats: "Micrófono",
    iconType: "text"
  },
  {
    id: "case-converter",
    category: "text",
    categoryName: "Texto y Productividad",
    title: "Case Converter (Cambiar mayúsculas)",
    desc: "Transforma textos a MAYÚSCULAS, minúsculas, Formato De Título, camelCase, snake_case o kebab-case.",
    reason: "Formateo rápido de títulos y código",
    location: "Productividad",
    formats: "Texto en vivo",
    iconType: "text"
  },
  {
    id: "lorem-ipsum",
    category: "text",
    categoryName: "Texto y Productividad",
    title: "Lorem Ipsum Generator",
    desc: "Genera texto ficticio de relleno para prototipos, maquetaciones de diseño y desarrollo web.",
    reason: "Maquetación de diseño y desarrollo",
    location: "Productividad",
    formats: "Generador",
    iconType: "text"
  },

  // --- Categoría 5: Utilidades Web y Desarrollador ---
  {
    id: "qr-generator",
    category: "dev",
    categoryName: "Utilidades Web & Dev",
    title: "QR Code Generator (Generador de QR)",
    desc: "Crea códigos QR personalizados para enlaces, redes sociales, redes Wi-Fi o textos con descarga PNG.",
    reason: "Generación instantánea para cartas y webs",
    location: "Web y Dev",
    formats: ".png, .svg",
    iconType: "code"
  },
  {
    id: "url-shortener",
    category: "dev",
    categoryName: "Utilidades Web & Dev",
    title: "URL Shortener (Acortador de enlaces)",
    desc: "Transforma enlaces largos en links cortos estilo Bitly con generación de código QR complementario.",
    reason: "Enlaces limpios para redes y WhatsApp",
    location: "Web y Dev",
    formats: "Web URL",
    iconType: "code"
  },
  {
    id: "color-picker",
    category: "dev",
    categoryName: "Utilidades Web & Dev",
    title: "Color Picker (Selector de color)",
    desc: "Identifica códigos HEX, RGB y HSL con herramienta cuentagotas y verificador de contraste WCAG.",
    reason: "Selección de paletas y diseño UI",
    location: "Web y Dev",
    formats: "HEX, RGB, HSL",
    iconType: "code"
  },
  {
    id: "json-formatter",
    category: "dev",
    categoryName: "Utilidades Web & Dev",
    title: "JSON Formatter (Formateador JSON)",
    desc: "Valida, ordena, limpia y minifica código JSON con detección visual de errores de sintaxis.",
    reason: "Depuración de APIs y estructuras de datos",
    location: "Web y Dev",
    formats: ".json",
    iconType: "code"
  }
];

// ==================== SECURITY & STORAGE UTILITIES ====================
function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function safeGetStorageJson(key, defaultValue) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null || raw === undefined) return defaultValue;
    try {
      const parsed = JSON.parse(raw);
      return parsed !== null && parsed !== undefined ? parsed : defaultValue;
    } catch {
      return raw;
    }
  } catch (err) {
    console.warn(`[ToolDrive] Error al leer "${key}" desde localStorage:`, err);
    return defaultValue;
  }
}

function safeSetStorage(key, value) {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
    return true;
  } catch (err) {
    console.error(`[ToolDrive] Error al guardar en localStorage ("${key}"):`, err);
    if (err && (err.name === "QuotaExceededError" || err.code === 22 || err.code === 1014)) {
      showToast("Almacenamiento lleno: no se pudieron guardar los cambios locales.");
    } else {
      showToast("Error al guardar los datos en el navegador.");
    }
    return false;
  }
}

// ==================== LAZY SCRIPT LOADERS (LOCAL /libs) ====================
function loadScriptAsync(src) {
  return new Promise((resolve, reject) => {
    const fullUrl = new URL(src, window.location.href).href;
    const existing = Array.from(document.querySelectorAll("script")).find(s => s.src === fullUrl);
    if (existing) {
      if (existing.getAttribute("data-loaded") === "true") {
        return resolve();
      }
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error(`Error al cargar ${src}`)), { once: true });
      return;
    }
    const script = document.createElement("script");
    script.src = fullUrl;
    script.onload = () => {
      script.setAttribute("data-loaded", "true");
      resolve();
    };
    script.onerror = () => reject(new Error(`No se pudo cargar la librería local: ${src}`));
    document.head.appendChild(script);
  });
}

async function ensurePdfJsReady() {
  if (typeof window.pdfjsLib === "undefined") {
    await loadScriptAsync("libs/pdfjs/pdf.min.js");
  }
  if (window.pdfjsLib && !window.pdfjsLib.GlobalWorkerOptions.workerSrc) {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = new URL("libs/pdfjs/pdf.worker.min.js", window.location.href).href;
  }
}

async function ensureJsZipReady() {
  if (typeof window.JSZip === "undefined") {
    await loadScriptAsync("libs/jszip/jszip.min.js");
  }
}

async function ensureHeic2AnyReady() {
  if (typeof window.heic2any === "undefined") {
    await loadScriptAsync("libs/heic2any/heic2any.min.js");
  }
}

async function ensurePicaReady() {
  if (typeof window.pica === "undefined") {
    await loadScriptAsync("libs/pica/pica.min.js");
  }
}

async function ensureQpdfReady() {
  if (typeof window.createQpdfInstance === "undefined") {
    await loadScriptAsync("libs/qpdf/qpdf.js");
    const qpdfFactory = window.Module;
    window.createQpdfInstance = async (options = {}) => {
      return await qpdfFactory({
        locateFile: (f) => new URL("libs/qpdf/" + f, window.location.href).href,
        ...options
      });
    };
  }
}

async function ensureMammothReady() {
  if (typeof window.mammoth === "undefined") {
    await loadScriptAsync("libs/mammoth/mammoth.browser.min.js");
  }
}

async function ensureHtml2PdfReady() {
  if (typeof window.html2pdf === "undefined") {
    await loadScriptAsync("libs/html2pdf/html2pdf.bundle.min.js");
  }
}

async function ensureDocxReady() {
  if (typeof window.docx === "undefined") {
    await loadScriptAsync("libs/docx/docx.iife.js");
  }
}

function parsePdfRanges(rangeStr, maxPages) {
  const set = new Set();
  const trimmed = (rangeStr || "").trim().toLowerCase();
  if (trimmed === "todas" || trimmed === "all" || trimmed === "") {
    return Array.from({ length: maxPages }, (_, i) => i);
  }
  const parts = rangeStr.split(",");
  for (let p of parts) {
    p = p.trim();
    if (!p) continue;
    if (p.includes("-")) {
      const [startStr, endStr] = p.split("-");
      const start = parseInt(startStr, 10);
      const end = parseInt(endStr, 10);
      if (!isNaN(start) && !isNaN(end)) {
        const from = Math.max(1, Math.min(start, end));
        const to = Math.min(maxPages, Math.max(start, end));
        for (let i = from; i <= to; i++) {
          set.add(i - 1);
        }
      }
    } else {
      const num = parseInt(p, 10);
      if (!isNaN(num) && num >= 1 && num <= maxPages) {
        set.add(num - 1);
      }
    }
  }
  return Array.from(set).sort((a, b) => a - b);
}

function formatFileSize(bytes) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

window.parsePdfRanges = parsePdfRanges;
window.formatFileSize = formatFileSize;

const FOLDER_COLORS = ["#ea4335", "#1a73e8", "#34a853", "#f9ab00", "#9c27b0", "#009688", "#e91e63", "#ff6d00"];

function isValidFolderColor(color) {
  if (typeof color !== "string") return false;
  const trimmed = color.trim().toLowerCase();
  const allowed = FOLDER_COLORS.map(c => c.toLowerCase());
  if (allowed.includes(trimmed)) return true;
  return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(trimmed);
}

function sanitizeCustomFolders(raw) {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter(cf => cf && typeof cf === "object" && typeof cf.id === "string" && cf.id.startsWith("custom_"))
    .map(cf => ({
      id: cf.id,
      name: typeof cf.name === "string" ? cf.name.trim().slice(0, 40) : "Carpeta",
      color: isValidFolderColor(cf.color) ? cf.color : "#ea4335",
      tools: Array.isArray(cf.tools) ? cf.tools.filter(t => typeof t === "string") : []
    }));
}

function sanitizeDefaultFolderOverrides(raw) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
  const clean = {};
  for (const [k, v] of Object.entries(raw)) {
    if (["pdf", "image", "media", "text", "dev"].includes(k) && v && typeof v === "object") {
      clean[k] = {
        name: typeof v.name === "string" ? v.name.trim().slice(0, 40) : undefined,
        color: isValidFolderColor(v.color) ? v.color : undefined
      };
    }
  }
  return clean;
}

// ==================== APP STATE ====================
let currentCategory = "all";
let currentSearch = "";
let currentView = "list"; // "list" | "grid"
let favorites = Array.isArray(safeGetStorageJson("tooldrive_favorites", []))
  ? safeGetStorageJson("tooldrive_favorites", []).filter(t => typeof t === "string")
  : [];
let recentTools = Array.isArray(safeGetStorageJson("tooldrive_recents", []))
  ? safeGetStorageJson("tooldrive_recents", []).filter(t => typeof t === "string")
  : [];
let quickNotes = safeGetStorageJson("tooldrive_notes", "");

// Custom Folders State
let rawCustomFolders = safeGetStorageJson("tooldrive_custom_folders", null);
let customFolders = null;
if (Array.isArray(rawCustomFolders)) {
  customFolders = sanitizeCustomFolders(rawCustomFolders);
}
if (!customFolders || customFolders.length === 0) {
  customFolders = [
    {
      id: "custom_ejemplo1",
      name: "Ejemplo 1",
      color: "#ea4335",
      tools: ["doc-to-pdf", "image-compress", "qr-generator"]
    }
  ];
  safeSetStorage("tooldrive_custom_folders", customFolders);
}

// Default Folders Overrides & Hidden Folders State
let defaultFolderOverrides = sanitizeDefaultFolderOverrides(safeGetStorageJson("tooldrive_default_folder_overrides", {}));
let hiddenFolders = Array.isArray(safeGetStorageJson("tooldrive_hidden_folders", []))
  ? safeGetStorageJson("tooldrive_hidden_folders", []).filter(f => typeof f === "string")
  : [];

let currentContextMenuFolderId = null;
let quickSelectedColor = "#ea4335";

function getFolderInfo(folderId) {
  if (!folderId) return null;
  if (folderId.startsWith("custom_")) {
    const cf = customFolders.find(f => f.id === folderId);
    if (cf) {
      return {
        id: cf.id,
        name: cf.name,
        color: cf.color,
        isCustom: true,
        tools: cf.tools || []
      };
    }
  }

  const defaultMeta = {
    pdf: { name: "Gestión de PDF", color: "#ea4335" },
    image: { name: "Edición de Imágenes", color: "#34a853" },
    media: { name: "Audio y Video", color: "#9c27b0" },
    text: { name: "Texto y Productividad", color: "#f57c00" },
    dev: { name: "Web y Desarrollador", color: "#1a73e8" }
  };

  if (defaultMeta[folderId]) {
    const override = defaultFolderOverrides[folderId] || {};
    return {
      id: folderId,
      name: override.name || defaultMeta[folderId].name,
      color: override.color || defaultMeta[folderId].color,
      isCustom: false,
      tools: TOOLS.filter(t => t.category === folderId).map(t => t.id)
    };
  }

  return null;
}


function validateFolderName(rawName, targetFolderId = null) {
  const name = (rawName || "").trim();
  if (!name) {
    return { valid: false, message: "El nombre de la carpeta no puede estar vacío ni contener solo espacios." };
  }
  if (name.length > 40) {
    return { valid: false, message: "El nombre no puede exceder los 40 caracteres." };
  }

  const lowerName = name.toLowerCase();

  const baseDefaultFolders = [
    { id: "pdf", defaultName: "Gestión de PDF" },
    { id: "image", defaultName: "Edición de Imágenes" },
    { id: "media", defaultName: "Audio y Video" },
    { id: "text", defaultName: "Texto y Productividad" },
    { id: "dev", defaultName: "Web y Desarrollador" }
  ];

  for (const def of baseDefaultFolders) {
    if (def.id === targetFolderId) continue;
    if (hiddenFolders.includes(def.id)) continue;
    const defName = (defaultFolderOverrides[def.id]?.name || def.defaultName).trim().toLowerCase();
    if (defName === lowerName) {
      return { valid: false, message: `Ya existe una carpeta con el nombre "${name}". Elige otro nombre.` };
    }
  }

  for (const cf of customFolders) {
    if (cf.id === targetFolderId) continue;
    if ((cf.name || "").trim().toLowerCase() === lowerName) {
      return { valid: false, message: `Ya existe una carpeta con el nombre "${name}". Elige otro nombre.` };
    }
  }

  return { valid: true, name };
}

function saveCustomFolders() {
  safeSetStorage("tooldrive_custom_folders", customFolders);
  renderSidebarNav();
  renderFolders();
  renderTools();
}

function saveDefaultFolderOverrides() {
  safeSetStorage("tooldrive_default_folder_overrides", defaultFolderOverrides);
  safeSetStorage("tooldrive_hidden_folders", hiddenFolders);
  renderSidebarNav();
  renderFolders();
  renderTools();
}

// ==================== INITIALIZATION ====================
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  renderSidebarNav();
  renderFolders();
  renderTools();
  initSearch();
  initViewToggle();
});

// ==================== RENDERING LOGIC ====================
function getFileIcon(type) {
  switch (type) {
    case "pdf": return ICONS.pdf;
    case "doc": return ICONS.doc;
    case "image": return ICONS.image;
    case "video": return ICONS.video;
    case "audio": return ICONS.audio;
    case "text": return ICONS.text;
    case "code": return ICONS.code;
    default: return ICONS.doc;
  }
}

function renderSidebarNav() {
  const navContainer = document.getElementById("sidebarNav");
  if (!navContainer) return;

  const baseCategories = [
    { id: "all", label: "Página principal", icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>`, count: TOOLS.length },
    { id: "pdf", label: "Gestión de PDF", icon: ICONS.pdf, count: TOOLS.filter(t => t.category === "pdf").length },
    { id: "image", label: "Edición de Imágenes", icon: ICONS.image, count: TOOLS.filter(t => t.category === "image").length },
    { id: "media", label: "Audio y Video", icon: ICONS.video, count: TOOLS.filter(t => t.category === "media").length },
    { id: "text", label: "Texto y Productividad", icon: ICONS.text, count: TOOLS.filter(t => t.category === "text").length },
    { id: "dev", label: "Web y Desarrollador", icon: ICONS.code, count: TOOLS.filter(t => t.category === "dev").length }
  ];

  const categories = baseCategories
    .filter(cat => cat.id === "all" || !hiddenFolders.includes(cat.id))
    .map(cat => {
      if (cat.id !== "all" && defaultFolderOverrides[cat.id]?.name) {
        return { ...cat, label: defaultFolderOverrides[cat.id].name };
      }
      return cat;
    });

  let html = `<div class="nav-group">`;
  categories.forEach(cat => {
    const isActive = currentCategory === cat.id ? "active" : "";
    html += `
      <div class="nav-item ${isActive}" data-category="${cat.id}">
        <span class="nav-icon">${cat.icon}</span>
        <span>${escapeHtml(cat.label)}</span>
        <span class="badge">${cat.count}</span>
      </div>
    `;
  });
  html += `</div>`;

  html += `<div class="nav-divider"></div>`;
  html += `<div class="nav-section-title">Vistas rápidas</div>`;
  html += `<div class="nav-group">
    <div class="nav-item ${currentCategory === 'recents' ? 'active' : ''}" data-category="recents">
      <span class="nav-icon"><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg></span>
      <span>Reciente</span>
      <span class="badge">${recentTools.length}</span>
    </div>
    <div class="nav-item ${currentCategory === 'favorites' ? 'active' : ''}" data-category="favorites">
      <span class="nav-icon"><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg></span>
      <span>Destacados</span>
      <span class="badge">${favorites.length}</span>
    </div>
  </div>`;

  // Custom User Folders in Sidebar
  html += `<div class="nav-divider"></div>`;
  html += `
    <div class="nav-section-header-wrap">
      <span class="nav-section-title" style="padding: 0;">Carpetas</span>
      <button class="nav-section-add-btn" onclick="openNewFolderModal()" title="Crear carpeta">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </svg>
      </button>
    </div>
  `;
  html += `<div class="nav-group">`;
  if (customFolders.length === 0) {
    html += `
      <div class="nav-item" onclick="openNewFolderModal()" style="opacity: 0.7; font-style: italic;">
        <span class="nav-icon" style="color: var(--md-sys-color-primary);">${ICONS.folder}</span>
        <span>+ Nueva carpeta</span>
      </div>
    `;
  } else {
    customFolders.forEach(cf => {
      const isActive = currentCategory === cf.id ? "active" : "";
      html += `
        <div class="nav-item ${isActive}" data-category="${cf.id}">
          <span class="nav-icon" style="color: ${escapeHtml(cf.color)};">${ICONS.folder}</span>
          <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${escapeHtml(cf.name)}</span>
          <span class="badge">${cf.tools.length}</span>
        </div>
      `;
    });
  }
  html += `</div>`;

  navContainer.innerHTML = html;

  navContainer.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("click", () => {
      const cat = item.getAttribute("data-category");
      if (cat) setCategory(cat);
    });
  });
}

function renderFolders() {
  const foldersContainer = document.getElementById("foldersGrid");
  if (!foldersContainer) return;

  const baseDefaultFolders = [
    { id: "pdf", defaultName: "Gestión de PDF", defaultColor: "#ea4335", sub: "Documentos oficiales" },
    { id: "image", defaultName: "Edición de Imágenes", defaultColor: "#34a853", sub: "Fotos y gráficos" },
    { id: "media", defaultName: "Audio y Video", defaultColor: "#9c27b0", sub: "Formatos multimedia" },
    { id: "text", defaultName: "Texto y Productividad", defaultColor: "#f57c00", sub: "OCR y redacción" },
    { id: "dev", defaultName: "Web y Desarrollador", defaultColor: "#1a73e8", sub: "QR, Colores y JSON" }
  ];

  const activeDefaultFolders = baseDefaultFolders
    .filter(f => !hiddenFolders.includes(f.id))
    .map(f => {
      const activeCount = TOOLS.filter(t => t.category === f.id && !t.disabled).length;
      const totalCount = TOOLS.filter(t => t.category === f.id).length;
      return {
        ...f,
        name: defaultFolderOverrides[f.id]?.name || f.defaultName,
        color: isValidFolderColor(defaultFolderOverrides[f.id]?.color) ? defaultFolderOverrides[f.id].color : f.defaultColor,
        count: `${activeCount} activas (${totalCount} total)`
      };
    });

  let html = activeDefaultFolders.map(f => `
    <div class="folder-card ${currentCategory === f.id ? 'active' : ''}" onclick="setCategory('${f.id}')">
      <div class="folder-icon" style="color: ${escapeHtml(f.color)}">
        ${ICONS.folder}
      </div>
      <div class="folder-info">
        <div class="folder-name">${escapeHtml(f.name)}</div>
        <div class="folder-meta">${escapeHtml(f.count)}</div>
      </div>
      <button type="button" class="folder-more" id="folderMoreBtn_${f.id}" aria-label="Opciones de carpeta ${escapeHtml(f.name)}" aria-haspopup="menu" aria-expanded="false" onclick="openFolderContextMenu('${f.id}', event)" onkeydown="handleFolderMoreKeydown('${f.id}', event)" title="Opciones de carpeta">
        ${ICONS.more}
      </button>
    </div>
  `).join("");

  // Add custom folders
  customFolders.forEach(cf => {
    const isActive = currentCategory === cf.id ? 'active' : '';
    html += `
      <div class="folder-card folder-card-custom ${isActive}" onclick="setCategory('${cf.id}')">
        <div class="folder-icon" style="color: ${escapeHtml(cf.color)}">
          ${ICONS.folder}
        </div>
        <div class="folder-info">
          <div class="folder-name" title="${escapeHtml(cf.name)}">${escapeHtml(cf.name)}</div>
          <div class="folder-meta">${cf.tools.length} ${cf.tools.length === 1 ? 'herramienta' : 'herramientas'}</div>
        </div>
        <button type="button" class="folder-more" id="folderMoreBtn_${cf.id}" aria-label="Opciones de carpeta ${escapeHtml(cf.name)}" aria-haspopup="menu" aria-expanded="false" onclick="openFolderContextMenu('${cf.id}', event)" onkeydown="handleFolderMoreKeydown('${cf.id}', event)" title="Opciones de carpeta">
          ${ICONS.more}
        </button>
      </div>
    `;
  });

  // Add "+ Nueva carpeta" card
  html += `
    <div class="folder-card folder-card-add" tabindex="0" role="button" aria-label="Crear nueva carpeta personalizada" onclick="openNewFolderModal()" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openNewFolderModal();}" title="Crear nueva carpeta personalizada">
      <div class="folder-icon" style="color: var(--md-sys-color-primary)">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
          <path d="M20 6h-8l-2-2H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-1 8h-3v3h-2v-3h-3v-2h3V9h2v3h3v2z"/>
        </svg>
      </div>
      <div class="folder-info">
        <div class="folder-name" style="color: var(--md-sys-color-primary); font-weight: 600;">+ Nueva carpeta</div>
        <div class="folder-meta">Personalizada</div>
      </div>
    </div>
  `;

  foldersContainer.innerHTML = html;
}

function getFilteredTools() {
  return TOOLS.filter(tool => {
    // Category filter
    let matchesCategory = false;
    if (currentCategory === "all") matchesCategory = true;
    else if (currentCategory === "favorites") matchesCategory = favorites.includes(tool.id);
    else if (currentCategory === "recents") matchesCategory = recentTools.includes(tool.id);
    else if (currentCategory.startsWith("custom_")) {
      const customFolder = customFolders.find(cf => cf.id === currentCategory);
      matchesCategory = customFolder ? customFolder.tools.includes(tool.id) : false;
    } else {
      if (hiddenFolders.includes(currentCategory)) return false;
      matchesCategory = tool.category === currentCategory;
    }

    // Search filter
    if (!matchesCategory) return false;
    if (!currentSearch) return true;

    const query = currentSearch.toLowerCase().trim();
    return (
      tool.title.toLowerCase().includes(query) ||
      tool.desc.toLowerCase().includes(query) ||
      tool.formats.toLowerCase().includes(query) ||
      tool.categoryName.toLowerCase().includes(query)
    );
  });
}

function renderTools() {
  const listContainer = document.getElementById("toolsListContainer");
  const filtered = getFilteredTools();

  if (!listContainer) return;

  // Custom folder header if inside a custom folder
  let headerHtml = "";
  if (currentCategory.startsWith("custom_")) {
    const activeFolder = customFolders.find(cf => cf.id === currentCategory);
    if (activeFolder) {
      headerHtml = `
        <div class="custom-folder-header-bar">
          <div class="custom-folder-title-wrap">
            <div class="custom-folder-icon-circle" style="color: ${escapeHtml(activeFolder.color)};">
              ${ICONS.folder}
            </div>
            <div>
              <div class="custom-folder-title">${escapeHtml(activeFolder.name)}</div>
              <div class="custom-folder-subtitle">Carpeta personalizada • ${filtered.length} ${filtered.length === 1 ? 'herramienta' : 'herramientas'}</div>
            </div>
          </div>
          <div class="custom-folder-actions">
            <button class="ui-btn ui-btn-primary custom-folder-btn" onclick="openAddToolsToFolderModal('${activeFolder.id}')">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
              <span>Gestionar herramientas</span>
            </button>
            <button class="ui-btn ui-btn-outlined custom-folder-btn danger-btn" onclick="deleteCustomFolder('${activeFolder.id}')" title="Eliminar carpeta">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
              <span>Eliminar</span>
            </button>
          </div>
        </div>
      `;
    }
  }

  if (filtered.length === 0) {
    if (currentCategory.startsWith("custom_")) {
      const activeFolder = customFolders.find(cf => cf.id === currentCategory);
      listContainer.innerHTML = headerHtml + `
        <div class="custom-folder-empty-state">
          <div class="empty-icon" style="color: ${escapeHtml(activeFolder ? activeFolder.color : '#ea4335')};">${ICONS.folder}</div>
          <h3>Esta carpeta está vacía</h3>
          <p>Añade las herramientas que más utilizas para tenerlas organizadas y a mano.</p>
          <button class="ui-btn ui-btn-primary" onclick="openAddToolsToFolderModal('${currentCategory}')" style="margin-top: 14px;">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
            <span>Añadir herramientas</span>
          </button>
        </div>
      `;
      return;
    }

    listContainer.innerHTML = `
      <div style="text-align: center; padding: 48px 20px; color: #747775;">
        <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor" style="opacity: 0.5; margin-bottom: 12px;"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
        <h3 style="font-size: 16px; margin-bottom: 4px; color: #1f1f1f;">No se encontraron herramientas</h3>
        <p style="font-size: 13px;">Prueba buscando otro término o selecciona otra categoría en el menú lateral.</p>
      </div>
    `;
    return;
  }

  if (currentView === "list") {
    // Render Google Drive Style Table
    let tableHtml = headerHtml + `
      <div class="tools-table-container">
        <table class="tools-table">
          <thead>
            <tr>
              <th class="th-name">Nombre</th>
              <th>Motivo por el que se te sugiere</th>
              <th>Ubicación</th>
              <th class="th-actions"><span class="sr-only">Acciones</span></th>
            </tr>
          </thead>
          <tbody>
    `;

    filtered.forEach(tool => {
      const isStarred = favorites.includes(tool.id);
      const isInFolder = customFolders.some(f => f.tools.includes(tool.id));
      tableHtml += `
        <tr class="tool-row" onclick="openToolModal('${tool.id}')">
          <td>
            <div class="tool-name-cell">
              <button type="button" class="tool-cell-btn" onclick="openToolModal('${tool.id}')" aria-label="Abrir herramienta: ${escapeHtml(tool.title)}">
                <span class="tool-file-icon">${getFileIcon(tool.iconType)}</span>
                <span class="tool-name-text">${escapeHtml(tool.title)}</span>
              </button>
              ${tool.disabled ? '<span class="badge-soon">Próximamente</span>' : ''}
            </div>
          </td>
          <td>
            <div class="tool-reason-cell" title="${escapeHtml(tool.desc)}">${escapeHtml(tool.reason)}</div>
          </td>
          <td>
            <div class="tool-location-cell">
              ${ICONS.folder}
              <span>${escapeHtml(tool.location)}</span>
            </div>
          </td>
          <td class="tool-actions-cell" onclick="event.stopPropagation()">
            <button class="folder-assign-btn ${isInFolder ? 'has-folders' : ''}" onclick="openAssignToolModal('${tool.id}', event)" onkeydown="event.stopPropagation()" title="Organizar en carpetas" aria-label="Organizar ${escapeHtml(tool.title)} en carpetas">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M20 6h-8l-2-2H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-1 8h-3v3h-2v-3h-3v-2h3V9h2v3h3v2z"/>
              </svg>
            </button>
            <button class="star-btn ${isStarred ? 'starred' : ''}" onclick="toggleFavorite('${tool.id}', event)" onkeydown="event.stopPropagation()" title="${isStarred ? 'Quitar de destacados' : 'Destacar'}" aria-label="${isStarred ? 'Quitar de destacados' : 'Destacar'}: ${escapeHtml(tool.title)}">
              ${isStarred ? ICONS.starFilled : ICONS.star}
            </button>
          </td>
        </tr>
      `;
    });

    tableHtml += `
          </tbody>
        </table>
      </div>
    `;
    listContainer.innerHTML = tableHtml;
  } else {
    // Render Grid View
    let gridHtml = headerHtml + `<div class="tools-grid">`;
    filtered.forEach(tool => {
      const isStarred = favorites.includes(tool.id);
      const isInFolder = customFolders.some(f => f.tools.includes(tool.id));
      gridHtml += `
        <div class="tool-card" onclick="openToolModal('${tool.id}')">
          <div class="tool-card-top">
            <div class="tool-card-icon-wrap">
              ${getFileIcon(tool.iconType)}
            </div>
            ${tool.disabled ? '<span class="badge-soon">Próximamente</span>' : `<span class="tool-card-badge">${escapeHtml(tool.formats)}</span>`}
          </div>
          <div class="tool-card-title">
            <button type="button" class="tool-card-title-btn" onclick="openToolModal('${tool.id}')" aria-label="Abrir herramienta: ${escapeHtml(tool.title)}">
              ${escapeHtml(tool.title)}
            </button>
          </div>
          <div class="tool-card-desc">${escapeHtml(tool.desc)}</div>
          <div class="tool-card-footer" onclick="event.stopPropagation()">
            <span style="font-size: 11px; color: var(--md-sys-color-on-surface-variant);">${escapeHtml(tool.categoryName)}</span>
            <div style="display: flex; align-items: center; gap: 4px;">
              <button class="folder-assign-btn ${isInFolder ? 'has-folders' : ''}" onclick="openAssignToolModal('${tool.id}', event)" onkeydown="event.stopPropagation()" title="Organizar en carpetas" aria-label="Organizar ${escapeHtml(tool.title)} en carpetas">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M20 6h-8l-2-2H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-1 8h-3v3h-2v-3h-3v-2h3V9h2v3h3v2z"/>
                </svg>
              </button>
              <button class="star-btn ${isStarred ? 'starred' : ''}" onclick="toggleFavorite('${tool.id}', event)" onkeydown="event.stopPropagation()" title="${isStarred ? 'Quitar de destacados' : 'Destacar'}" aria-label="${isStarred ? 'Quitar de destacados' : 'Destacar'}: ${escapeHtml(tool.title)}">
                ${isStarred ? ICONS.starFilled : ICONS.star}
              </button>
            </div>
          </div>
        </div>
      `;
    });
    gridHtml += `</div>`;
    listContainer.innerHTML = gridHtml;
  }
}

// ==================== FILTERS & SEARCH ====================
function setCategory(cat) {
  currentCategory = cat;
  renderSidebarNav();
  renderFolders();
  renderTools();

  // Update banner title
  const bannerTitle = document.getElementById("welcomeTitle");
  if (bannerTitle) {
    const activeCount = TOOLS.filter(t => !t.disabled).length;
    if (cat === "all") bannerTitle.innerHTML = `Te damos la bienvenida a <strong>ToolDrive</strong> <span style="font-size: 13px; font-weight: normal; color: var(--md-sys-color-on-surface-variant); display: block; margin-top: 4px;">${activeCount} herramientas activas client-side (30 en total)</span>`;
    else if (cat === "favorites") bannerTitle.innerHTML = "Herramientas <strong>Destacadas</strong>";
    else if (cat === "recents") bannerTitle.innerHTML = "Herramientas <strong>Recientes</strong>";
    else {
      const folderInfo = getFolderInfo(cat);
      if (folderInfo) {
        bannerTitle.innerHTML = `Carpeta: <strong>${escapeHtml(folderInfo.name)}</strong>`;
      } else {
        const folder = TOOLS.find(t => t.category === cat);
        bannerTitle.innerHTML = `Categoría: <strong>${escapeHtml(folder ? folder.categoryName : cat)}</strong>`;
      }
    }
  }
}

function initSearch() {
  const searchInput = document.getElementById("searchInput");
  const clearSearchBtn = document.getElementById("clearSearchBtn");

  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    currentSearch = e.target.value;
    if (clearSearchBtn) {
      clearSearchBtn.style.display = currentSearch ? "flex" : "none";
    }
    renderTools();
  });

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", () => {
      searchInput.value = "";
      currentSearch = "";
      clearSearchBtn.style.display = "none";
      renderTools();
    });
  }
}

function initViewToggle() {
  const btnList = document.getElementById("btnViewList");
  const btnGrid = document.getElementById("btnViewGrid");

  if (btnList && btnGrid) {
    btnList.addEventListener("click", () => {
      currentView = "list";
      btnList.classList.add("active");
      btnGrid.classList.remove("active");
      renderTools();
    });

    btnGrid.addEventListener("click", () => {
      currentView = "grid";
      btnGrid.classList.add("active");
      btnList.classList.remove("active");
      renderTools();
    });
  }
}

function toggleFavorite(id, event) {
  if (event) event.stopPropagation();
  if (favorites.includes(id)) {
    favorites = favorites.filter(fav => fav !== id);
    showToast("Eliminado de Destacados");
  } else {
    favorites.push(id);
    showToast("Añadido a Destacados");
  }
  safeSetStorage("tooldrive_favorites", favorites);
  renderSidebarNav();
  renderTools();
}

function markAsRecent(id) {
  recentTools = recentTools.filter(item => item !== id);
  recentTools.unshift(id);
  if (recentTools.length > 10) recentTools.pop();
  safeSetStorage("tooldrive_recents", recentTools);
  renderSidebarNav();
}


// ==================== TOAST SYSTEM ====================
function showToast(message) {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";

  const iconSpan = document.createElement("span");
  iconSpan.style.color = "#34a853";
  iconSpan.innerHTML = ICONS.check;

  const textSpan = document.createElement("span");
  textSpan.textContent = message;

  toast.appendChild(iconSpan);
  toast.appendChild(textSpan);
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(8px)";
    setTimeout(() => toast.remove(), 250);
  }, 2800);
}

// ==================== TEMA OSCURO / CLARO (iOS SWITCH) ====================
function initTheme() {
  const savedTheme = safeGetStorageJson("tooldrive_theme", null);
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

  const isDark = savedTheme === "dark" || (!savedTheme && prefersDark);
  if (isDark) {
    document.body.classList.add("dark-theme");
  } else {
    document.body.classList.remove("dark-theme");
  }

  const themeBtn = document.getElementById("themeToggleBtn");
  if (themeBtn) {
    themeBtn.setAttribute("aria-label", isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
  }

  // Global Keyboard Shortcuts
  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") {
      e.preventDefault();
      const search = document.getElementById("searchInput");
      if (search) search.focus();
    }
  });
}

window.toggleTheme = function() {
  const isDark = document.body.classList.toggle("dark-theme");
  safeSetStorage("tooldrive_theme", isDark ? "dark" : "light");
  const themeBtn = document.getElementById("themeToggleBtn");
  if (themeBtn) {
    themeBtn.setAttribute("aria-label", isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
  }
  showToast(isDark ? "Modo oscuro activado" : "Modo claro activado");
};

// ==================== KEYBOARD NAVIGATION FOR TOOL CARDS ====================
window.handleToolCardKeydown = function(toolId, event) {
  if (event.key === "Enter" || event.key === " ") {
    // If the event originated on an inner interactive control, ignore it
    if (event.target.tagName === "BUTTON" || event.target.tagName === "INPUT" || event.target.tagName === "A") {
      return;
    }
    event.preventDefault();
    openToolModal(toolId);
  }
};

// ==================== OBJECT URL REGISTRY & CLEANUP ====================
let activeModalObjectUrls = [];

function registerModalObjectUrl(url) {
  if (url && typeof url === "string") {
    activeModalObjectUrls.push(url);
  }
  return url;
}

function revokeAllModalObjectUrls() {
  if (activeModalObjectUrls.length > 0) {
    activeModalObjectUrls.forEach(url => {
      try { URL.revokeObjectURL(url); } catch (e) {}
    });
    activeModalObjectUrls = [];
  }
}

// ==================== INTERACTIVE TOOLS WORKSPACE ====================
let lastFocusedToolTrigger = null;

window.openToolModal = function(toolId) {
  const tool = TOOLS.find(t => t.id === toolId);
  if (!tool) return;

  markAsRecent(tool.id);
  lastFocusedToolTrigger = document.activeElement;

  const backdrop = document.getElementById("toolModalBackdrop");
  const modalIcon = document.getElementById("modalToolIcon");
  const modalTitle = document.getElementById("modalToolTitle");
  const modalCategory = document.getElementById("modalToolCategory");
  const modalBody = document.getElementById("modalToolBody");
  const modalFooter = document.getElementById("modalToolFooter");

  modalIcon.innerHTML = getFileIcon(tool.iconType);
  modalTitle.innerText = tool.title;
  modalCategory.innerText = tool.categoryName;

  // Build Interactive Body based on tool ID
  buildToolWorkspace(tool, modalBody, modalFooter);

  backdrop.classList.add("open");

  // Move initial focus into modal for keyboard & screen reader accessibility
  setTimeout(() => {
    const modal = backdrop.querySelector(".tool-modal");
    if (!modal) return;
    const focusable = modal.querySelector('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');
    if (focusable) {
      focusable.focus();
    }
  }, 60);

  // Prevent default browser navigation when dropping files anywhere on modal or backdrop
  if (!backdrop._dragPreventAttached) {
    backdrop._dragPreventAttached = true;
    backdrop.addEventListener("dragover", (e) => e.preventDefault());
    backdrop.addEventListener("drop", (e) => e.preventDefault());
  }
};

window.closeToolModal = function() {
  const backdrop = document.getElementById("toolModalBackdrop");
  if (backdrop) backdrop.classList.remove("open");
  // Clean speech synthesis or microphone if active
  if (window.speechRecognitionInstance) {
    try { window.speechRecognitionInstance.stop(); } catch(e) {}
  }
  // Clean OCR resources, terminate worker and revoke object URLs
  if (window.cleanOcrResources) {
    try { window.cleanOcrResources(); } catch(e) {}
  }
  // Cancel active background tasks if running
  if (typeof window.cancelPdfToJpeg === "function") try { window.cancelPdfToJpeg(); } catch (e) {}
  if (typeof window.cancelHeicConvert === "function") try { window.cancelHeicConvert(); } catch (e) {}
  if (typeof window.cancelUpscale === "function") try { window.cancelUpscale(); } catch (e) {}
  if (typeof window.cancelCompressPdf === "function") try { window.cancelCompressPdf(); } catch (e) {}
  if (typeof window.cancelUnlockPdf === "function") try { window.cancelUnlockPdf(); } catch (e) {}
  if (typeof window.cancelDocToPdf === "function") try { window.cancelDocToPdf(); } catch (e) {}
  // Clean any active object URLs created inside tool modals
  revokeAllModalObjectUrls();

  // Return focus to the trigger element that opened the modal
  if (lastFocusedToolTrigger && typeof lastFocusedToolTrigger.focus === "function") {
    try { lastFocusedToolTrigger.focus(); } catch (e) {}
    lastFocusedToolTrigger = null;
  }
};

// ==================== MODAL FOCUS TRAP & ESCAPE KEY (ALL MODALS) ====================
function getActiveModalBackdrop() {
  const backdropIds = [
    { id: "renameFolderModalBackdrop", close: () => window.closeRenameFolderModal() },
    { id: "changeColorFolderModalBackdrop", close: () => window.closeChangeColorFolderModal() },
    { id: "assignToolModalBackdrop", close: () => window.closeAssignToolModal() },
    { id: "customFolderModalBackdrop", close: () => window.closeFolderModal() },
    { id: "toolModalBackdrop", close: () => window.closeToolModal() }
  ];
  for (const b of backdropIds) {
    const el = document.getElementById(b.id);
    if (el && el.classList.contains("open")) {
      return { el, close: b.close };
    }
  }
  return null;
}

document.addEventListener("keydown", (e) => {
  // 1. Si el menú contextual de carpetas está abierto, Escape lo cierra prioritariamente
  const menu = document.getElementById("folderContextMenu");
  if (menu && menu.style.display === "block") {
    if (e.key === "Escape") {
      e.preventDefault();
      closeFolderContextMenu(true);
      return;
    }
  }

  // 2. Comprobar si hay algún modal abierto
  const activeBackdrop = getActiveModalBackdrop();
  if (!activeBackdrop) return;

  if (e.key === "Escape") {
    e.preventDefault();
    activeBackdrop.close();
    return;
  }

  if (e.key === "Tab") {
    const modal = activeBackdrop.el.querySelector(".tool-modal");
    if (!modal) return;

    const focusables = Array.from(modal.querySelectorAll(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )).filter(el => el.offsetParent !== null && window.getComputedStyle(el).visibility !== "hidden");

    if (focusables.length === 0) {
      e.preventDefault();
      return;
    }

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first || !modal.contains(document.activeElement)) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last || !modal.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      }
    }
  }
});

// ==================== STATIC MODAL BACKDROP HANDLER ====================
window.handleStaticBackdropClick = function(event) {
  if (event.target === event.currentTarget) {
    const modal = event.currentTarget.querySelector(".tool-modal");
    if (modal) {
      modal.classList.remove("static-pulse");
      void modal.offsetWidth; // trigger reflow
      modal.classList.add("static-pulse");
    }
  }
};

// ==================== CUSTOM FOLDERS MANAGEMENT ====================
let selectedFolderColor = "#ea4335";

let lastFocusedFolderModalTrigger = null;

window.openNewFolderModal = function(editFolderId = null) {
  lastFocusedFolderModalTrigger = document.activeElement;
  const backdrop = document.getElementById("customFolderModalBackdrop");
  const modalTitle = document.getElementById("folderModalTitle");
  const modalIcon = document.getElementById("folderModalIcon");
  const modalBody = document.getElementById("folderModalBody");
  const modalFooter = document.getElementById("folderModalFooter");

  let existingFolder = null;
  if (editFolderId) {
    existingFolder = customFolders.find(cf => cf.id === editFolderId);
  }

  const isEditing = !!existingFolder;
  modalTitle.innerText = isEditing ? "Editar Carpeta Personalizada" : "Nueva Carpeta Personalizada";
  selectedFolderColor = isEditing ? existingFolder.color : "#ea4335";
  modalIcon.innerHTML = `<svg viewBox="0 0 24 24" width="22" height="22" fill="${escapeHtml(selectedFolderColor)}"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>`;

  const initialTools = isEditing ? existingFolder.tools : [];

  // Build Body
  let bodyHtml = `
    <div class="ui-control-group">
      <label class="ui-control-label">Nombre de la carpeta</label>
      <input type="text" id="folderNameInput" class="ui-input" maxlength="40" placeholder="Ejemplo 1, Documentos Contables, etc. (Máximo 40 caracteres)" value="${isEditing ? escapeHtml(existingFolder.name) : ''}" autofocus />
    </div>

    <div class="ui-control-group">
      <label class="ui-control-label">Color de la carpeta</label>
      <div class="color-picker-palette" id="folderColorPalette">
        ${FOLDER_COLORS.map(c => `
          <div class="color-dot ${c === selectedFolderColor ? 'active' : ''}" style="background-color: ${escapeHtml(c)};" onclick="selectFolderColor('${escapeHtml(c)}')" data-color="${escapeHtml(c)}"></div>
        `).join("")}
      </div>
    </div>

    <div class="ui-control-group">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
        <label class="ui-control-label" style="margin-bottom: 0;">Selecciona las herramientas a incluir</label>
        <div style="font-size: 12px; display: flex; gap: 8px;">
          <a href="javascript:void(0)" onclick="toggleAllToolsInFolderModal(true)" style="color: var(--md-sys-color-primary); text-decoration: none; font-weight: 500;">Marcar todas</a>
          <span style="color: var(--md-sys-color-outline);">|</span>
          <a href="javascript:void(0)" onclick="toggleAllToolsInFolderModal(false)" style="color: var(--md-sys-color-primary); text-decoration: none; font-weight: 500;">Desmarcar todas</a>
        </div>
      </div>
      <input type="text" id="toolFilterInModal" class="ui-input" placeholder="Buscar herramientas para añadir..." oninput="filterToolsInFolderModal()" style="margin-bottom: 8px;" />
      
      <div class="tools-selection-container" id="toolsSelectionList">
        ${TOOLS.map(t => {
          const isChecked = initialTools.includes(t.id);
          return `
            <div class="tool-checkbox-item ${isChecked ? 'checked' : ''}" data-tool-id="${t.id}" onclick="toggleToolCheckboxItem(this, event)">
              <input type="checkbox" id="chk_tool_${t.id}" value="${t.id}" ${isChecked ? 'checked' : ''} onclick="event.stopPropagation(); updateToolCheckboxVisual(this);" />
              <div class="tool-file-icon">${getFileIcon(t.iconType)}</div>
              <div class="tool-checkbox-info">
                <div class="tool-checkbox-title">${escapeHtml(t.title)}</div>
                <div class="tool-checkbox-cat">${escapeHtml(t.categoryName)}</div>
              </div>
            </div>
          `;
        }).join("")}
      </div>
      <div style="display: flex; justify-content: space-between; margin-top: 8px; font-size: 12px; color: var(--md-sys-color-on-surface-variant);">
        <span id="selectedToolsCountText">${initialTools.length} herramientas seleccionadas</span>
        <span>Total: ${TOOLS.length} disponibles</span>
      </div>
    </div>
  `;

  modalBody.innerHTML = bodyHtml;

  // Build Footer
  modalFooter.innerHTML = `
    <button class="ui-btn ui-btn-outlined" onclick="closeFolderModal()">Cancelar</button>
    <button class="ui-btn ui-btn-primary" onclick="saveCustomFolder('${editFolderId || ''}')">
      ${isEditing ? 'Guardar Cambios' : 'Crear Carpeta'}
    </button>
  `;

  backdrop.classList.add("open");
  setTimeout(() => {
    const input = document.getElementById("folderNameInput");
    if (input) input.focus();
  }, 100);
};

window.closeFolderModal = function() {
  const backdrop = document.getElementById("customFolderModalBackdrop");
  if (backdrop) backdrop.classList.remove("open");
  if (lastFocusedFolderModalTrigger && typeof lastFocusedFolderModalTrigger.focus === "function") {
    try { lastFocusedFolderModalTrigger.focus(); } catch (e) {}
    lastFocusedFolderModalTrigger = null;
  }
};

window.selectFolderColor = function(color) {
  selectedFolderColor = color;
  document.querySelectorAll("#folderColorPalette .color-dot").forEach(dot => {
    dot.classList.toggle("active", dot.getAttribute("data-color") === color);
  });
  const icon = document.getElementById("folderModalIcon");
  if (icon) {
    icon.innerHTML = `<svg viewBox="0 0 24 24" width="22" height="22" fill="${escapeHtml(color)}"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>`;
  }
};

window.toggleToolCheckboxItem = function(rowElement, event) {
  if (event.target.tagName === "INPUT") return;
  const chk = rowElement.querySelector('input[type="checkbox"]');
  if (chk) {
    chk.checked = !chk.checked;
    updateToolCheckboxVisual(chk);
  }
};

window.updateToolCheckboxVisual = function(chk) {
  const row = chk.closest(".tool-checkbox-item");
  if (row) {
    row.classList.toggle("checked", chk.checked);
  }
  updateSelectedToolsCount();
};

function updateSelectedToolsCount() {
  const checked = document.querySelectorAll('#toolsSelectionList input[type="checkbox"]:checked');
  const countSpan = document.getElementById("selectedToolsCountText");
  if (countSpan) {
    countSpan.innerText = `${checked.length} herramientas seleccionadas`;
  }
}

window.toggleAllToolsInFolderModal = function(select) {
  document.querySelectorAll('#toolsSelectionList .tool-checkbox-item').forEach(item => {
    if (item.style.display !== "none") {
      const chk = item.querySelector('input[type="checkbox"]');
      if (chk) {
        chk.checked = select;
        item.classList.toggle("checked", select);
      }
    }
  });
  updateSelectedToolsCount();
};

window.filterToolsInFolderModal = function() {
  const query = (document.getElementById("toolFilterInModal")?.value || "").toLowerCase().trim();
  document.querySelectorAll('#toolsSelectionList .tool-checkbox-item').forEach(item => {
    const text = item.innerText.toLowerCase();
    item.style.display = text.includes(query) ? "flex" : "none";
  });
};

window.saveCustomFolder = function(folderId = "") {
  const nameInput = document.getElementById("folderNameInput");
  const rawName = nameInput ? nameInput.value : "";
  const validation = validateFolderName(rawName, folderId);

  if (!validation.valid) {
    showToast(validation.message);
    if (nameInput) nameInput.focus();
    return;
  }

  const name = validation.name;
  const folderColor = isValidFolderColor(selectedFolderColor) ? selectedFolderColor : "#ea4335";
  const checkedCheckboxes = document.querySelectorAll('#toolsSelectionList input[type="checkbox"]:checked');
  const selectedTools = Array.from(checkedCheckboxes).map(c => c.value);

  if (folderId) {
    // Editing
    const folderIndex = customFolders.findIndex(cf => cf.id === folderId);
    if (folderIndex !== -1) {
      customFolders[folderIndex].name = name;
      customFolders[folderIndex].color = folderColor;
      customFolders[folderIndex].tools = selectedTools;
      showToast(`Carpeta "${name}" actualizada`);
    }
  } else {
    // Creating
    const newId = "custom_" + Date.now();
    customFolders.push({
      id: newId,
      name: name,
      color: folderColor,
      tools: selectedTools
    });
    currentCategory = newId;
    showToast(`Carpeta "${name}" creada`);
  }

  saveCustomFolders();
  closeFolderModal();
};

window.deleteCustomFolder = function(folderId) {
  const folder = customFolders.find(cf => cf.id === folderId);
  if (!folder) return;

  const count = folder.tools ? folder.tools.length : 0;
  const toolMsg = count > 0 
    ? `Contiene ${count} herramienta${count === 1 ? '' : 's'}. Todas seguirán disponibles en la vista general y en sus categorías originales sin perderse.`
    : `Las herramientas seguirán estando disponibles en la vista general sin perderse.`;

  const isConfirmed = confirm(
    `¿Deseas eliminar la carpeta "${folder.name}"?\n\n${toolMsg}\n\n¿Confirmar eliminación?`
  );
  if (!isConfirmed) return;

  customFolders = customFolders.filter(cf => cf.id !== folderId);
  if (currentCategory === folderId) {
    currentCategory = "all";
  }
  saveCustomFolders();
  showToast(`Carpeta "${folder.name}" eliminada. Las herramientas se conservaron.`);
};

window.openAddToolsToFolderModal = function(folderId) {
  openNewFolderModal(folderId);
};

// ==================== ASSIGN TOOL TO FOLDERS QUICK MODAL ====================
let lastFocusedAssignTrigger = null;

window.openAssignToolModal = function(toolId, event) {
  if (event) event.stopPropagation();
  lastFocusedAssignTrigger = document.activeElement;
  currentAssignToolId = toolId;
  const tool = TOOLS.find(t => t.id === toolId);
  if (!tool) return;

  const backdrop = document.getElementById("assignToolModalBackdrop");
  const title = document.getElementById("assignModalTitle");
  const subtitle = document.getElementById("assignModalSubtitle");
  const body = document.getElementById("assignModalBody");
  const footer = document.getElementById("assignModalFooter");

  title.innerText = "Organizar en Carpetas";
  subtitle.innerText = tool.title;

  let bodyHtml = "";
  if (customFolders.length === 0) {
    bodyHtml = `
      <div style="text-align: center; padding: 20px;">
        <p style="color: var(--md-sys-color-on-surface-variant); font-size: 13px; margin-bottom: 14px;">
          Aún no tienes carpetas personalizadas creadas.
        </p>
        <button class="ui-btn ui-btn-primary" onclick="closeAssignToolModal(); openNewFolderModal();">
          + Crear primera carpeta
        </button>
      </div>
    `;
  } else {
    bodyHtml = `
      <p style="font-size: 13px; color: var(--md-sys-color-on-surface-variant); margin-bottom: 12px;">
        Marca las carpetas donde deseas incluir <strong>${escapeHtml(tool.title)}</strong>:
      </p>
      <div class="tools-selection-container" style="max-height: 220px;">
        ${customFolders.map(cf => {
          const isIncluded = cf.tools.includes(tool.id);
          return `
            <div class="tool-checkbox-item ${isIncluded ? 'checked' : ''}" onclick="toggleToolInFolder('${cf.id}', '${tool.id}', this, event)">
              <input type="checkbox" id="chk_assign_${cf.id}" ${isIncluded ? 'checked' : ''} onclick="event.stopPropagation(); toggleToolInFolderDirect('${cf.id}', '${tool.id}', this);" />
              <div class="tool-file-icon" style="color: ${escapeHtml(cf.color)};">${ICONS.folder}</div>
              <div class="tool-checkbox-info">
                <div class="tool-checkbox-title">${escapeHtml(cf.name)}</div>
                <div class="tool-checkbox-cat">${cf.tools.length} ${cf.tools.length === 1 ? 'herramienta' : 'herramientas'}</div>
              </div>
            </div>
          `;
        }).join("")}
      </div>
      <div style="margin-top: 14px; text-align: center;">
        <button class="ui-btn ui-btn-outlined" onclick="closeAssignToolModal(); openNewFolderModal();" style="font-size: 12px; padding: 6px 14px;">
          + Crear otra carpeta
        </button>
      </div>
    `;
  }

  body.innerHTML = bodyHtml;
  footer.innerHTML = `
    <button class="ui-btn ui-btn-primary" onclick="closeAssignToolModal()">Listo</button>
  `;

  backdrop.classList.add("open");
  setTimeout(() => {
    const btn = footer.querySelector("button");
    if (btn) btn.focus();
  }, 60);
};

window.closeAssignToolModal = function() {
  const backdrop = document.getElementById("assignToolModalBackdrop");
  if (backdrop) backdrop.classList.remove("open");
  currentAssignToolId = null;
  if (lastFocusedAssignTrigger && typeof lastFocusedAssignTrigger.focus === "function") {
    try { lastFocusedAssignTrigger.focus(); } catch (e) {}
    lastFocusedAssignTrigger = null;
  }
};

window.toggleToolInFolder = function(folderId, toolId, rowElement, event) {
  if (event.target.tagName === "INPUT") return;
  const chk = rowElement.querySelector('input[type="checkbox"]');
  if (chk) {
    chk.checked = !chk.checked;
    toggleToolInFolderDirect(folderId, toolId, chk);
  }
};

window.toggleToolInFolderDirect = function(folderId, toolId, chk) {
  const folder = customFolders.find(cf => cf.id === folderId);
  if (!folder) return;

  const row = chk.closest(".tool-checkbox-item");
  if (chk.checked) {
    if (!folder.tools.includes(toolId)) folder.tools.push(toolId);
    if (row) row.classList.add("checked");
    showToast(`Añadido a "${folder.name}"`);
  } else {
    folder.tools = folder.tools.filter(t => t !== toolId);
    if (row) row.classList.remove("checked");
    showToast(`Removido de "${folder.name}"`);
  }

  saveCustomFolders();
};

// ==================== FOLDER CONTEXT MENU & ACTIONS (3 DOTS) ====================
let lastFocusedFolderMoreBtn = null;

window.openFolderContextMenu = function(folderId, event, focusFirstItem = false) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }

  const menu = document.getElementById("folderContextMenu");
  if (!menu) return;

  // Si ya estaba abierto para esta misma carpeta, alternar (cerrar)
  if (menu.style.display !== "none" && currentContextMenuFolderId === folderId) {
    closeFolderContextMenu(false);
    return;
  }

  // Cerrar cualquier menú previo sin restaurar foco aún
  closeFolderContextMenu(false);

  currentContextMenuFolderId = folderId;

  const btn = document.getElementById(`folderMoreBtn_${folderId}`) || event?.currentTarget || event?.target?.closest(".folder-more");
  lastFocusedFolderMoreBtn = btn || null;
  if (btn) {
    btn.setAttribute("aria-expanded", "true");
  }

  const rect = btn ? btn.getBoundingClientRect() : null;

  menu.style.display = "block";
  menu.style.visibility = "hidden";

  const manageOption = document.getElementById("ctxManageToolsOption");
  if (manageOption) {
    const isCustom = folderId && folderId.startsWith("custom_");
    manageOption.style.display = isCustom ? "flex" : "none";
  }

  const menuWidth = menu.offsetWidth || 210;
  const menuHeight = menu.offsetHeight || 160;
  const padding = 10;
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  let left = rect ? rect.right - menuWidth : 100;
  let top = rect ? rect.bottom + 6 : 100;

  // Evitar desborde horizontal (sin corte en bordes de ventana)
  if (left + menuWidth > viewportWidth - padding) {
    left = viewportWidth - menuWidth - padding;
  }
  if (left < padding) {
    left = padding;
  }

  // Evitar desborde vertical (abrir hacia arriba si no cabe abajo)
  if (top + menuHeight > viewportHeight - padding) {
    if (rect && rect.top - menuHeight - 6 >= padding) {
      top = rect.top - menuHeight - 6;
    } else {
      top = Math.max(padding, viewportHeight - menuHeight - padding);
    }
  }

  menu.style.left = `${Math.round(left)}px`;
  menu.style.top = `${Math.round(top)}px`;
  menu.style.visibility = "visible";

  if (focusFirstItem) {
    setTimeout(() => {
      const firstItem = menu.querySelector('.context-menu-item:not([style*="display: none"])');
      if (firstItem) firstItem.focus();
    }, 20);
  }
};

window.closeFolderContextMenu = function(restoreFocus = false) {
  const menu = document.getElementById("folderContextMenu");
  if (menu) menu.style.display = "none";

  if (lastFocusedFolderMoreBtn) {
    lastFocusedFolderMoreBtn.setAttribute("aria-expanded", "false");
    if (restoreFocus) {
      try { lastFocusedFolderMoreBtn.focus(); } catch (e) {}
    }
  }
};

window.handleFolderMoreKeydown = function(folderId, event) {
  const menu = document.getElementById("folderContextMenu");
  if (event.key === "Escape") {
    if (menu && menu.style.display !== "none") {
      event.preventDefault();
      event.stopPropagation();
      closeFolderContextMenu(true);
      return;
    }
  }
  if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
    event.preventDefault();
    event.stopPropagation();
    openFolderContextMenu(folderId, event, true);
  }
};

// 1. Modificar nombre
window.handleFolderRename = function(folderId) {
  closeFolderContextMenu(false);
  folderId = folderId || currentContextMenuFolderId;
  const folder = getFolderInfo(folderId);
  if (!folder) return;

  currentContextMenuFolderId = folderId;
  const modal = document.getElementById("renameFolderModalBackdrop");
  const input = document.getElementById("renameFolderInput");
  if (!modal || !input) return;

  input.value = folder.name;
  modal.classList.add("open");
  setTimeout(() => {
    input.focus();
    input.select();
  }, 100);
};

window.closeRenameFolderModal = function() {
  const modal = document.getElementById("renameFolderModalBackdrop");
  if (modal) modal.classList.remove("open");
  if (lastFocusedFolderMoreBtn) {
    lastFocusedFolderMoreBtn.focus();
  }
};

window.confirmRenameFolder = function() {
  const folderId = currentContextMenuFolderId;
  const input = document.getElementById("renameFolderInput");
  const rawName = input ? input.value : "";
  const validation = validateFolderName(rawName, folderId);

  if (!validation.valid) {
    showToast(validation.message);
    if (input) input.focus();
    return;
  }

  const newName = validation.name;

  if (folderId && folderId.startsWith("custom_")) {
    const cf = customFolders.find(f => f.id === folderId);
    if (cf) {
      cf.name = newName;
      saveCustomFolders();
    }
  } else if (folderId) {
    if (!defaultFolderOverrides[folderId]) defaultFolderOverrides[folderId] = {};
    defaultFolderOverrides[folderId].name = newName;
    saveDefaultFolderOverrides();
    if (currentCategory === folderId) setCategory(folderId);
  }

  closeRenameFolderModal();
  showToast(`Nombre modificado a "${newName}"`);
};

// 2. Cambiar color
window.handleFolderChangeColor = function(folderId) {
  closeFolderContextMenu(false);
  folderId = folderId || currentContextMenuFolderId;
  const folder = getFolderInfo(folderId);
  if (!folder) return;

  currentContextMenuFolderId = folderId;
  quickSelectedColor = isValidFolderColor(folder.color) ? folder.color : "#ea4335";

  const modal = document.getElementById("changeColorFolderModalBackdrop");
  const icon = document.getElementById("quickColorIcon");
  const palette = document.getElementById("quickFolderColorPalette");
  if (!modal || !palette) return;

  if (icon) {
    icon.innerHTML = `<svg viewBox="0 0 24 24" width="22" height="22" fill="${quickSelectedColor}"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.89 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>`;
  }

  palette.innerHTML = FOLDER_COLORS.map(c => `
    <div class="color-dot ${c === quickSelectedColor ? 'active' : ''}" style="background-color: ${c};" onclick="selectQuickFolderColor('${c}')" data-color="${c}"></div>
  `).join("");

  modal.classList.add("open");
};

window.selectQuickFolderColor = function(color) {
  if (!isValidFolderColor(color)) return;
  quickSelectedColor = color;
  document.querySelectorAll("#quickFolderColorPalette .color-dot").forEach(dot => {
    dot.classList.toggle("active", dot.getAttribute("data-color") === color);
  });
  const icon = document.getElementById("quickColorIcon");
  if (icon) {
    icon.innerHTML = `<svg viewBox="0 0 24 24" width="22" height="22" fill="${color}"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.89 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>`;
  }
};

window.closeChangeColorFolderModal = function() {
  const modal = document.getElementById("changeColorFolderModalBackdrop");
  if (modal) modal.classList.remove("open");
  if (lastFocusedFolderMoreBtn) {
    lastFocusedFolderMoreBtn.focus();
  }
};

window.confirmChangeColorFolder = function() {
  const folderId = currentContextMenuFolderId;
  if (!folderId) return;

  if (!isValidFolderColor(quickSelectedColor)) {
    showToast("Color no válido. Selecciona un color de la paleta.");
    return;
  }

  if (folderId.startsWith("custom_")) {
    const cf = customFolders.find(f => f.id === folderId);
    if (cf) {
      cf.color = quickSelectedColor;
      saveCustomFolders();
    }
  } else {
    if (!defaultFolderOverrides[folderId]) defaultFolderOverrides[folderId] = {};
    defaultFolderOverrides[folderId].color = quickSelectedColor;
    saveDefaultFolderOverrides();
  }

  closeChangeColorFolderModal();
  showToast("Color de carpeta actualizado");
};

// 3. Gestionar herramientas
window.handleFolderManageTools = function(folderId) {
  closeFolderContextMenu(false);
  folderId = folderId || currentContextMenuFolderId;
  if (folderId && folderId.startsWith("custom_")) {
    openNewFolderModal(folderId);
  }
};

// 4. Eliminar carpeta
window.handleFolderDelete = function(folderId) {
  closeFolderContextMenu(false);
  folderId = folderId || currentContextMenuFolderId;
  const folder = getFolderInfo(folderId);
  if (!folder) return;

  const count = folder.tools ? folder.tools.length : 0;
  const toolMsg = count > 0 
    ? `Contiene ${count} herramienta${count === 1 ? '' : 's'}. Todas seguirán disponibles en la vista general y en sus categorías originales sin perderse.`
    : `Las herramientas seguirán estando disponibles en la vista general sin perderse.`;

  const isConfirmed = confirm(
    `¿Deseas eliminar la carpeta "${folder.name}"?\n\n${toolMsg}\n\n¿Confirmar eliminación?`
  );
  if (!isConfirmed) return;

  if (folderId.startsWith("custom_")) {
    customFolders = customFolders.filter(f => f.id !== folderId);
    saveCustomFolders();
  } else {
    if (!hiddenFolders.includes(folderId)) {
      hiddenFolders.push(folderId);
      saveDefaultFolderOverrides();
    }
  }

  if (currentCategory === folderId) {
    setCategory("all");
  }

  showToast(`Carpeta "${folder.name}" eliminada. Las herramientas se conservaron.`);
};

window.restoreAllFolders = function() {
  hiddenFolders = [];
  defaultFolderOverrides = {};
  localStorage.removeItem("tooldrive_hidden_folders");
  localStorage.removeItem("tooldrive_default_folder_overrides");
  renderSidebarNav();
  renderFolders();
  renderTools();
  showToast("Carpetas predeterminadas restauradas");
};

// Listeners globales para cerrar menú contextual (clic fuera, Esc, scroll)
document.addEventListener("click", (e) => {
  const menu = document.getElementById("folderContextMenu");
  if (menu && menu.style.display !== "none") {
    if (!menu.contains(e.target) && !e.target.closest(".folder-more")) {
      closeFolderContextMenu(false);
    }
  }
}, true);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const menu = document.getElementById("folderContextMenu");
    if (menu && menu.style.display !== "none") {
      closeFolderContextMenu(true);
    }
  }
});

window.addEventListener("scroll", () => {
  const menu = document.getElementById("folderContextMenu");
  if (menu && menu.style.display !== "none") {
    closeFolderContextMenu(false);
  }
}, { capture: true, passive: true });

// Navegación con teclado dentro del menú contextual de 3 puntos
document.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById("folderContextMenu");
  if (menu) {
    menu.addEventListener("keydown", (e) => {
      const visibleItems = Array.from(menu.querySelectorAll('.context-menu-item'))
        .filter(item => item.style.display !== "none" && item.offsetParent !== null);
      if (!visibleItems.length) return;

      const activeIndex = visibleItems.indexOf(document.activeElement);

      if (e.key === "ArrowDown") {
        e.preventDefault();
        const nextIndex = activeIndex < visibleItems.length - 1 ? activeIndex + 1 : 0;
        visibleItems[nextIndex]?.focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const prevIndex = activeIndex > 0 ? activeIndex - 1 : visibleItems.length - 1;
        visibleItems[prevIndex]?.focus();
      } else if (e.key === "Home") {
        e.preventDefault();
        visibleItems[0]?.focus();
      } else if (e.key === "End") {
        e.preventDefault();
        visibleItems[visibleItems.length - 1]?.focus();
      } else if (e.key === "Escape") {
        e.preventDefault();
        closeFolderContextMenu(true);
      } else if (e.key === "Tab") {
        closeFolderContextMenu(false);
      } else if (e.key === "Enter" || e.key === " ") {
        if (document.activeElement && document.activeElement.classList.contains("context-menu-item")) {
          e.preventDefault();
          document.activeElement.click();
        }
      }
    });
  }

  // Listener tecla Enter para input de renombrar
  const renameInput = document.getElementById("renameFolderInput");
  if (renameInput) {
    renameInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") confirmRenameFolder();
    });
  }
});

// ==================== MULTI-TAB STORAGE SYNCHRONIZATION ====================
window.addEventListener("storage", (e) => {
  if (!e.key) return;

  switch (e.key) {
    case "tooldrive_custom_folders":
      try {
        const parsed = JSON.parse(e.newValue || "[]");
        customFolders = sanitizeCustomFolders(parsed);
        renderSidebarNav();
        renderFolders();
        renderTools();
      } catch (err) {
        console.error("Error al sincronizar carpetas personalizadas:", err);
      }
      break;

    case "tooldrive_default_folder_overrides":
      try {
        const parsed = JSON.parse(e.newValue || "{}");
        defaultFolderOverrides = sanitizeDefaultFolderOverrides(parsed);
        renderSidebarNav();
        renderFolders();
        renderTools();
      } catch (err) {
        console.error("Error al sincronizar modificaciones de carpetas predeterminadas:", err);
      }
      break;

    case "tooldrive_hidden_folders":
      try {
        const parsed = JSON.parse(e.newValue || "[]");
        hiddenFolders = Array.isArray(parsed) ? parsed.filter(f => typeof f === "string") : [];
        renderSidebarNav();
        renderFolders();
        renderTools();
      } catch (err) {
        console.error("Error al sincronizar carpetas ocultas:", err);
      }
      break;

    case "tooldrive_favorites":
      try {
        const parsed = JSON.parse(e.newValue || "[]");
        favorites = Array.isArray(parsed) ? parsed.filter(t => typeof t === "string") : [];
        renderTools();
        renderSidebarNav();
      } catch (err) {
        console.error("Error al sincronizar favoritos:", err);
      }
      break;

    case "tooldrive_recents":
      try {
        const parsed = JSON.parse(e.newValue || "[]");
        recentTools = Array.isArray(parsed) ? parsed.filter(t => typeof t === "string") : [];
        if (currentCategory === "recents") {
          renderTools();
        }
      } catch (err) {
        console.error("Error al sincronizar recientes:", err);
      }
      break;

    case "tooldrive_notes":
      try {
        quickNotes = JSON.parse(e.newValue || '""');
      } catch {
        quickNotes = e.newValue || "";
      }
      break;
  }
});

// ==================== WORKSPACE BUILDER FOR TOOLS ====================
function buildToolWorkspace(tool, container, footer) {
  footer.innerHTML = "";

  switch (tool.id) {
    // ---------------- QR CODE GENERATOR ----------------
    case "qr-generator": {
      container.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 280px; gap: 24px;">
          <div>
            <div class="ui-control-group">
              <label class="ui-control-label">Contenido o Enlace para el QR:</label>
              <textarea id="qrInputText" class="ui-textarea" style="height: 100px;" placeholder="Ingresa texto, URL (https://...), número de WhatsApp, etc.">https://google.com</textarea>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div class="ui-control-group">
                <label class="ui-control-label">Color del QR:</label>
                <input type="color" id="qrColorDark" class="ui-input" value="#000000" style="height: 42px; padding: 2px;">
              </div>
              <div class="ui-control-group">
                <label class="ui-control-label">Color de Fondo:</label>
                <input type="color" id="qrColorLight" class="ui-input" value="#ffffff" style="height: 42px; padding: 2px;">
              </div>
            </div>
            <div class="ui-control-group">
              <label class="ui-control-label">Tamaño de salida:</label>
              <select id="qrSizeSelect" class="ui-select">
                <option value="256">256 x 256 px (Estándar)</option>
                <option value="512" selected>512 x 512 px (Alta resolución)</option>
                <option value="1024">1024 x 1024 px (Impresión nítida)</option>
              </select>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; background: #f8fafd; border-radius: 16px; padding: 16px; border: 1px solid #e1e3e1;">
            <canvas id="qrOutputCanvas" style="max-width: 100%; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"></canvas>
            <div style="font-size: 11px; color: #747775; margin-top: 10px;">Vista previa en tiempo real</div>
          </div>
        </div>
      `;

      footer.innerHTML = `
        <button class="ui-btn ui-btn-outlined" onclick="closeToolModal()">Cerrar</button>
        <button class="ui-btn ui-btn-primary" onclick="downloadQR()">Descargar QR PNG</button>
      `;

      function updateQR() {
        const text = document.getElementById("qrInputText").value || " ";
        const colorDark = document.getElementById("qrColorDark").value;
        const colorLight = document.getElementById("qrColorLight").value;
        const size = parseInt(document.getElementById("qrSizeSelect").value);
        const canvas = document.getElementById("qrOutputCanvas");
        if (window.generateQRCodeToCanvas) {
          window.generateQRCodeToCanvas(canvas, text, { colorDark, colorLight, size });
        }
      }

      document.getElementById("qrInputText").addEventListener("input", updateQR);
      document.getElementById("qrColorDark").addEventListener("input", updateQR);
      document.getElementById("qrColorLight").addEventListener("input", updateQR);
      document.getElementById("qrSizeSelect").addEventListener("change", updateQR);
      updateQR();

      window.downloadQR = function() {
        const canvas = document.getElementById("qrOutputCanvas");
        const a = document.createElement("a");
        a.download = "codigo-qr-tooldrive.png";
        a.href = canvas.toDataURL("image/png");
        a.click();
        showToast("Código QR descargado con éxito");
      };
      break;
    }

    // ---------------- WORD COUNTER ----------------
    case "word-counter": {
      container.innerHTML = `
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-value" id="wcWords">0</div>
            <div class="stat-label">Palabras</div>
          </div>
          <div class="stat-card">
            <div class="stat-value" id="wcChars">0</div>
            <div class="stat-label">Caracteres</div>
          </div>
          <div class="stat-card">
            <div class="stat-value" id="wcCharsNoSpace">0</div>
            <div class="stat-label">Sin espacios</div>
          </div>
          <div class="stat-card">
            <div class="stat-value" id="wcSentences">0</div>
            <div class="stat-label">Oraciones</div>
          </div>
          <div class="stat-card">
            <div class="stat-value" id="wcParagraphs">0</div>
            <div class="stat-label">Párrafos</div>
          </div>
          <div class="stat-card">
            <div class="stat-value" id="wcReadingTime">0s</div>
            <div class="stat-label">Lectura</div>
          </div>
        </div>
        <div class="ui-control-group">
          <label class="ui-control-label">Ingresa o pega tu texto para analizar:</label>
          <textarea id="wcTextarea" class="ui-textarea" style="height: 220px;" placeholder="Pega aquí tu ensayo, artículo, resumen o documento..."></textarea>
        </div>
      `;

      footer.innerHTML = `
        <button class="ui-btn ui-btn-outlined" onclick="document.getElementById('wcTextarea').value=''; document.getElementById('wcTextarea').dispatchEvent(new Event('input'))">Limpiar</button>
        <button class="ui-btn ui-btn-tonal" onclick="navigator.clipboard.writeText(document.getElementById('wcTextarea').value); showToast('Texto copiado')">Copiar texto</button>
        <button class="ui-btn ui-btn-primary" onclick="closeToolModal()">Listo</button>
      `;

      const textarea = document.getElementById("wcTextarea");
      textarea.addEventListener("input", () => {
        const text = textarea.value;
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        const chars = text.length;
        const charsNoSpace = text.replace(/\s/g, "").length;
        const sentences = text.trim() ? (text.match(/[^.!?]+[.!?]+(\s|$)/g) || []).length || (words > 0 ? 1 : 0) : 0;
        const paragraphs = text.trim() ? text.split(/\n+/).filter(p => p.trim().length > 0).length : 0;
        const readingSecs = Math.ceil((words / 200) * 60);
        const readingTime = readingSecs < 60 ? `${readingSecs}s` : `${Math.floor(readingSecs/60)}m ${readingSecs%60}s`;

        document.getElementById("wcWords").innerText = words;
        document.getElementById("wcChars").innerText = chars;
        document.getElementById("wcCharsNoSpace").innerText = charsNoSpace;
        document.getElementById("wcSentences").innerText = sentences;
        document.getElementById("wcParagraphs").innerText = paragraphs;
        document.getElementById("wcReadingTime").innerText = readingTime;
      });
      break;
    }

    // ---------------- CASE CONVERTER ----------------
    case "case-converter": {
      container.innerHTML = `
        <div class="ui-control-group">
          <label class="ui-control-label">Texto a convertir:</label>
          <textarea id="caseInputText" class="ui-textarea" style="height: 160px;" placeholder="Escribe o pega aquí el texto que deseas transformar..."></textarea>
        </div>
        <div class="ui-control-label">Selecciona el formato deseado:</div>
        <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px;">
          <button class="ui-btn ui-btn-tonal" onclick="convertCase('upper')">MAYÚSCULAS</button>
          <button class="ui-btn ui-btn-tonal" onclick="convertCase('lower')">minúsculas</button>
          <button class="ui-btn ui-btn-tonal" onclick="convertCase('title')">Formato De Título</button>
          <button class="ui-btn ui-btn-tonal" onclick="convertCase('sentence')">Formato oración</button>
          <button class="ui-btn ui-btn-tonal" onclick="convertCase('camel')">camelCase</button>
          <button class="ui-btn ui-btn-tonal" onclick="convertCase('kebab')">kebab-case</button>
          <button class="ui-btn ui-btn-tonal" onclick="convertCase('snake')">snake_case</button>
          <button class="ui-btn ui-btn-tonal" onclick="convertCase('invert')">iNVERTIR mAYÚS</button>
        </div>
      `;

      footer.innerHTML = `
        <button class="ui-btn ui-btn-outlined" onclick="document.getElementById('caseInputText').value=''">Limpiar</button>
        <button class="ui-btn ui-btn-primary" onclick="navigator.clipboard.writeText(document.getElementById('caseInputText').value); showToast('Texto copiado al portapapeles')">Copiar Resultado</button>
      `;

      window.convertCase = function(type) {
        const area = document.getElementById("caseInputText");
        let val = area.value;
        if (!val) return;

        switch (type) {
          case "upper":
            area.value = val.toUpperCase();
            break;
          case "lower":
            area.value = val.toLowerCase();
            break;
          case "title":
            area.value = val.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase());
            break;
          case "sentence":
            area.value = val.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
            break;
          case "camel":
            area.value = val.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
            break;
          case "kebab":
            area.value = val.toLowerCase().trim().replace(/[^a-zA-Z0-9]+/g, "-");
            break;
          case "snake":
            area.value = val.toLowerCase().trim().replace(/[^a-zA-Z0-9]+/g, "_");
            break;
          case "invert":
            area.value = val.split("").map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join("");
            break;
        }
        showToast("Formato aplicado");
      };
      break;
    }

    // ---------------- LOREM IPSUM GENERATOR ----------------
    case "lorem-ipsum": {
      container.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 16px;">
          <div class="ui-control-group">
            <label class="ui-control-label">Cantidad:</label>
            <input type="number" id="loremCount" class="ui-input" value="3" min="1" max="50">
          </div>
          <div class="ui-control-group">
            <label class="ui-control-label">Tipo de elemento:</label>
            <select id="loremType" class="ui-select">
              <option value="paragraphs" selected>Párrafos</option>
              <option value="sentences">Frases</option>
              <option value="words">Palabras</option>
            </select>
          </div>
          <div class="ui-control-group" style="display: flex; align-items: center; margin-top: 24px;">
            <label style="font-size: 13px; display: flex; align-items: center; gap: 8px; cursor: pointer;">
              <input type="checkbox" id="loremStartWith" checked> Empezar con "Lorem ipsum..."
            </label>
          </div>
        </div>
        <div class="ui-control-group">
          <label class="ui-control-label">Texto generado:</label>
          <textarea id="loremOutput" class="ui-textarea" style="height: 220px;" readonly></textarea>
        </div>
      `;

      footer.innerHTML = `
        <button class="ui-btn ui-btn-tonal" onclick="generateLorem()">Regenerar</button>
        <button class="ui-btn ui-btn-primary" onclick="navigator.clipboard.writeText(document.getElementById('loremOutput').value); showToast('Lorem ipsum copiado')">Copiar Texto</button>
      `;

      const standardWords = ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate", "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum"];

      window.generateLorem = function() {
        const count = parseInt(document.getElementById("loremCount").value) || 3;
        const type = document.getElementById("loremType").value;
        const startWith = document.getElementById("loremStartWith").checked;

        let result = "";

        if (type === "words") {
          let list = [];
          for (let i = 0; i < count; i++) {
            list.push(standardWords[Math.floor(Math.random() * standardWords.length)]);
          }
          if (startWith && count >= 2) {
            list[0] = "lorem";
            list[1] = "ipsum";
          }
          result = list.join(" ");
        } else if (type === "sentences") {
          let sentences = [];
          for (let i = 0; i < count; i++) {
            let len = Math.floor(Math.random() * 8) + 8;
            let w = [];
            for (let j = 0; j < len; j++) {
              w.push(standardWords[Math.floor(Math.random() * standardWords.length)]);
            }
            let s = w.join(" ");
            sentences.push(s.charAt(0).toUpperCase() + s.slice(1) + ".");
          }
          if (startWith && sentences.length > 0) {
            sentences[0] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
          }
          result = sentences.join(" ");
        } else {
          let paragraphs = [];
          for (let i = 0; i < count; i++) {
            let sentCount = Math.floor(Math.random() * 3) + 4;
            let sents = [];
            for (let s = 0; s < sentCount; s++) {
              let len = Math.floor(Math.random() * 8) + 8;
              let w = [];
              for (let j = 0; j < len; j++) {
                w.push(standardWords[Math.floor(Math.random() * standardWords.length)]);
              }
              let str = w.join(" ");
              sents.push(str.charAt(0).toUpperCase() + str.slice(1) + ".");
            }
            if (i === 0 && startWith) {
              sents[0] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
            }
            paragraphs.push(sents.join(" "));
          }
          result = paragraphs.join("\n\n");
        }

        document.getElementById("loremOutput").value = result;
      };

      generateLorem();
      break;
    }

    // ---------------- JSON FORMATTER ----------------
    case "json-formatter": {
      container.innerHTML = `
        <div style="display: flex; gap: 8px; margin-bottom: 12px; align-items: center;">
          <button class="ui-btn ui-btn-tonal" onclick="formatJSON(2)">Formatear (2 espacios)</button>
          <button class="ui-btn ui-btn-tonal" onclick="formatJSON(4)">Formatear (4 espacios)</button>
          <button class="ui-btn ui-btn-tonal" onclick="minifyJSON()">Minificar</button>
          <button class="ui-btn ui-btn-outlined" onclick="document.getElementById('jsonArea').value=''; document.getElementById('jsonStatus').innerText='Esperando código JSON...'; document.getElementById('jsonStatus').style.color='#747775';">Limpiar</button>
          <span id="jsonStatus" style="margin-left: auto; font-size: 13px; font-weight: 500; color: #747775;">Listo</span>
        </div>
        <textarea id="jsonArea" class="ui-textarea" style="height: 320px; font-family: monospace; font-size: 13px;" placeholder='{"herramienta": "JSON Formatter", "estado": "activo", "opciones": [1, 2, 3]}'>{"herramienta":"JSON Formatter","modulo":"Utilidades Web y Desarrollador","version":2.0,"compatibilidad":["Chrome","Edge","Safari","Firefox"],"seguridad":{"procesamiento":"local","envio_servidores":false}}</textarea>
      `;

      footer.innerHTML = `
        <button class="ui-btn ui-btn-outlined" onclick="downloadJSON()">Descargar archivo .json</button>
        <button class="ui-btn ui-btn-primary" onclick="navigator.clipboard.writeText(document.getElementById('jsonArea').value); showToast('JSON copiado')">Copiar JSON</button>
      `;

      window.formatJSON = function(spaces) {
        const area = document.getElementById("jsonArea");
        const status = document.getElementById("jsonStatus");
        try {
          const parsed = JSON.parse(area.value);
          area.value = JSON.stringify(parsed, null, spaces);
          status.textContent = "✓ JSON Válido y formateado";
          status.style.color = "#34a853";
          showToast("JSON Formateado");
        } catch (err) {
          status.textContent = "✗ Error de sintaxis: " + err.message;
          status.style.color = "#ea4335";
        }
      };

      window.minifyJSON = function() {
        const area = document.getElementById("jsonArea");
        const status = document.getElementById("jsonStatus");
        try {
          const parsed = JSON.parse(area.value);
          area.value = JSON.stringify(parsed);
          status.textContent = "✓ JSON Minificado correctamente";
          status.style.color = "#34a853";
          showToast("JSON Minificado");
        } catch (err) {
          status.textContent = "✗ Error de sintaxis: " + err.message;
          status.style.color = "#ea4335";
        }
      };

      window.downloadJSON = function() {
        const text = document.getElementById("jsonArea").value;
        const blob = new Blob([text], { type: "application/json" });
        const a = document.createElement("a");
        const blobUrl = URL.createObjectURL(blob);
        a.href = blobUrl;
        a.download = "data.json";
        a.click();
        setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
        showToast("Archivo JSON descargado");
      };

      formatJSON(2);
      break;
    }

    // ---------------- COLOR PICKER ----------------
    case "color-picker": {
      container.innerHTML = `
        <div style="display: grid; grid-template-columns: 240px 1fr; gap: 24px;">
          <div>
            <div id="colorPreviewBox" style="width: 100%; height: 160px; border-radius: 16px; background-color: #0b57d0; box-shadow: 0 4px 12px rgba(0,0,0,0.15); margin-bottom: 14px; transition: background 0.15s ease;"></div>
            <input type="color" id="nativeColorInput" value="#0b57d0" style="width: 100%; height: 44px; border: none; cursor: pointer; border-radius: 8px;">
            <button id="btnEyeDropper" class="ui-btn ui-btn-tonal" style="width: 100%; margin-top: 10px;">
              <span>🧪 Cuentagotas (Pantalla)</span>
            </button>
          </div>
          <div>
            <div class="ui-control-group">
              <label class="ui-control-label">Código HEX:</label>
              <div style="display: flex; gap: 8px;">
                <input type="text" id="hexVal" class="ui-input" readonly value="#0B57D0">
                <button class="ui-btn ui-btn-tonal" onclick="copyColor('hexVal')">Copiar</button>
              </div>
            </div>
            <div class="ui-control-group">
              <label class="ui-control-label">Código RGB:</label>
              <div style="display: flex; gap: 8px;">
                <input type="text" id="rgbVal" class="ui-input" readonly value="rgb(11, 87, 208)">
                <button class="ui-btn ui-btn-tonal" onclick="copyColor('rgbVal')">Copiar</button>
              </div>
            </div>
            <div class="ui-control-group">
              <label class="ui-control-label">Código HSL:</label>
              <div style="display: flex; gap: 8px;">
                <input type="text" id="hslVal" class="ui-input" readonly value="hsl(217, 90%, 43%)">
                <button class="ui-btn ui-btn-tonal" onclick="copyColor('hslVal')">Copiar</button>
              </div>
            </div>
            <div class="ui-control-label" style="margin-top: 14px;">Paleta de Google Material:</div>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              ${["#4285f4", "#ea4335", "#fbbc04", "#34a853", "#9c27b0", "#00bcd4", "#ff5722", "#1f1f1f", "#ffffff"].map(c => `
                <div style="width: 32px; height: 32px; border-radius: 8px; background: ${c}; cursor: pointer; border: 1px solid rgba(0,0,0,0.15);" onclick="setColor('${c}')"></div>
              `).join("")}
            </div>
          </div>
        </div>
      `;

      footer.innerHTML = `
        <button class="ui-btn ui-btn-primary" onclick="closeToolModal()">Listo</button>
      `;

      function updateColorValues(hex) {
        const box = document.getElementById("colorPreviewBox");
        const hexVal = document.getElementById("hexVal");
        const rgbVal = document.getElementById("rgbVal");
        const hslVal = document.getElementById("hslVal");
        const colorInput = document.getElementById("nativeColorInput");

        colorInput.value = hex;
        box.style.backgroundColor = hex;
        hexVal.value = hex.toUpperCase();

        // Convert HEX to RGB
        const r = parseInt(hex.slice(1, 3), 16) || 0;
        const g = parseInt(hex.slice(3, 5), 16) || 0;
        const b = parseInt(hex.slice(5, 7), 16) || 0;
        rgbVal.value = `rgb(${r}, ${g}, ${b})`;

        // Convert RGB to HSL
        const rNorm = r / 255, gNorm = g / 255, bNorm = b / 255;
        const max = Math.max(rNorm, gNorm, bNorm), min = Math.min(rNorm, gNorm, bNorm);
        let h, s, l = (max + min) / 2;
        if (max === min) {
          h = s = 0;
        } else {
          const d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          switch (max) {
            case rNorm: h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0); break;
            case gNorm: h = (bNorm - rNorm) / d + 2; break;
            case bNorm: h = (rNorm - gNorm) / d + 4; break;
          }
          h /= 6;
        }
        hslVal.value = `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
      }

      document.getElementById("nativeColorInput").addEventListener("input", (e) => {
        updateColorValues(e.target.value);
      });

      window.setColor = function(hex) {
        updateColorValues(hex);
      };

      window.copyColor = function(id) {
        const val = document.getElementById(id).value;
        navigator.clipboard.writeText(val);
        showToast(`Copiado: ${val}`);
      };

      const btnEye = document.getElementById("btnEyeDropper");
      if (btnEye) {
        if (window.EyeDropper) {
          btnEye.addEventListener("click", async () => {
            try {
              const eyeDropper = new EyeDropper();
              const res = await eyeDropper.open();
              if (res && res.sRGBHex) {
                updateColorValues(res.sRGBHex);
                showToast("Color seleccionado con éxito");
              }
            } catch(e) {
              if (e.name !== "AbortError") {
                showToast("No se pudo obtener el color de pantalla");
              }
            }
          });
        } else {
          btnEye.disabled = true;
          btnEye.style.opacity = "0.55";
          btnEye.style.cursor = "not-allowed";
          btnEye.title = "Cuentagotas no compatible con este navegador (se requiere Google Chrome o Microsoft Edge)";
          const hint = document.createElement("div");
          hint.style.fontSize = "11px";
          hint.style.color = "var(--md-sys-color-outline)";
          hint.style.marginTop = "6px";
          hint.style.textAlign = "center";
          hint.textContent = "Navegador no compatible con EyeDropper (usa Chrome o Edge)";
          btnEye.parentNode.appendChild(hint);
        }
      }
      break;
    }

    // ---------------- SPEECH TO TEXT ----------------
    case "speech-to-text": {
      container.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
          <div id="micPulseBtn" style="width: 80px; height: 80px; border-radius: 50%; background: #ea4335; color: white; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 16px rgba(234,67,53,0.3); transition: transform 0.2s;" onclick="toggleDictation()">
            <svg viewBox="0 0 24 24" width="36" height="36" fill="currentColor"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>
          </div>
          <div id="micStatusText" style="margin-top: 10px; font-size: 14px; font-weight: 500; color: #444746;">Toca el micrófono para comenzar a dictar</div>
          <div style="margin-top: 8px;">
            <select id="speechLang" class="ui-select" style="width: 220px; display: inline-block;">
              <option value="es-ES" selected>Español (España)</option>
              <option value="es-MX">Español (Latinoamérica)</option>
              <option value="en-US">English (US)</option>
            </select>
          </div>
        </div>
        <div class="ui-control-group">
          <label class="ui-control-label">Texto transcrito:</label>
          <textarea id="speechOutput" class="ui-textarea" style="height: 180px; font-size: 15px; line-height: 1.5;" placeholder="Tu voz aparecerá aquí transcrita automáticamente..."></textarea>
        </div>
      `;

      footer.innerHTML = `
        <button class="ui-btn ui-btn-outlined" onclick="document.getElementById('speechOutput').value=''">Limpiar</button>
        <button class="ui-btn ui-btn-primary" onclick="navigator.clipboard.writeText(document.getElementById('speechOutput').value); showToast('Transcripción copiada')">Copiar Transcripción</button>
      `;

      let isRecording = false;
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

      const initBtn = document.getElementById("micPulseBtn");
      const initStatus = document.getElementById("micStatusText");
      if (!SpeechRecognition && initStatus) {
        initStatus.textContent = "Tu navegador no soporta reconocimiento de voz. Por favor usa Google Chrome o Microsoft Edge.";
        initStatus.style.color = "#ea4335";
        if (initBtn) {
          initBtn.style.opacity = "0.55";
          initBtn.style.cursor = "not-allowed";
          initBtn.style.boxShadow = "none";
        }
      }

      window.toggleDictation = function() {
        const btn = document.getElementById("micPulseBtn");
        const status = document.getElementById("micStatusText");
        const area = document.getElementById("speechOutput");
        const lang = document.getElementById("speechLang").value;

        if (!SpeechRecognition) {
          status.textContent = "Tu navegador no soporta Web Speech API. Usa Google Chrome o Edge.";
          status.style.color = "#ea4335";
          showToast("Navegador no compatible con dictado por voz");
          return;
        }

        if (isRecording) {
          if (window.speechRecognitionInstance) window.speechRecognitionInstance.stop();
          isRecording = false;
          btn.style.transform = "scale(1)";
          btn.style.background = "#ea4335";
          status.textContent = "Dictado pausado. Toca de nuevo para reanudar.";
          status.style.color = "#444746";
        } else {
          const rec = new SpeechRecognition();
          rec.lang = lang;
          rec.continuous = true;
          rec.interimResults = true;

          rec.onstart = () => {
            isRecording = true;
            btn.style.transform = "scale(1.1)";
            btn.style.background = "#34a853";
            status.textContent = "🔴 Escuchando... Habla ahora claramente.";
            status.style.color = "#34a853";
          };

          rec.onresult = (e) => {
            let transcript = "";
            for (let i = 0; i < e.results.length; i++) {
              transcript += e.results[i][0].transcript + " ";
            }
            area.value = transcript;
          };

          rec.onerror = (e) => {
            let userMsg = "Error en el reconocimiento de voz: " + (e.error || "desconocido");
            if (e.error === "not-allowed") {
              userMsg = "Permiso de micrófono denegado. Permite el acceso al micrófono en tu navegador.";
            } else if (e.error === "no-speech") {
              userMsg = "No se detectó voz. Asegúrate de hablar claramente cerca del micrófono.";
            } else if (e.error === "audio-capture") {
              userMsg = "No se encontró ningún micrófono conectado en tu equipo.";
            } else if (e.error === "network") {
              userMsg = "Error de conexión con el servicio de voz. Revisa tu conexión a Internet.";
            }
            status.textContent = userMsg;
            status.style.color = "#ea4335";
            isRecording = false;
            btn.style.transform = "scale(1)";
            btn.style.background = "#ea4335";
            showToast(userMsg);
          };

          rec.onend = () => {
            isRecording = false;
            btn.style.transform = "scale(1)";
            btn.style.background = "#ea4335";
            if (!status.textContent.includes("denegado") && !status.textContent.includes("No se encontró")) {
              status.textContent = "Dictado finalizado.";
              status.style.color = "#444746";
            }
          };

          window.speechRecognitionInstance = rec;
          rec.start();
        }
      };
      break;
    }

    // ---------------- URL SHORTENER ----------------
    case "url-shortener": {
      container.innerHTML = `
        <div class="ui-control-group">
          <label class="ui-control-label">Ingresa la URL larga que deseas acortar:</label>
          <input type="url" id="shortenerInput" class="ui-input" placeholder="https://ejemplo-muy-largo.com/articulo?ref=tooldrive" value="https://google.com">
        </div>
        <div style="background: var(--md-sys-color-surface-variant); border: 1px solid var(--md-sys-color-outline-variant); border-radius: 8px; padding: 10px 14px; font-size: 12px; color: var(--md-sys-color-on-surface-variant); margin-bottom: 14px; line-height: 1.4;">
          🔒 <strong>Aviso de privacidad y servicio externo:</strong> Esta herramienta envía la dirección web ingresada a la API pública de <strong>is.gd</strong> para crear el enlace corto permanente. Ningún otro dato de tu sesión es transmitido.
        </div>

        <div id="shortResultBox" style="display: none; padding: 16px; border-radius: 12px; background: var(--md-sys-color-surface-variant); border: 1px solid var(--md-sys-color-outline-variant); margin-top: 14px;">
          <div style="font-size: 12px; font-weight: 600; margin-bottom: 8px;">Enlace corto real generado:</div>
          <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 14px;">
            <input type="text" id="shortResultUrl" class="ui-input" style="font-weight: 600; color: var(--md-sys-color-primary);" readonly>
            <button class="ui-btn ui-btn-primary" onclick="navigator.clipboard.writeText(document.getElementById('shortResultUrl').value); showToast('Enlace copiado')">Copiar</button>
            <a id="shortResultVisitLink" href="#" target="_blank" class="ui-btn ui-btn-outlined" style="text-decoration: none; display: inline-flex; align-items: center;">Abrir</a>
          </div>
          <div style="display: flex; align-items: center; gap: 14px; background: var(--md-sys-color-surface); padding: 12px; border-radius: 8px; border: 1px solid var(--md-sys-color-outline-variant);">
            <canvas id="shortenerQrCanvas" style="width: 80px; height: 80px; border-radius: 4px;"></canvas>
            <div style="font-size: 12px;">
              <div style="font-weight: 600;">Código QR complementario</div>
              <div style="color: var(--md-sys-color-on-surface-variant);">Escanea este QR para redirigirte al enlace corto en tu móvil.</div>
            </div>
          </div>
        </div>
      `;

      footer.innerHTML = `
        <button class="ui-btn ui-btn-outlined" onclick="closeToolModal()">Cerrar</button>
        <button id="btnShortenSubmit" class="ui-btn ui-btn-primary" onclick="generateShortUrl()">Acortar Enlace Real</button>
      `;

      window.generateShortUrl = async function() {
        const rawInput = document.getElementById("shortenerInput").value.trim();
        let parsed;
        try {
          parsed = new URL(rawInput);
        } catch (e) {
          showToast("Ingresa una URL completa y válida (ej. https://ejemplo.com)");
          return;
        }

        if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
          showToast("El enlace debe utilizar protocolo HTTP o HTTPS");
          return;
        }

        const longUrl = parsed.href;
        const btn = document.getElementById("btnShortenSubmit");
        if (btn) {
          btn.setAttribute("disabled", "true");
          btn.innerText = "Acortando...";
        }
        showToast("Generando enlace corto en is.gd...");

        try {
          const resp = await fetch(`https://is.gd/create.php?format=json&url=${encodeURIComponent(longUrl)}`);
          const data = await resp.json();
          if (data && data.shorturl) {
            document.getElementById("shortResultUrl").value = data.shorturl;
            document.getElementById("shortResultVisitLink").href = data.shorturl;
            document.getElementById("shortResultBox").style.display = "block";

            // Render QR code
            const canvas = document.getElementById("shortenerQrCanvas");
            if (canvas && window.generateQRCodeToCanvas) {
              window.generateQRCodeToCanvas(canvas, data.shorturl, { size: 160 });
            }

            showToast("✓ Enlace acortado real creado con éxito");
          } else {
            showToast("Error al acortar: " + (data.errormessage || "Verifica la URL"));
          }
        } catch (e) {
          showToast("No se pudo conectar con el servicio. Comprueba tu conexión.");
        } finally {
          if (btn) {
            btn.removeAttribute("disabled");
            btn.innerText = "Acortar Enlace Real";
          }
        }
      };
      break;
    }

    // ---------------- SIGN PDF (FIRMAR DOCUMENTOS) ----------------
    case "sign-pdf": {
      container.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr; gap: 14px;">
          <div>
            <label class="ui-control-label">1. Dibuja tu firma digital con ratón o pantalla táctil:</label>
            <div style="display: flex; gap: 10px; margin-bottom: 8px; align-items: center;">
              <span style="font-size: 13px;">Color:</span>
              <button class="icon-btn" style="background: #000; width: 24px; height: 24px; border-radius: 50%;" onclick="setPenColor('#000000')" title="Negro" aria-label="Color de trazo negro"></button>
              <button class="icon-btn" style="background: #0b57d0; width: 24px; height: 24px; border-radius: 50%;" onclick="setPenColor('#0b57d0')" title="Azul" aria-label="Color de trazo azul"></button>
              <button class="icon-btn" style="background: #ea4335; width: 24px; height: 24px; border-radius: 50%;" onclick="setPenColor('#ea4335')" title="Rojo" aria-label="Color de trazo rojo"></button>
              <button class="ui-btn ui-btn-outlined" style="margin-left: auto; height: 30px; font-size: 12px; padding: 4px 10px;" onclick="clearSignature()">Borrar trazo</button>
            </div>
            <div style="border: 1px dashed var(--md-sys-color-outline-variant); border-radius: 12px; background: var(--md-sys-color-surface); padding: 4px;">
              <canvas id="signPadCanvas" class="signature-canvas" style="width: 100%; height: 160px; display: block; touch-action: none; cursor: crosshair;"></canvas>
            </div>
          </div>

          <div style="background: var(--md-sys-color-surface-variant); border-radius: 12px; padding: 14px; border: 1px solid var(--md-sys-color-outline-variant);">
            <div style="font-size: 13px; font-weight: 600; margin-bottom: 6px;">2. Documento PDF a firmar (Opcional):</div>
            <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
              <input type="file" id="signPdfFileInput" accept=".pdf" style="display: none;" />
              <button class="ui-btn ui-btn-outlined" onclick="document.getElementById('signPdfFileInput').click()" style="font-size: 12px;">
                📄 Cargar archivo PDF
              </button>
              <span id="signPdfFileInfo" style="font-size: 12px; color: var(--md-sys-color-on-surface-variant);">Ningún PDF seleccionado (se descargará solo la firma PNG)</span>
            </div>
            <div id="signPageChoiceWrap" style="display: none; margin-top: 10px; font-size: 12px;">
              <label class="ui-control-label" style="font-size: 12px; margin-bottom: 4px;">Estampar firma en:</label>
              <select id="signPageChoice" class="ui-select" style="max-width: 240px; padding: 4px 8px; font-size: 12px;">
                <option value="last" selected>Última página (Recomendado)</option>
                <option value="first">Primera página</option>
                <option value="all">Todas las páginas</option>
              </select>
            </div>
          </div>
        </div>
      `;

      footer.innerHTML = `
        <button class="ui-btn ui-btn-outlined" onclick="closeToolModal()">Cerrar</button>
        <button class="ui-btn ui-btn-outlined" onclick="downloadSignature()">Descargar PNG Transparente</button>
        <button id="btnSignPdfDirect" class="ui-btn ui-btn-primary" disabled onclick="applySignatureToPdf()">Firmar y Descargar PDF</button>
      `;

      const canvas = document.getElementById("signPadCanvas");
      const ctx = canvas.getContext("2d");
      canvas.width = canvas.parentElement.clientWidth || 550;
      canvas.height = 160;
      canvas.style.touchAction = "none";

      let isDrawing = false;
      let hasDrawn = false;
      let penColor = "#000000";
      let loadedPdfToSign = null;

      ctx.lineWidth = 2.5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = penColor;

      function getPos(e) {
        const rect = canvas.getBoundingClientRect();
        const touch = (e.touches && e.touches.length > 0) ? e.touches[0] : ((e.changedTouches && e.changedTouches.length > 0) ? e.changedTouches[0] : null);
        const clientX = touch ? touch.clientX : e.clientX;
        const clientY = touch ? touch.clientY : e.clientY;
        return {
          x: (clientX - rect.left) * (canvas.width / rect.width),
          y: (clientY - rect.top) * (canvas.height / rect.height)
        };
      }

      function startDraw(e) {
        if (e && e.cancelable) e.preventDefault();
        isDrawing = true;
        hasDrawn = true;
        checkSignPdfReady();
        const pos = getPos(e);
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
      }

      function draw(e) {
        if (!isDrawing) return;
        if (e && e.cancelable) e.preventDefault();
        const pos = getPos(e);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
      }

      function stopDraw(e) {
        if (e && e.cancelable) e.preventDefault();
        isDrawing = false;
      }

      canvas.addEventListener("mousedown", startDraw);
      canvas.addEventListener("mousemove", draw);
      canvas.addEventListener("mouseup", stopDraw);
      canvas.addEventListener("mouseleave", stopDraw);

      canvas.addEventListener("touchstart", startDraw, { passive: false });
      canvas.addEventListener("touchmove", draw, { passive: false });
      canvas.addEventListener("touchend", stopDraw, { passive: false });
      canvas.addEventListener("touchcancel", stopDraw, { passive: false });

      window.setPenColor = function(c) {
        penColor = c;
        ctx.strokeStyle = penColor;
      };

      window.clearSignature = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        hasDrawn = false;
        checkSignPdfReady();
      };

      function checkSignPdfReady() {
        const btn = document.getElementById("btnSignPdfDirect");
        if (btn) {
          if (loadedPdfToSign && hasDrawn) {
            btn.removeAttribute("disabled");
          } else {
            btn.setAttribute("disabled", "true");
          }
        }
      }

      const pdfInput = document.getElementById("signPdfFileInput");
      pdfInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;
        loadedPdfToSign = file;
        document.getElementById("signPdfFileInfo").innerHTML = `✓ <strong>${escapeHtml(file.name)}</strong> (${(file.size / 1024).toFixed(1)} KB)`;
        document.getElementById("signPageChoiceWrap").style.display = "block";
        checkSignPdfReady();
        showToast("PDF cargado listo para firmar");
      });

      window.downloadSignature = function() {
        if (!hasDrawn) {
          showToast("Dibuja tu firma en el recuadro primero");
          return;
        }
        const a = document.createElement("a");
        a.download = "mi-firma-digital.png";
        a.href = canvas.toDataURL("image/png");
        a.click();
        showToast("Firma PNG descargada");
      };

      window.applySignatureToPdf = async function() {
        if (!loadedPdfToSign) {
          showToast("Carga un archivo PDF para firmar");
          return;
        }
        if (!hasDrawn) {
          showToast("Dibuja tu firma en el recuadro");
          return;
        }
        if (typeof PDFLib === "undefined") {
          showToast("Cargando motor PDF...");
          return;
        }

        const btn = document.getElementById("btnSignPdfDirect");
        btn.setAttribute("disabled", "true");
        btn.innerText = "Estampando firma...";

        try {
          const pdfBytes = await loadedPdfToSign.arrayBuffer();
          const pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);
          const pngDataUrl = canvas.toDataURL("image/png");
          const pngBytes = await fetch(pngDataUrl).then(r => r.arrayBuffer());
          const signatureImage = await pdfDoc.embedPng(pngBytes);

          const pages = pdfDoc.getPages();
          const choice = document.getElementById("signPageChoice")?.value || "last";

          let targetPages = [];
          if (choice === "first") targetPages = [pages[0]];
          else if (choice === "all") targetPages = pages;
          else targetPages = [pages[pages.length - 1]];

          const sigW = 150;
          const sigH = (sigW / canvas.width) * canvas.height;

          targetPages.forEach(p => {
            const { width, height } = p.getSize();
            const rot = ((p.getRotation()?.angle || 0) % 360 + 360) % 360;
            let transform;
            if (rot === 90) {
              transform = {
                x: width - 45,
                y: height - 40 - sigW,
                rotate: PDFLib.degrees(90)
              };
            } else if (rot === 180) {
              transform = {
                x: 40 + sigW,
                y: height - 45 + sigH,
                rotate: PDFLib.degrees(180)
              };
            } else if (rot === 270) {
              transform = {
                x: 45,
                y: 40 + sigW,
                rotate: PDFLib.degrees(270)
              };
            } else {
              transform = {
                x: width - sigW - 40,
                y: 45,
                rotate: PDFLib.degrees(0)
              };
            }

            p.drawImage(signatureImage, {
              ...transform,
              width: sigW,
              height: sigH
            });
          });

          const signedBytes = await pdfDoc.save();
          const blob = new Blob([signedBytes], { type: "application/pdf" });
          const a = document.createElement("a");
          const baseName = loadedPdfToSign.name.replace(/\.[^/.]+$/, "");
          a.download = `${baseName}-firmado.pdf`;
          const blobUrl = URL.createObjectURL(blob);
          a.href = blobUrl;
          a.click();
          setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);

          showToast("✓ ¡Documento PDF firmado y descargado!");
          closeToolModal();
        } catch (err) {
          console.error("Error al firmar PDF:", err);
          showToast("Error al estampar firma en el PDF");
        } finally {
          btn.removeAttribute("disabled");
          btn.innerText = "Firmar y Descargar PDF";
        }
      };
      break;
    }

    // ---------------- REAL IMAGE PROCESSING (PNG/JPG/WEBP/SVG/RESIZE/COMPRESS/CROP) ----------------
    case "png-to-jpg":
    case "webp-to-jpg":
    case "svg-to-png":
    case "image-compress":
    case "image-resize":
    case "crop-image": {
      const isResize = tool.id === "image-resize";
      const isCrop = tool.id === "crop-image";

      let formatTarget = "image/jpeg";
      let extTarget = ".jpg";
      if (tool.id === "svg-to-png") { formatTarget = "image/png"; extTarget = ".png"; }

      container.innerHTML = `
        <div class="ui-dropzone" id="imgDropzone" onclick="document.getElementById('imgFileInput').click()">
          <input type="file" id="imgFileInput" style="display: none;" accept="image/*,.svg">
          <div class="ui-dropzone-icon">${ICONS.image}</div>
          <div class="ui-dropzone-title">Selecciona o arrastra una imagen</div>
          <div class="ui-dropzone-sub">Compatible con PNG, JPG, WebP o SVG</div>
        </div>

        <div id="imgPreviewSection" style="display: none;">
          <div style="display: grid; grid-template-columns: 1fr 280px; gap: 20px;">
            <div style="background: repeating-conic-gradient(#eee 0% 25%, white 0% 50%) 50% / 16px 16px; border-radius: 12px; display: flex; align-items: center; justify-content: center; min-height: 220px; overflow: hidden; border: 1px solid #e1e3e1; padding: 10px;">
              <img id="imgSourcePreview" style="max-width: 100%; max-height: 280px; object-fit: contain; border-radius: 4px;">
            </div>

            <div>
              ${isResize ? `
                <div class="ui-control-group">
                  <label class="ui-control-label">Ancho (px):</label>
                  <input type="number" id="resizeWidth" class="ui-input" min="1" max="16384" value="800">
                </div>
                <div class="ui-control-group">
                  <label class="ui-control-label">Alto (px):</label>
                  <input type="number" id="resizeHeight" class="ui-input" min="1" max="16384" value="600">
                </div>
              ` : ''}

              ${isCrop ? `
                <div class="ui-control-group">
                  <label class="ui-control-label">Proporción de recorte:</label>
                  <select id="cropRatio" class="ui-select">
                    <option value="1">1:1 (Cuadrado / Instagram)</option>
                    <option value="1.777" selected>16:9 (Panorámico / Banner)</option>
                    <option value="1.333">4:3 (Estándar)</option>
                  </select>
                </div>
              ` : ''}

              <div class="ui-control-group">
                <label class="ui-control-label">Calidad de compresión:</label>
                <div class="ui-slider-wrap">
                  <input type="range" id="imgQualitySlider" class="ui-slider" min="0.1" max="1.0" step="0.05" value="0.85">
                  <span id="imgQualityVal" style="font-size: 13px; font-weight: 600; width: 40px;">85%</span>
                </div>
              </div>

              <div style="font-size: 12px; color: #444746; margin-top: 12px; line-height: 1.4;">
                <div>Original: <strong id="imgOriginalInfo">-</strong></div>
                <div>Salida estimada: <strong id="imgEstimatedInfo" style="color: #0b57d0;">Optimizado</strong></div>
              </div>
            </div>
          </div>
        </div>
      `;

      footer.innerHTML = `
        <button class="ui-btn ui-btn-outlined" onclick="closeToolModal()">Cancelar</button>
        <button id="btnProcessImg" class="ui-btn ui-btn-primary" disabled onclick="processAndDownloadImage()">Procesar y Descargar</button>
      `;

      let loadedImage = null;
      let originalFileName = "imagen";

      const fileInput = document.getElementById("imgFileInput");
      const dropzone = document.getElementById("imgDropzone");
      const qualitySlider = document.getElementById("imgQualitySlider");
      const qualityVal = document.getElementById("imgQualityVal");

      qualitySlider.addEventListener("input", (e) => {
        qualityVal.innerText = `${Math.round(e.target.value * 100)}%`;
      });

      function handleFile(file) {
        if (!file) return;

        const isGraphic = file.type.startsWith("image/") || file.name.match(/\.(jpe?g|png|webp|gif|svg|bmp)$/i);
        if (!isGraphic) {
          showToast("Archivo no válido: por favor selecciona una imagen gráfica (PNG, JPG, WebP o SVG)");
          return;
        }

        originalFileName = file.name.replace(/\.[^/.]+$/, "");
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            if (img.width === 0 || img.height === 0) {
              showToast("La imagen seleccionada tiene dimensiones inválidas (0x0 píxeles)");
              return;
            }
            loadedImage = img;
            document.getElementById("imgDropzone").style.display = "none";
            document.getElementById("imgPreviewSection").style.display = "block";
            document.getElementById("imgSourcePreview").src = img.src;
            document.getElementById("imgOriginalInfo").innerText = `${img.width}x${img.height} px (${(file.size / 1024).toFixed(1)} KB)`;
            document.getElementById("btnProcessImg").removeAttribute("disabled");

            if (isResize) {
              document.getElementById("resizeWidth").value = img.width;
              document.getElementById("resizeHeight").value = img.height;
            }
          };
          img.onerror = () => {
            showToast("No se pudo decodificar la imagen seleccionada");
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }

      fileInput.addEventListener("change", (e) => handleFile(e.target.files[0]));

      dropzone.addEventListener("dragover", (e) => { e.preventDefault(); dropzone.classList.add("dragover"); });
      dropzone.addEventListener("dragleave", () => dropzone.classList.remove("dragover"));
      dropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropzone.classList.remove("dragover");
        if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]);
      });

      window.processAndDownloadImage = function() {
        if (!loadedImage) return;

        let targetW = loadedImage.width;
        let targetH = loadedImage.height;

        if (isResize) {
          const wInput = document.getElementById("resizeWidth");
          const hInput = document.getElementById("resizeHeight");
          const wVal = parseInt(wInput ? wInput.value : 0, 10);
          const hVal = parseInt(hInput ? hInput.value : 0, 10);

          if (isNaN(wVal) || wVal <= 0 || isNaN(hVal) || hVal <= 0) {
            showToast("Dimensiones inválidas: el ancho y alto deben ser números mayores a 0");
            if (wInput && (isNaN(wVal) || wVal <= 0)) wInput.focus();
            else if (hInput) hInput.focus();
            return;
          }

          const MAX_DIM = 16384;
          const MAX_AREA = 16384 * 16384; // 268,435,456 px
          if (wVal > MAX_DIM || hVal > MAX_DIM) {
            showToast(`Dimensiones excesivas: el ancho y alto no pueden superar ${MAX_DIM} px`);
            return;
          }
          if (wVal * hVal > MAX_AREA) {
            showToast("El área total de la imagen supera el límite de memoria permitido");
            return;
          }

          targetW = wVal;
          targetH = hVal;
        } else if (isCrop) {
          const ratio = parseFloat(document.getElementById("cropRatio").value) || 1.777;
          if (targetW / targetH > ratio) {
            targetW = Math.round(targetH * ratio);
          } else {
            targetH = Math.round(targetW / ratio);
          }
        }

        if (targetW <= 0 || targetH <= 0) {
          showToast("Dimensiones no válidas para procesar la imagen");
          return;
        }

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const quality = parseFloat(document.getElementById("imgQualitySlider").value);

        canvas.width = targetW;
        canvas.height = targetH;

        if (formatTarget === "image/jpeg") {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, targetW, targetH);
        }

        ctx.drawImage(loadedImage, 0, 0, targetW, targetH);

        canvas.toBlob((blob) => {
          if (!blob) {
            showToast("Error al procesar la imagen");
            return;
          }
          const a = document.createElement("a");
          a.download = `${originalFileName}-tooldrive${extTarget}`;
          const blobUrl = URL.createObjectURL(blob);
          a.href = blobUrl;
          a.click();
          setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
          showToast(`¡Imagen procesada y descargada! (${(blob.size / 1024).toFixed(1)} KB)`);
        }, formatTarget, quality);
      };
      break;
    }

    // ---------------- REAL PDF MERGE ----------------
    case "merge-pdf": {
      container.innerHTML = `
        <div class="ui-dropzone" id="pdfMergeDropzone" onclick="document.getElementById('pdfMergeFileInput').click()">
          <input type="file" id="pdfMergeFileInput" style="display: none;" multiple accept=".pdf">
          <div class="ui-dropzone-icon">${ICONS.pdf}</div>
          <div class="ui-dropzone-title">Selecciona los archivos PDF a unir</div>
          <div class="ui-dropzone-sub">Elige 2 o más documentos PDF (procesamiento 100% local y seguro)</div>
        </div>

        <div id="pdfMergeQueueSection" style="display: none;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <div style="font-size: 13px; font-weight: 600;">Documentos seleccionados en orden de unión:</div>
            <button class="ui-btn ui-btn-outlined" style="font-size: 12px; padding: 4px 10px;" onclick="document.getElementById('pdfMergeFileInput').click()">
              + Añadir más PDFs
            </button>
          </div>
          <div id="pdfMergeFileList" style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; max-height: 240px; overflow-y: auto;"></div>

          <div id="pdfMergeProgressWrap" style="display: none; margin-top: 14px;">
            <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
              <span id="pdfMergeStatusText">Uniendo documentos...</span>
              <span id="pdfMergePercent">0%</span>
            </div>
            <div class="storage-bar-bg"><div id="pdfMergeBarFill" class="storage-bar-fill" style="width: 0%;"></div></div>
          </div>
        </div>
      `;

      footer.innerHTML = `
        <button class="ui-btn ui-btn-outlined" onclick="closeToolModal()">Cancelar</button>
        <button id="btnExecuteMergePdf" class="ui-btn ui-btn-primary" disabled onclick="executeMergePdf()">Unir Documentos</button>
      `;

      let selectedMergeFiles = [];
      const fileInput = document.getElementById("pdfMergeFileInput");
      const dropzone = document.getElementById("pdfMergeDropzone");
      const queueSection = document.getElementById("pdfMergeQueueSection");
      const fileList = document.getElementById("pdfMergeFileList");
      const btnExec = document.getElementById("btnExecuteMergePdf");

      function updateMergeQueue(files) {
        for (let f of files) {
          if (f.name.toLowerCase().endsWith(".pdf") || f.type === "application/pdf") {
            selectedMergeFiles.push(f);
          }
        }
        if (selectedMergeFiles.length === 0) return;

        dropzone.style.display = "none";
        queueSection.style.display = "block";

        if (selectedMergeFiles.length >= 2) {
          btnExec.removeAttribute("disabled");
        } else {
          btnExec.setAttribute("disabled", "true");
        }

        renderMergeFileList();
      }

      function renderMergeFileList() {
        fileList.innerHTML = selectedMergeFiles.map((f, i) => `
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: var(--md-sys-color-surface-variant); border-radius: 8px; border: 1px solid var(--md-sys-color-outline-variant); font-size: 13px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-weight: 600; color: var(--md-sys-color-primary);">${i + 1}.</span>
              <span>${ICONS.pdf}</span>
              <div>
                <strong>${escapeHtml(f.name)}</strong>
                <div style="font-size: 11px; color: var(--md-sys-color-on-surface-variant);">${(f.size / 1024).toFixed(1)} KB</div>
              </div>
            </div>
            <button class="ui-btn ui-btn-outlined" style="padding: 2px 8px; font-size: 11px; color: #ba1a1a;" onclick="removeMergeFile(${i})">Quitar</button>
          </div>
        `).join("");
      }

      window.removeMergeFile = function(index) {
        selectedMergeFiles.splice(index, 1);
        if (selectedMergeFiles.length === 0) {
          dropzone.style.display = "block";
          queueSection.style.display = "none";
          btnExec.setAttribute("disabled", "true");
        } else {
          if (selectedMergeFiles.length < 2) {
            btnExec.setAttribute("disabled", "true");
          }
          renderMergeFileList();
        }
      };

      fileInput.addEventListener("change", (e) => updateMergeQueue(e.target.files));

      dropzone.addEventListener("dragover", (e) => { e.preventDefault(); dropzone.classList.add("dragover"); });
      dropzone.addEventListener("dragleave", () => dropzone.classList.remove("dragover"));
      dropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropzone.classList.remove("dragover");
        if (e.dataTransfer.files.length) updateMergeQueue(e.dataTransfer.files);
      });

      window.executeMergePdf = async function() {
        if (selectedMergeFiles.length < 2) {
          showToast("Añade al menos 2 archivos PDF para unir");
          return;
        }
        if (typeof PDFLib === "undefined") {
          showToast("Cargando motor PDF...");
          return;
        }

        const progressWrap = document.getElementById("pdfMergeProgressWrap");
        const barFill = document.getElementById("pdfMergeBarFill");
        const percentText = document.getElementById("pdfMergePercent");
        const statusText = document.getElementById("pdfMergeStatusText");

        progressWrap.style.display = "block";
        btnExec.setAttribute("disabled", "true");
        btnExec.innerText = "Uniendo...";

        try {
          const mergedPdf = await PDFLib.PDFDocument.create();
          for (let i = 0; i < selectedMergeFiles.length; i++) {
            const f = selectedMergeFiles[i];
            statusText.textContent = `Cargando ${f.name}...`;
            const percent = Math.round(((i) / selectedMergeFiles.length) * 80);
            barFill.style.width = `${percent}%`;
            percentText.innerText = `${percent}%`;

            const bytes = await f.arrayBuffer();
            const doc = await PDFLib.PDFDocument.load(bytes);
            const copiedPages = await mergedPdf.copyPages(doc, doc.getPageIndices());
            copiedPages.forEach((page) => mergedPdf.addPage(page));
          }

          statusText.textContent = "Generando PDF final combinado...";
          barFill.style.width = "90%";
          percentText.innerText = "90%";

          const mergedBytes = await mergedPdf.save();
          const blob = new Blob([mergedBytes], { type: "application/pdf" });
          const a = document.createElement("a");
          a.download = "documentos-unidos-tooldrive.pdf";
          const blobUrl = URL.createObjectURL(blob);
          a.href = blobUrl;
          a.click();
          setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);

          barFill.style.width = "100%";
          percentText.innerText = "100%";
          showToast(`✓ ¡${selectedMergeFiles.length} documentos unidos exitosamente!`);
          setTimeout(() => closeToolModal(), 600);
        } catch (err) {
          console.error("Error al unir PDFs:", err);
          const isEncrypted = err && (err.name === "EncryptedPDFError" || /encrypted|password|decrypt/i.test(err.message || ""));
          if (isEncrypted) {
            showToast("Uno o más PDFs están protegidos con contraseña. Desbloquéalos antes de unirlos.");
          } else {
            showToast("Error al procesar los documentos PDF. Verifica que sean archivos válidos.");
          }
        } finally {
          btnExec.removeAttribute("disabled");
          btnExec.innerText = "Unir Documentos";
        }
      };
      break;
    }

    // ---------------- REAL PDF SPLIT ----------------
    case "split-pdf": {
      container.innerHTML = `
        <div class="ui-dropzone" id="pdfSplitDropzone" onclick="document.getElementById('pdfSplitFileInput').click()">
          <input type="file" id="pdfSplitFileInput" style="display: none;" accept=".pdf">
          <div class="ui-dropzone-icon">${ICONS.pdf}</div>
          <div class="ui-dropzone-title">Selecciona el documento PDF a dividir</div>
          <div class="ui-dropzone-sub">Extrae páginas individuales o rangos específicos (procesamiento 100% local)</div>
        </div>

        <div id="pdfSplitWorkArea" style="display: none;">
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 14px; background: var(--md-sys-color-surface-variant); border-radius: 8px; border: 1px solid var(--md-sys-color-outline-variant); margin-bottom: 16px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span>${ICONS.pdf}</span>
              <div>
                <strong id="pdfSplitFileName">-</strong>
                <div id="pdfSplitFileInfo" style="font-size: 11px; color: var(--md-sys-color-on-surface-variant);">-</div>
              </div>
            </div>
            <button class="ui-btn ui-btn-outlined" style="font-size: 11px; padding: 3px 8px;" onclick="document.getElementById('pdfSplitFileInput').click()">Cambiar archivo</button>
          </div>

          <div class="ui-control-group">
            <label class="ui-control-label">Rango de páginas a extraer:</label>
            <input type="text" id="splitPagesInput" class="ui-input" placeholder="Ejemplo: 1-3, 5" value="1">
            <div id="pdfSplitHint" style="font-size: 11px; color: var(--md-sys-color-on-surface-variant); margin-top: 4px;">Indica las páginas separadas por comas o rangos con guión (ej: 1-2, 4).</div>
          </div>

          <div id="pdfSplitProgressWrap" style="display: none; margin-top: 14px;">
            <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
              <span>Extrayendo páginas seleccionadas...</span>
              <span id="pdfSplitPercent">0%</span>
            </div>
            <div class="storage-bar-bg"><div id="pdfSplitBarFill" class="storage-bar-fill" style="width: 0%;"></div></div>
          </div>
        </div>
      `;

      footer.innerHTML = `
        <button class="ui-btn ui-btn-outlined" onclick="closeToolModal()">Cancelar</button>
        <button id="btnExecuteSplitPdf" class="ui-btn ui-btn-primary" disabled onclick="executeSplitPdf()">Dividir y Descargar</button>
      `;

      let loadedSplitFile = null;
      let totalDocPages = 1;
      const fileInput = document.getElementById("pdfSplitFileInput");
      const dropzone = document.getElementById("pdfSplitDropzone");
      const workArea = document.getElementById("pdfSplitWorkArea");
      const btnExec = document.getElementById("btnExecuteSplitPdf");

      async function handleSplitFile(file) {
        if (!file) return;
        if (typeof PDFLib === "undefined") {
          showToast("Cargando motor PDF...");
          return;
        }

        try {
          const bytes = await file.arrayBuffer();
          const doc = await PDFLib.PDFDocument.load(bytes);
          totalDocPages = doc.getPageCount();
          loadedSplitFile = file;

          dropzone.style.display = "none";
          workArea.style.display = "block";
          document.getElementById("pdfSplitFileName").textContent = file.name;
          document.getElementById("pdfSplitFileInfo").innerText = `${totalDocPages} páginas en total • ${(file.size / 1024).toFixed(1)} KB`;
          document.getElementById("pdfSplitHint").innerText = `Total de páginas: ${totalDocPages}. Puedes indicar rangos como: 1-${Math.min(3, totalDocPages)} o páginas sueltas como: 1, ${totalDocPages}`;
          document.getElementById("splitPagesInput").value = totalDocPages > 1 ? `1-${Math.min(2, totalDocPages)}` : "1";
          btnExec.removeAttribute("disabled");
          showToast(`PDF cargado con éxito (${totalDocPages} páginas)`);
        } catch (err) {
          console.error("Error al cargar PDF:", err);
          showToast("Error al abrir el PDF. Comprueba que sea un archivo válido.");
        }
      }

      fileInput.addEventListener("change", (e) => handleSplitFile(e.target.files[0]));

      dropzone.addEventListener("dragover", (e) => { e.preventDefault(); dropzone.classList.add("dragover"); });
      dropzone.addEventListener("dragleave", () => dropzone.classList.remove("dragover"));
      dropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropzone.classList.remove("dragover");
        if (e.dataTransfer.files.length) handleSplitFile(e.dataTransfer.files[0]);
      });

      window.executeSplitPdf = async function() {
        if (!loadedSplitFile) return;
        const rangeStr = document.getElementById("splitPagesInput").value;
        const pageIndices = parsePdfRanges(rangeStr, totalDocPages);

        if (pageIndices.length === 0) {
          showToast(`Ingresa páginas válidas entre 1 y ${totalDocPages}`);
          return;
        }

        const progressWrap = document.getElementById("pdfSplitProgressWrap");
        const barFill = document.getElementById("pdfSplitBarFill");
        const percentText = document.getElementById("pdfSplitPercent");

        progressWrap.style.display = "block";
        btnExec.setAttribute("disabled", "true");
        barFill.style.width = "40%";
        percentText.innerText = "40%";

        try {
          const bytes = await loadedSplitFile.arrayBuffer();
          const srcDoc = await PDFLib.PDFDocument.load(bytes);
          const newDoc = await PDFLib.PDFDocument.create();

          barFill.style.width = "70%";
          percentText.innerText = "70%";

          const copiedPages = await newDoc.copyPages(srcDoc, pageIndices);
          copiedPages.forEach((p) => newDoc.addPage(p));

          const splitBytes = await newDoc.save();
          const blob = new Blob([splitBytes], { type: "application/pdf" });
          const a = document.createElement("a");
          const baseName = loadedSplitFile.name.replace(/\.[^/.]+$/, "");
          a.download = `${baseName}-extraido.pdf`;
          const blobUrl = URL.createObjectURL(blob);
          a.href = blobUrl;
          a.click();
          setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);

          barFill.style.width = "100%";
          percentText.innerText = "100%";
          showToast(`✓ ¡${pageIndices.length} página(s) extraída(s) exitosamente!`);
          setTimeout(() => closeToolModal(), 600);
        } catch (err) {
          console.error("Error al dividir PDF:", err);
          showToast("Error al extraer páginas del documento");
          btnExec.removeAttribute("disabled");
        }
      };
      break;
    }

    // ---------------- FASE 1: PDF TO JPEG ----------------
    case "pdf-to-jpeg": {
      container.innerHTML = `
        <div class="ui-dropzone" id="pdfToJpgDropzone" onclick="document.getElementById('pdfToJpgInput').click()">
          <input type="file" id="pdfToJpgInput" style="display: none;" accept=".pdf,application/pdf">
          <div class="ui-dropzone-icon">${ICONS.pdf}</div>
          <div class="ui-dropzone-title">Selecciona o arrastra tu archivo PDF</div>
          <div class="ui-dropzone-sub">Convierte páginas de PDF a imágenes JPEG en alta definición</div>
        </div>

        <div id="pdfToJpgWorkArea" style="display: none;">
          <div style="background: var(--md-sys-color-surface-variant); border-radius: 12px; padding: 14px 16px; margin-bottom: 14px; border: 1px solid var(--md-sys-color-outline-variant);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <strong id="pdfToJpgFileName" style="font-size: 14px; word-break: break-all;"></strong>
              <button class="ui-btn ui-btn-outlined" style="padding: 4px 10px; font-size: 11px; height: auto;" onclick="resetPdfToJpg()">Cambiar archivo</button>
            </div>
            <div id="pdfToJpgFileInfo" style="font-size: 12px; color: var(--md-sys-color-on-surface-variant);"></div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px;">
            <div>
              <label for="pdfToJpgScale" style="font-size: 12px; font-weight: 500; display: block; margin-bottom: 4px;">Resolución / Escala:</label>
              <select id="pdfToJpgScale" class="ui-input" style="width: 100%;">
                <option value="1">1x (Estándar 72 DPI)</option>
                <option value="2" selected>2x (Alta Definición 150 DPI - Recomendado)</option>
                <option value="3">3x (Ultra HD 300 DPI)</option>
              </select>
            </div>
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <label for="pdfToJpgQuality" style="font-size: 12px; font-weight: 500;">Calidad JPEG:</label>
                <span id="pdfToJpgQualityVal" style="font-size: 12px; font-weight: 600;">90%</span>
              </div>
              <input type="range" id="pdfToJpgQuality" min="0.5" max="1.0" step="0.05" value="0.9" style="width: 100%; height: 36px; accent-color: var(--md-sys-color-primary);">
            </div>
          </div>

          <div style="margin-bottom: 16px;">
            <label for="pdfToJpgPages" style="font-size: 12px; font-weight: 500; display: block; margin-bottom: 4px;">Páginas a extraer:</label>
            <input type="text" id="pdfToJpgPages" class="ui-input" style="width: 100%;" placeholder="ej. 1-3, 5 o 'todas'" value="todas">
            <div id="pdfToJpgPageHint" style="font-size: 11px; color: var(--md-sys-color-on-surface-variant); margin-top: 4px;"></div>
          </div>

          <div id="pdfToJpgProgressWrap" style="display: none; margin-top: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; margin-bottom: 6px;">
              <span id="pdfToJpgStatusText">Renderizando páginas...</span>
              <span id="pdfToJpgPercent" style="font-weight: 600;">0%</span>
            </div>
            <div style="background: var(--md-sys-color-surface-variant); border-radius: 8px; height: 8px; overflow: hidden;">
              <div id="pdfToJpgBarFill" style="background: var(--md-sys-color-primary); height: 100%; width: 0%; transition: width 0.15s ease;"></div>
            </div>
          </div>
        </div>
      `;

      footer.innerHTML = `
        <button class="ui-btn ui-btn-outlined" id="btnCancelPdfToJpg" onclick="closeToolModal()">Cancelar</button>
        <button class="ui-btn ui-btn-primary" id="btnExecPdfToJpg" disabled onclick="executePdfToJpeg()">Convertir a JPEG</button>
      `;

      const dropzone = document.getElementById("pdfToJpgDropzone");
      const fileInput = document.getElementById("pdfToJpgInput");
      const workArea = document.getElementById("pdfToJpgWorkArea");
      const btnExec = document.getElementById("btnExecPdfToJpg");
      const qualityRange = document.getElementById("pdfToJpgQuality");
      const qualityVal = document.getElementById("pdfToJpgQualityVal");

      let loadedPdfToJpgFile = null;
      let pdfToJpgDoc = null;
      let isPdfToJpgCancelled = false;

      window.cancelPdfToJpeg = function() {
        isPdfToJpgCancelled = true;
      };

      window.resetPdfToJpg = function() {
        isPdfToJpgCancelled = true;
        loadedPdfToJpgFile = null;
        pdfToJpgDoc = null;
        fileInput.value = "";
        workArea.style.display = "none";
        dropzone.style.display = "block";
        btnExec.setAttribute("disabled", "true");
        document.getElementById("pdfToJpgProgressWrap").style.display = "none";
      };

      qualityRange.addEventListener("input", (e) => {
        qualityVal.innerText = `${Math.round(parseFloat(e.target.value) * 100)}%`;
      });

      async function handlePdfToJpgFile(file) {
        if (!file) return;
        if (!file.name.toLowerCase().endsWith(".pdf") && file.type !== "application/pdf") {
          showToast("Por favor selecciona un archivo PDF válido");
          return;
        }

        try {
          showToast("Cargando documento PDF...");
          await ensurePdfJsReady();
          const buffer = await file.arrayBuffer();
          const loadingTask = window.pdfjsLib.getDocument({ data: buffer });
          loadingTask.onPassword = () => {
            throw new Error("PASSWORD_PROTECTED");
          };
          pdfToJpgDoc = await loadingTask.promise;
          loadedPdfToJpgFile = file;

          dropzone.style.display = "none";
          workArea.style.display = "block";
          document.getElementById("pdfToJpgFileName").textContent = file.name;
          document.getElementById("pdfToJpgFileInfo").innerText = `${pdfToJpgDoc.numPages} página(s) • ${formatFileSize(file.size)}`;
          document.getElementById("pdfToJpgPageHint").innerText = `Total: ${pdfToJpgDoc.numPages} página(s). Escribe 'todas' o rangos (ej. 1-${Math.min(3, pdfToJpgDoc.numPages)})`;
          btnExec.removeAttribute("disabled");
          showToast(`PDF listo (${pdfToJpgDoc.numPages} páginas)`);
        } catch (err) {
          console.error("Error al abrir PDF:", err);
          if (err && (err.name === "PasswordException" || err.message === "PASSWORD_PROTECTED")) {
            showToast("Este documento PDF está protegido con contraseña.");
          } else {
            showToast("Error al abrir el PDF. Comprueba que sea válido.");
          }
        }
      }

      fileInput.addEventListener("change", (e) => handlePdfToJpgFile(e.target.files[0]));
      dropzone.addEventListener("dragover", (e) => { e.preventDefault(); dropzone.classList.add("dragover"); });
      dropzone.addEventListener("dragleave", () => dropzone.classList.remove("dragover"));
      dropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropzone.classList.remove("dragover");
        if (e.dataTransfer.files.length) handlePdfToJpgFile(e.dataTransfer.files[0]);
      });

      window.executePdfToJpeg = async function() {
        if (!loadedPdfToJpgFile || !pdfToJpgDoc) return;
        const rangeStr = document.getElementById("pdfToJpgPages").value;
        const pageIndices = parsePdfRanges(rangeStr, pdfToJpgDoc.numPages);

        if (pageIndices.length === 0) {
          showToast(`Ingresa páginas válidas entre 1 y ${pdfToJpgDoc.numPages}`);
          return;
        }

        const scale = parseFloat(document.getElementById("pdfToJpgScale").value) || 2;
        const quality = parseFloat(document.getElementById("pdfToJpgQuality").value) || 0.9;
        const progressWrap = document.getElementById("pdfToJpgProgressWrap");
        const barFill = document.getElementById("pdfToJpgBarFill");
        const percentText = document.getElementById("pdfToJpgPercent");
        const statusText = document.getElementById("pdfToJpgStatusText");
        const btnCancel = document.getElementById("btnCancelPdfToJpg");

        isPdfToJpgCancelled = false;
        progressWrap.style.display = "block";
        btnExec.setAttribute("disabled", "true");
        btnCancel.innerText = "Detener";
        btnCancel.onclick = () => {
          isPdfToJpgCancelled = true;
          statusText.innerText = "Cancelando...";
        };

        const results = [];
        try {
          for (let i = 0; i < pageIndices.length; i++) {
            if (isPdfToJpgCancelled) throw new Error("CANCELLED");
            const pageNum = pageIndices[i] + 1;
            const pct = Math.round((i / pageIndices.length) * 90);
            barFill.style.width = `${pct}%`;
            percentText.innerText = `${pct}%`;
            statusText.innerText = `Renderizando página ${pageNum} (${i + 1} de ${pageIndices.length})...`;

            const page = await pdfToJpgDoc.getPage(pageNum);
            const viewport = page.getViewport({ scale });
            const canvas = document.createElement("canvas");
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            const ctx = canvas.getContext("2d");
            await page.render({ canvasContext: ctx, viewport }).promise;

            const blob = await new Promise(res => canvas.toBlob(res, "image/jpeg", quality));
            results.push({ pageNum, blob });
            canvas.width = 0;
            canvas.height = 0;
          }

          if (isPdfToJpgCancelled) throw new Error("CANCELLED");

          const baseName = loadedPdfToJpgFile.name.replace(/\.[^/.]+$/, "");
          barFill.style.width = "95%";
          percentText.innerText = "95%";

          if (results.length === 1) {
            statusText.innerText = "Descargando imagen...";
            const blobUrl = URL.createObjectURL(results[0].blob);
            const a = document.createElement("a");
            a.download = `${baseName}-pagina-${results[0].pageNum}.jpg`;
            a.href = blobUrl;
            a.click();
            setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
            showToast("✓ Imagen JPEG descargada exitosamente");
          } else {
            statusText.innerText = "Empaquetando archivo ZIP...";
            await ensureJsZipReady();
            const zip = new window.JSZip();
            results.forEach(r => {
              zip.file(`${baseName}-pagina-${r.pageNum}.jpg`, r.blob);
            });
            const zipBlob = await zip.generateAsync({ type: "blob" });
            const zipUrl = URL.createObjectURL(zipBlob);
            const a = document.createElement("a");
            a.download = `${baseName}-imagenes-jpg.zip`;
            a.href = zipUrl;
            a.click();
            setTimeout(() => URL.revokeObjectURL(zipUrl), 1000);
            showToast(`✓ ¡${results.length} imágenes extraídas y descargadas en ZIP!`);
          }

          barFill.style.width = "100%";
          percentText.innerText = "100%";
          statusText.innerText = "¡Completado!";
          setTimeout(() => closeToolModal(), 700);
        } catch (err) {
          if (err && err.message === "CANCELLED") {
            showToast("Conversión de PDF cancelada");
          } else {
            console.error("Error en pdf-to-jpeg:", err);
            showToast("Ocurrió un error al extraer las páginas");
          }
        } finally {
          btnExec.removeAttribute("disabled");
          btnCancel.innerText = "Cerrar";
          btnCancel.onclick = () => closeToolModal();
        }
      };
      break;
    }

    // ---------------- FASE 1: HEIC TO JPG ----------------
    case "heic-to-jpg": {
      container.innerHTML = `
        <div class="ui-dropzone" id="heicDropzone" onclick="document.getElementById('heicInput').click()">
          <input type="file" id="heicInput" style="display: none;" accept=".heic,.heif,image/heic,image/heif" multiple>
          <div class="ui-dropzone-icon">${ICONS.image}</div>
          <div class="ui-dropzone-title">Selecciona o arrastra fotos HEIC / HEIF</div>
          <div class="ui-dropzone-sub">Convierte fotos de iPhone a JPEG estándar (soporta múltiples archivos)</div>
        </div>

        <div id="heicWorkArea" style="display: none;">
          <div style="background: var(--md-sys-color-surface-variant); border-radius: 12px; padding: 14px 16px; margin-bottom: 14px; border: 1px solid var(--md-sys-color-outline-variant);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <strong id="heicSummaryTitle" style="font-size: 14px;"></strong>
              <button class="ui-btn ui-btn-outlined" style="padding: 4px 10px; font-size: 11px; height: auto;" onclick="resetHeic()">Cambiar archivos</button>
            </div>
            <div id="heicFilesList" style="font-size: 11px; color: var(--md-sys-color-on-surface-variant); max-height: 80px; overflow-y: auto; line-height: 1.4;"></div>
          </div>

          <div style="margin-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <label for="heicQuality" style="font-size: 12px; font-weight: 500;">Calidad JPEG de salida:</label>
              <span id="heicQualityVal" style="font-size: 12px; font-weight: 600;">90%</span>
            </div>
            <input type="range" id="heicQuality" min="0.5" max="1.0" step="0.05" value="0.9" style="width: 100%; height: 36px; accent-color: var(--md-sys-color-primary);">
            <div style="display: flex; justify-content: space-between; font-size: 10px; color: var(--md-sys-color-on-surface-variant);">
              <span>Menor peso (50%)</span>
              <span>Recomendado (90%)</span>
              <span>Máxima calidad (100%)</span>
            </div>
          </div>

          <div id="heicProgressWrap" style="display: none; margin-top: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; margin-bottom: 6px;">
              <span id="heicStatusText">Preparando conversión...</span>
              <span id="heicPercent" style="font-weight: 600;">0%</span>
            </div>
            <div style="background: var(--md-sys-color-surface-variant); border-radius: 8px; height: 8px; overflow: hidden;">
              <div id="heicBarFill" style="background: var(--md-sys-color-primary); height: 100%; width: 0%; transition: width 0.15s ease;"></div>
            </div>
          </div>
        </div>
      `;

      footer.innerHTML = `
        <button class="ui-btn ui-btn-outlined" id="btnCancelHeic" onclick="closeToolModal()">Cancelar</button>
        <button class="ui-btn ui-btn-primary" id="btnExecHeic" disabled onclick="executeHeicToJpg()">Convertir a JPG</button>
      `;

      const dropzone = document.getElementById("heicDropzone");
      const fileInput = document.getElementById("heicInput");
      const workArea = document.getElementById("heicWorkArea");
      const btnExec = document.getElementById("btnExecHeic");
      const qualityRange = document.getElementById("heicQuality");
      const qualityVal = document.getElementById("heicQualityVal");

      let loadedHeicFiles = [];
      let isHeicCancelled = false;

      window.cancelHeicConvert = function() {
        isHeicCancelled = true;
      };

      window.resetHeic = function() {
        isHeicCancelled = true;
        loadedHeicFiles = [];
        fileInput.value = "";
        workArea.style.display = "none";
        dropzone.style.display = "block";
        btnExec.setAttribute("disabled", "true");
        document.getElementById("heicProgressWrap").style.display = "none";
      };

      qualityRange.addEventListener("input", (e) => {
        qualityVal.innerText = `${Math.round(parseFloat(e.target.value) * 100)}%`;
      });

      function handleHeicFiles(fileList) {
        if (!fileList || fileList.length === 0) return;
        const valid = Array.from(fileList).filter(f => {
          const ext = f.name.toLowerCase();
          return ext.endsWith(".heic") || ext.endsWith(".heif") || f.type === "image/heic" || f.type === "image/heif";
        });

        if (valid.length === 0) {
          showToast("Por favor selecciona archivos con extensión .heic o .heif");
          return;
        }

        loadedHeicFiles = valid;
        dropzone.style.display = "none";
        workArea.style.display = "block";

        const totalBytes = valid.reduce((acc, f) => acc + f.size, 0);
        document.getElementById("heicSummaryTitle").textContent = `${valid.length} archivo(s) HEIC (${formatFileSize(totalBytes)})`;
        document.getElementById("heicFilesList").innerHTML = valid.map(f => `<div>• ${escapeHtml(f.name)} (${formatFileSize(f.size)})</div>`).join("");
        btnExec.removeAttribute("disabled");
        showToast(`${valid.length} foto(s) HEIC lista(s)`);
      }

      fileInput.addEventListener("change", (e) => handleHeicFiles(e.target.files));
      dropzone.addEventListener("dragover", (e) => { e.preventDefault(); dropzone.classList.add("dragover"); });
      dropzone.addEventListener("dragleave", () => dropzone.classList.remove("dragover"));
      dropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropzone.classList.remove("dragover");
        if (e.dataTransfer.files.length) handleHeicFiles(e.dataTransfer.files);
      });

      window.executeHeicToJpg = async function() {
        if (loadedHeicFiles.length === 0) return;

        const quality = parseFloat(document.getElementById("heicQuality").value) || 0.9;
        const progressWrap = document.getElementById("heicProgressWrap");
        const barFill = document.getElementById("heicBarFill");
        const percentText = document.getElementById("heicPercent");
        const statusText = document.getElementById("heicStatusText");
        const btnCancel = document.getElementById("btnCancelHeic");

        isHeicCancelled = false;
        progressWrap.style.display = "block";
        btnExec.setAttribute("disabled", "true");
        btnCancel.innerText = "Detener";
        btnCancel.onclick = () => {
          isHeicCancelled = true;
          statusText.innerText = "Cancelando...";
        };

        const outputItems = [];

        try {
          showToast("Cargando decodificador HEIC...");
          await ensureHeic2AnyReady();

          for (let i = 0; i < loadedHeicFiles.length; i++) {
            if (isHeicCancelled) throw new Error("CANCELLED");
            const file = loadedHeicFiles[i];
            const pct = Math.round((i / loadedHeicFiles.length) * 85);
            barFill.style.width = `${pct}%`;
            percentText.innerText = `${pct}%`;
            statusText.innerText = `Convirtiendo ${escapeHtml(file.name)} (${i + 1} de ${loadedHeicFiles.length})...`;

            let conversionResult;
            try {
              conversionResult = await window.heic2any({
                blob: file,
                toType: "image/jpeg",
                quality: quality
              });
            } catch (convErr) {
              console.error("Error al convertir HEIC:", convErr);
              throw new Error(`No se pudo decodificar "${file.name}". Asegúrate de que no esté dañado.`);
            }

            const blobs = Array.isArray(conversionResult) ? conversionResult : [conversionResult];
            const base = file.name.replace(/\.[^/.]+$/, "");
            if (blobs.length === 1) {
              outputItems.push({ name: `${base}.jpg`, blob: blobs[0] });
            } else {
              blobs.forEach((b, idx) => {
                outputItems.push({ name: `${base}_${idx + 1}.jpg`, blob: b });
              });
            }
          }

          if (isHeicCancelled) throw new Error("CANCELLED");

          barFill.style.width = "95%";
          percentText.innerText = "95%";

          if (outputItems.length === 1) {
            statusText.innerText = "Descargando imagen...";
            const blobUrl = URL.createObjectURL(outputItems[0].blob);
            const a = document.createElement("a");
            a.download = outputItems[0].name;
            a.href = blobUrl;
            a.click();
            setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
            showToast("✓ Foto convertida a JPEG exitosamente");
          } else {
            statusText.innerText = "Empaquetando archivo ZIP...";
            await ensureJsZipReady();
            const zip = new window.JSZip();
            outputItems.forEach(item => {
              zip.file(item.name, item.blob);
            });
            const zipBlob = await zip.generateAsync({ type: "blob" });
            const zipUrl = URL.createObjectURL(zipBlob);
            const a = document.createElement("a");
            a.download = `${loadedHeicFiles[0].name.replace(/\.[^/.]+$/, "")}-convertidas-jpg.zip`;
            a.href = zipUrl;
            a.click();
            setTimeout(() => URL.revokeObjectURL(zipUrl), 1000);
            showToast(`✓ ¡${outputItems.length} foto(s) convertidas y descargadas en ZIP!`);
          }

          barFill.style.width = "100%";
          percentText.innerText = "100%";
          statusText.innerText = "¡Completado!";
          setTimeout(() => closeToolModal(), 700);
        } catch (err) {
          if (err && err.message === "CANCELLED") {
            showToast("Conversión de HEIC cancelada");
          } else {
            console.error("Error en heic-to-jpg:", err);
            showToast(err && err.message ? err.message : "Error al convertir fotos HEIC");
          }
        } finally {
          btnExec.removeAttribute("disabled");
          btnCancel.innerText = "Cerrar";
          btnCancel.onclick = () => closeToolModal();
        }
      };
      break;
    }

    // ---------------- FASE 1: UPSCALE IMAGE (LANCZOS3) ----------------
    case "upscale-image": {
      container.innerHTML = `
        <div class="ui-dropzone" id="upscaleDropzone" onclick="document.getElementById('upscaleInput').click()">
          <input type="file" id="upscaleInput" style="display: none;" accept="image/*">
          <div class="ui-dropzone-icon">${ICONS.image}</div>
          <div class="ui-dropzone-title">Selecciona o arrastra una imagen</div>
          <div class="ui-dropzone-sub">Amplía la resolución mediante interpolación Lanczos3 de alta fidelidad</div>
        </div>

        <div id="upscaleWorkArea" style="display: none;">
          <div style="background: var(--md-sys-color-surface-variant); border-radius: 12px; padding: 14px 16px; margin-bottom: 14px; border: 1px solid var(--md-sys-color-outline-variant);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <strong id="upscaleFileName" style="font-size: 14px; word-break: break-all;"></strong>
              <button class="ui-btn ui-btn-outlined" style="padding: 4px 10px; font-size: 11px; height: auto;" onclick="resetUpscale()">Cambiar imagen</button>
            </div>
            <div id="upscaleOrigDims" style="font-size: 12px; color: var(--md-sys-color-on-surface-variant);"></div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px;">
            <div>
              <label for="upscaleFactor" style="font-size: 12px; font-weight: 500; display: block; margin-bottom: 4px;">Factor de ampliación:</label>
              <select id="upscaleFactor" class="ui-input" style="width: 100%;">
                <option value="2" selected>2x (Doble resolución)</option>
                <option value="4">4x (Cuádruple resolución)</option>
              </select>
            </div>
            <div>
              <label for="upscaleFormat" style="font-size: 12px; font-weight: 500; display: block; margin-bottom: 4px;">Formato de salida:</label>
              <select id="upscaleFormat" class="ui-input" style="width: 100%;">
                <option value="image/png" selected>PNG (Sin pérdidas)</option>
                <option value="image/jpeg">JPEG (Calidad 92%)</option>
              </select>
            </div>
          </div>

          <div style="background: var(--md-sys-color-surface-variant); border-radius: 10px; padding: 12px 14px; margin-bottom: 14px; font-size: 12px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
              <span style="color: var(--md-sys-color-on-surface-variant);">Resolución resultante:</span>
              <strong id="upscaleTargetDims" style="color: var(--md-sys-color-primary);">-</strong>
            </div>
            <div style="display: flex; align-items: center; gap: 8px; margin-top: 6px;">
              <input type="checkbox" id="upscaleSharpen" checked style="accent-color: var(--md-sys-color-primary); cursor: pointer;">
              <label for="upscaleSharpen" style="font-size: 12px; cursor: pointer;">Aplicar filtro de enfoque inteligente (Unsharp Mask)</label>
            </div>
          </div>

          <div style="background: #fef7e0; color: #7c4a00; border-radius: 10px; padding: 10px 12px; font-size: 11px; line-height: 1.4; margin-bottom: 14px; display: flex; gap: 8px; align-items: flex-start;">
            <span>ℹ️</span>
            <div>
              <strong>Interpolación matemática (Lanczos3), no IA:</strong> remuestrea píxeles mediante sinc de 3 lóbulos para suavizar bordes sin pixelado simple, ejecutándose 100% en tu navegador.
            </div>
          </div>

          <div id="upscaleProgressWrap" style="display: none; margin-top: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; margin-bottom: 6px;">
              <span id="upscaleStatusText">Remuestreando imagen con Lanczos3...</span>
              <span id="upscalePercent" style="font-weight: 600;">0%</span>
            </div>
            <div style="background: var(--md-sys-color-surface-variant); border-radius: 8px; height: 8px; overflow: hidden;">
              <div id="upscaleBarFill" style="background: var(--md-sys-color-primary); height: 100%; width: 0%; transition: width 0.15s ease;"></div>
            </div>
          </div>
        </div>
      `;

      footer.innerHTML = `
        <button class="ui-btn ui-btn-outlined" id="btnCancelUpscale" onclick="closeToolModal()">Cancelar</button>
        <button class="ui-btn ui-btn-primary" id="btnExecUpscale" disabled onclick="executeUpscale()">Ampliar Imagen</button>
      `;

      const dropzone = document.getElementById("upscaleDropzone");
      const fileInput = document.getElementById("upscaleInput");
      const workArea = document.getElementById("upscaleWorkArea");
      const btnExec = document.getElementById("btnExecUpscale");
      const factorSelect = document.getElementById("upscaleFactor");

      let loadedUpscaleFile = null;
      let loadedUpscaleImg = null;
      let origWidth = 0;
      let origHeight = 0;
      let isUpscaleCancelled = false;

      window.cancelUpscale = function() {
        isUpscaleCancelled = true;
      };

      window.resetUpscale = function() {
        isUpscaleCancelled = true;
        loadedUpscaleFile = null;
        if (loadedUpscaleImg && loadedUpscaleImg.src && loadedUpscaleImg.src.startsWith("blob:")) {
          URL.revokeObjectURL(loadedUpscaleImg.src);
        }
        loadedUpscaleImg = null;
        fileInput.value = "";
        workArea.style.display = "none";
        dropzone.style.display = "block";
        btnExec.setAttribute("disabled", "true");
        document.getElementById("upscaleProgressWrap").style.display = "none";
      };

      function updateUpscaleDimensions() {
        if (!origWidth || !origHeight) return;
        const factor = parseInt(factorSelect.value, 10) || 2;
        const targetW = origWidth * factor;
        const targetH = origHeight * factor;
        const targetDimsEl = document.getElementById("upscaleTargetDims");

        const MAX_DIM = 16384;
        const MAX_AREA = 33554432; // ~33 MP

        if (targetW > MAX_DIM || targetH > MAX_DIM || (targetW * targetH > MAX_AREA)) {
          targetDimsEl.innerHTML = `<span style="color: #c5221f;">${targetW} × ${targetH} px (Excede el límite de memoria del navegador)</span>`;
          btnExec.setAttribute("disabled", "true");
        } else {
          targetDimsEl.innerText = `${targetW} × ${targetH} px (+${(factor * factor - 1) * 100}% píxeles)`;
          btnExec.removeAttribute("disabled");
        }
      }

      factorSelect.addEventListener("change", updateUpscaleDimensions);

      function handleUpscaleFile(file) {
        if (!file) return;
        if (!file.type.startsWith("image/")) {
          showToast("Por favor selecciona un archivo de imagen válido");
          return;
        }

        const objectUrl = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () => {
          if (img.naturalWidth === 0 || img.naturalHeight === 0) {
            URL.revokeObjectURL(objectUrl);
            showToast("La imagen no contiene píxeles válidos o está corrupta");
            return;
          }

          loadedUpscaleFile = file;
          loadedUpscaleImg = img;
          origWidth = img.naturalWidth;
          origHeight = img.naturalHeight;

          dropzone.style.display = "none";
          workArea.style.display = "block";
          document.getElementById("upscaleFileName").textContent = file.name;
          document.getElementById("upscaleOrigDims").innerText = `Resolución original: ${origWidth} × ${origHeight} px • ${formatFileSize(file.size)}`;

          updateUpscaleDimensions();
          showToast(`Imagen lista (${origWidth} × ${origHeight} px)`);
        };
        img.onerror = () => {
          URL.revokeObjectURL(objectUrl);
          showToast("Error al decodificar la imagen");
        };
        img.src = objectUrl;
      }

      fileInput.addEventListener("change", (e) => handleUpscaleFile(e.target.files[0]));
      dropzone.addEventListener("dragover", (e) => { e.preventDefault(); dropzone.classList.add("dragover"); });
      dropzone.addEventListener("dragleave", () => dropzone.classList.remove("dragover"));
      dropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropzone.classList.remove("dragover");
        if (e.dataTransfer.files.length) handleUpscaleFile(e.dataTransfer.files[0]);
      });

      window.executeUpscale = async function() {
        if (!loadedUpscaleFile || !loadedUpscaleImg) return;

        const factor = parseInt(factorSelect.value, 10) || 2;
        const targetW = origWidth * factor;
        const targetH = origHeight * factor;
        const format = document.getElementById("upscaleFormat").value || "image/png";
        const sharpen = document.getElementById("upscaleSharpen").checked;

        const progressWrap = document.getElementById("upscaleProgressWrap");
        const barFill = document.getElementById("upscaleBarFill");
        const percentText = document.getElementById("upscalePercent");
        const statusText = document.getElementById("upscaleStatusText");
        const btnCancel = document.getElementById("btnCancelUpscale");

        isUpscaleCancelled = false;
        progressWrap.style.display = "block";
        btnExec.setAttribute("disabled", "true");
        btnCancel.innerText = "Detener";
        btnCancel.onclick = () => {
          isUpscaleCancelled = true;
          statusText.innerText = "Cancelando...";
        };

        barFill.style.width = "20%";
        percentText.innerText = "20%";

        const fromCanvas = document.createElement("canvas");
        fromCanvas.width = origWidth;
        fromCanvas.height = origHeight;
        const fromCtx = fromCanvas.getContext("2d");
        fromCtx.drawImage(loadedUpscaleImg, 0, 0);

        const toCanvas = document.createElement("canvas");
        toCanvas.width = targetW;
        toCanvas.height = targetH;

        try {
          showToast("Cargando motor de remuestreo...");
          await ensurePicaReady();

          if (isUpscaleCancelled) throw new Error("CANCELLED");

          barFill.style.width = "40%";
          percentText.innerText = "40%";
          statusText.innerText = `Calculando interpolación Lanczos3 a ${targetW} × ${targetH} px...`;

          const picaInstance = window.pica();
          await picaInstance.resize(fromCanvas, toCanvas, {
            filter: "lanczos3",
            unsharpAmount: sharpen ? 80 : 0,
            unsharpRadius: 0.6,
            unsharpThreshold: 2
          });

          if (isUpscaleCancelled) throw new Error("CANCELLED");

          barFill.style.width = "85%";
          percentText.innerText = "85%";
          statusText.innerText = "Generando archivo final...";

          const ext = format === "image/jpeg" ? "jpg" : "png";
          const blob = await picaInstance.toBlob(toCanvas, format, format === "image/jpeg" ? 0.92 : undefined);

          if (isUpscaleCancelled) throw new Error("CANCELLED");

          const baseName = loadedUpscaleFile.name.replace(/\.[^/.]+$/, "");
          const blobUrl = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.download = `${baseName}-${factor}x-lanczos3.${ext}`;
          a.href = blobUrl;
          a.click();
          setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);

          barFill.style.width = "100%";
          percentText.innerText = "100%";
          statusText.innerText = "¡Ampliación completada!";
          showToast(`✓ Imagen ampliada a ${targetW} × ${targetH} px descargada`);
          setTimeout(() => closeToolModal(), 700);
        } catch (err) {
          if (err && err.message === "CANCELLED") {
            showToast("Ampliación cancelada");
          } else {
            console.error("Error en upscale-image:", err);
            showToast("Error al remuestrear la imagen");
          }
        } finally {
          fromCanvas.width = 0;
          fromCanvas.height = 0;
          toCanvas.width = 0;
          toCanvas.height = 0;
          btnExec.removeAttribute("disabled");
          btnCancel.innerText = "Cerrar";
          btnCancel.onclick = () => closeToolModal();
        }
      };
      break;
    }

    // ---------------- FASE 1: COMPRESS PDF (RASTERIZADO OPTIMIZADO) ----------------
    case "compress-pdf": {
      container.innerHTML = `
        <div class="ui-dropzone" id="compressPdfDropzone" onclick="document.getElementById('compressPdfInput').click()">
          <input type="file" id="compressPdfInput" style="display: none;" accept=".pdf,application/pdf">
          <div class="ui-dropzone-icon">${ICONS.pdf}</div>
          <div class="ui-dropzone-title">Selecciona o arrastra tu archivo PDF</div>
          <div class="ui-dropzone-sub">Comprime y optimiza páginas rasterizadas con control de resolución</div>
        </div>

        <div id="compressPdfWorkArea" style="display: none;">
          <div style="background: var(--md-sys-color-surface-variant); border-radius: 12px; padding: 14px 16px; margin-bottom: 14px; border: 1px solid var(--md-sys-color-outline-variant);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <strong id="compressPdfFileName" style="font-size: 14px; word-break: break-all;"></strong>
              <button class="ui-btn ui-btn-outlined" style="padding: 4px 10px; font-size: 11px; height: auto;" onclick="resetCompressPdf()">Cambiar PDF</button>
            </div>
            <div id="compressPdfFileInfo" style="font-size: 12px; color: var(--md-sys-color-on-surface-variant);"></div>
          </div>

          <div style="background: #fef7e0; color: #7c4a00; border-radius: 10px; padding: 10px 12px; font-size: 11px; line-height: 1.4; margin-bottom: 14px; display: flex; gap: 8px; align-items: flex-start;">
            <span>⚠️</span>
            <div>
              <strong>Aviso de compresión por rasterización:</strong> Las páginas se recomprimen como imágenes optimizadas. <u>El texto dejará de ser seleccionable</u>. Ideal para contratos escaneados o documentos pesados.
            </div>
          </div>

          <div style="margin-bottom: 16px;">
            <label for="compressPdfPreset" style="font-size: 12px; font-weight: 500; display: block; margin-bottom: 4px;">Nivel de compresión / Calidad:</label>
            <select id="compressPdfPreset" class="ui-input" style="width: 100%;">
              <option value="balanced" selected>Equilibrado (150 DPI, Calidad JPEG 75% - Recomendado)</option>
              <option value="strong">Compresión Máxima (100 DPI, Calidad JPEG 55% - Menor tamaño)</option>
              <option value="light">Ligera (200 DPI, Calidad JPEG 85% - Mayor nitidez)</option>
            </select>
          </div>

          <div id="compressPdfProgressWrap" style="display: none; margin-top: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; margin-bottom: 6px;">
              <span id="compressPdfStatusText">Optimizando páginas...</span>
              <span id="compressPdfPercent" style="font-weight: 600;">0%</span>
            </div>
            <div style="background: var(--md-sys-color-surface-variant); border-radius: 8px; height: 8px; overflow: hidden;">
              <div id="compressPdfBarFill" style="background: var(--md-sys-color-primary); height: 100%; width: 0%; transition: width 0.15s ease;"></div>
            </div>
          </div>

          <div id="compressPdfResultArea" style="display: none; margin-top: 16px; background: var(--md-sys-color-surface-variant); border-radius: 12px; padding: 16px; border: 1px solid var(--md-sys-color-outline-variant);">
            <div style="font-size: 13px; font-weight: 600; margin-bottom: 10px; color: var(--md-sys-color-on-surface);">Resultado de la compresión</div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; font-size: 12px;">
              <div>Tamaño original: <strong id="compressPdfOrigSize"></strong></div>
              <div>Tamaño optimizado: <strong id="compressPdfNewSize"></strong></div>
            </div>
            <div id="compressPdfVerdictBadge" style="padding: 10px 12px; border-radius: 8px; font-size: 12px; margin-bottom: 14px; line-height: 1.4;"></div>
            <div style="display: flex; justify-content: flex-end; gap: 8px;">
              <button class="ui-btn ui-btn-primary" id="btnDownloadCompressedPdf" style="display: none;">Descargar PDF Comprimido</button>
            </div>
          </div>
        </div>
      `;

      footer.innerHTML = `
        <button class="ui-btn ui-btn-outlined" id="btnCancelCompressPdf" onclick="closeToolModal()">Cancelar</button>
        <button class="ui-btn ui-btn-primary" id="btnExecCompressPdf" disabled onclick="executeCompressPdf()">Comprimir PDF</button>
      `;

      const dropzone = document.getElementById("compressPdfDropzone");
      const fileInput = document.getElementById("compressPdfInput");
      const workArea = document.getElementById("compressPdfWorkArea");
      const btnExec = document.getElementById("btnExecCompressPdf");

      let loadedCompressFile = null;
      let compressPdfDoc = null;
      let isCompressCancelled = false;
      let compressedPdfBlob = null;

      window.cancelCompressPdf = function() {
        isCompressCancelled = true;
      };

      window.resetCompressPdf = function() {
        isCompressCancelled = true;
        loadedCompressFile = null;
        compressPdfDoc = null;
        compressedPdfBlob = null;
        fileInput.value = "";
        workArea.style.display = "none";
        dropzone.style.display = "block";
        btnExec.setAttribute("disabled", "true");
        document.getElementById("compressPdfProgressWrap").style.display = "none";
        document.getElementById("compressPdfResultArea").style.display = "none";
      };

      async function handleCompressPdfFile(file) {
        if (!file) return;
        if (!file.name.toLowerCase().endsWith(".pdf") && file.type !== "application/pdf") {
          showToast("Por favor selecciona un archivo PDF válido");
          return;
        }

        try {
          showToast("Analizando documento PDF...");
          await ensurePdfJsReady();
          const buffer = await file.arrayBuffer();
          const loadingTask = window.pdfjsLib.getDocument({ data: buffer });
          loadingTask.onPassword = () => {
            throw new Error("PASSWORD_PROTECTED");
          };
          compressPdfDoc = await loadingTask.promise;
          loadedCompressFile = file;

          dropzone.style.display = "none";
          workArea.style.display = "block";
          document.getElementById("compressPdfFileName").textContent = file.name;
          document.getElementById("compressPdfFileInfo").innerText = `${compressPdfDoc.numPages} página(s) • ${formatFileSize(file.size)}`;
          btnExec.removeAttribute("disabled");
          document.getElementById("compressPdfResultArea").style.display = "none";
          showToast(`PDF listo (${compressPdfDoc.numPages} páginas)`);
        } catch (err) {
          console.error("Error al abrir PDF:", err);
          if (err && (err.name === "PasswordException" || err.message === "PASSWORD_PROTECTED")) {
            showToast("Este documento PDF está protegido con contraseña.");
          } else {
            showToast("Error al abrir el PDF. Comprueba que no esté corrupto.");
          }
        }
      }

      fileInput.addEventListener("change", (e) => handleCompressPdfFile(e.target.files[0]));
      dropzone.addEventListener("dragover", (e) => { e.preventDefault(); dropzone.classList.add("dragover"); });
      dropzone.addEventListener("dragleave", () => dropzone.classList.remove("dragover"));
      dropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropzone.classList.remove("dragover");
        if (e.dataTransfer.files.length) handleCompressPdfFile(e.dataTransfer.files[0]);
      });

      window.executeCompressPdf = async function() {
        if (!loadedCompressFile || !compressPdfDoc) return;

        const preset = document.getElementById("compressPdfPreset").value;
        let scale = 1.5;
        let quality = 0.75;
        if (preset === "strong") {
          scale = 1.0;
          quality = 0.55;
        } else if (preset === "light") {
          scale = 2.0;
          quality = 0.85;
        }

        const progressWrap = document.getElementById("compressPdfProgressWrap");
        const barFill = document.getElementById("compressPdfBarFill");
        const percentText = document.getElementById("compressPdfPercent");
        const statusText = document.getElementById("compressPdfStatusText");
        const btnCancel = document.getElementById("btnCancelCompressPdf");
        const resultArea = document.getElementById("compressPdfResultArea");
        const btnDownload = document.getElementById("btnDownloadCompressedPdf");

        isCompressCancelled = false;
        resultArea.style.display = "none";
        progressWrap.style.display = "block";
        btnExec.setAttribute("disabled", "true");
        btnCancel.innerText = "Detener";
        btnCancel.onclick = () => {
          isCompressCancelled = true;
          statusText.innerText = "Cancelando...";
        };

        const totalPages = compressPdfDoc.numPages;

        try {
          if (typeof window.PDFLib === "undefined") {
            throw new Error("Librería PDFLib no disponible");
          }
          const newDoc = await window.PDFLib.PDFDocument.create();

          for (let i = 1; i <= totalPages; i++) {
            if (isCompressCancelled) throw new Error("CANCELLED");
            const pct = Math.round(((i - 1) / totalPages) * 85);
            barFill.style.width = `${pct}%`;
            percentText.innerText = `${pct}%`;
            statusText.innerText = `Optimizando página ${i} de ${totalPages}...`;

            const page = await compressPdfDoc.getPage(i);
            const baseViewport = page.getViewport({ scale: 1.0 });
            const origW = baseViewport.width;
            const origH = baseViewport.height;

            const renderViewport = page.getViewport({ scale });
            const canvas = document.createElement("canvas");
            canvas.width = renderViewport.width;
            canvas.height = renderViewport.height;
            const ctx = canvas.getContext("2d");
            await page.render({ canvasContext: ctx, viewport: renderViewport }).promise;

            const jpgBlob = await new Promise(res => canvas.toBlob(res, "image/jpeg", quality));
            canvas.width = 0;
            canvas.height = 0;

            const jpgBytes = await jpgBlob.arrayBuffer();
            const embeddedJpg = await newDoc.embedJpg(jpgBytes);
            const newPage = newDoc.addPage([origW, origH]);
            newPage.drawImage(embeddedJpg, {
              x: 0,
              y: 0,
              width: origW,
              height: origH
            });
          }

          if (isCompressCancelled) throw new Error("CANCELLED");

          statusText.innerText = "Ensamblando documento PDF final...";
          barFill.style.width = "92%";
          percentText.innerText = "92%";

          const outBytes = await newDoc.save();
          compressedPdfBlob = new Blob([outBytes], { type: "application/pdf" });

          barFill.style.width = "100%";
          percentText.innerText = "100%";
          statusText.innerText = "¡Compresión finalizada!";

          const origSize = loadedCompressFile.size;
          const newSize = compressedPdfBlob.size;
          const diff = origSize - newSize;
          const pctSavings = Math.round((diff / origSize) * 100);

          document.getElementById("compressPdfOrigSize").innerText = formatFileSize(origSize);
          document.getElementById("compressPdfNewSize").innerText = formatFileSize(newSize);

          const badge = document.getElementById("compressPdfVerdictBadge");
          btnDownload.style.display = "inline-flex";

          const baseName = loadedCompressFile.name.replace(/\.[^/.]+$/, "");
          btnDownload.onclick = () => {
            const blobUrl = URL.createObjectURL(compressedPdfBlob);
            const a = document.createElement("a");
            a.download = `${baseName}-comprimido.pdf`;
            a.href = blobUrl;
            a.click();
            setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
            showToast("✓ PDF comprimido descargado exitosamente");
          };

          if (newSize < origSize) {
            badge.style.background = "#e6f4ea";
            badge.style.color = "#137333";
            badge.style.border = "1px solid #ceead6";
            badge.innerHTML = `<strong>✓ ¡Reducción exitosa del ${pctSavings}%!</strong> El documento ahorró ${formatFileSize(diff)}.`;
            btnDownload.innerText = "Descargar PDF Comprimido";
            btnDownload.className = "ui-btn ui-btn-primary";
            showToast(`✓ Ahorro del ${pctSavings}% conseguido`);
          } else {
            badge.style.background = "#fce8e6";
            badge.style.color = "#c5221f";
            badge.style.border = "1px solid #fad2cf";
            badge.innerHTML = `<strong>⚠️ Aviso:</strong> El archivo resultante (${formatFileSize(newSize)}) no es menor que el original (${formatFileSize(origSize)}). El PDF original ya contiene gráficos compactos o vectores optimizados; no se recomienda reemplazarlo.`;
            btnDownload.innerText = "Descargar de todos modos";
            btnDownload.className = "ui-btn ui-btn-outlined";
            showToast("El archivo resultante no redujo el tamaño");
          }

          resultArea.style.display = "block";
        } catch (err) {
          if (err && err.message === "CANCELLED") {
            showToast("Compresión de PDF cancelada");
          } else {
            console.error("Error en compress-pdf:", err);
            showToast("Ocurrió un error durante la compresión del PDF");
          }
        } finally {
          btnExec.removeAttribute("disabled");
          btnCancel.innerText = "Cerrar";
          btnCancel.onclick = () => closeToolModal();
        }
      };
      break;
    }

    // ---------------- FASE 2: UNLOCK PDF (qpdf WASM) ----------------
    case "unlock-pdf": {
      container.innerHTML = `
        <div class="ui-dropzone" id="unlockPdfDropzone" onclick="document.getElementById('unlockPdfInput').click()">
          <input type="file" id="unlockPdfInput" style="display: none;" accept=".pdf,application/pdf">
          <div class="ui-dropzone-icon">${ICONS.pdf}</div>
          <div class="ui-dropzone-title">Selecciona o arrastra tu archivo PDF protegido</div>
          <div class="ui-dropzone-sub">Elimina restricciones de impresión/copia o desbloquea con tu contraseña conocida</div>
        </div>

        <div id="unlockPdfWorkArea" style="display: none;">
          <div style="background: var(--md-sys-color-surface-variant); border-radius: 12px; padding: 14px 16px; margin-bottom: 14px; border: 1px solid var(--md-sys-color-outline-variant);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <strong id="unlockPdfFileName" style="font-size: 14px; word-break: break-all;"></strong>
              <button class="ui-btn ui-btn-outlined" style="padding: 4px 10px; font-size: 11px; height: auto;" onclick="resetUnlockPdf()">Cambiar PDF</button>
            </div>
            <div id="unlockPdfFileInfo" style="font-size: 12px; color: var(--md-sys-color-on-surface-variant);"></div>
          </div>

          <div style="background: #e8f0fe; color: #1a73e8; border-radius: 10px; padding: 10px 12px; font-size: 11px; line-height: 1.4; margin-bottom: 14px; display: flex; gap: 8px; align-items: flex-start; border: 1px solid #d2e3fc;">
            <span>ℹ️</span>
            <div>
              <strong>Aviso de uso autorizado:</strong> Usa esta herramienta solo con documentos tuyos o con permiso explícito del propietario. ToolDrive procesa todo 100% en tu navegador y no almacena copias ni contraseñas.
            </div>
          </div>

          <div id="unlockPdfStatusBadge" style="border-radius: 10px; padding: 10px 12px; font-size: 12px; line-height: 1.4; margin-bottom: 14px; display: flex; gap: 8px; align-items: center;"></div>

          <div id="unlockPdfPasswordBlock" style="margin-bottom: 16px; display: none;">
            <label for="unlockPdfPassword" style="font-size: 12px; font-weight: 500; display: block; margin-bottom: 4px;">Contraseña de apertura del documento:</label>
            <div style="position: relative;">
              <input type="password" id="unlockPdfPassword" class="ui-input" style="width: 100%; padding-right: 40px;" placeholder="Ingresa la contraseña conocida del PDF...">
              <button type="button" id="btnToggleUnlockPwd" style="position: absolute; right: 8px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; font-size: 16px; padding: 4px;" aria-label="Mostrar u ocultar contraseña">👁️</button>
            </div>
            <div style="font-size: 11px; color: var(--md-sys-color-on-surface-variant); margin-top: 4px;">
              Nunca intentes adivinar contraseñas ajenas. Se requiere la clave legítima asignada por el emisor.
            </div>
          </div>

          <div id="unlockPdfProgressWrap" style="display: none; margin-top: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; margin-bottom: 6px;">
              <span id="unlockPdfStatusText">Inicializando motor de descifrado qpdf WASM...</span>
              <span id="unlockPdfPercent" style="font-weight: 600;">0%</span>
            </div>
            <div style="background: var(--md-sys-color-surface-variant); border-radius: 8px; height: 8px; overflow: hidden;">
              <div id="unlockPdfBarFill" style="background: var(--md-sys-color-primary); height: 100%; width: 0%; transition: width 0.15s ease;"></div>
            </div>
          </div>
        </div>
      `;

      footer.innerHTML = `
        <button class="ui-btn ui-btn-outlined" id="btnCancelUnlockPdf" onclick="closeToolModal()">Cancelar</button>
        <button class="ui-btn ui-btn-primary" id="btnExecUnlockPdf" disabled onclick="executeUnlockPdf()">Desbloquear PDF</button>
      `;

      const dropzone = document.getElementById("unlockPdfDropzone");
      const fileInput = document.getElementById("unlockPdfInput");
      const workArea = document.getElementById("unlockPdfWorkArea");
      const btnExec = document.getElementById("btnExecUnlockPdf");
      const pwdBlock = document.getElementById("unlockPdfPasswordBlock");
      const pwdInput = document.getElementById("unlockPdfPassword");
      const pwdToggle = document.getElementById("btnToggleUnlockPwd");
      const statusBadge = document.getElementById("unlockPdfStatusBadge");

      let loadedUnlockFile = null;
      let isUnlockCancelled = false;
      let pdfRequiresPassword = false;

      window.cancelUnlockPdf = function() {
        isUnlockCancelled = true;
      };

      window.resetUnlockPdf = function() {
        isUnlockCancelled = true;
        loadedUnlockFile = null;
        pdfRequiresPassword = false;
        fileInput.value = "";
        pwdInput.value = "";
        workArea.style.display = "none";
        dropzone.style.display = "block";
        btnExec.setAttribute("disabled", "true");
        document.getElementById("unlockPdfProgressWrap").style.display = "none";
      };

      pwdToggle.addEventListener("click", () => {
        if (pwdInput.type === "password") {
          pwdInput.type = "text";
          pwdToggle.innerText = "🙈";
        } else {
          pwdInput.type = "password";
          pwdToggle.innerText = "👁️";
        }
      });

      async function handleUnlockPdfFile(file) {
        if (!file) return;
        if (!file.name.toLowerCase().endsWith(".pdf") && file.type !== "application/pdf") {
          showToast("Por favor selecciona un archivo PDF válido");
          return;
        }

        try {
          showToast("Analizando protecciones del PDF...");
          await ensurePdfJsReady();

          let pageCount = 0;
          pdfRequiresPassword = false;

          try {
            const buffer = await file.arrayBuffer();
            const loadingTask = window.pdfjsLib.getDocument({ data: buffer });
            let passwordAttempts = 0;
            loadingTask.onPassword = (updatePassword, reason) => {
              passwordAttempts++;
              if (passwordAttempts > 1) {
                pdfRequiresPassword = true;
                try { loadingTask.destroy(); } catch (e) {}
                return;
              }
              // Attempt with empty password to check if open password is required or only restrictions
              if (typeof updatePassword === "function") {
                try { updatePassword(""); } catch (e) {}
              }
            };
            try {
              const doc = await loadingTask.promise;
              pageCount = doc.numPages;
              pdfRequiresPassword = false;
            } catch (pErr) {
              if (passwordAttempts > 1 || (pErr && (pErr.name === "PasswordException" || (pErr.message && pErr.message.toLowerCase().includes("password"))))) {
                pdfRequiresPassword = true;
              }
            }
          } catch (err) {
            if (err && (err.name === "PasswordException" || (err.message && err.message.toLowerCase().includes("password")))) {
              pdfRequiresPassword = true;
            }
          }

          loadedUnlockFile = file;
          dropzone.style.display = "none";
          workArea.style.display = "block";
          document.getElementById("unlockPdfFileName").textContent = file.name;
          document.getElementById("unlockPdfFileInfo").innerText = `${pageCount > 0 ? pageCount + ' página(s) • ' : ''}${formatFileSize(file.size)}`;

          if (pdfRequiresPassword) {
            statusBadge.style.background = "#fef7e0";
            statusBadge.style.color = "#7c4a00";
            statusBadge.style.border = "1px solid #fce8b2";
            statusBadge.innerHTML = `<span>🔒</span> <div><strong>Protección de apertura detectada:</strong> Este documento está cifrado y requiere contraseña para poder abrirse. Ingrésala abajo para remover las restricciones permanentemente.</div>`;
            pwdBlock.style.display = "block";
            pwdInput.value = "";
            setTimeout(() => pwdInput.focus(), 150);
          } else {
            statusBadge.style.background = "#e6f4ea";
            statusBadge.style.color = "#137333";
            statusBadge.style.border = "1px solid #ceead6";
            statusBadge.innerHTML = `<span>🔓</span> <div><strong>Sin contraseña de apertura:</strong> El documento puede abrirse pero contiene restricciones de copia, impresión o edición. Se removerán mediante qpdf WASM sin necesidad de ingresar contraseña.</div>`;
            pwdBlock.style.display = "none";
            pwdInput.value = "";
          }

          btnExec.removeAttribute("disabled");
          showToast("PDF listo para desbloquear");
        } catch (err) {
          console.error("Error al inspeccionar PDF:", err);
          showToast("No se pudo inspeccionar el documento. Comprueba que sea válido.");
        }
      }

      fileInput.addEventListener("change", (e) => handleUnlockPdfFile(e.target.files[0]));
      dropzone.addEventListener("dragover", (e) => { e.preventDefault(); dropzone.classList.add("dragover"); });
      dropzone.addEventListener("dragleave", () => dropzone.classList.remove("dragover"));
      dropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropzone.classList.remove("dragover");
        if (e.dataTransfer.files.length) handleUnlockPdfFile(e.dataTransfer.files[0]);
      });

      window.executeUnlockPdf = async function() {
        if (!loadedUnlockFile) return;

        const password = pwdInput.value;
        if (pdfRequiresPassword && !password.trim()) {
          showToast("Por favor ingresa la contraseña para desbloquear este PDF");
          pwdInput.focus();
          return;
        }

        const progressWrap = document.getElementById("unlockPdfProgressWrap");
        const barFill = document.getElementById("unlockPdfBarFill");
        const percentText = document.getElementById("unlockPdfPercent");
        const statusText = document.getElementById("unlockPdfStatusText");
        const btnCancel = document.getElementById("btnCancelUnlockPdf");

        isUnlockCancelled = false;
        progressWrap.style.display = "block";
        btnExec.setAttribute("disabled", "true");
        btnCancel.innerText = "Detener";
        btnCancel.onclick = () => {
          isUnlockCancelled = true;
          statusText.innerText = "Cancelando...";
        };

        barFill.style.width = "20%";
        percentText.innerText = "20%";
        statusText.innerText = "Cargando motor criptográfico qpdf WASM...";

        try {
          await ensureQpdfReady();
          if (isUnlockCancelled) throw new Error("CANCELLED");

          barFill.style.width = "40%";
          percentText.innerText = "40%";
          statusText.innerText = "Preparando entorno de descifrado...";

          let capturedStdout = [];
          let capturedStderr = [];

          const qpdf = await window.createQpdfInstance({
            print: (t) => capturedStdout.push(t),
            printErr: (t) => capturedStderr.push(t)
          });

          if (isUnlockCancelled) throw new Error("CANCELLED");

          barFill.style.width = "60%";
          percentText.innerText = "60%";
          statusText.innerText = "Desencriptando y removiendo restricciones...";

          const fileBytes = await loadedUnlockFile.arrayBuffer();
          const inPath = "/unlock_input.pdf";
          const outPath = "/unlock_output.pdf";

          try { qpdf.FS.unlink(inPath); } catch (e) {}
          try { qpdf.FS.unlink(outPath); } catch (e) {}

          qpdf.FS.writeFile(inPath, new Uint8Array(fileBytes));

          const args = ["--decrypt"];
          if (password) {
            args.push(`--password=${password}`);
          }
          args.push(inPath, outPath);

          try {
            qpdf.callMain(args);
          } catch (callErr) {
            // qpdf may throw on non-zero exit or normal program exit
          }

          if (isUnlockCancelled) throw new Error("CANCELLED");

          let decryptedData = null;
          try {
            decryptedData = qpdf.FS.readFile(outPath);
          } catch (readErr) {
            decryptedData = null;
          }

          if (!decryptedData || decryptedData.length === 0) {
            const stderrMsg = capturedStderr.join("\n").toLowerCase();
            if (stderrMsg.includes("password") || stderrMsg.includes("invalid") || stderrMsg.includes("incorrect")) {
              throw new Error("Contraseña incorrecta. Verifica la clave ingresada e inténtalo nuevamente.");
            } else if (stderrMsg.includes("already unencrypted") || stderrMsg.includes("not encrypted")) {
              throw new Error("Este PDF no contiene cifrado ni restricciones activas.");
            } else {
              throw new Error("No se pudo descifrar el documento: " + (capturedStderr[0] || "error en qpdf"));
            }
          }

          barFill.style.width = "90%";
          percentText.innerText = "90%";
          statusText.innerText = "Descargando PDF desbloqueado...";

          const outBlob = new Blob([decryptedData], { type: "application/pdf" });

          try { qpdf.FS.unlink(inPath); } catch (e) {}
          try { qpdf.FS.unlink(outPath); } catch (e) {}

          const baseName = loadedUnlockFile.name.replace(/\.[^/.]+$/, "");
          const blobUrl = URL.createObjectURL(outBlob);
          const a = document.createElement("a");
          a.download = `${baseName}-desbloqueado.pdf`;
          a.href = blobUrl;
          a.click();
          setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);

          barFill.style.width = "100%";
          percentText.innerText = "100%";
          statusText.innerText = "¡PDF desbloqueado!";
          showToast("✓ ¡Documento PDF desbloqueado y descargado!");
          setTimeout(() => closeToolModal(), 700);
        } catch (err) {
          if (err && err.message === "CANCELLED") {
            showToast("Desbloqueo cancelado");
          } else {
            console.error("Error en unlock-pdf:", err);
            showToast(err && err.message ? err.message : "Error al desbloquear el archivo PDF");
          }
        } finally {
          btnExec.removeAttribute("disabled");
          btnCancel.innerText = "Cerrar";
          btnCancel.onclick = () => closeToolModal();
        }
      };
      break;
    }

    // ---------------- FASE 2: DOC TO PDF / PDF TO DOC (MAMMOTH + DOCX) ----------------
    case "doc-to-pdf": {
      container.innerHTML = `
        <div style="display: flex; gap: 8px; margin-bottom: 14px; background: var(--md-sys-color-surface-variant); padding: 4px; border-radius: 12px;">
          <button id="docModeDocxToPdf" class="ui-btn ui-btn-primary" style="flex: 1; font-size: 13px; height: 36px;" onclick="switchDocMode('docx-to-pdf')">
            📄 DOCX a PDF
          </button>
          <button id="docModePdfToDocx" class="ui-btn ui-btn-outlined" style="flex: 1; font-size: 13px; height: 36px; border: none;" onclick="switchDocMode('pdf-to-docx')">
            📑 PDF a DOCX
          </button>
        </div>

        <div style="background: #fef7e0; color: #7c4a00; border-radius: 10px; padding: 10px 12px; font-size: 11px; line-height: 1.4; margin-bottom: 14px; display: flex; gap: 8px; align-items: flex-start; border: 1px solid #fce8b2;">
          <span>⚠️</span>
          <div>
            <strong>Aviso de conversión client-side:</strong> La conversión procesa textos, títulos, párrafos y formatos estándar. Las maquetaciones complejas (tablas anidadas, columnas múltiples, fuentes personalizadas) pueden simplificarse. No garantiza formato 100% idéntico.
          </div>
        </div>

        <!-- MODO 1: DOCX A PDF -->
        <div id="docxToPdfSection">
          <div class="ui-dropzone" id="docxToPdfDropzone" onclick="document.getElementById('docxToPdfInput').click()">
            <input type="file" id="docxToPdfInput" style="display: none;" accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document">
            <div class="ui-dropzone-icon">${ICONS.doc}</div>
            <div class="ui-dropzone-title">Selecciona o arrastra tu archivo Word (.docx)</div>
            <div class="ui-dropzone-sub">Convierte el contenido a PDF maquetado o prepáralo para imprimir</div>
          </div>

          <div id="docxToPdfWorkArea" style="display: none;">
            <div style="background: var(--md-sys-color-surface-variant); border-radius: 12px; padding: 12px 16px; margin-bottom: 12px; border: 1px solid var(--md-sys-color-outline-variant); display: flex; justify-content: space-between; align-items: center;">
              <div>
                <strong id="docxToPdfFileName" style="font-size: 13px; word-break: break-all;"></strong>
                <div id="docxToPdfFileInfo" style="font-size: 11px; color: var(--md-sys-color-on-surface-variant);"></div>
              </div>
              <button class="ui-btn ui-btn-outlined" style="padding: 4px 10px; font-size: 11px; height: auto;" onclick="resetDocxToPdf()">Cambiar archivo</button>
            </div>

            <div style="margin-bottom: 12px;">
              <div style="font-size: 12px; font-weight: 600; margin-bottom: 6px;">Vista previa del documento convertido:</div>
              <div id="docxPreviewBox" style="background: #ffffff; color: #111111; border-radius: 8px; border: 1px solid var(--md-sys-color-outline-variant); padding: 20px; max-height: 200px; overflow-y: auto; font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; line-height: 1.5; box-shadow: inset 0 1px 3px rgba(0,0,0,0.06);"></div>
            </div>

            <div style="display: flex; gap: 8px; justify-content: flex-end; margin-bottom: 10px;">
              <button class="ui-btn ui-btn-outlined" id="btnPrintDocxHtml" onclick="printDocxHtml()" style="font-size: 12px; height: 34px;">
                🖨️ Imprimir / Guardar PDF Nativo
              </button>
            </div>
          </div>
        </div>

        <!-- MODO 2: PDF A DOCX -->
        <div id="pdfToDocxSection" style="display: none;">
          <div class="ui-dropzone" id="pdfToDocxDropzone" onclick="document.getElementById('pdfToDocxInput').click()">
            <input type="file" id="pdfToDocxInput" style="display: none;" accept=".pdf,application/pdf">
            <div class="ui-dropzone-icon">${ICONS.pdf}</div>
            <div class="ui-dropzone-title">Selecciona o arrastra tu archivo PDF</div>
            <div class="ui-dropzone-sub">Extrae el texto página por página y genera un archivo Word (.docx) editable</div>
          </div>

          <div id="pdfToDocxWorkArea" style="display: none;">
            <div style="background: var(--md-sys-color-surface-variant); border-radius: 12px; padding: 12px 16px; margin-bottom: 14px; border: 1px solid var(--md-sys-color-outline-variant); display: flex; justify-content: space-between; align-items: center;">
              <div>
                <strong id="pdfToDocxFileName" style="font-size: 13px; word-break: break-all;"></strong>
                <div id="pdfToDocxFileInfo" style="font-size: 11px; color: var(--md-sys-color-on-surface-variant);"></div>
              </div>
              <button class="ui-btn ui-btn-outlined" style="padding: 4px 10px; font-size: 11px; height: auto;" onclick="resetPdfToDocx()">Cambiar PDF</button>
            </div>

            <div style="background: var(--md-sys-color-surface-variant); border-radius: 10px; padding: 12px 14px; margin-bottom: 14px; font-size: 12px; line-height: 1.4;">
              <div>• Extrae párrafos, saltos de línea y texto plano preservando el orden de lectura.</div>
              <div>• Genera un archivo <strong>.docx</strong> estándar compatible con Microsoft Word, LibreOffice y Google Docs.</div>
            </div>
          </div>
        </div>

        <div id="docConversionProgressWrap" style="display: none; margin-top: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; margin-bottom: 6px;">
            <span id="docConversionStatusText">Procesando conversión...</span>
            <span id="docConversionPercent" style="font-weight: 600;">0%</span>
          </div>
          <div style="background: var(--md-sys-color-surface-variant); border-radius: 8px; height: 8px; overflow: hidden;">
            <div id="docConversionBarFill" style="background: var(--md-sys-color-primary); height: 100%; width: 0%; transition: width 0.15s ease;"></div>
          </div>
        </div>
      `;

      footer.innerHTML = `
        <button class="ui-btn ui-btn-outlined" id="btnCancelDocConv" onclick="closeToolModal()">Cancelar</button>
        <button class="ui-btn ui-btn-primary" id="btnExecDocConv" disabled onclick="executeDocConversion()">Descargar PDF</button>
      `;

      let currentDocMode = "docx-to-pdf";
      let loadedDocxFile = null;
      let loadedPdfFile = null;
      let pdfToDocxDoc = null;
      let docxRenderedHtml = "";
      let isDocConvCancelled = false;

      window.cancelDocToPdf = function() {
        isDocConvCancelled = true;
      };

      window.switchDocMode = function(mode) {
        currentDocMode = mode;
        const btnDocx = document.getElementById("docModeDocxToPdf");
        const btnPdf = document.getElementById("docModePdfToDocx");
        const secDocx = document.getElementById("docxToPdfSection");
        const secPdf = document.getElementById("pdfToDocxSection");
        const btnExec = document.getElementById("btnExecDocConv");

        if (mode === "docx-to-pdf") {
          btnDocx.className = "ui-btn ui-btn-primary";
          btnDocx.style.border = "none";
          btnPdf.className = "ui-btn ui-btn-outlined";
          secDocx.style.display = "block";
          secPdf.style.display = "none";
          btnExec.innerText = "Descargar PDF";
          if (loadedDocxFile) btnExec.removeAttribute("disabled");
          else btnExec.setAttribute("disabled", "true");
        } else {
          btnPdf.className = "ui-btn ui-btn-primary";
          btnPdf.style.border = "none";
          btnDocx.className = "ui-btn ui-btn-outlined";
          secDocx.style.display = "none";
          secPdf.style.display = "block";
          btnExec.innerText = "Convertir a DOCX";
          if (loadedPdfFile && pdfToDocxDoc) btnExec.removeAttribute("disabled");
          else btnExec.setAttribute("disabled", "true");
        }
      };

      window.resetDocxToPdf = function() {
        loadedDocxFile = null;
        docxRenderedHtml = "";
        document.getElementById("docxToPdfInput").value = "";
        document.getElementById("docxToPdfWorkArea").style.display = "none";
        document.getElementById("docxToPdfDropzone").style.display = "block";
        document.getElementById("btnExecDocConv").setAttribute("disabled", "true");
        document.getElementById("docConversionProgressWrap").style.display = "none";
      };

      window.resetPdfToDocx = function() {
        loadedPdfFile = null;
        pdfToDocxDoc = null;
        document.getElementById("pdfToDocxInput").value = "";
        document.getElementById("pdfToDocxWorkArea").style.display = "none";
        document.getElementById("pdfToDocxDropzone").style.display = "block";
        document.getElementById("btnExecDocConv").setAttribute("disabled", "true");
        document.getElementById("docConversionProgressWrap").style.display = "none";
      };

      // Handle DOCX input
      const docxDropzone = document.getElementById("docxToPdfDropzone");
      const docxInput = document.getElementById("docxToPdfInput");

      async function handleDocxFile(file) {
        if (!file) return;
        if (!file.name.toLowerCase().endsWith(".docx")) {
          showToast("Selecciona un archivo Word válido con formato .docx");
          return;
        }

        try {
          showToast("Leyendo documento DOCX...");
          await ensureMammothReady();
          const buffer = await file.arrayBuffer();
          const result = await window.mammoth.convertToHtml({ arrayBuffer: buffer });
          docxRenderedHtml = result.value || "<p><em>(Documento vacío)</em></p>";
          loadedDocxFile = file;

          docxDropzone.style.display = "none";
          document.getElementById("docxToPdfWorkArea").style.display = "block";
          document.getElementById("docxToPdfFileName").textContent = file.name;
          document.getElementById("docxToPdfFileInfo").innerText = `Tamaño: ${formatFileSize(file.size)}`;
          document.getElementById("docxPreviewBox").innerHTML = docxRenderedHtml;
          document.getElementById("btnExecDocConv").removeAttribute("disabled");
          showToast("DOCX leído correctamente");
        } catch (err) {
          console.error("Error al procesar DOCX con mammoth:", err);
          showToast("Error al abrir el documento DOCX. Comprueba que no esté dañado.");
        }
      }

      docxInput.addEventListener("change", (e) => handleDocxFile(e.target.files[0]));
      docxDropzone.addEventListener("dragover", (e) => { e.preventDefault(); docxDropzone.classList.add("dragover"); });
      docxDropzone.addEventListener("dragleave", () => docxDropzone.classList.remove("dragover"));
      docxDropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        docxDropzone.classList.remove("dragover");
        if (e.dataTransfer.files.length) handleDocxFile(e.dataTransfer.files[0]);
      });

      window.printDocxHtml = function() {
        if (!docxRenderedHtml) return;
        const printWin = window.open("", "_blank");
        if (!printWin) {
          showToast("Permite las ventanas emergentes para imprimir");
          return;
        }
        printWin.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>${escapeHtml(loadedDocxFile ? loadedDocxFile.name : "Documento")}</title>
              <style>
                body { font-family: 'Segoe UI', Arial, sans-serif; margin: 40px; color: #111; line-height: 1.6; }
                table { border-collapse: collapse; width: 100%; margin: 16px 0; }
                th, td { border: 1px solid #ccc; padding: 8px; }
                img { max-width: 100%; height: auto; }
                @media print { body { margin: 15mm; } }
              </style>
            </head>
            <body>
              ${docxRenderedHtml}
              <script>
                window.onload = () => { window.print(); };
              </script>
            </body>
          </html>
        `);
        printWin.document.close();
      };

      // Handle PDF to DOCX input
      const pdfDropzone = document.getElementById("pdfToDocxDropzone");
      const pdfInput = document.getElementById("pdfToDocxInput");

      async function handlePdfToDocxFile(file) {
        if (!file) return;
        if (!file.name.toLowerCase().endsWith(".pdf") && file.type !== "application/pdf") {
          showToast("Por favor selecciona un archivo PDF válido");
          return;
        }

        try {
          showToast("Analizando documento PDF...");
          await ensurePdfJsReady();
          const buffer = await file.arrayBuffer();
          const loadingTask = window.pdfjsLib.getDocument({ data: buffer });
          loadingTask.onPassword = () => {
            throw new Error("PASSWORD_PROTECTED");
          };
          pdfToDocxDoc = await loadingTask.promise;
          loadedPdfFile = file;

          pdfDropzone.style.display = "none";
          document.getElementById("pdfToDocxWorkArea").style.display = "block";
          document.getElementById("pdfToDocxFileName").textContent = file.name;
          document.getElementById("pdfToDocxFileInfo").innerText = `${pdfToDocxDoc.numPages} página(s) • ${formatFileSize(file.size)}`;
          document.getElementById("btnExecDocConv").removeAttribute("disabled");
          showToast(`PDF listo (${pdfToDocxDoc.numPages} páginas)`);
        } catch (err) {
          console.error("Error al cargar PDF:", err);
          if (err && (err.name === "PasswordException" || err.message === "PASSWORD_PROTECTED")) {
            showToast("Este documento PDF está protegido con contraseña.");
          } else {
            showToast("Error al abrir el PDF. Comprueba que no esté corrupto.");
          }
        }
      }

      pdfInput.addEventListener("change", (e) => handlePdfToDocxFile(e.target.files[0]));
      pdfDropzone.addEventListener("dragover", (e) => { e.preventDefault(); pdfDropzone.classList.add("dragover"); });
      pdfDropzone.addEventListener("dragleave", () => pdfDropzone.classList.remove("dragover"));
      pdfDropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        pdfDropzone.classList.remove("dragover");
        if (e.dataTransfer.files.length) handlePdfToDocxFile(e.dataTransfer.files[0]);
      });

      // Unified execution function
      window.executeDocConversion = async function() {
        const progressWrap = document.getElementById("docConversionProgressWrap");
        const barFill = document.getElementById("docConversionBarFill");
        const percentText = document.getElementById("docConversionPercent");
        const statusText = document.getElementById("docConversionStatusText");
        const btnExec = document.getElementById("btnExecDocConv");
        const btnCancel = document.getElementById("btnCancelDocConv");

        isDocConvCancelled = false;
        progressWrap.style.display = "block";
        btnExec.setAttribute("disabled", "true");
        btnCancel.innerText = "Detener";
        btnCancel.onclick = () => {
          isDocConvCancelled = true;
          statusText.innerText = "Cancelando...";
        };

        if (currentDocMode === "docx-to-pdf") {
          // ================= DOCX TO PDF =================
          if (!loadedDocxFile || !docxRenderedHtml) return;

          barFill.style.width = "30%";
          percentText.innerText = "30%";
          statusText.innerText = "Cargando motor de renderizado HTML a PDF...";

          try {
            await ensureHtml2PdfReady();
            if (isDocConvCancelled) throw new Error("CANCELLED");

            barFill.style.width = "60%";
            percentText.innerText = "60%";
            statusText.innerText = "Maquetando páginas en formato A4...";

            const element = document.createElement("div");
            element.innerHTML = docxRenderedHtml;
            element.style.fontFamily = "'Segoe UI', Arial, sans-serif";
            element.style.fontSize = "12pt";
            element.style.lineHeight = "1.5";
            element.style.color = "#111111";
            element.style.padding = "10px";

            const opt = {
              margin: [12, 12, 12, 12],
              filename: `${loadedDocxFile.name.replace(/\.[^/.]+$/, "")}.pdf`,
              image: { type: "jpeg", quality: 0.95 },
              html2canvas: { scale: 2, useCORS: true, letterRendering: true },
              jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
            };

            const worker = window.html2pdf().set(opt).from(element);
            const pdfBlob = await worker.output("blob");

            if (isDocConvCancelled) throw new Error("CANCELLED");

            barFill.style.width = "95%";
            percentText.innerText = "95%";
            statusText.innerText = "Descargando PDF...";

            const baseName = loadedDocxFile.name.replace(/\.[^/.]+$/, "");
            const blobUrl = URL.createObjectURL(pdfBlob);
            const a = document.createElement("a");
            a.download = `${baseName}.pdf`;
            a.href = blobUrl;
            a.click();
            setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);

            barFill.style.width = "100%";
            percentText.innerText = "100%";
            statusText.innerText = "¡PDF generado exitosamente!";
            showToast("✓ Archivo PDF generado y descargado");
            setTimeout(() => closeToolModal(), 700);
          } catch (err) {
            if (err && err.message === "CANCELLED") {
              showToast("Conversión cancelada");
            } else {
              console.error("Error al generar PDF desde DOCX:", err);
              showToast("Error al generar el PDF. Puedes usar 'Imprimir / Guardar PDF' como alternativa.");
            }
          } finally {
            btnExec.removeAttribute("disabled");
            btnCancel.innerText = "Cerrar";
            btnCancel.onclick = () => closeToolModal();
          }

        } else {
          // ================= PDF TO DOCX =================
          if (!loadedPdfFile || !pdfToDocxDoc) return;

          barFill.style.width = "25%";
          percentText.innerText = "25%";
          statusText.innerText = "Cargando librería docx...";

          try {
            await ensureDocxReady();
            if (isDocConvCancelled) throw new Error("CANCELLED");

            const totalPages = pdfToDocxDoc.numPages;
            const docChildren = [];

            for (let i = 1; i <= totalPages; i++) {
              if (isDocConvCancelled) throw new Error("CANCELLED");
              const pct = Math.round(25 + ((i - 1) / totalPages) * 60);
              barFill.style.width = `${pct}%`;
              percentText.innerText = `${pct}%`;
              statusText.innerText = `Extrayendo texto de página ${i} de ${totalPages}...`;

              const page = await pdfToDocxDoc.getPage(i);
              const textContent = await page.getTextContent();

              let lastY = null;
              let currentLine = "";
              const lines = [];

              for (const item of textContent.items) {
                if (!item.str) continue;
                const y = Math.round(item.transform[5]);
                if (lastY !== null && Math.abs(y - lastY) > 4) {
                  if (currentLine.trim()) lines.push(currentLine.trim());
                  currentLine = item.str;
                } else {
                  currentLine += (currentLine ? " " : "") + item.str;
                }
                lastY = y;
              }
              if (currentLine.trim()) lines.push(currentLine.trim());

              if (lines.length === 0) {
                docChildren.push(new window.docx.Paragraph({
                  children: [new window.docx.TextRun({ text: `[Página ${i} - Sin texto seleccionable o escaneada]`, italics: true, color: "888888" })]
                }));
              } else {
                for (const line of lines) {
                  docChildren.push(new window.docx.Paragraph({
                    children: [new window.docx.TextRun({ text: line, size: 24 })]
                  }));
                }
              }

              if (i < totalPages) {
                docChildren.push(new window.docx.Paragraph({
                  children: [new window.docx.TextRun({ text: "", break: 1 })]
                }));
              }
            }

            if (isDocConvCancelled) throw new Error("CANCELLED");

            barFill.style.width = "90%";
            percentText.innerText = "90%";
            statusText.innerText = "Empaquetando archivo Word (.docx)...";

            const doc = new window.docx.Document({
              sections: [{
                properties: {},
                children: docChildren
              }]
            });

            const docxBlob = await window.docx.Packer.toBlob(doc);

            if (isDocConvCancelled) throw new Error("CANCELLED");

            barFill.style.width = "100%";
            percentText.innerText = "100%";
            statusText.innerText = "¡DOCX completado!";

            const baseName = loadedPdfFile.name.replace(/\.[^/.]+$/, "");
            const blobUrl = URL.createObjectURL(docxBlob);
            const a = document.createElement("a");
            a.download = `${baseName}-extraido.docx`;
            a.href = blobUrl;
            a.click();
            setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);

            showToast("✓ Archivo Word (.docx) descargado exitosamente");
            setTimeout(() => closeToolModal(), 700);
          } catch (err) {
            if (err && err.message === "CANCELLED") {
              showToast("Conversión cancelada");
            } else {
              console.error("Error al convertir PDF a DOCX:", err);
              showToast("Error al generar el archivo Word (.docx)");
            }
          } finally {
            btnExec.removeAttribute("disabled");
            btnCancel.innerText = "Cerrar";
            btnCancel.onclick = () => closeToolModal();
          }
        }
      };
      break;
    }

    // ---------------- HERRAMIENTAS EN DESARROLLO (IMÁGENES COMPLEJAS) ----------------
    case "remove-bg": {
      container.innerHTML = `
        <div style="text-align: center; padding: 28px 16px; background: var(--md-sys-color-surface-variant); border-radius: 16px; border: 1px dashed var(--md-sys-color-outline-variant);">
          <div style="font-size: 38px; margin-bottom: 10px;">🛠️</div>
          <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 6px; color: var(--md-sys-color-on-surface);">Herramienta en Desarrollo</h3>
          <p style="font-size: 13px; color: var(--md-sys-color-on-surface-variant); max-width: 480px; margin: 0 auto 16px; line-height: 1.5;">
            La segmentación inteligente de sujetos y eliminación de fondo requiere un modelo de visión por computadora local (MediaPipe / TensorFlow.js ~40 MB) en preparación para no enviar tus fotos a servidores externos.
          </p>
          <div style="display: inline-flex; align-items: center; gap: 6px; background: #e8f0fe; color: #1a73e8; font-size: 12px; font-weight: 600; padding: 6px 14px; border-radius: 20px;">
            <span>⏱️</span> Próximamente disponible en ToolDrive
          </div>
        </div>
      `;

      footer.innerHTML = `
        <button class="ui-btn ui-btn-primary" onclick="closeToolModal()">Entendido</button>
      `;
      break;
    }

    // ---------------- AUDIO & VIDEO TOOLS (PREVIEW + PROXIMAMENTE) ----------------
    case "video-to-mp3":
    case "mp4-to-gif":
    case "video-compress":
    case "audio-converter":
    case "video-cutter": {
      const isAudioConv = tool.id === "audio-converter";

      container.innerHTML = `
        <div class="ui-dropzone" id="mediaDropzone" onclick="document.getElementById('mediaFileInput').click()">
          <input type="file" id="mediaFileInput" style="display: none;" accept="video/*,audio/*">
          <div class="ui-dropzone-icon">${isAudioConv ? ICONS.audio : ICONS.video}</div>
          <div class="ui-dropzone-title">Selecciona o arrastra tu archivo multimedia</div>
          <div class="ui-dropzone-sub">Compatible con MP4, WebM, MOV, MP3, WAV, FLAC, M4A</div>
        </div>

        <div id="mediaWorkArea" style="display: none;">
          <div style="background: #000; border-radius: 12px; overflow: hidden; margin-bottom: 16px; max-height: 220px; display: flex; align-items: center; justify-content: center;">
            <video id="mediaPlayerPreview" controls style="max-width: 100%; max-height: 220px;"></video>
          </div>

          <div style="font-size: 12px; color: var(--md-sys-color-on-surface-variant); margin-bottom: 12px;">
            Archivo cargado: <strong id="mediaLoadedName" style="color: var(--md-sys-color-on-surface);">-</strong>
          </div>

          <div style="background: var(--md-sys-color-surface-variant); border-radius: 12px; padding: 14px 16px; border: 1px solid var(--md-sys-color-outline-variant);">
            <div style="display: flex; align-items: flex-start; gap: 10px;">
              <span style="font-size: 20px; line-height: 1;">ℹ️</span>
              <div>
                <div style="font-size: 13px; font-weight: 600; margin-bottom: 2px;">Conversión multimedia local sin servidores</div>
                <div style="font-size: 12px; color: var(--md-sys-color-on-surface-variant); line-height: 1.4;">
                  Para transcodificar y exportar video o audio en el navegador de manera 100% privada se requiere el motor FFmpeg WebAssembly (~30 MB). Esta función estará activa en la próxima versión de ToolDrive para garantizar privacidad y óptimo rendimiento.
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

      footer.innerHTML = `
        <button class="ui-btn ui-btn-outlined" onclick="closeToolModal()">Cerrar</button>
        <button class="ui-btn ui-btn-primary" disabled style="opacity: 0.65; cursor: not-allowed;" title="Motor FFmpeg.wasm en preparación">
          Próximamente disponible
        </button>
      `;

      const fileInput = document.getElementById("mediaFileInput");
      const dropzone = document.getElementById("mediaDropzone");
      const workArea = document.getElementById("mediaWorkArea");
      const player = document.getElementById("mediaPlayerPreview");

      let currentMediaObjectUrl = null;
      function handleMediaFile(file) {
        if (!file) return;
        if (currentMediaObjectUrl) {
          URL.revokeObjectURL(currentMediaObjectUrl);
        }
        currentMediaObjectUrl = URL.createObjectURL(file);
        registerModalObjectUrl(currentMediaObjectUrl);
        player.src = currentMediaObjectUrl;
        document.getElementById("mediaLoadedName").textContent = `${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB)`;
        dropzone.style.display = "none";
        workArea.style.display = "block";
        showToast("Archivo multimedia cargado en el reproductor");
      }

      fileInput.addEventListener("change", (e) => handleMediaFile(e.target.files[0]));

      dropzone.addEventListener("dragover", (e) => { e.preventDefault(); dropzone.classList.add("dragover"); });
      dropzone.addEventListener("dragleave", () => dropzone.classList.remove("dragover"));
      dropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropzone.classList.remove("dragover");
        if (e.dataTransfer.files.length) handleMediaFile(e.dataTransfer.files[0]);
      });
      break;
    }

    // ---------------- OCR (TEXTO DESDE IMAGEN - 100% OFFLINE) ----------------
    case "ocr": {
      container.innerHTML = `
        <div class="ui-dropzone" id="ocrDropzone" onclick="document.getElementById('ocrFileInput').click()">
          <input type="file" id="ocrFileInput" style="display: none;" accept="image/*">
          <div class="ui-dropzone-icon">${ICONS.text}</div>
          <div class="ui-dropzone-title">Sube una foto, captura o escaneo de texto</div>
          <div class="ui-dropzone-sub">Extracción de caracteres 100% local en tu navegador (sin conexión a internet)</div>
        </div>

        <div id="ocrResultWrap" style="display: none;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; gap: 10px; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <label class="ui-control-label" style="margin-bottom: 0; font-size: 12px; font-weight: 600;">Idioma:</label>
              <select id="ocrLangSelect" class="ui-select" style="width: auto; padding: 4px 10px; height: 32px; font-size: 13px;">
                <option value="spa" selected>Español (spa)</option>
                <option value="spa+eng">Español + Inglés</option>
                <option value="eng">Inglés (eng)</option>
              </select>
            </div>
            <button id="btnChangeOcrImg" class="ui-btn ui-btn-outlined" style="padding: 4px 12px; height: 32px; font-size: 12px;" onclick="document.getElementById('ocrFileInput').click()">
              📷 Cambiar imagen
            </button>
          </div>

          <div id="ocrProgressWrap" style="display: none; margin-bottom: 14px; background: var(--md-sys-color-surface-variant); padding: 10px 14px; border-radius: 8px; border: 1px solid var(--md-sys-color-outline-variant);">
            <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 6px;">
              <span id="ocrStatusText" style="color: var(--md-sys-color-primary); font-weight: 500;">Preparando análisis...</span>
              <span id="ocrPercentText" style="font-weight: 600;">0%</span>
            </div>
            <div class="storage-bar-bg" style="height: 6px;">
              <div id="ocrBarFill" class="storage-bar-fill" style="width: 0%; transition: width 0.25s ease;"></div>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 210px 1fr; gap: 16px;">
            <div style="background: var(--md-sys-color-surface-variant); border-radius: 8px; padding: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; max-height: 230px; overflow: hidden; border: 1px solid var(--md-sys-color-outline-variant);">
              <img id="ocrPreviewImg" style="max-width: 100%; max-height: 210px; object-fit: contain; border-radius: 4px;" alt="Vista previa" />
            </div>
            <div>
              <div class="ui-control-group" style="margin-bottom: 0;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                  <label class="ui-control-label" style="margin-bottom: 0; font-size: 13px;">Texto reconocido extraído (editable):</label>
                  <span id="ocrWordCharCount" style="font-size: 11px; color: var(--md-sys-color-on-surface-variant);">0 caracteres | 0 palabras</span>
                </div>
                <textarea id="ocrOutputText" class="ui-textarea" style="height: 185px; font-size: 13.5px; line-height: 1.5; resize: vertical;" placeholder="El texto reconocido aparecerá aquí..."></textarea>
              </div>
            </div>
          </div>
        </div>
      `;

      footer.innerHTML = `
        <button class="ui-btn ui-btn-outlined" onclick="closeToolModal()">Cerrar</button>
        <button id="btnDownloadTxt" class="ui-btn ui-btn-outlined" disabled onclick="downloadOcrText()">Descargar .TXT</button>
        <button id="btnCopyOcr" class="ui-btn ui-btn-primary" disabled onclick="copyOcrText()">Copiar Texto Extraído</button>
      `;

      let currentOcrObjectUrl = null;
      let activeTesseractWorker = null;
      let pendingWorkerPromise = null;
      let ocrRunId = 0;
      let ocrProgressTimeout = null;

      function revokeCurrentOcrObjectUrl() {
        if (currentOcrObjectUrl) {
          try { URL.revokeObjectURL(currentOcrObjectUrl); } catch (e) {}
          currentOcrObjectUrl = null;
        }
      }

      window.cleanOcrResources = function() {
        ocrRunId++;
        if (activeTesseractWorker) {
          try { activeTesseractWorker.terminate(); } catch (e) {}
          activeTesseractWorker = null;
        }
        if (pendingWorkerPromise) {
          pendingWorkerPromise.then(w => {
            try { if (w) w.terminate(); } catch (e) {}
          }).catch(() => {});
          pendingWorkerPromise = null;
        }
        revokeCurrentOcrObjectUrl();
        if (ocrProgressTimeout) {
          clearTimeout(ocrProgressTimeout);
          ocrProgressTimeout = null;
        }
      };

      function updateOcrProgress(pct, status) {
        const progressWrap = document.getElementById("ocrProgressWrap");
        const barFill = document.getElementById("ocrBarFill");
        const statusText = document.getElementById("ocrStatusText");
        const percentText = document.getElementById("ocrPercentText");

        if (progressWrap) progressWrap.style.display = "block";
        if (barFill) barFill.style.width = `${pct}%`;
        if (percentText) percentText.innerText = `${pct}%`;
        if (statusText && status) statusText.innerText = status;
      }

      function ensureTesseractReady() {
        return new Promise((resolve, reject) => {
          if (typeof Tesseract !== "undefined") return resolve();
          const local = document.createElement("script");
          local.src = "tesseract.min.js";
          local.onload = () => resolve();
          local.onerror = () => reject(new Error("No se pudo cargar la librería local tesseract.min.js"));
          document.head.appendChild(local);
        });
      }

      async function runOcrRecognition(imageUrl) {
        const runId = ++ocrRunId;
        const outputText = document.getElementById("ocrOutputText");
        const btnCopy = document.getElementById("btnCopyOcr");
        const btnDownload = document.getElementById("btnDownloadTxt");
        const charCount = document.getElementById("ocrWordCharCount");
        const langSelect = document.getElementById("ocrLangSelect");
        const btnChangeImg = document.getElementById("btnChangeOcrImg");
        const lang = langSelect ? langSelect.value : "spa";

        // Limpiar temporizador previo de ocultamiento de barra
        if (ocrProgressTimeout) {
          clearTimeout(ocrProgressTimeout);
          ocrProgressTimeout = null;
        }

        // Resetear color de la barra (remover rojo previo de error)
        const barFill = document.getElementById("ocrBarFill");
        if (barFill) {
          barFill.style.backgroundColor = "";
          barFill.style.width = "0%";
        }

        outputText.value = "";
        outputText.placeholder = "Escaneando imagen y reconociendo caracteres con motor local...";
        btnCopy.setAttribute("disabled", "true");
        btnDownload.setAttribute("disabled", "true");
        if (charCount) charCount.innerText = "Procesando...";

        // Bloquear select de idioma y botón para evitar carreras
        if (langSelect) langSelect.setAttribute("disabled", "true");
        if (btnChangeImg) btnChangeImg.setAttribute("disabled", "true");

        updateOcrProgress(5, "Iniciando motor OCR local...");

        try {
          await ensureTesseractReady();
          if (runId !== ocrRunId) return;

          // Terminar worker anterior si estaba activo
          if (activeTesseractWorker) {
            try { await activeTesseractWorker.terminate(); } catch (e) {}
            activeTesseractWorker = null;
          }

          updateOcrProgress(15, "Inicializando modelos de lenguaje locales...");

          const ocrAssetsBasePath = new URL('ocr-assets/', window.location.href).href;
          const ocrWorkerPath = new URL('ocr-assets/worker.min.js', window.location.href).href;

          const workerPromise = Tesseract.createWorker(lang, 1, {
            workerPath: ocrWorkerPath,
            corePath: ocrAssetsBasePath,
            langPath: ocrAssetsBasePath,
            gzip: false,
            logger: m => {
              if (runId !== ocrRunId) return;
              if (m && m.status) {
                if (m.status === "loading tesseract core") {
                  updateOcrProgress(25, "Cargando núcleo WASM local...");
                } else if (m.status === "loading language traineddata") {
                  const p = 30 + Math.round((m.progress || 0.1) * 35);
                  updateOcrProgress(p, `Cargando diccionario local (${lang})...`);
                } else if (m.status === "initializing api") {
                  updateOcrProgress(68, "Configurando motor de caracteres...");
                } else if (m.status === "recognizing text") {
                  const p = 70 + Math.round((m.progress || 0) * 30);
                  updateOcrProgress(p, `Extrayendo texto de la imagen... (${p}%)`);
                }
              }
            }
          });

          pendingWorkerPromise = workerPromise;
          const worker = await workerPromise;
          if (pendingWorkerPromise === workerPromise) {
            pendingWorkerPromise = null;
          }

          if (runId !== ocrRunId) {
            try { await worker.terminate(); } catch (e) {}
            return;
          }

          activeTesseractWorker = worker;

          const result = await worker.recognize(imageUrl);
          if (runId !== ocrRunId) return;

          const recognizedText = (result && result.data && result.data.text) ? result.data.text.trim() : "";

          updateOcrProgress(100, "✓ ¡Reconocimiento óptico completado!");

          if (recognizedText) {
            outputText.value = recognizedText;
            btnCopy.removeAttribute("disabled");
            btnDownload.removeAttribute("disabled");
            if (charCount) {
              const words = recognizedText.split(/\s+/).filter(Boolean).length;
              charCount.innerText = `${recognizedText.length} caracteres | ${words} palabras`;
            }
            showToast("✓ Texto extraído exitosamente");
          } else {
            // Mostrar como placeholder, no como valor
            outputText.value = "";
            outputText.placeholder = "No se detectó ningún texto claro en la imagen. Intenta con una imagen de mayor resolución o mejor iluminación.";
            btnCopy.setAttribute("disabled", "true");
            btnDownload.setAttribute("disabled", "true");
            if (charCount) charCount.innerText = "0 caracteres | 0 palabras";
            showToast("No se detectó texto claro en la imagen");
          }

          ocrProgressTimeout = setTimeout(() => {
            const progressWrap = document.getElementById("ocrProgressWrap");
            if (progressWrap) progressWrap.style.display = "none";
          }, 2500);

        } catch (err) {
          if (runId !== ocrRunId) return;
          console.error("Error en Tesseract OCR:", err);

          // Mensajes diferenciados según el tipo de fallo
          const errStr = (err && err.message) ? err.message.toLowerCase() : "";
          let userMsg = "Error desconocido al procesar el reconocimiento de texto.";
          let toastMsg = "Error en OCR";

          if (errStr.includes("network") || errStr.includes("fetch") || errStr.includes("traineddata") || errStr.includes("not found") || errStr.includes("loadlanguage")) {
            userMsg = `No se pudieron cargar los modelos locales de idioma (${lang}) desde /ocr-assets.`;
            toastMsg = "Modelos de idioma OCR no encontrados";
          } else if (errStr.includes("image") || errStr.includes("read") || errStr.includes("decode") || errStr.includes("corrupt") || errStr.includes("format")) {
            userMsg = "No se pudo leer la imagen seleccionada. El archivo podría estar dañado o tener un formato incompatible.";
            toastMsg = "Imagen inválida o corrupta";
          } else if (errStr.includes("worker") || errStr.includes("core") || errStr.includes("wasm")) {
            userMsg = "Error al iniciar el núcleo WebAssembly local en /ocr-assets.";
            toastMsg = "Error al iniciar núcleo OCR";
          } else if (err && err.message) {
            userMsg = `Ocurrió un error en el escaneo: ${err.message}`;
            toastMsg = `Error OCR: ${err.message}`;
          }

          updateOcrProgress(100, "⚠️ " + toastMsg);
          const barFillErr = document.getElementById("ocrBarFill");
          if (barFillErr) barFillErr.style.backgroundColor = "#ea4335";
          outputText.value = "";
          outputText.placeholder = userMsg;
          showToast(toastMsg);
        } finally {
          if (runId === ocrRunId) {
            if (langSelect) langSelect.removeAttribute("disabled");
            if (btnChangeImg) btnChangeImg.removeAttribute("disabled");
          }
        }
      }

      window.copyOcrText = async function() {
        const text = document.getElementById("ocrOutputText")?.value;
        if (!text) {
          showToast("No hay texto para copiar");
          return;
        }
        let copied = false;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          try {
            await navigator.clipboard.writeText(text);
            copied = true;
          } catch (e) {
            copied = false;
          }
        }
        if (!copied) {
          try {
            const tempTa = document.createElement("textarea");
            tempTa.value = text;
            tempTa.style.position = "fixed";
            tempTa.style.opacity = "0";
            tempTa.style.left = "-9999px";
            document.body.appendChild(tempTa);
            tempTa.select();
            copied = document.execCommand("copy");
            document.body.removeChild(tempTa);
          } catch (e) {
            copied = false;
          }
        }
        if (copied) {
          showToast("Texto copiado al portapapeles");
        } else {
          showToast("No se pudo copiar automáticamente");
        }
      };

      window.downloadOcrText = function() {
        const text = document.getElementById("ocrOutputText")?.value;
        if (!text) return;
        const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.download = "texto-extraido-tooldrive.txt";
        a.href = blobUrl;
        a.click();
        setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
        showToast("Archivo .txt descargado");
      };

      function handleOcrFile(file) {
        if (!file) return;
        if (!file.type || !file.type.startsWith("image/")) {
          showToast("Selecciona un archivo de imagen válido (PNG, JPG, WebP, etc.)");
          return;
        }
        revokeCurrentOcrObjectUrl();
        currentOcrObjectUrl = URL.createObjectURL(file);

        document.getElementById("ocrDropzone").style.display = "none";
        document.getElementById("ocrResultWrap").style.display = "block";
        document.getElementById("ocrPreviewImg").src = currentOcrObjectUrl;
        runOcrRecognition(currentOcrObjectUrl);
      }

      const fileInput = document.getElementById("ocrFileInput");
      fileInput.addEventListener("change", (e) => {
        const file = e.target.files && e.target.files[0];
        fileInput.value = ""; // Resetear valor para permitir elegir el mismo archivo otra vez
        if (file) handleOcrFile(file);
      });

      const langSelect = document.getElementById("ocrLangSelect");
      if (langSelect) {
        langSelect.addEventListener("change", () => {
          if (currentOcrObjectUrl) {
            runOcrRecognition(currentOcrObjectUrl);
          }
        });
      }

      // Actualizar contador de palabras y caracteres en vivo al editar
      const outputText = document.getElementById("ocrOutputText");
      if (outputText) {
        outputText.addEventListener("input", () => {
          const val = outputText.value;
          const words = val.trim() ? val.trim().split(/\s+/).length : 0;
          const charCount = document.getElementById("ocrWordCharCount");
          if (charCount) {
            charCount.innerText = `${val.length} caracteres | ${words} palabras`;
          }
          const btnCopy = document.getElementById("btnCopyOcr");
          const btnDownload = document.getElementById("btnDownloadTxt");
          if (btnCopy) {
            if (val.trim()) btnCopy.removeAttribute("disabled");
            else btnCopy.setAttribute("disabled", "true");
          }
          if (btnDownload) {
            if (val.trim()) btnDownload.removeAttribute("disabled");
            else btnDownload.setAttribute("disabled", "true");
          }
        });
      }

      // Soporte Drag and Drop local en Dropzone
      const dropzone = document.getElementById("ocrDropzone");
      if (dropzone) {
        dropzone.addEventListener("dragover", (e) => {
          e.preventDefault();
          dropzone.classList.add("dragover");
        });
        dropzone.addEventListener("dragleave", () => {
          dropzone.classList.remove("dragover");
        });
        dropzone.addEventListener("drop", (e) => {
          e.preventDefault();
          dropzone.classList.remove("dragover");
          if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleOcrFile(e.dataTransfer.files[0]);
          }
        });
      }

      // Evitar navegación al soltar fuera del dropzone dentro del contenedor
      container.addEventListener("dragover", (e) => e.preventDefault());
      container.addEventListener("drop", (e) => e.preventDefault());

      break;
    }

    default: {
      container.innerHTML = `
        <div style="padding: 24px; text-align: center;">
          <div style="font-size: 15px; font-weight: 500; margin-bottom: 8px;">${tool.title}</div>
          <div style="font-size: 13px; color: #444746;">${tool.desc}</div>
        </div>
      `;
      footer.innerHTML = `
        <button class="ui-btn ui-btn-primary" onclick="closeToolModal()">Cerrar</button>
      `;
    }
  }
}
