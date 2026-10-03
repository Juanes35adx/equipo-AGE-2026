# Proyecto – Asistente General Estudiantil (AGE)

---

## Tabla de Navegación

| Archivo / Carpeta | Descripción |
|---|---|
| [README.md](./README.md) | Descripción general del repositorio y navegación |
| [index.md](./doc/index.md) | Descripción del problema del proyecto, público objetivo y navegación |
| [index.md](./doc/analysis/index.md) | Visión general de la fase de análisis |
| [requirements-fn.md](./doc/analysis/requirements-fn.md) | Requisitos funcionales |
| [requirements-nfn.md](./doc/analysis/requirements-nfn.md) | Requisitos no funcionales |

---

## Estructura del Repositorio

```
/
│── README.md
└── doc/
    │── index.md
    └── analysis/
        │── index.md
        │── requirements-fn.md
        │── requirements-nfn.md
```
---

## Descripción del Repositorio

Este repositorio contiene la documentación y el análisis de una **extensión web y móvil** diseñada para apoyar a los **estudiantes nuevos de la Universidad Pontificia Bolivariana (UPB)**.

El proyecto se centra en facilitar el proceso de adaptación de los estudiantes de primer ingreso mediante la centralización de herramientas e información útil, tales como:
- Un mapa del campus para la navegación.
- Un foro de ayuda para resolver dudas estudiantiles.
- Horarios de asesorías y tutorías.

El repositorio incluye la documentación de la fase de análisis, los requisitos funcionales y no funcionales, y la estructura de navegación del proyecto.

---

## Documentación

Toda la información del proyecto se estructura dentro del directorio `doc`, el cual se mantiene en constante actualización conforme avanza el desarrollo.

Dentro de esta carpeta se encuentra el archivo `index.md`, que presenta una visión general del proyecto y proporciona una tabla de navegación que facilita el acceso a las distintas secciones y documentos principales.

---

## Ejecutar en Android Studio

### Requisitos previos (solo una vez)
- Node.js instalado
- Android Studio instalado con SDK configurado
- Java JDK 17+

---

## Equipo 

**`equipo-AGE-2026`**

## Integrantes del Equipo

- Juan Esteban Correa Castro  

---

## Sprint 1 — Autenticación, Acceso e Inicio

Primer sprint del proyecto. Cubre que un visitante conozca AGE, cree su cuenta, inicie/cierre sesión y, una vez dentro, aterrice en un inicio con novedades y accesos rápidos. Todo lo de esta sección describe **únicamente el Sprint 1**; el resto del documento no cambia.

**Épicas:** Autenticación y Acceso · Inicio

### Historias de usuario del sprint

| HU | Historia | Épica | Estado |
|---|---|---|---|
| HU-31 | Pantalla de bienvenida | Autenticación y Acceso | ✔ Cumplida |
| HU-32 | Encabezado global | Inicio | ✔ Cumplida |
| HU-33 | Pie de página institucional | Inicio | ✔ Cumplida |
| HU-34 | Menú lateral de navegación | Inicio | ✔ Cumplida |
| HU-18 | Crear cuenta | Autenticación y Acceso | ✔ Cumplida |
| HU-01 | Inicio de sesión | Autenticación y Acceso | ⚠ Cumplida con notas (ver detalle) |
| HU-02 | Cierre de sesión seguro | Autenticación y Acceso | ✔ Cumplida |
| HU-19 | Pantalla de inicio con novedades | Inicio | ✔ Cumplida |
| HU-20 | Accesos rápidos desde el inicio | Inicio | ✔ Cumplida |

✔ = verificado contra el código · ⚠ = funciona, con una diferencia honesta frente al criterio original (explicada abajo)

### Detalle por historia

#### HU-31 · Pantalla de bienvenida
Como visitante de AGE, quiero una pantalla de bienvenida que me presente la aplicación y me lleve al inicio de sesión, para poder saber qué es AGE antes de entrar. Origen: Mural, columna "Bienvenida".

- ✔ Imagen de fondo del campus
- ✔ Título "Asistente General Estudiantil (AGE)"
- ✔ Texto de bienvenida
- ✔ Botón "Ingresar" que lleva al logueo
- ✔ Header reducido con logo UPB y accesibilidad

