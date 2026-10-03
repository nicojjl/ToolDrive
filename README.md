# ToolDrive - Suite de Productividad y Herramientas Web

Una aplicación web de herramientas y productividad client-side con la interfaz, estilo visual y usabilidad de **Google Drive** (Material Design 3). Desarrollada con **Vanilla JavaScript**, sin frameworks, sin backend y con ejecución 100% local en el navegador para máxima privacidad y rendimiento.

---

## 🚀 Cómo abrir y usar

No requiere instalación de dependencias, compiladores, ni conexión a servidores externos.

### Opción 1: Abrir directamente
Haz doble clic en el archivo **`index.html`** para abrirlo en cualquier navegador web moderno (Google Chrome, Microsoft Edge, Mozilla Firefox o Safari).

### Opción 2: Servidor local (recomendado para Workers y WASM)
Para ejecutar Web Workers y módulos WebAssembly sin restricciones de políticas de origen `file://`:
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

## 🛠️ Estado Real de las Herramientas (18 Activas / 12 en Desarrollo)

De un total de 30 herramientas catalogadas, ToolDrive clasifica de forma transparente sus módulos: **18 herramientas activas con procesamiento real local** y **12 herramientas deshabilitadas temporalmente con insignia "Próximamente"** mientras se integran sus motores WASM correspondientes.

### 1. Herramientas Activas con Procesamiento REAL (100% Client-Side)

| Herramienta | Categoría | Motor / Tecnología | Procesamiento Real Realizado |
|---|---|---|---|
| **Merge PDF (Unir PDF)** | PDF | PDF-LIB (`pdf-lib.min.js`) | Combina 2 o más documentos PDF en memoria local; detecta PDFs protegidos con contraseña y desactiva el botón de envío durante la operación. |
| **Split PDF (Dividir PDF)** | PDF | PDF-LIB (`pdf-lib.min.js`) | Carga el documento, lee páginas y extrae rangos o páginas individuales generando un nuevo PDF válido en memoria. |
| **Sign PDF (Firmar PDF)** | PDF | Canvas 2D + PDF-LIB | Captura de trazo digital táctil/ratón; exporta PNG transparente o estampa firma en PDF respetando la orientación y rotación angular de página (0°, 90°, 180°, 270°). |
| **OCR (Texto desde imagen)** | Texto | Tesseract.js (WASM local) | Extracción de caracteres 100% offline alojada en `/ocr-assets`, modelos locales español e inglés, copia con fallback seguro y descarga `.txt`. |
| **Image Compressor** | Imágenes | Canvas 2D API | Lectura de imagen y recodificación en JPEG/PNG/WebP con control deslizante de calidad y cálculo exacto de reducción en KB. |
| **Image Resizer** | Imágenes | Canvas 2D API | Remuestreo en lienzo a dimensiones solicitadas, con validación de límite de seguridad (máximo 16384 px y área controlada). |
| **Crop Image** | Imágenes | Canvas 2D API | Recorte gráfico a proporciones fijas (1:1, 16:9, 4:3) mediante extracción de sub-rectángulo en Canvas. |
| **PNG to JPG** | Imágenes | Canvas 2D API | Conversión directa de formato rasterizado sobre fondo blanco sólido. |
| **WebP to JPG** | Imágenes | Canvas 2D API | Decodificación y transcodificación de WebP a archivo JPEG descargable. |
| **SVG to PNG** | Imágenes | Canvas 2D API | Rasterización de gráficos vectoriales SVG a mapa de bits PNG en lienzo. |
| **QR Code Generator** | Dev | qrcodejs (`qr-lib.js`) | Generación algorítmica de matriz QR sobre canvas y descarga en imagen PNG. |
| **URL Shortener** | Dev | is.gd API | Validación de protocolo HTTP/HTTPS, aviso visible de privacidad y consulta a la API pública de is.gd con generación de QR complementario. |
| **Color Picker** | Dev | EyeDropper API + Canvas | Cuentagotas nativo del navegador (con mensaje explicativo si no es compatible) y conversión de valores HEX, RGB y HSL. |
| **JSON Formatter** | Dev | JavaScript nativo | Validación de sintaxis en bloque `try/catch`, indentación a 2/4 espacios y minificación sin modificar valores. |
| **Word Counter** | Texto | JavaScript nativo | Conteo en tiempo real de palabras, caracteres, párrafos y tiempo estimado de lectura mediante expresiones regulares. |
| **Speech to Text** | Texto | Web Speech API | Dictado por voz en tiempo real con manejo de permisos denegados, micrófono ausente y compatibilidad de navegador. |
| **Case Converter** | Texto | JavaScript nativo | Transformación de cadenas a Mayúsculas, Minúsculas, Título, camelCase, snake_case, kebab-case, etc. |
| **Lorem Ipsum Generator** | Texto | JavaScript nativo | Generación paramétrica estructurada de párrafos, oraciones o palabras simuladas. |

