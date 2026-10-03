# ToolDrive - Suite de Productividad y Herramientas Web

Una aplicación web de herramientas y productividad client-side con la interfaz, estilo visual y usabilidad de **Google Drive** (Material Design 3). Desarrollada con **Vanilla JavaScript**, sin frameworks, sin backend y con ejecución 100% local en el navegador para máxima privacidad y rendimiento.

---

## 🚀 Cómo abrir y usar

No requiere instalación de dependencias, compiladores, ni conexión a servidores externos.

### Opción 1: Abrir directamente
Haz doble clic en el archivo **`index.html`** para abrirlo en cualquier navegador web moderno (Google Chrome, Microsoft Edge, Mozilla Firefox o Safari).

### Opción 2: Servidor local (opcional)
Si prefieres servirlo mediante un servidor HTTP local para verificar capacidades de Web Workers y WebAssembly sin restricciones de políticas `file://`:
```bash
# Con Python
python -m http.server 8000

# O con Node.js
npx serve .
```
Luego visita `http://localhost:8000` en tu navegador.

---

## 🖥️ Interfaz, Diseño y Experiencia de Usuario (Google Drive & Material 3)

- **Sin Scrollbars Flotantes**: Desplazamiento fluido y minimalista integrado en el contenedor principal (`.main-scrollable`) y barra lateral, eliminando barras de desplazamiento dobles o flotantes que desajusten el layout.
- **Estructura de Columnas Adaptable**:
  - **Pantallas grandes (> 900px)**: 4 columnas completas: *Nombre* (con icono vectorial semántico), *Motivo por el que se te sugiere*, *Ubicación* (carpeta/categoría) y *Acciones* (con encabezado accesible para lectores de pantalla).
  - **Tablets y pantallas medianas (≤ 900px)**: 3 columnas (*Nombre*, *Motivo*, *Acciones*; se oculta automáticamente la columna *Ubicación*).
  - **Móviles y pantallas compactas (≤ 640px hasta 320px)**: 2 columnas (*Nombre* con elipsis elástica y *Acciones* compactas; se oculta la columna *Motivo*). Libre de desbordamiento horizontal entre 320px y 1920px.
- **Carpetas Personalizadas y Gestión**: Creación de carpetas a medida con paleta de colores Material 3, asignación y desasignación rápida de herramientas en un clic, y menú contextual de 3 puntos accesible por ratón y teclado (modificar nombre, cambiar color, gestionar herramientas y eliminar con salvaguarda de herramientas).
- **Sincronización Multi-Pestaña**: Escucha reactiva del evento `storage` para sincronizar instantáneamente favoritos, carpetas personalizadas y preferencias de tema entre pestañas abiertas.
- **Ventanas Modales Estáticas y Seguras**: Las ventanas de herramientas (`#toolModalBackdrop`) no se cierran ante clics accidentales en el fondo difuminado (emiten un pulso estático visual de retroalimentación); cuentan con soporte de tecla `Escape`, *focus trap* accesible y restauración de foco al control que las abrió.
- **Interruptor Modo Oscuro estilo iPhone**: Switch deslizante con animación física y glifos vectoriales de sol y luna.
- **Buscador en Tiempo Real**: Filtrado dinámico instantáneo con atajo global de teclado (`/`) y botón accesible de limpieza rápida.

---

## 🛠️ Estado Real de las Herramientas (Auditoría Técnica)

A diferencia de versiones anteriores con simulaciones mediante temporizadores (*mocks*), ToolDrive clasifica de forma honesta y transparente sus 30 herramientas:

### 1. Herramientas con Procesamiento REAL (100% Client-Side)