#### HU-32 · Encabezado global
Como usuario de AGE, quiero un encabezado igual en todas las pantallas, para poder llegar a mi perfil, al menú y a los ajustes desde donde esté. Origen: Mural, columna "Header".

- ✔ Logo UPB que devuelve al inicio
- ✔ Ícono de accesibilidad
- ✔ Botón "Perfil"
- ✔ Botón "Menú"
- ✔ Variante reducida sin sesión: solo logo UPB y accesibilidad

#### HU-33 · Pie de página institucional
Como usuario de AGE, quiero un pie de página con los datos de contacto de la universidad, para poder comunicarme con la institución cuando lo necesite. Origen: Mural, columna "Footer UPB".

- ✔ Título "Contáctanos"
- ✔ Dirección: Campus Laureles, Circular 1a 70-01
- ✔ Teléfonos +57 604 448 83 88 y 313 603 56 30 (enlaces `tel:`)
- ✔ Correo asesoria.integral@upb.edu.co (enlace `mailto:`)
- ✔ Logo UPB monocromático, NIT y derechos reservados

#### HU-34 · Menú lateral de navegación
Como usuario de AGE, quiero un menú lateral con todas las secciones, para poder navegar a cualquier parte de la aplicación. Origen: Mural, columna "Menú lateral".

- ✔ Se abre desde el botón "Menú" del encabezado
- ✔ Fondo oscurecido (overlay) sobre el contenido
- ✔ Se cierra al tocar fuera del menú (y con la tecla Escape)
- ✔ Lista: Buscar, Perfil, Foro, Actividades, Dashboard, FAQs, Mentores y Mapa
- ✔ Opción "Cerrar Sesión" al final del menú

#### HU-18 · Crear cuenta
Como usuario nuevo de AGE, quiero crear una cuenta con mi correo y una contraseña, para poder entrar a la aplicación por primera vez. Origen: Mural, columna "crear cuenta".

- ✔ Campo de nombre completo
- ✔ Campo de correo institucional (@upb.edu.co)
- ✔ Campo de contraseña con mínimo 6 caracteres
- ✔ Selector de rol y campo de programa académico — el programa hoy es un **desplegable con 26 carreras definidas** (`client/src/data/careerList.json`), ya no es texto libre
- ✔ Selector de semestre
- ✔ Botón "Crear cuenta" y enlace "¿Ya tienes cuenta? Inicia sesión"

#### HU-01 · Inicio de sesión
Como usuario de AGE, quiero iniciar sesión con mi correo y contraseña institucional, para poder acceder al contenido de la aplicación. Requisito origen: F-01. Puntos de historia: 2. Prioridad: P(1).

- ✔ Pantalla de login con campos de correo institucional y contraseña
- ✔ Credenciales correctas permiten el acceso al dashboard
- ✔ Credenciales erróneas muestran mensaje de error en español y bloquean el ingreso
- ⚠ **Nota honesta:** "bcrypt", "JWT" y "captcha" no existen como código propio del proyecto — los gestiona **Supabase Auth** (cifrado de contraseñas en el servidor, sesión con JWT en `localStorage` administrada por el SDK). El formulario **no tiene captcha**.

#### HU-02 · Cierre de sesión seguro
Como usuario de AGE, necesito cerrar sesión desde mi perfil, para poder asegurarme de que no quede información sensible expuesta en el dispositivo. Requisito origen: F-02. Puntos de historia: 1. Prioridad: P(1).

- ✔ Botón "Cerrar sesión" visible (en la sección de perfil y al final del menú lateral)
- ✔ Al presionarlo se finaliza la sesión activa
- ✔ El usuario es redirigido a la página principal (pantalla de confirmación de cierre)
- ✔ La sesión queda invalidada y las rutas protegidas dejan de ser accesibles tras el cierre

#### HU-19 · Pantalla de inicio con novedades
Como usuario de AGE, quiero que al entrar me reciba una pantalla de inicio con un saludo y las novedades, para poder enterarme de lo más reciente apenas abro la app. Origen: Mural, columna "Home".

- ✔ Encabezado presente en la pantalla de inicio
- ✔ Mensaje de bienvenida al usuario
- ✔ Sección de novedades visible
- ✔ Las novedades se pueden recorrer (carrusel horizontal)

#### HU-20 · Accesos rápidos desde el inicio
Como usuario de AGE, quiero accesos rápidos a los módulos desde el inicio, para poder llegar a lo que necesito sin recorrer el menú. Origen: Mural, columna "Home".