### 2. Herramientas Deshabilitadas Honestamente con Aviso "Próximamente" (12)

Las siguientes herramientas complejas no están simuladas con temporizadores ni generan descargas ficticias; muestran la insignia **"Próximamente"** en la interfaz y despliegan una explicación técnica de la dependencia local requerida:

- **Doc to PDF / PDF to Doc**: Requiere un motor tipográfico y maquetador de archivos Word (.docx) para ejecutarse en el navegador sin intermediarios.
- **Compress PDF**: Requiere optimización y compresión de streams internos de objetos y fuentes tipográficas mediante WebAssembly.
- **PDF to JPEG**: Requiere rasterización completa de páginas PDF en el cliente (PDF.js renderer).
- **Unlock PDF**: Requiere motor criptográfico para eliminación de contraseñas de lectura y permisos en documentos PDF.
- **Remove Background**: Requiere un modelo local de segmentación de imágenes por visión computacional (MediaPipe / TensorFlow.js ~40 MB).
- **Upscale Image**: Requiere una red neuronal de superresolución de imágenes (ESRGAN WASM) para ampliar detalles sin pixelado simple.
- **HEIC to JPG**: Requiere el decodificador WebAssembly `libheif` para navegadores que no incorporan códec HEIC en su sistema operativo.
- **Video to MP3, MP4 to GIF, Video Compressor, Audio Converter, Video Cutter**: Muestran un reproductor HTML5 funcional del archivo cargado, indicando que la transcodificación y compresión local requiere el motor `FFmpeg.wasm` (~30 MB).

---

## 🔒 Seguridad y Robustez

1. **Prevención de Cross-Site Scripting (XSS)**: Todo dato suministrado por el usuario (nombres de carpetas, nombres de archivos de entrada, parámetros dinámicos) es sanitizado mediante la función `escapeHtml()` o asignado estrictamente mediante `textContent`.
2. **Resiliencia en Almacenamiento Local (`localStorage`)**: Todo parseo de almacenamiento utiliza `safeGetStorageJson` con envoltorio `try/catch` y valores de retorno seguros por defecto ante datos corruptos. Las operaciones de guardado se controlan con `safeSetStorage` capturando excepciones de cuota de disco (`QuotaExceededError`).
3. **Ciclo de Vida de Memoria (`URL.revokeObjectURL`)**: Cada herramienta (`JSON Formatter`, `Sign PDF`, `Image Compressor`, `Merge PDF`, `Split PDF`, `OCR` y `Media Preview`) libera sus identificadores temporales tras la descarga o al cerrar el modal mediante `revokeAllModalObjectUrls()`.
4. **Integridad de Recursos Externos (SRI)**: El script de respaldo de `pdf-lib` cuenta con hash criptográfico SHA-512 real (`integrity="sha512-z8IYLHO8bTgFqj+yrPyIJnzBDf7DDhWwiEsk4sY+Oe6J2M+WQequeGS7qioI5vT6rXgVRb4K1UVQC5ER7MKzKQ=="`) y atributo `crossorigin="anonymous"`.
5. **Validación de Archivos y Hardware**: Rechazo explícito de formatos no compatibles, protección contra imágenes de dimensiones 0x0 o superiores a 16384 px, y detección de soporte en APIs del navegador (EyeDropper, Web Speech API).

---

## ♿ Accesibilidad (A11y)

- **Diálogos Accesibles**: Los modales disponen de `role="dialog"`, `aria-modal="true"` y asociación semántica de título con `aria-labelledby`.
- **Focus Trap**: El tabulador (`Tab` y `Shift + Tab`) permanece estrictamente confinado dentro del modal activo. Al cerrar con `Escape` o mediante el botón de cierre, el foco vuelve automáticamente al elemento detonador que abrió la herramienta.
- **Operación por Teclado**: Los elementos interactivos utilizan botones semánticos (`<button class="tool-cell-btn">`), soporte de teclas `Enter` y `Space`, e indicador visual `:focus-visible` adaptado para modos claro y oscuro.
- **Atributos `aria-label` en Iconos**: Todos los botones de solo icono incluyen descripciones accesibles.
- **Encabezados Ocultos Visualmente**: La columna de acciones de la tabla cuenta con el glifo `<span class="sr-only">Acciones</span>` para lectores de pantalla.