| Herramienta | Categoría | Motor / Tecnología | Descripción |
|---|---|---|---|
| **OCR (Texto desde imagen)** | Texto | Tesseract.js (WASM local) | Extracción óptica de caracteres 100% offline alojada en `/ocr-assets`, modelos de idioma español e inglés, copia segura y descarga `.txt`. |
| **Merge PDF (Unir PDF)** | PDF | PDF-LIB (`pdf-lib.min.js`) | Combina 2 o más archivos PDF reales en un único documento final generado en memoria local. |
| **Split PDF (Dividir PDF)** | PDF | PDF-LIB (`pdf-lib.min.js`) | Permite extraer páginas individuales o rangos específicos (ej. 1-3, 5) generando un nuevo PDF válido. |
| **Sign PDF (Firmar PDF)** | PDF | Canvas API + PDF-LIB | Pad de firma con captura táctil y de ratón (eventos pasivos cancelables), exportación a PNG transparente y estampado directo de firma en documentos PDF. |
| **Image Compressor** | Imágenes | Canvas 2D API | Compresión y remuestreo real con selector de factor de calidad y cálculo exacto de reducción en KB. |
| **Image Resizer** | Imágenes | Canvas 2D API | Redimensionamiento real de píxeles con preservación opcional de relación de aspecto. |
| **Crop Image** | Imágenes | Canvas 2D API | Recorte gráfico interactivo en formatos 1:1, 16:9 o libre. |
| **PNG to JPG / JPG to PNG / WebP to JPG / SVG to PNG** | Imágenes | Canvas 2D API | Transcodificación y rasterización gráfica real en el cliente. |
| **QR Code Generator** | Dev | qrcode-generator (`qr-lib.js`) | Generación instantánea de códigos QR en lienzo y descarga en imagen PNG transparente. |
| **Color Picker** | Dev | EyeDropper API + Canvas | Cuentagotas de pantalla nativo (con detección de compatibilidad de navegador) y conversión de valores HEX, RGB y HSL. |
| **JSON Formatter** | Dev | JavaScript Engine | Validación de sintaxis, sangría estructurada a 2/4 espacios y minificación sin alterar datos. |
| **Word Counter** | Texto | JavaScript Engine | Conteo reactivo en vivo de palabras, caracteres, párrafos y tiempo estimado de lectura. |
| **Speech to Text** | Texto | Web Speech API | Transcripción de dictado por voz en tiempo real con control robusto de errores de permisos y micrófono. |
| **Case Converter** | Texto | JavaScript Engine | Transformación de cadenas a 8 variantes (Mayúsculas, Minúsculas, Título, camelCase, snake_case, etc.). |
| **Lorem Ipsum Generator** | Texto | JavaScript Engine | Generador paramétrico de texto simulado estructurado en párrafos, frases o palabras. |
| **URL Shortener** | Dev | REST API | Acortamiento real mediante servicio público con generación simultánea de código QR. |

### 2. Herramientas Deshabilitadas Honestamente con Aviso "Próximamente"

Para mantener la integridad del producto y no engañar a los usuarios con descargas falsas, las siguientes herramientas complejas están marcadas honestamente como **"Próximamente disponible"**, detallando en su modal la infraestructura local necesaria:

- **Doc to PDF / PDF to Doc**: Requiere un motor complejo de maquetación y parsing tipográfico de formatos Word (.docx) para ejecutarse en el navegador sin enviar archivos a servidores externos.
- **Compress PDF**: Requiere optimización y remuestreo de flujos de imágenes internas y subconjuntos de fuentes tipográficas vía WebAssembly.
- **PDF to JPEG**: Requiere rasterización de renderizado multipágina local (PDF.js Canvas renderer).
- **Unlock PDF**: Requiere descifrado y remoción criptográfica de restricciones de documentos protegidos.
- **Video to MP3, MP4 to GIF, Video Compressor, Audio Converter, Video Cutter**: Muestran un reproductor multimedia funcional para inspección del archivo cargado, avisando que la transcodificación de códecs sin pérdida ni servidores requiere la integración del motor `FFmpeg.wasm` (~30 MB).
- **Remove Background**: Requiere integración de modelos de segmentación neuronal semántica en el navegador (TensorFlow.js / MediaPipe).
- **Upscale Image**: Requiere modelos de superresolución de aprendizaje profundo (ESRGAN).
- **HEIC to JPG**: Requiere módulo de decodificación libheif WebAssembly.

---

## 🔒 Seguridad y Robustez

1. **Prevención de Cross-Site Scripting (XSS)**: Todo dato suministrado por el usuario (nombres de carpetas, nombres de archivos de entrada, parámetros dinámicos) es sanitizado mediante la función `escapeHtml()` o inyectado estrictamente mediante `textContent`.
2. **Resiliencia en Almacenamiento Local (`localStorage`)**: Todo parseo de almacenamiento utiliza `safeGetStorageJson` con envoltorio `try/catch` y valores de retorno seguros por defecto ante datos corruptos. Las operaciones de guardado se controlan con `safeSetStorage` capturando excepciones de cuota de disco (`QuotaExceededError`).
3. **Ciclo de Vida de Memoria (`URL.revokeObjectURL`)**: Se eliminaron las fugas de memoria provocadas por URLs de tipo Blob. Cada herramienta (`JSON Formatter`, `Sign PDF`, `Image Compressor`, `Merge PDF`, `Split PDF`, `OCR` y `Media Preview`) libera sus identificadores temporales tras la descarga o al cerrar el modal mediante `revokeAllModalObjectUrls()`.
4. **Integridad de Recursos Externos (SRI)**: Los scripts cargados como respaldo externo cuentan con hash criptográfico SHA-512 (`integrity`) y atributo `crossorigin="anonymous"`.
5. **Validación de Archivos y Hardware**: Rechazo explícito de formatos no compatibles, protección contra imágenes corruptas de dimensiones 0x0, y detección temprana de soporte en APIs de hardware (EyeDropper, reconocimiento de voz y micrófonos desconectados o no autorizados).

---

## ♿ Accesibilidad (A11y - WCAG 2.1)