- ✔ Accesos directos a Mapa, Actividades, Buscar, Foro, Preguntas y Mentor
- ✔ Cada acceso lleva a su sección correspondiente
- ✔ La búsqueda se ofrece como un acceso rápido más ("Buscar" → `/buscar`). El buscador que había dentro del bloque se retiró el 16 de septiembre de 2026 por redundante: solo encontraba secciones que ya tienen su propio acceso rápido

### Brechas conocidas del Sprint 1

1. HU-01: sin captcha propio; la seguridad (bcrypt/JWT) la provee Supabase Auth, no código del repo.
### Cómo verificar el Sprint 1 a mano

1. `cd client; npm run dev` y abrir `http://localhost:5173`.
2. Landing: fondo del campus, título AGE, botón "Ingresar" → login.
3. Registro: crear cuenta eligiendo programa en el desplegable → redirige al login.
4. Login inválido muestra error; login válido entra al dashboard (saludo + novedades + accesos).
5. Menú lateral: overlay, 8 secciones, "Cerrar Sesión" → confirmación y rutas protegidas bloqueadas.

---

## Sprint 2 — Comunidad y Soporte

Segundo sprint del proyecto. Cubre las preguntas frecuentes, el puente entre el FAQ y el foro, y el directorio de mentores con contacto por Microsoft Teams. Todo lo de esta sección describe **únicamente el Sprint 2**; el resto del documento no cambia.

**Épica:** Comunidad y Soporte

### Historias de usuario del sprint

| HU | Historia | Épica | Estado |
|---|---|---|---|
| HU-04 | Preguntas frecuentes (FAQ) | Comunidad y Soporte | ✔ Cumplida |
| HU-05 | Escalamiento del FAQ al foro | Comunidad y Soporte | ✔ Cumplida |
| HU-06 | Directorio de mentores con filtro por materia | Comunidad y Soporte | ✔ Cumplida |
| HU-07 | Contacto con el mentor vía Teams | Comunidad y Soporte | ⚠ Cumplida con notas (ver detalle) |
| HU-38 | Buscar y filtrar en las preguntas frecuentes | Comunidad y Soporte | ✔ Cumplida |
| HU-39 | Llevar al foro la materia sin mentor | Comunidad y Soporte | ✔ Cumplida |

✔ = verificado contra el código y la base de datos · ⚠ = funciona, con una diferencia honesta frente al criterio original (explicada abajo)

### Detalle por historia

#### HU-04 · Preguntas frecuentes (FAQ)
Como usuario de AGE, quiero consultar una sección de preguntas frecuentes, para poder resolver dudas comunes sin tener que contactar a alguien o investigar por mi cuenta. Requisito origen: F-13. Puntos de historia: 1. Prioridad: P(1).

- ✔ Listado de preguntas frecuentes agrupadas por categoría
- ✔ La respuesta se muestra siempre visible bajo cada pregunta (sin acordeón, igual que el diseño)
- ✔ Cada respuesta incluye enlace a la fuente oficial de la UPB — las 10 preguntas de la base de datos tienen `link_oficial`. **Corregido el 16/09/2026:** 7 de los 10 enlaces apuntaban a páginas inexistentes de upb.edu.co (el sitio responde código 200 incluso en su página de "no existe", así que el error no era obvio) y 1 apuntaba a un subdominio que no resuelve (`biblioteca.upb.edu.co`); se verificó cada URL contra el contenido real de la página y se reemplazaron las 8 por enlaces vigentes de la sede Medellín. La pregunta "¿Cómo cancelo una materia?" también se reescribió como "¿Me devuelven el dinero si cancelo una materia?", porque su enlace real habla del reembolso (90% dentro de la primera semana de clases) y no del trámite en SIGAA
- ✔ Orden de las preguntas configurable desde la base de datos (columna `orden`)
- ✔ Contenido cargado dinámicamente desde la tabla `faqs`, sin estar quemado en el código

#### HU-05 · Escalamiento del FAQ al foro
Como usuario de AGE, necesito un botón "¿Aún con dudas?" en cada respuesta del FAQ, para poder llevar mi pregunta al foro cuando la respuesta breve no me resolvió. Requisito origen: F-13. Puntos de historia: 1. Prioridad: P(1).