---

## 📜 Licencias de Terceros

ToolDrive utiliza las siguientes librerías de software libre y código abierto:

- **Tesseract.js** (v5.1.1, worker y binarios WASM en `/ocr-assets`):
  - Licencia: **Apache License 2.0**
  - Copyright © 2018 Jerome Wu y colaboradores.
  - Repositorio: [https://github.com/naptha/tesseract.js](https://github.com/naptha/tesseract.js)
- **PDF-LIB** (v1.17.1):
  - Licencia: **MIT License**
  - Copyright © 2019 Andrew Dillon.
  - Repositorio: [https://github.com/Hopding/pdf-lib](https://github.com/Hopding/pdf-lib)
- **qrcodejs** (`qr-lib.js`):
  - Licencia: **MIT License**
  - Basado en el algoritmo de Kazuhiko Arase y davidshimjs/qrcodejs.
  - Repositorio: [https://github.com/davidshimjs/qrcodejs](https://github.com/davidshimjs/qrcodejs)

---

## 📋 Informe Técnico de QA (Auditoría de Cambios)

| Tarea / Módulo | Estado Previo | Cambio | Probado en navegador |
|---|---|---|---|
| **Clasificación Real vs Mocks** | Varias herramientas simulaban procesamiento con `setTimeout` y descargas de texto estático. | Eliminación de simulaciones; separación explícita de 18 herramientas activas con procesamiento real y 12 deshabilitadas con aviso "Próximamente". | Sí |
| **Motor OCR Offline** | Dependía de CDNs externas de jsDelivr y projectnaptha; fallaba sin conexión y presentaba condiciones de carrera. | Alojamiento local de worker, core WASM y diccionarios `spa`/`eng` en `/ocr-assets`, rutas absolutas con `new URL()`, cancelación de worker pendiente y control de carreras con `ocrRunId`. | Sí |
| **Seguridad XSS y Almacenamiento** | Inyecciones potenciales en plantillas de carpetas; `JSON.parse` vulnerable a cadenas sin escapar; fugas de Blobs. | Uso exhaustivo de `escapeHtml()`, simetría en `safeSetStorage`/`safeGetStorageJson` con serialización JSON, liberación con `revokeObjectURL` y hash SRI SHA-512 real para pdf-lib. | Sí |
| **Carpetas y Menú Contextual** | Menú de 3 puntos sin validación de longitud, sin teclado ni sincronización entre pestañas. | Validación de nombre (1-40 caracteres, duplicados), colores restringidos a paleta, cierre con `Escape`/clic fuera y sincronización mediante evento `storage`. | Sí |
| **Accesibilidad (A11y)** | Modales sin `role="dialog"` ni focus trap; `role="button"` en `<tr>`; foco poco visible en modo oscuro. | Atributos `role="dialog"`, focus trap con `Escape`, botones nativos en celdas de tabla, y estilos `:focus-visible` basados en variables CSS para temas claro y oscuro. | Sí |
| **Diseño Responsive** | Desbordamiento horizontal en pantallas estrechas (<400px); columnas rígidas. | Anchos elásticos, elipsis en textos largos, colapso dinámico de columnas (≤900px y ≤640px) y modales utilizables a 320px de ancho. | Sí |
| **URL Shortener** | Sin aviso de servicio externo ni validación formal de URL; fallback no funcional. | Aviso visible de envío a API pública de is.gd, validación con `new URL()` para HTTP/HTTPS y eliminación de fallback no CORS. | Sí |
| **Sign PDF y Merge PDF** | Firma no consideraba rotación de página PDF; Merge PDF no informaba si los PDFs tenían contraseña. | Firma ajusta coordenadas y ángulo (`PDFLib.degrees`) según la rotación de página (0°, 90°, 180°, 270°); Merge PDF detecta PDFs cifrados y gestiona estado del botón con `finally`. | Sí |
| **Image Resizer** | Sin límite máximo de dimensiones en campos de entrada. | Restricción de ancho y alto hasta 16384 px y control de área total máxima. | Sí |