- **Diálogos Accesibles**: Los modales disponen de `role="dialog"`, `aria-modal="true"` y asociación semántica de título con `aria-labelledby="modalToolTitle"`.
- **Focus Trap**: El tabulador (`Tab` y `Shift + Tab`) permanece estrictamente confinado dentro del modal activo. Al cerrar con `Escape` o mediante el botón de cierre, el foco vuelve automáticamente al elemento detonador que abrió la herramienta.
- **Operación por Teclado Completa**: Todas las filas de la tabla y tarjetas de cuadrícula cuentan con `tabindex="0"`, `role="button"`, indicador visual `:focus-visible` y activación tanto por tecla `Enter` como por barra espaciadora (`Space`). Los botones secundarios internos aíslan sus eventos con `stopPropagation`.
- **Atributos `aria-label` en Iconos**: Todos los botones de solo icono (botones de cierre, alternadores de vista de lista/cuadrícula, limpieza de buscador, colores de firma, favoritos y selector de carpetas) incluyen etiquetas descriptivas legibles para lectores de pantalla.
- **Encabezados Ocultos Visualmente**: La columna de acciones de la tabla cuenta con el glifo `<span class="sr-only">Acciones</span>` para navegación asistida sin alterar el diseño visual.

---

## 📜 Licencias de Terceros

ToolDrive respeta rigurosamente las licencias de software libre y de código abierto de sus dependencias locales:

- **Tesseract.js** (v5.1.1, worker y binarios WASM en `/ocr-assets`):
  - Licencia: **Apache License 2.0**
  - Copyright © 2018 Jerome Wu y colaboradores.
  - Sitio oficial: [https://github.com/naptha/tesseract.js](https://github.com/naptha/tesseract.js)
- **PDF-LIB** (v1.17.1):
  - Licencia: **MIT License**
  - Copyright © 2019 Andrew Dillon.
  - Sitio oficial: [https://github.com/Hopding/pdf-lib](https://github.com/Hopding/pdf-lib)
- **qrcode-generator**:
  - Licencia: **MIT License**
  - Copyright © 2009 Kazuhiko Arase.
  - Sitio oficial: [https://github.com/kazuhikoarase/qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator)

---

## 📋 Informe Técnico de QA (Auditoría de Cambios)

| Tarea / Módulo | Estado Previo | Correcciones Realizadas | Resultado de Verificación |
|---|---|---|---|
| **Tarea 0: Clasificación Real vs Mocks** | Herramientas simulaban procesamiento con `setTimeout` y descargas estáticas. | Se sustituyeron simulaciones por procesamiento real (PDF-LIB, Canvas, QR) y se deshabilitaron honestamente las herramientas que requieren módulos pesados con avisos explicativos. | Pasa al 100%. Sin descargas falsas. |
| **Tarea 1: Motor OCR Local** | Dependía de CDNs flotantes de jsDelivr y projectnaptha; fallaba sin conexión. | Se alojaron worker, core WASM y traineddata (`spa`, `eng`) en `/ocr-assets`, fijando versiones exactas, previniendo carreras de ejecución y asegurando soporte offline total. | Pasa al 100%. Reconocimiento local verificado. |
| **Tarea 2: Seguridad y Robustez** | Vulnerabilidad a XSS en nombres de carpetas; `JSON.parse` sin captura; fuga de Blob URLs. | Sanitización sistemática con `escapeHtml`, persistencia segura con `safeGetStorageJson`/`safeSetStorage`, liberación de memoria con `revokeObjectURL` y SRI en CDN fallback. | Pasa al 100%. Código libre de inyecciones y memory leaks. |
| **Tarea 3: Carpetas y Menú Contextual** | Menú de 3 puntos sin validación de longitud, colores libres sin control y sin sincronización. | Validaciones estrictas de nombre (1-40 chars, duplicados), colores restringidos a paleta, retención de herramientas al borrar y sincronización reactiva con evento `storage`. | Pasa al 100%. Multi-pestaña y gestión probadas. |
| **Tarea 4: Modal y Accesibilidad** | Modales sin atributos ARIA, sin focus trap; filas no accesibles por teclado; botones sin `aria-label`. | Implementación de `role="dialog"`, `aria-modal="true"`, focus trap con `Escape`, navegación completa con `Enter`/`Espacio`, estilo `:focus-visible` y `aria-label` en todos los botones de iconos. | Pasa al 100%. Cumplimiento WCAG 2.1 verificado. |
| **Tarea 5: Responsive Design** | Desbordamiento horizontal en pantallas estrechas (<400px); anchos estáticos de 320px en tabla. | Se reemplazaron anchos inline por clases elásticas, elipsis en títulos, colapso de columnas a 3 (≤900px) y 2 (≤640px), y adaptación de modales y menús contextuales en 320px. | Pasa al 100%. Cero scroll horizontal entre 320px y 1920px. |