- ✔ Botón "¿Aún con dudas?" visible en cada respuesta desplegada
- ✔ El botón aparece en cada tarjeta del FAQ (no hay acordeón: la respuesta ya está siempre visible)
- ✔ Al presionarlo redirige al usuario a la sección de foro
- ✔ Precarga el contexto de la pregunta al crear la publicación (título y respuesta de la FAQ)

#### HU-06 · Directorio de mentores con filtro por materia
Como usuario de AGE, quiero filtrar los mentores disponibles por materia, para poder identificar rápidamente quién puede ayudarme con la asignatura en la que tengo dificultades. Requisito origen: F-10. Puntos de historia: 2. Prioridad: P(1).

- ✔ Sección "Mentores" accesible desde el menú lateral
- ✔ Listado de mentores cargado desde la tabla `mentores`, no quemado en el código
- ✔ Filtro por materia aplicable sobre el listado
- ✔ Cada mentor muestra nombre, tipo de tutor y materia
- ✔ Si el filtro no arroja coincidencias, muestra mensaje claro y un botón "Ver todos los mentores" — el desplegable lista **todas** las materias del programa (función `materias_mentoria()` en la base), no solo las que hoy tienen mentor activo, así que este caso sí se puede ver desde la app
- ✔ Solo se muestran los mentores marcados como `activo = true`
- ⚠ **Nota honesta:** los 10 mentores de la base de datos son **datos de prueba** (insertados a mano para poder probar el flujo), no el directorio real de tutores de la UPB. Los correos siguen el formato institucional (`nombre.apellido@upb.edu.co`), pero no corresponden a personas reales — escribirles por Teams no llega a nadie.

#### HU-07 · Contacto con el mentor vía Teams
Como usuario de AGE, quiero abrir un chat privado en Teams con el mentor que seleccioné, para poder resolver mis dudas por el canal institucional sin tener que buscarlo manualmente. Requisito origen: F-10 / F-12. Puntos de historia: 1. Prioridad: P(1).

- ✔ Botón de contacto visible en la ficha de cada mentor (modal "Contactar")
- ✔ Al pulsarlo abre un chat privado en Teams mediante deep link (`teams.microsoft.com/l/chat/0/0?users=...`)
- ✔ El enlace se construye con el `email_institucional` del mentor
- ✔ Ofrece alternativa por correo ("¿No tienes Teams? Escribir por correo") si Teams no está disponible — abre la redacción en Outlook web (`outlook.office.com`) con el correo del mentor y el asunto "Mentoría AGE - [materia]", en vez de `mailto:`, que dependía de tener un programa de correo instalado
- ✔ Se registra el evento "contacto iniciado" en la tabla `contactos_mentor` para poder medir el uso
- ⚠ **Nota honesta:** el criterio "funciona en navegador de escritorio y en la app móvil" no se ha probado dentro del APK de Android. El botón usa `window.open(..., "_blank")`; en el navegador abre Teams sin problema, pero dentro del WebView de Capacitor ese comportamiento no está verificado y no hay un plugin de apertura de enlaces externos instalado.

#### HU-38 · Buscar y filtrar en las preguntas frecuentes
Como usuario de AGE, quiero buscar por palabras y filtrar por categoría dentro de las preguntas frecuentes, para poder encontrar rápido la respuesta que necesito sin recorrer toda la lista. Requisito origen: F-13. Puntos de historia: 2. Prioridad: P(2).

- ✔ Campo de búsqueda visible encima del listado de preguntas
- ✔ La búsqueda encuentra coincidencias en la pregunta y en la respuesta
- ✔ La búsqueda ignora mayúsculas y tildes ("matricula" encuentra "Matrícula")
- ✔ Botones de categoría para filtrar, con opción "Todas"
- ✔ La búsqueda y el filtro de categoría se pueden combinar
- ✔ Si no hay coincidencias, muestra mensaje claro con opción de ver todas las preguntas
- ✔ Si no hay coincidencias, ofrece llevar la duda al foro con el texto buscado como título

#### HU-39 · Llevar al foro la materia sin mentor
Como usuario de AGE, necesito una salida al foro cuando no encuentro mentor para mi materia, para poder pedir ayuda a la comunidad en vez de quedarme sin apoyo. Requisito origen: F-10. Puntos de historia: 1. Prioridad: P(2).

