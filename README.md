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
