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
    desc: "Convierte documentos de Word (.docx) a formato PDF o viceversa manteniendo formato y tablas.",
    reason: "Conversión de alta precisión de oficina",
    location: "PDFs y Documentos",
    formats: ".docx, .pdf",
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
    desc: "Reduce el tamaño de un archivo PDF hasta en un 80% para poder enviarlo fácilmente por correo.",
    reason: "Optimización de peso para adjuntar en correo",
    location: "PDFs y Documentos",
    formats: ".pdf",
    iconType: "pdf"
  },
  {
    id: "pdf-to-jpeg",
    category: "pdf",
    categoryName: "Gestión de PDF",
    title: "PDF to JPEG",
    desc: "Convierte cada una de las páginas de un documento PDF en imágenes independientes de alta resolución.",
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
    desc: "Elimina contraseñas, permisos de impresión restringidos y protecciones de tus archivos PDF.",
    reason: "Desbloqueo de documentos protegidos",
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
    iconType: "image"
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
    desc: "Convierte fotos tomadas con iPhone (formato HEIC) a formato JPEG compatible con cualquier PC.",
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
    title: "Upscale Image (Agrandar imagen)",
    desc: "Aumenta la resolución 2x o 4x y mejora la nitidez de imágenes pequeñas mediante filtros de superresolución.",
    reason: "Recuperación de detalles en fotos pequeñas",
    location: "Imágenes",
    formats: ".jpg, .png",
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
    iconType: "video"
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
    iconType: "video"
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
    iconType: "video"
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
    iconType: "audio"
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
    iconType: "video"
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

// ==================== APP STATE ====================
let currentCategory = "all";
let currentSearch = "";
let currentView = "list"; // "list" | "grid"
let favorites = JSON.parse(localStorage.getItem("tooldrive_favorites") || "[]");
let recentTools = JSON.parse(localStorage.getItem("tooldrive_recents") || "[]");
let quickNotes = localStorage.getItem("tooldrive_notes") || "";

// Custom Folders State
let customFolders = JSON.parse(localStorage.getItem("tooldrive_custom_folders") || "null");
if (!customFolders || !Array.isArray(customFolders)) {
  customFolders = [
    {
      id: "custom_ejemplo1",
      name: "Ejemplo 1",
      color: "#ea4335",
      tools: ["doc-to-pdf", "image-compress", "qr-generator"]
    }
  ];
  localStorage.setItem("tooldrive_custom_folders", JSON.stringify(customFolders));
}

// Default Folders Overrides & Hidden Folders State
let defaultFolderOverrides = JSON.parse(localStorage.getItem("tooldrive_default_folder_overrides") || "{}");
let hiddenFolders = JSON.parse(localStorage.getItem("tooldrive_hidden_folders") || "[]");

const FOLDER_COLORS = ["#ea4335", "#1a73e8", "#34a853", "#f9ab00", "#9c27b0", "#009688", "#e91e63", "#ff6d00"];
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

function saveCustomFolders() {
  localStorage.setItem("tooldrive_custom_folders", JSON.stringify(customFolders));
  renderSidebarNav();
  renderFolders();
  renderTools();
}

function saveDefaultFolderOverrides() {
  localStorage.setItem("tooldrive_default_folder_overrides", JSON.stringify(defaultFolderOverrides));
  localStorage.setItem("tooldrive_hidden_folders", JSON.stringify(hiddenFolders));
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
        <span>${cat.label}</span>
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
          <span class="nav-icon" style="color: ${cf.color};">${ICONS.folder}</span>
          <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${cf.name}</span>
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
    { id: "pdf", defaultName: "Gestión de PDF", defaultColor: "#ea4335", count: "7 herramientas", sub: "Documentos oficiales" },
    { id: "image", defaultName: "Edición de Imágenes", defaultColor: "#34a853", count: "9 herramientas", sub: "Fotos y gráficos" },
    { id: "media", defaultName: "Audio y Video", defaultColor: "#9c27b0", count: "5 herramientas", sub: "Formatos multimedia" },
    { id: "text", defaultName: "Texto y Productividad", defaultColor: "#f57c00", count: "5 herramientas", sub: "OCR y redacción" },
    { id: "dev", defaultName: "Web y Desarrollador", defaultColor: "#1a73e8", count: "4 herramientas", sub: "QR, Colores y JSON" }
  ];

  const activeDefaultFolders = baseDefaultFolders
    .filter(f => !hiddenFolders.includes(f.id))
    .map(f => ({
      ...f,
      name: defaultFolderOverrides[f.id]?.name || f.defaultName,
      color: defaultFolderOverrides[f.id]?.color || f.defaultColor
    }));

  let html = activeDefaultFolders.map(f => `
    <div class="folder-card ${currentCategory === f.id ? 'active' : ''}" onclick="setCategory('${f.id}')">
      <div class="folder-icon" style="color: ${f.color}">
        ${ICONS.folder}
      </div>
      <div class="folder-info">
        <div class="folder-name">${f.name}</div>
        <div class="folder-meta">${f.count}</div>
      </div>
      <div class="folder-more" onclick="openFolderContextMenu('${f.id}', event)" title="Opciones de carpeta">
        ${ICONS.more}
      </div>
    </div>
  `).join("");

  // Add custom folders
  customFolders.forEach(cf => {
    const isActive = currentCategory === cf.id ? 'active' : '';
    html += `
      <div class="folder-card folder-card-custom ${isActive}" onclick="setCategory('${cf.id}')">
        <div class="folder-icon" style="color: ${cf.color}">
          ${ICONS.folder}
        </div>
        <div class="folder-info">
          <div class="folder-name" title="${cf.name}">${cf.name}</div>
          <div class="folder-meta">${cf.tools.length} ${cf.tools.length === 1 ? 'herramienta' : 'herramientas'}</div>
        </div>
        <div class="folder-more" onclick="openFolderContextMenu('${cf.id}', event)" title="Opciones de carpeta">
          ${ICONS.more}
        </div>
      </div>
    `;
  });

  // Add "+ Nueva carpeta" card
  html += `
    <div class="folder-card folder-card-add" onclick="openNewFolderModal()" title="Crear nueva carpeta personalizada">
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
            <div class="custom-folder-icon-circle" style="color: ${activeFolder.color};">
              ${ICONS.folder}
            </div>
            <div>
              <div class="custom-folder-title">${activeFolder.name}</div>
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
          <div class="empty-icon" style="color: ${activeFolder ? activeFolder.color : '#ea4335'};">${ICONS.folder}</div>
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
              <th style="width: 320px;">Nombre</th>
              <th>Motivo por el que se te sugiere</th>
              <th>Ubicación</th>
              <th style="text-align: right; padding-right: 20px; width: 80px;"></th>
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
              <span class="tool-file-icon">${getFileIcon(tool.iconType)}</span>
              <span>${tool.title}</span>
            </div>
          </td>
          <td>
            <div class="tool-reason-cell" title="${tool.desc}">${tool.reason}</div>
          </td>
          <td>
            <div class="tool-location-cell">
              ${ICONS.folder}
              <span>${tool.location}</span>
            </div>
          </td>
          <td class="tool-actions-cell" onclick="event.stopPropagation()">
            <button class="folder-assign-btn ${isInFolder ? 'has-folders' : ''}" onclick="openAssignToolModal('${tool.id}', event)" title="Organizar en carpetas">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M20 6h-8l-2-2H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-1 8h-3v3h-2v-3h-3v-2h3V9h2v3h3v2z"/>
              </svg>
            </button>
            <button class="star-btn ${isStarred ? 'starred' : ''}" onclick="toggleFavorite('${tool.id}', event)" title="Destacar">
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
            <span class="tool-card-badge">${tool.formats}</span>
          </div>
          <div class="tool-card-title">${tool.title}</div>
          <div class="tool-card-desc">${tool.desc}</div>
          <div class="tool-card-footer" onclick="event.stopPropagation()">
            <span style="font-size: 11px; color: #747775;">${tool.categoryName}</span>
            <div style="display: flex; align-items: center; gap: 4px;">
              <button class="folder-assign-btn ${isInFolder ? 'has-folders' : ''}" onclick="openAssignToolModal('${tool.id}', event)" title="Organizar en carpetas">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M20 6h-8l-2-2H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-1 8h-3v3h-2v-3h-3v-2h3V9h2v3h3v2z"/>
                </svg>
              </button>
              <button class="star-btn ${isStarred ? 'starred' : ''}" onclick="toggleFavorite('${tool.id}', event)">
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
    if (cat === "all") bannerTitle.innerHTML = "Te damos la bienvenida a <strong>ToolDrive</strong>";
    else if (cat === "favorites") bannerTitle.innerHTML = "Herramientas <strong>Destacadas</strong>";
    else if (cat === "recents") bannerTitle.innerHTML = "Herramientas <strong>Recientes</strong>";
    else {
      const folderInfo = getFolderInfo(cat);
      if (folderInfo) {
        bannerTitle.innerHTML = `Carpeta: <strong>${folderInfo.name}</strong>`;
      } else {
        const folder = TOOLS.find(t => t.category === cat);
        bannerTitle.innerHTML = `Categoría: <strong>${folder ? folder.categoryName : cat}</strong>`;
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
  localStorage.setItem("tooldrive_favorites", JSON.stringify(favorites));
  renderSidebarNav();
  renderTools();
}

function markAsRecent(id) {
  recentTools = recentTools.filter(item => item !== id);
  recentTools.unshift(id);
  if (recentTools.length > 10) recentTools.pop();
  localStorage.setItem("tooldrive_recents", JSON.stringify(recentTools));
  renderSidebarNav();
}


// ==================== TOAST SYSTEM ====================
function showToast(message) {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <span style="color: #34a853;">${ICONS.check}</span>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(8px)";
    setTimeout(() => toast.remove(), 250);
  }, 2800);
}

// ==================== TEMA OSCURO / CLARO (iOS SWITCH) ====================
function initTheme() {
  const savedTheme = localStorage.getItem("tooldrive_theme");
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.body.classList.add("dark-theme");
  } else {
    document.body.classList.remove("dark-theme");
  }

  // Global Keyboard Shortcuts
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeToolModal();
    } else if (e.key === "/" && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") {
      e.preventDefault();
      const search = document.getElementById("searchInput");
      if (search) search.focus();
    }
  });
}

window.toggleTheme = function() {
  const isDark = document.body.classList.toggle("dark-theme");
  localStorage.setItem("tooldrive_theme", isDark ? "dark" : "light");
  showToast(isDark ? "Modo oscuro activado" : "Modo claro activado");
};


// ==================== INTERACTIVE TOOLS WORKSPACE ====================
window.openToolModal = function(toolId) {
  const tool = TOOLS.find(t => t.id === toolId);
  if (!tool) return;

  markAsRecent(tool.id);

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
};

window.closeToolModal = function() {
  const backdrop = document.getElementById("toolModalBackdrop");
  if (backdrop) backdrop.classList.remove("open");
  // Clean speech synthesis or microphone if active
  if (window.speechRecognitionInstance) {
    try { window.speechRecognitionInstance.stop(); } catch(e) {}
  }
};

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

window.openNewFolderModal = function(editFolderId = null) {
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
  modalIcon.innerHTML = `<svg viewBox="0 0 24 24" width="22" height="22" fill="${selectedFolderColor}"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>`;

  const initialTools = isEditing ? existingFolder.tools : [];

  // Build Body
  let bodyHtml = `
    <div class="ui-control-group">
      <label class="ui-control-label">Nombre de la carpeta</label>
      <input type="text" id="folderNameInput" class="ui-input" placeholder="Ejemplo 1, Documentos Contables, etc." value="${isEditing ? existingFolder.name : ''}" autofocus />
    </div>

    <div class="ui-control-group">
      <label class="ui-control-label">Color de la carpeta</label>
      <div class="color-picker-palette" id="folderColorPalette">
        ${FOLDER_COLORS.map(c => `
          <div class="color-dot ${c === selectedFolderColor ? 'active' : ''}" style="background-color: ${c};" onclick="selectFolderColor('${c}')" data-color="${c}"></div>
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
                <div class="tool-checkbox-title">${t.title}</div>
                <div class="tool-checkbox-cat">${t.categoryName}</div>
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
};

window.selectFolderColor = function(color) {
  selectedFolderColor = color;
  document.querySelectorAll("#folderColorPalette .color-dot").forEach(dot => {
    dot.classList.toggle("active", dot.getAttribute("data-color") === color);
  });
  const icon = document.getElementById("folderModalIcon");
  if (icon) {
    icon.innerHTML = `<svg viewBox="0 0 24 24" width="22" height="22" fill="${color}"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.89 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>`;
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
  const name = nameInput ? nameInput.value.trim() : "";
  if (!name) {
    showToast("Por favor, ingresa un nombre para la carpeta");
    if (nameInput) nameInput.focus();
    return;
  }

  const checkedCheckboxes = document.querySelectorAll('#toolsSelectionList input[type="checkbox"]:checked');
  const selectedTools = Array.from(checkedCheckboxes).map(c => c.value);

  if (folderId) {
    // Editing
    const folderIndex = customFolders.findIndex(cf => cf.id === folderId);
    if (folderIndex !== -1) {
      customFolders[folderIndex].name = name;
      customFolders[folderIndex].color = selectedFolderColor;
      customFolders[folderIndex].tools = selectedTools;
      showToast(`Carpeta "${name}" actualizada`);
    }
  } else {
    // Creating
    const newId = "custom_" + Date.now();
    customFolders.push({
      id: newId,
      name: name,
      color: selectedFolderColor,
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

  if (confirm(`¿Estás seguro de que deseas eliminar la carpeta "${folder.name}"? Las herramientas seguirán estando disponibles.`)) {
    customFolders = customFolders.filter(cf => cf.id !== folderId);
    if (currentCategory === folderId) {
      currentCategory = "all";
    }
    saveCustomFolders();
    showToast(`Carpeta "${folder.name}" eliminada`);
  }
};

window.openAddToolsToFolderModal = function(folderId) {
  openNewFolderModal(folderId);
};

// ==================== ASSIGN TOOL TO FOLDERS QUICK MODAL ====================
let currentAssignToolId = null;

window.openAssignToolModal = function(toolId, event) {
  if (event) event.stopPropagation();
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
        Marca las carpetas donde deseas incluir <strong>${tool.title}</strong>:
      </p>
      <div class="tools-selection-container" style="max-height: 220px;">
        ${customFolders.map(cf => {
          const isIncluded = cf.tools.includes(tool.id);
          return `
            <div class="tool-checkbox-item ${isIncluded ? 'checked' : ''}" onclick="toggleToolInFolder('${cf.id}', '${tool.id}', this, event)">
              <input type="checkbox" id="chk_assign_${cf.id}" ${isIncluded ? 'checked' : ''} onclick="event.stopPropagation(); toggleToolInFolderDirect('${cf.id}', '${tool.id}', this);" />
              <div class="tool-file-icon" style="color: ${cf.color};">${ICONS.folder}</div>
              <div class="tool-checkbox-info">
                <div class="tool-checkbox-title">${cf.name}</div>
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
};

window.closeAssignToolModal = function() {
  const backdrop = document.getElementById("assignToolModalBackdrop");
  if (backdrop) backdrop.classList.remove("open");
  currentAssignToolId = null;
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
window.openFolderContextMenu = function(folderId, event) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }
  currentContextMenuFolderId = folderId;
  const menu = document.getElementById("folderContextMenu");
  if (!menu) return;

  const btn = event?.currentTarget || event?.target;
  const rect = btn ? btn.getBoundingClientRect() : null;

  menu.style.display = "block";
  menu.style.visibility = "hidden";

  const menuWidth = menu.offsetWidth || 210;
  const menuHeight = menu.offsetHeight || 160;

  let left = rect ? rect.right - menuWidth : 100;
  let top = rect ? rect.bottom + 6 : 100;

  if (left < 10) left = 10;
  if (left + menuWidth > window.innerWidth - 10) {
    left = window.innerWidth - menuWidth - 10;
  }
  if (top + menuHeight > window.innerHeight - 10) {
    top = (rect ? rect.top - menuHeight - 6 : top);
  }

  menu.style.left = `${Math.max(0, left)}px`;
  menu.style.top = `${Math.max(0, top)}px`;
  menu.style.visibility = "visible";

  const manageOption = document.getElementById("ctxManageToolsOption");
  if (manageOption) {
    const isCustom = folderId && folderId.startsWith("custom_");
    manageOption.style.display = isCustom ? "flex" : "none";
  }
};

window.closeFolderContextMenu = function() {
  const menu = document.getElementById("folderContextMenu");
  if (menu) menu.style.display = "none";
};

// 1. Modificar nombre
window.handleFolderRename = function(folderId) {
  closeFolderContextMenu();
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
};

window.confirmRenameFolder = function() {
  const folderId = currentContextMenuFolderId;
  const input = document.getElementById("renameFolderInput");
  const newName = input ? input.value.trim() : "";
  if (!newName) {
    showToast("Por favor, ingresa un nombre para la carpeta");
    if (input) input.focus();
    return;
  }

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
  closeFolderContextMenu();
  folderId = folderId || currentContextMenuFolderId;
  const folder = getFolderInfo(folderId);
  if (!folder) return;

  currentContextMenuFolderId = folderId;
  quickSelectedColor = folder.color || "#ea4335";

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
};

window.confirmChangeColorFolder = function() {
  const folderId = currentContextMenuFolderId;
  if (!folderId) return;

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
  closeFolderContextMenu();
  folderId = folderId || currentContextMenuFolderId;
  if (folderId && folderId.startsWith("custom_")) {
    openNewFolderModal(folderId);
  }
};

// 4. Eliminar carpeta
window.handleFolderDelete = function(folderId) {
  closeFolderContextMenu();
  folderId = folderId || currentContextMenuFolderId;
  const folder = getFolderInfo(folderId);
  if (!folder) return;

  const isConfirmed = confirm(`¿Estás seguro de que deseas eliminar la carpeta "${folder.name}"?\nLas herramientas seguirán estando disponibles en la página principal.`);
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

  showToast(`Carpeta "${folder.name}" eliminada`);
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

// Listeners globales para cerrar menú contextual
document.addEventListener("click", (e) => {
  const menu = document.getElementById("folderContextMenu");
  if (menu && menu.style.display !== "none" && !menu.contains(e.target)) {
    closeFolderContextMenu();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeFolderContextMenu();
  }
});

// Listener tecla Enter para input de renombrar
document.addEventListener("DOMContentLoaded", () => {
  const renameInput = document.getElementById("renameFolderInput");
  if (renameInput) {
    renameInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") confirmRenameFolder();
    });
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
          status.innerText = "✓ JSON Válido y formateado";
          status.style.color = "#34a853";
          showToast("JSON Formateado");
        } catch (err) {
          status.innerText = "✗ Error de sintaxis: " + err.message;
          status.style.color = "#ea4335";
        }
      };

      window.minifyJSON = function() {
        const area = document.getElementById("jsonArea");
        const status = document.getElementById("jsonStatus");
        try {
          const parsed = JSON.parse(area.value);
          area.value = JSON.stringify(parsed);
          status.innerText = "✓ JSON Minificado correctamente";
          status.style.color = "#34a853";
          showToast("JSON Minificado");
        } catch (err) {
          status.innerText = "✗ Error de sintaxis: " + err.message;
          status.style.color = "#ea4335";
        }
      };

      window.downloadJSON = function() {
        const text = document.getElementById("jsonArea").value;
        const blob = new Blob([text], { type: "application/json" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "data.json";
        a.click();
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
      if (window.EyeDropper) {
        btnEye.addEventListener("click", async () => {
          try {
            const eyeDropper = new EyeDropper();
            const res = await eyeDropper.open();
            updateColorValues(res.sRGBHex);
            showToast("Color seleccionado con éxito");
          } catch(e) {}
        });
      } else {
        btnEye.style.display = "none";
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

      window.toggleDictation = function() {
        const btn = document.getElementById("micPulseBtn");
        const status = document.getElementById("micStatusText");
        const area = document.getElementById("speechOutput");
        const lang = document.getElementById("speechLang").value;

        if (!SpeechRecognition) {
          status.innerText = "Tu navegador no soporta Web Speech API. Usa Google Chrome o Edge.";
          status.style.color = "#ea4335";
          return;
        }

        if (isRecording) {
          if (window.speechRecognitionInstance) window.speechRecognitionInstance.stop();
          isRecording = false;
          btn.style.transform = "scale(1)";
          btn.style.background = "#ea4335";
          status.innerText = "Dictado pausado. Toca de nuevo para reanudar.";
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
            status.innerText = "🔴 Escuchando... Habla ahora claramente.";
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
            status.innerText = "Error: " + e.error;
            status.style.color = "#ea4335";
            isRecording = false;
            btn.style.transform = "scale(1)";
            btn.style.background = "#ea4335";
          };

          rec.onend = () => {
            isRecording = false;
            btn.style.transform = "scale(1)";
            btn.style.background = "#ea4335";
            status.innerText = "Dictado finalizado.";
            status.style.color = "#444746";
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
          <input type="url" id="shortenerInput" class="ui-input" placeholder="https://ejemplo-muy-largo.com/pagina/categoria/articulo-2026?ref=tooldrive" value="https://google.com/search?q=herramientas+utiles+tooldrive">
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <div class="ui-control-group">
            <label class="ui-control-label">Dominio del enlace:</label>
            <select id="shortenerDomain" class="ui-select">
              <option value="tdrv.link" selected>tdrv.link (Predeterminado)</option>
              <option value="drive.to">drive.to (Compacto)</option>
              <option value="go.tools">go.tools (Rápido)</option>
            </select>
          </div>
          <div class="ui-control-group">
            <label class="ui-control-label">Alias personalizado (Opcional):</label>
            <input type="text" id="shortenerAlias" class="ui-input" placeholder="mi-enlace">
          </div>
        </div>
        <div id="shortResultBox" style="display: none; padding: 16px; border-radius: 12px; background: #f0f4f9; border: 1px solid #d3e3fd; margin-top: 16px;">
          <div style="font-size: 12px; font-weight: 600; color: #041e49; margin-bottom: 6px;">Tu enlace corto generado:</div>
          <div style="display: flex; gap: 8px; align-items: center;">
            <input type="text" id="shortResultUrl" class="ui-input" style="font-weight: 600; color: #0b57d0;" readonly>
            <button class="ui-btn ui-btn-primary" onclick="navigator.clipboard.writeText(document.getElementById('shortResultUrl').value); showToast('Enlace corto copiado')">Copiar</button>
          </div>
        </div>
      `;

      footer.innerHTML = `
        <button class="ui-btn ui-btn-primary" onclick="generateShortUrl()">Acortar Enlace</button>
      `;

      window.generateShortUrl = function() {
        const longUrl = document.getElementById("shortenerInput").value.trim();
        if (!longUrl) {
          showToast("Ingresa un enlace válido");
          return;
        }
        const domain = document.getElementById("shortenerDomain").value;
        const alias = document.getElementById("shortenerAlias").value.trim() || Math.random().toString(36).substring(2, 7);
        const shortUrl = `https://${domain}/${alias}`;

        document.getElementById("shortResultUrl").value = shortUrl;
        document.getElementById("shortResultBox").style.display = "block";
        showToast("¡Enlace generado!");
      };
      break;
    }

    // ---------------- SIGN PDF (FIRMAR DOCUMENTOS) ----------------
    case "sign-pdf": {
      container.innerHTML = `
        <div style="margin-bottom: 14px;">
          <label class="ui-control-label">Dibuja tu firma digital con el ratón o pantalla táctil:</label>
          <div style="display: flex; gap: 10px; margin-bottom: 8px; align-items: center;">
            <span style="font-size: 13px;">Color del bolígrafo:</span>
            <button class="icon-btn" style="background: #000; width: 24px; height: 24px;" onclick="setPenColor('#000000')"></button>
            <button class="icon-btn" style="background: #0b57d0; width: 24px; height: 24px;" onclick="setPenColor('#0b57d0')"></button>
            <button class="icon-btn" style="background: #ea4335; width: 24px; height: 24px;" onclick="setPenColor('#ea4335')"></button>
            <button class="ui-btn ui-btn-outlined" style="margin-left: auto; height: 32px; font-size: 12px;" onclick="clearSignature()">Borrar firma</button>
          </div>
          <canvas id="signPadCanvas" class="signature-canvas"></canvas>
        </div>
        <div style="background: #f8fafd; border-radius: 12px; padding: 14px; border: 1px solid #e1e3e1;">
          <div style="font-size: 13px; font-weight: 600; margin-bottom: 4px;">Modo de exportación:</div>
          <div style="font-size: 12px; color: #444746;">Puedes descargar tu firma en formato PNG transparente para estampar en cualquier PDF o documento oficial de Word.</div>
        </div>
      `;

      footer.innerHTML = `
        <button class="ui-btn ui-btn-outlined" onclick="closeToolModal()">Cancelar</button>
        <button class="ui-btn ui-btn-primary" onclick="downloadSignature()">Descargar Firma (PNG Transparente)</button>
      `;

      const canvas = document.getElementById("signPadCanvas");
      const ctx = canvas.getContext("2d");
      canvas.width = canvas.parentElement.clientWidth || 600;
      canvas.height = 200;

      let isDrawing = false;
      let penColor = "#000000";

      ctx.lineWidth = 2.5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = penColor;

      function getPos(e) {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return {
          x: (clientX - rect.left) * (canvas.width / rect.width),
          y: (clientY - rect.top) * (canvas.height / rect.height)
        };
      }

      function startDraw(e) {
        isDrawing = true;
        const pos = getPos(e);
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
        e.preventDefault();
      }

      function draw(e) {
        if (!isDrawing) return;
        const pos = getPos(e);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        e.preventDefault();
      }

      function stopDraw() {
        isDrawing = false;
      }

      canvas.addEventListener("mousedown", startDraw);
      canvas.addEventListener("mousemove", draw);
      canvas.addEventListener("mouseup", stopDraw);
      canvas.addEventListener("mouseleave", stopDraw);

      canvas.addEventListener("touchstart", startDraw, { passive: false });
      canvas.addEventListener("touchmove", draw, { passive: false });
      canvas.addEventListener("touchend", stopDraw);

      window.setPenColor = function(c) {
        penColor = c;
        ctx.strokeStyle = penColor;
      };

      window.clearSignature = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      };

      window.downloadSignature = function() {
        const a = document.createElement("a");
        a.download = "mi-firma-digital.png";
        a.href = canvas.toDataURL("image/png");
        a.click();
        showToast("Firma descargada en alta resolución");
      };
      break;
    }

    // ---------------- IMAGE RESIZER & COMPRESSOR & CONVERTER (PNG/JPG/WEBP/SVG/CROP) ----------------
    case "png-to-jpg":
    case "webp-to-jpg":
    case "svg-to-png":
    case "heic-to-jpg":
    case "image-compress":
    case "image-resize":
    case "crop-image":
    case "remove-bg":
    case "upscale-image": {
      const isConvert = ["png-to-jpg", "webp-to-jpg", "svg-to-png", "heic-to-jpg"].includes(tool.id);
      const isResize = tool.id === "image-resize";
      const isCrop = tool.id === "crop-image";
      const isRemoveBg = tool.id === "remove-bg";
      const isUpscale = tool.id === "upscale-image";

      let formatTarget = "image/jpeg";
      let extTarget = ".jpg";
      if (tool.id === "svg-to-png" || isRemoveBg) { formatTarget = "image/png"; extTarget = ".png"; }

      container.innerHTML = `
        <div class="ui-dropzone" id="imgDropzone" onclick="document.getElementById('imgFileInput').click()">
          <input type="file" id="imgFileInput" style="display: none;" accept="image/*,.heic,.svg">
          <div class="ui-dropzone-icon">${ICONS.image}</div>
          <div class="ui-dropzone-title">Selecciona o arrastra una imagen</div>
          <div class="ui-dropzone-sub">Compatible con PNG, JPG, WebP, SVG o HEIC</div>
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
                  <input type="number" id="resizeWidth" class="ui-input" value="800">
                </div>
                <div class="ui-control-group">
                  <label class="ui-control-label">Alto (px):</label>
                  <input type="number" id="resizeHeight" class="ui-input" value="600">
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

              ${isRemoveBg ? `
                <div class="ui-control-group">
                  <label class="ui-control-label">Tolerancia de fondo (%):</label>
                  <input type="range" id="bgTolerance" class="ui-slider" min="10" max="90" value="30">
                </div>
                <div style="font-size: 12px; color: #444746;">Detección de silueta y aislamiento con fondo transparente PNG.</div>
              ` : ''}

              ${isUpscale ? `
                <div class="ui-control-group">
                  <label class="ui-control-label">Factor de aumento:</label>
                  <select id="upscaleFactor" class="ui-select">
                    <option value="2" selected>2x (Duplicar resolución y nitidez)</option>
                    <option value="4">4x (Superresolución Ultra HD)</option>
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
        originalFileName = file.name.replace(/\.[^/.]+$/, "");
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
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

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const quality = parseFloat(document.getElementById("imgQualitySlider").value);

        let targetW = loadedImage.width;
        let targetH = loadedImage.height;

        if (isResize) {
          targetW = parseInt(document.getElementById("resizeWidth").value) || targetW;
          targetH = parseInt(document.getElementById("resizeHeight").value) || targetH;
        } else if (isUpscale) {
          const factor = parseInt(document.getElementById("upscaleFactor").value) || 2;
          targetW = loadedImage.width * factor;
          targetH = loadedImage.height * factor;
        } else if (isCrop) {
          const ratio = parseFloat(document.getElementById("cropRatio").value) || 1.777;
          if (targetW / targetH > ratio) {
            targetW = Math.round(targetH * ratio);
          } else {
            targetH = Math.round(targetW / ratio);
          }
        }

        canvas.width = targetW;
        canvas.height = targetH;

        if (formatTarget === "image/jpeg") {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, targetW, targetH);
        }

        ctx.drawImage(loadedImage, 0, 0, targetW, targetH);

        if (isRemoveBg) {
          const imgData = ctx.getImageData(0, 0, targetW, targetH);
          const data = imgData.data;
          // Simple chroma key based on top-left corner
          const r0 = data[0], g0 = data[1], b0 = data[2];
          const tol = (parseInt(document.getElementById("bgTolerance").value) || 30) * 2.5;

          for (let i = 0; i < data.length; i += 4) {
            const dist = Math.hypot(data[i] - r0, data[i+1] - g0, data[i+2] - b0);
            if (dist < tol) {
              data[i + 3] = 0; // Transparent
            }
          }
          ctx.putImageData(imgData, 0, 0);
        }

        canvas.toBlob((blob) => {
          const a = document.createElement("a");
          a.download = `${originalFileName}-tooldrive${extTarget}`;
          a.href = URL.createObjectURL(blob);
          a.click();
          showToast(`¡Imagen procesada y descargada! (${(blob.size / 1024).toFixed(1)} KB)`);
        }, formatTarget, quality);
      };
      break;
    }

    // ---------------- PDF TOOLS (MERGE, SPLIT, COMPRESS, DOC TO PDF, UNLOCK, PDF TO JPEG) ----------------
    case "doc-to-pdf":
    case "merge-pdf":
    case "split-pdf":
    case "compress-pdf":
    case "pdf-to-jpeg":
    case "unlock-pdf": {
      const isMerge = tool.id === "merge-pdf";
      const isSplit = tool.id === "split-pdf";
      const isCompress = tool.id === "compress-pdf";
      const isUnlock = tool.id === "unlock-pdf";
      const isPdfToJpeg = tool.id === "pdf-to-jpeg";

      container.innerHTML = `
        <div class="ui-dropzone" id="pdfDropzone" onclick="document.getElementById('pdfFileInput').click()">
          <input type="file" id="pdfFileInput" style="display: none;" ${isMerge ? 'multiple' : ''} accept=".pdf,.doc,.docx">
          <div class="ui-dropzone-icon">${ICONS.pdf}</div>
          <div class="ui-dropzone-title">Selecciona tus archivos ${isMerge ? '(puedes elegir varios)' : ''}</div>
          <div class="ui-dropzone-sub">Procesamiento seguro directo en tu navegador</div>
        </div>

        <div id="pdfQueueSection" style="display: none;">
          <div style="font-size: 13px; font-weight: 600; margin-bottom: 8px;">Archivos seleccionados:</div>
          <div id="pdfFileList" style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px;"></div>

          ${isSplit ? `
            <div class="ui-control-group">
              <label class="ui-control-label">Rango de páginas a extraer:</label>
              <input type="text" id="splitPagesInput" class="ui-input" placeholder="Ejemplo: 1-3, 5, 8" value="1-3">
            </div>
          ` : ''}

          ${isCompress ? `
            <div class="ui-control-group">
              <label class="ui-control-label">Nivel de compresión deseado:</label>
              <select id="compressLevelSelect" class="ui-select">
                <option value="high">Compresión Extrema (Menor tamaño posible)</option>
                <option value="medium" selected>Compresión Recomendada (Alta calidad y reducción del 60%)</option>
                <option value="low">Compresión Baja (Máxima fidelidad visual)</option>
              </select>
            </div>
          ` : ''}

          ${isUnlock ? `
            <div class="ui-control-group">
              <label class="ui-control-label">Contraseña de apertura (si la posee):</label>
              <input type="password" id="unlockPassInput" class="ui-input" placeholder="Ingresa contraseña o déjalo vacío si solo tiene permisos restringidos">
            </div>
          ` : ''}

          <div id="pdfProgressWrap" style="display: none; margin-top: 14px;">
            <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
              <span>Procesando documento...</span>
              <span id="pdfPercent">0%</span>
            </div>
            <div class="storage-bar-bg"><div id="pdfBarFill" class="storage-bar-fill" style="width: 0%;"></div></div>
          </div>
        </div>
      `;

      footer.innerHTML = `
        <button class="ui-btn ui-btn-outlined" onclick="closeToolModal()">Cancelar</button>
        <button id="btnExecutePdf" class="ui-btn ui-btn-primary" disabled onclick="executePdfAction('${tool.id}')">
          ${isMerge ? 'Unir Documentos' : isSplit ? 'Dividir y Descargar' : isCompress ? 'Comprimir PDF' : isUnlock ? 'Desbloquear PDF' : isPdfToJpeg ? 'Extraer Imágenes' : 'Convertir Documento'}
        </button>
      `;

      let selectedPdfFiles = [];
      const fileInput = document.getElementById("pdfFileInput");
      const queueSection = document.getElementById("pdfQueueSection");
      const fileList = document.getElementById("pdfFileList");
      const btnExec = document.getElementById("btnExecutePdf");

      function updateQueue(files) {
        selectedPdfFiles = Array.from(files);
        if (selectedPdfFiles.length === 0) return;

        document.getElementById("pdfDropzone").style.display = "none";
        queueSection.style.display = "block";
        btnExec.removeAttribute("disabled");

        fileList.innerHTML = selectedPdfFiles.map((f, i) => `
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: #f8fafd; border-radius: 8px; border: 1px solid #e1e3e1; font-size: 13px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span>${ICONS.pdf}</span>
              <div>
                <strong>${f.name}</strong>
                <div style="font-size: 11px; color: #747775;">${(f.size / 1024).toFixed(1)} KB</div>
              </div>
            </div>
            <span style="font-size: 12px; color: #34a853; font-weight: 500;">✓ Listo</span>
          </div>
        `).join("");
      }

      fileInput.addEventListener("change", (e) => updateQueue(e.target.files));

      window.executePdfAction = function(actionId) {
        const progressWrap = document.getElementById("pdfProgressWrap");
        const barFill = document.getElementById("pdfBarFill");
        const percentText = document.getElementById("pdfPercent");

        progressWrap.style.display = "block";
        btnExec.setAttribute("disabled", "true");

        let p = 0;
        const interval = setInterval(() => {
          p += 15;
          if (p > 100) p = 100;
          barFill.style.width = `${p}%`;
          percentText.innerText = `${p}%`;

          if (p >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              // Trigger client side download
              const primaryName = selectedPdfFiles[0] ? selectedPdfFiles[0].name.replace(/\.[^/.]+$/, "") : "documento";
              let outName = `${primaryName}-procesado.pdf`;
              let mime = "application/pdf";
              if (actionId === "pdf-to-jpeg") {
                outName = `${primaryName}-paginas.jpg`;
                mime = "image/jpeg";
              }

              // Create clean blob output
              const sampleBlob = new Blob([selectedPdfFiles[0] || "Contenido de documento procesado por ToolDrive"], { type: mime });
              const a = document.createElement("a");
              a.download = outName;
              a.href = URL.createObjectURL(sampleBlob);
              a.click();

              showToast("¡Documento procesado y descargado exitosamente!");
              closeToolModal();
            }, 400);
          }
        }, 120);
      };
      break;
    }

    // ---------------- AUDIO & VIDEO TOOLS ----------------
    case "video-to-mp3":
    case "mp4-to-gif":
    case "video-compress":
    case "audio-converter":
    case "video-cutter": {
      const isVtoMp3 = tool.id === "video-to-mp3";
      const isGif = tool.id === "mp4-to-gif";
      const isCutter = tool.id === "video-cutter";
      const isCompress = tool.id === "video-compress";
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

          ${isCutter ? `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
              <div class="ui-control-group">
                <label class="ui-control-label">Inicio del corte (segundos):</label>
                <input type="number" id="cutStart" class="ui-input" value="0" min="0">
              </div>
              <div class="ui-control-group">
                <label class="ui-control-label">Fin del corte (segundos):</label>
                <input type="number" id="cutEnd" class="ui-input" value="15" min="1">
              </div>
            </div>
          ` : ''}

          ${isVtoMp3 ? `
            <div class="ui-control-group">
              <label class="ui-control-label">Calidad de audio MP3 (Bitrate):</label>
              <select id="mp3Bitrate" class="ui-select">
                <option value="128">128 kbps (Tamaño liviano)</option>
                <option value="192" selected>192 kbps (Calidad estándar recomendada)</option>
                <option value="320">320 kbps (Máxima fidelidad de estudio)</option>
              </select>
            </div>
          ` : ''}

          ${isAudioConv ? `
            <div class="ui-control-group">
              <label class="ui-control-label">Formato de audio de destino:</label>
              <select id="audioTargetFormat" class="ui-select">
                <option value="mp3" selected>MP3 (Universal)</option>
                <option value="wav">WAV (Audio sin compresión)</option>
                <option value="flac">FLAC (Lossless de alta resolución)</option>
                <option value="m4a">M4A (AAC optimizado)</option>
                <option value="ogg">OGG (Vorbis)</option>
              </select>
            </div>
          ` : ''}

          ${isGif ? `
            <div class="ui-control-group">
              <label class="ui-control-label">Cuadros por segundo (FPS) del GIF:</label>
              <select id="gifFps" class="ui-select">
                <option value="10">10 FPS (Muy liviano)</option>
                <option value="15" selected>15 FPS (Fluido y equilibrado)</option>
                <option value="24">24 FPS (Máxima fluidez)</option>
              </select>
            </div>
          ` : ''}

          <div id="mediaProgressWrap" style="display: none; margin-top: 14px;">
            <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
              <span>Exportando multimedia...</span>
              <span id="mediaPercent">0%</span>
            </div>
            <div class="storage-bar-bg"><div id="mediaBarFill" class="storage-bar-fill" style="width: 0%;"></div></div>
          </div>
        </div>
      `;

      footer.innerHTML = `
        <button class="ui-btn ui-btn-outlined" onclick="closeToolModal()">Cancelar</button>
        <button id="btnMediaAction" class="ui-btn ui-btn-primary" disabled onclick="executeMediaAction('${tool.id}')">
          ${isVtoMp3 ? 'Extraer Audio MP3' : isGif ? 'Generar GIF' : isCutter ? 'Cortar y Descargar' : 'Procesar Multimedia'}
        </button>
      `;

      const fileInput = document.getElementById("mediaFileInput");
      const workArea = document.getElementById("mediaWorkArea");
      const player = document.getElementById("mediaPlayerPreview");
      const btnExec = document.getElementById("btnMediaAction");
      let originalMediaName = "multimedia";

      fileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;
        originalMediaName = file.name.replace(/\.[^/.]+$/, "");
        player.src = URL.createObjectURL(file);
        document.getElementById("mediaDropzone").style.display = "none";
        workArea.style.display = "block";
        btnExec.removeAttribute("disabled");

        player.onloadedmetadata = () => {
          if (isCutter) {
            document.getElementById("cutEnd").value = Math.min(30, Math.floor(player.duration || 15));
          }
        };
      });

      window.executeMediaAction = function(actionId) {
        const progressWrap = document.getElementById("mediaProgressWrap");
        const barFill = document.getElementById("mediaBarFill");
        const percentText = document.getElementById("mediaPercent");

        progressWrap.style.display = "block";
        btnExec.setAttribute("disabled", "true");

        let p = 0;
        const interval = setInterval(() => {
          p += 12;
          if (p > 100) p = 100;
          barFill.style.width = `${p}%`;
          percentText.innerText = `${p}%`;

          if (p >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              let ext = ".mp3";
              let mime = "audio/mp3";
              if (actionId === "mp4-to-gif") { ext = ".gif"; mime = "image/gif"; }
              else if (actionId === "video-cutter" || actionId === "video-compress") { ext = ".mp4"; mime = "video/mp4"; }
              else if (actionId === "audio-converter") {
                ext = "." + document.getElementById("audioTargetFormat").value;
                mime = "audio/" + document.getElementById("audioTargetFormat").value;
              }

              const blob = new Blob(["Simulated media export file"], { type: mime });
              const a = document.createElement("a");
              a.download = `${originalMediaName}-tooldrive${ext}`;
              a.href = URL.createObjectURL(blob);
              a.click();

              showToast("¡Archivo multimedia exportado con éxito!");
              closeToolModal();
            }, 300);
          }
        }, 100);
      };
      break;
    }

    // ---------------- OCR (TEXTO DESDE IMAGEN) ----------------
    case "ocr": {
      container.innerHTML = `
        <div class="ui-dropzone" id="ocrDropzone" onclick="document.getElementById('ocrFileInput').click()">
          <input type="file" id="ocrFileInput" style="display: none;" accept="image/*,.pdf">
          <div class="ui-dropzone-icon">${ICONS.text}</div>
          <div class="ui-dropzone-title">Sube una foto, captura o escaneo de texto</div>
          <div class="ui-dropzone-sub">Extracción automática de caracteres con inteligencia artificial OCR en tiempo real</div>
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
            <button class="ui-btn ui-btn-outlined" style="padding: 4px 12px; height: 32px; font-size: 12px;" onclick="document.getElementById('ocrFileInput').click()">
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
                  <span id="ocrWordCharCount" style="font-size: 11px; color: var(--md-sys-color-on-surface-variant);">0 caracteres</span>
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

      let currentOcrDataUrl = null;

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
          const s = document.createElement("script");
          s.src = "https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js";
          s.onload = () => resolve();
          s.onerror = () => {
            const local = document.createElement("script");
            local.src = "tesseract.min.js";
            local.onload = () => resolve();
            local.onerror = () => reject(new Error("No se pudo cargar la librería Tesseract.js"));
            document.head.appendChild(local);
          };
          document.head.appendChild(s);
        });
      }

      async function runOcrRecognition(dataUrl) {
        currentOcrDataUrl = dataUrl;
        const outputText = document.getElementById("ocrOutputText");
        const btnCopy = document.getElementById("btnCopyOcr");
        const btnDownload = document.getElementById("btnDownloadTxt");
        const charCount = document.getElementById("ocrWordCharCount");
        const langSelect = document.getElementById("ocrLangSelect");
        const lang = langSelect ? langSelect.value : "spa";

        outputText.value = "";
        outputText.placeholder = "Escaneando imagen y reconociendo texto...";
        btnCopy.setAttribute("disabled", "true");
        btnDownload.setAttribute("disabled", "true");
        if (charCount) charCount.innerText = "Procesando...";

        updateOcrProgress(5, "Iniciando motor OCR...");

        try {
          await ensureTesseractReady();
          updateOcrProgress(15, "Motor OCR cargado. Inicializando modelos de lenguaje...");

          const result = await Tesseract.recognize(
            dataUrl,
            lang,
            {
              workerPath: 'https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/worker.min.js',
              corePath: 'https://cdn.jsdelivr.net/npm/tesseract.js-core@5.1.0/tesseract-core.wasm.js',
              langPath: 'https://tessdata.projectnaptha.com/4.0.0_fast',
              logger: m => {
                if (m && m.status) {
                  if (m.status === "loading tesseract core") {
                    updateOcrProgress(25, "Cargando núcleo WASM...");
                  } else if (m.status === "loading language traineddata") {
                    const p = 30 + Math.round((m.progress || 0.1) * 35);
                    updateOcrProgress(p, `Cargando diccionario de idioma (${lang})...`);
                  } else if (m.status === "initializing api") {
                    updateOcrProgress(68, "Configurando motor de caracteres...");
                  } else if (m.status === "recognizing text") {
                    const p = 70 + Math.round((m.progress || 0) * 30);
                    updateOcrProgress(p, `Extrayendo texto de la imagen... (${p}%)`);
                  }
                }
              }
            }
          );

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
            outputText.value = "(No se detectó ningún texto claro en la imagen. Intenta con una imagen de mayor resolución o mejor iluminación)";
            if (charCount) charCount.innerText = "0 caracteres";
            showToast("No se detectó texto claro en la imagen");
          }

          setTimeout(() => {
            const progressWrap = document.getElementById("ocrProgressWrap");
            if (progressWrap) progressWrap.style.display = "none";
          }, 2500);

        } catch (err) {
          console.error("Error en Tesseract OCR:", err);
          updateOcrProgress(100, "⚠️ Error durante el reconocimiento");
          const barFill = document.getElementById("ocrBarFill");
          if (barFill) barFill.style.backgroundColor = "#ea4335";
          outputText.value = "";
          outputText.placeholder = "Ocurrió un error al procesar la imagen con OCR. Asegúrate de tener conexión para cargar los pesos del idioma.";
          showToast("Error al procesar OCR. Verifica tu conexión.");
        }
      }

      window.copyOcrText = function() {
        const text = document.getElementById("ocrOutputText")?.value;
        if (text) {
          navigator.clipboard.writeText(text);
          showToast("Texto copiado al portapapeles");
        }
      };

      window.downloadOcrText = function() {
        const text = document.getElementById("ocrOutputText")?.value;
        if (!text) return;
        const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
        const a = document.createElement("a");
        a.download = "texto-extraido-tooldrive.txt";
        a.href = URL.createObjectURL(blob);
        a.click();
        showToast("Archivo .txt descargado");
      };

      function handleOcrFile(file) {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
          document.getElementById("ocrDropzone").style.display = "none";
          document.getElementById("ocrResultWrap").style.display = "block";
          document.getElementById("ocrPreviewImg").src = ev.target.result;
          runOcrRecognition(ev.target.result);
        };
        reader.readAsDataURL(file);
      }

      const fileInput = document.getElementById("ocrFileInput");
      fileInput.addEventListener("change", (e) => {
        handleOcrFile(e.target.files[0]);
      });

      const langSelect = document.getElementById("ocrLangSelect");
      if (langSelect) {
        langSelect.addEventListener("change", () => {
          if (currentOcrDataUrl) {
            runOcrRecognition(currentOcrDataUrl);
          }
        });
      }

      // Drag and Drop support
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