- ✔ Enlace "¿No encuentras tu materia? Pregúntale a la comunidad en el foro" bajo el filtro de materias
- ✔ Al pulsarlo lleva al foro con un título sugerido precargado
- ✔ Si el filtro no arroja mentores, el mensaje ofrece también el botón "Preguntar en el foro" con la materia en el título

### Cómo verificar el Sprint 2 a mano

1. `cd client; npm run dev`, iniciar sesión y entrar a "Preguntas" desde el menú o los accesos rápidos.
2. FAQ: las preguntas aparecen agrupadas por categoría, con la respuesta siempre visible y un enlace "Ver en página oficial".
3. En cualquier pregunta, presionar "¿Aún con dudas?" → abre el foro con el título y la respuesta precargados.
4. Entrar a "Mentores" desde el menú. Filtrar por una materia del desplegable y comprobar que la lista se reduce.
5. Elegir **Química General**, que hoy no tiene mentor activo, para ver el mensaje "No hay mentores disponibles…" con los botones "Ver todos los mentores" y "Preguntar en el foro".
6. Abrir la ficha de un mentor ("Contactar") y probar los botones "Abrir chat en Teams" y "Escribir por correo" (este abre Outlook web).
7. En Preguntas frecuentes, escribir "matricula" sin tilde en el buscador y comprobar que aparecen resultados; tocar una categoría y ver que solo quedan sus preguntas.
8. Buscar algo que no exista (por ejemplo "horario del parqueadero") → mensaje "No encontramos preguntas…"; "Preguntar en el foro" abre el foro con ese texto como título.
9. En Mentores, pulsar "¿No encuentras tu materia? Pregúntale a la comunidad en el foro" → abre el foro con "Busco ayuda con una materia" como título.

---

## Sprint 3 — Mapa, Perfil y Accesibilidad

Tercer sprint del proyecto. Cubre el mapa interactivo del campus (ubicación en tiempo real, puntos de interés, bloques cercanos, leyenda y búsqueda), la consulta del perfil y los ajustes de accesibilidad. Todo lo de esta sección describe **únicamente el Sprint 3**; el resto del documento no cambia.

**Épicas:** Mapa Interactivo · Inicio · Accesibilidad

> **Pantalla del mapa sin scroll (02/10/2026):** en computador, el título, el buscador, el mapa con su leyenda y el panel de información caben completos en la ventana y el mapa queda fijo. Verificado en 1920×1080, 1440×900 y 1366×768. En celular el mapa ocupa el 60 % de la pantalla y el panel va debajo.

> **Cambio de tecnología del mapa:** el 29 de septiembre de 2026 el mapa migró de Google Maps a **Leaflet + OpenStreetMap**. Ya no necesita API key ni tarjeta de crédito, y la variable `VITE_GOOGLE_API_KEY` dejó de usarse.

### Historias de usuario del sprint

| HU | Historia | Épica | Estado |
|---|---|---|---|
| HU-08 | Ubicación en tiempo real en el campus | Mapa Interactivo | ⚠ Cumplida con notas (ver detalle) |
| HU-09 | Puntos de interés en el mapa | Mapa Interactivo | ⚠ Cumplida con notas (ver detalle) |
| HU-30 | Bloques cercanos en el mapa | Mapa Interactivo | ⚠ Cumplida con notas (ver detalle) |
| HU-35 | Leyenda de colores del mapa | Mapa Interactivo | ✔ Cumplida |
| HU-36 | Buscar un lugar dentro del mapa | Mapa Interactivo | ✔ Cumplida |
| HU-27 | Consultar mi perfil | Inicio | ⚠ Cumplida con notas (ver detalle) |
| HU-28 | Ajustes de accesibilidad | Accesibilidad | ✔ Cumplida |

✔ = verificado contra el código y la base de datos · ⚠ = funciona, con una diferencia honesta frente al criterio original (explicada abajo)

### Detalle por historia

#### HU-08 · Ubicación en tiempo real en el campus
Como usuario de AGE, quiero ver mi ubicación en tiempo real sobre el plano del campus, para poder orientarme mientras me encuentro dentro de la universidad. Requisito origen: F-03 / RF-1. Puntos de historia: 3. Prioridad: P(0).

