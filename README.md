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
- ✔ Si el filtro no arroja coincidencias, muestra mensaje claro y un botón "Ver todos los mentores"
- ✔ Solo se muestran los mentores marcados como `activo = true`
- ⚠ **Nota honesta:** los 10 mentores de la base de datos son **datos de prueba** (insertados a mano para poder probar el flujo), no el directorio real de tutores de la UPB. Los correos siguen el formato institucional (`nombre.apellido@upb.edu.co`), pero no corresponden a personas reales — escribirles por Teams no llega a nadie.

#### HU-07 · Contacto con el mentor vía Teams
Como usuario de AGE, quiero abrir un chat privado en Teams con el mentor que seleccioné, para poder resolver mis dudas por el canal institucional sin tener que buscarlo manualmente. Requisito origen: F-10 / F-12. Puntos de historia: 1. Prioridad: P(1).

- ✔ Botón de contacto visible en la ficha de cada mentor (modal "Contactar")
- ✔ Al pulsarlo abre un chat privado en Teams mediante deep link (`teams.microsoft.com/l/chat/0/0?users=...`)
- ✔ El enlace se construye con el `email_institucional` del mentor
- ✔ Ofrece alternativa por correo ("¿No tienes Teams? Escribir por correo") si Teams no está disponible
- ✔ Se registra el evento "contacto iniciado" en la tabla `contactos_mentor` para poder medir el uso
- ⚠ **Nota honesta:** el criterio "funciona en navegador de escritorio y en la app móvil" no se ha probado dentro del APK de Android. El botón usa `window.open(..., "_blank")`; en el navegador abre Teams sin problema, pero dentro del WebView de Capacitor ese comportamiento no está verificado y no hay un plugin de apertura de enlaces externos instalado.

### Cómo verificar el Sprint 2 a mano

1. `cd client; npm run dev`, iniciar sesión y entrar a "Preguntas" desde el menú o los accesos rápidos.
2. FAQ: las preguntas aparecen agrupadas por categoría, con la respuesta siempre visible y un enlace "Ver en página oficial".
3. En cualquier pregunta, presionar "¿Aún con dudas?" → abre el foro con el título y la respuesta precargados.
4. Entrar a "Mentores" desde el menú. Filtrar por una materia del desplegable y comprobar que la lista se reduce.
5. Elegir una materia sin mentores (o vaciar el filtro y luego uno inexistente vía consola) para ver el mensaje "no hay mentores" con el botón "Ver todos los mentores".
6. Abrir la ficha de un mentor ("Contactar") y probar los botones "Abrir chat en Teams" y "Escribir por correo".