- ✔ Solicitud explícita de permisos de geolocalización: botón "📍 Mostrar mi ubicación"; el permiso no se pide al entrar, solo al pulsarlo
- ✔ Plano del campus UPB Laureles renderizado con Leaflet + OpenStreetMap, limitado a los bordes del campus
- ✔ Marcador azul que representa la posición actual del usuario, con un círculo que indica la precisión en metros
- ✔ La posición se actualiza conforme el usuario se desplaza (seguimiento continuo con `watchPosition`), y el mapa lo acompaña mientras camina. Si el usuario arrastra el mapa o elige un lugar, deja de seguirlo; el botón "Centrar en mí" lo retoma
- ✔ Funciona en computador: allí la ubicación sale del WiFi y suele tener más de 100 m de margen, así que se muestra como "Ubicación aproximada" en vez de descartarse (antes se descartaba y el punto nunca se actualizaba). Si la alta precisión no responde en 10 s, se reintenta en modo normal
- ✔ Si el usuario está fuera del campus, el mapa no se mueve: avisa "Estás fuera del campus" con la distancia aproximada, y el punto aparece solo cuando entra
- ✔ Si no se puede obtener la ubicación, el mensaje dice **la causa real y los pasos para resolverla**, distinguiendo: sitio bloqueado en el navegador, ventana de permiso cerrada, navegador con permiso pero sistema operativo sin ubicación (con la ruta de Windows o Mac), ubicación no disponible, tiempo agotado, dirección no segura (`http://` con IP en vez de `localhost`) y, en Android, permiso de la app o GPS apagado. Explica que el mapa sigue funcionando, ofrece "Reintentar" y muestra el detalle técnico del error
- ✔ El mapa principal carga en menos de 3 segundos (NF-02): medido el 30/09/2026 en **~1,5 s** hasta el último cuadro visible del mapa
- ✔ Verificado el 02/10/2026 con pruebas automáticas (Playwright) que simulan la ubicación: punto dentro del campus, caminata de 160 m, precisión de computador (±600 m), fuera del campus y permiso denegado
- ⚠ **Nota honesta:** las pruebas simulan la ubicación del navegador; no se ha probado caminando por el campus con un celular real ni dentro del APK de Android. En Windows, para que el navegador entregue la ubicación tiene que estar activada en Configuración → Privacidad y seguridad → Ubicación. La medición de NF-02 se hizo en escritorio, no con datos móviles.

#### HU-09 · Puntos de interés en el mapa
Como usuario de AGE, quiero hacer clic en los puntos de interés del mapa, para poder consultar información corta y una imagen de referencia de cada lugar. Requisito origen: F-03 / RF-2. Puntos de historia: 2. Prioridad: P(0).

- ✔ Marcadores ubicados sobre cada sitio relevante del campus: 35 ubicaciones activas. **Corregido el 02/10/2026:** el pin del Bloque 6 estaba sobre el edificio del Bloque 7, y el del Bloque 7 sobre los restaurantes del bulevar; se reubicaron según los edificios rotulados en OpenStreetMap
- ✔ Se puede acercar hasta el nivel máximo y mover el mapa sin que desaparezca (antes quedaba en blanco: OpenStreetMap no tiene imágenes en el nivel 20, ahora se amplían las del 19)
- ✔ Al hacer clic en un marcador se despliega su información en el panel lateral
- ✔ Los puntos están clasificados por tipo: 22 bloques, 9 de comida y 4 porterías
- ✔ La información se carga desde la tabla `ubicaciones` de Supabase
- ⚠ **Nota honesta:** el criterio pide nombre, descripción corta **e imagen** en cada punto. Los 35 tienen nombre y descripción, pero solo **20 tienen imagen**: faltan los 9 puntos de comida, las 4 porterías, el Bulevar Bloque 12 y el Gimnasio UPB. En esos casos el panel muestra la información sin foto.

#### HU-30 · Bloques cercanos en el mapa
Como usuario de AGE, quiero ver los bloques cercanos sobre el mapa, para poder reconocer qué tengo alrededor. Origen: imagen de diseño `mapa.png`.

- ✔ Sección "Bloques Cercanos" con fotografías de los bloques y su distancia en metros
- ✔ Al pulsar un bloque cercano, el mapa se centra en él y abre su detalle
- ⚠ **Nota honesta:** los criterios piden un panel **sobre el mapa** con los bloques **de la zona visible**. Lo implementado es distinto: la sección aparece en el panel lateral, al lado del mapa, después de elegir un lugar, y muestra los **3 bloques más cercanos a ese lugar** (distancia calculada con la fórmula de Haversine). No depende de la zona visible del mapa.

#### HU-35 · Leyenda de colores del mapa
Como usuario de AGE, quiero una leyenda que explique el color de cada pin, para poder interpretar el mapa sin tener que adivinar. Origen: Mural, columna "Mapa".

- ✔ Leyenda visible sobre el mapa, en la esquina superior derecha
- ✔ Pin amarillo: bloques y facultades
- ✔ Pin rojo: comida y cafeterías
- ✔ Pin negro: porterías y entradas

#### HU-36 · Buscar un lugar dentro del mapa
Como usuario de AGE, quiero buscar un lugar dentro del mapa, para poder ubicarlo sin recorrer todos los pines uno por uno. Origen: Mural, columna "Mapa".

- ✔ Campo de búsqueda encima del mapa ("Buscar un lugar del campus..."); busca por nombre, descripción, código y edificio, sin importar tildes ni mayúsculas
- ✔ Al elegir un resultado (o pulsar Enter), el mapa se centra en el lugar encontrado
- ✔ Se abre el panel de detalle de ese lugar
- ✔ Mensaje claro cuando no se encuentra el lugar: "No encontramos ese lugar en el campus"

#### HU-27 · Consultar mi perfil
Como usuario de AGE, quiero ver mis datos y mis notificaciones en mi perfil, para poder confirmar mi información y enterarme de lo pendiente. Origen: imagen de diseño `perfil.png`.

- ✔ Muestra Nombre, Correo, Cursando (programa) e ID del usuario, además del semestre
- ✔ Botón "Cerrar Sesión"
- ✔ Botón "SIGAA" que abre la plataforma institucional
- ⚠ **Nota honesta:** el "ID" que se muestra son los primeros 8 caracteres del identificador interno de la cuenta en Supabase, no el ID de estudiante de la UPB (la base no guarda ese dato y el registro no lo pide). El área de notificaciones existe, pero siempre dice "No tienes ninguna notificación!": todavía no hay un sistema de notificaciones que la llene.

#### HU-28 · Ajustes de accesibilidad
Como usuario de AGE, quiero ajustar el tamaño del texto y el contraste, para poder leer la aplicación con comodidad. Origen: imagen de diseño `Accesibilidad.png`.

- ✔ Icono de accesibilidad visible en el encabezado de todas las pantallas (en los dos headers)
- ✔ Al pulsarlo despliega el panel de opciones; se cierra con Escape o al tocar fuera
- ✔ Botón "A-" que reduce el tamaño del texto (mínimo 87,5 %)
- ✔ Botón "A+" que aumenta el tamaño del texto (máximo 150 %)
- ✔ Botón 🌓 que alterna el contraste (fondo negro con texto blanco)
- ✔ Además, el tamaño y el contraste elegidos se conservan al cerrar y volver a abrir la app

### Cómo verificar el Sprint 3 a mano

1. `cd client; npm install; npm run dev`, iniciar sesión y entrar a "Mapa" desde el menú o los accesos rápidos.
2. El plano del campus carga con pines amarillos, rojos y negros, y la leyenda en la esquina explica cada color. Todo se ve sin hacer scroll; acercar al máximo y arrastrar no deja el mapa en blanco.
3. Pulsar "📍 Mostrar mi ubicación": el navegador pide permiso. Al aceptarlo aparece el punto azul ("Ubicación aproximada" si estás en computador, o "Estás fuera del campus" si no estás en la UPB); al negarlo, sale el mensaje con "Reintentar".
4. Hacer clic en un pin: el panel lateral muestra nombre, foto (si tiene) y descripción, y debajo los 3 bloques más cercanos con su distancia.
5. Escribir "biblioteca" en el buscador del mapa y elegir el resultado: el mapa se centra y abre su detalle. Buscar "xyz" muestra "No encontramos ese lugar en el campus".
6. Entrar a "Perfil": se ven nombre, correo, programa, ID y semestre, y los botones "Cerrar Sesión" y "SIGAA".
7. Pulsar el icono de accesibilidad del encabezado: "A+" y "A-" cambian el tamaño del texto y 🌓 alterna el contraste. Recargar la página y comprobar que el ajuste se mantiene.
