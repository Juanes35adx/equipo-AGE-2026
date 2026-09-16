# UPB AGE — ASISTENTE GENERAL ESTUDIANTIL 🎓

Aplicación web para estudiantes nuevos de la **Universidad Pontificia Bolivariana – Medellín**, diseñada para ayudarles a moverse por la vida universitaria desde el primer día.

---

## ¿Qué hay en `/client`? 📁

`/client` contiene toda la aplicación del lado del cliente. Es una SPA de React + Vite responsable de toda la interfaz, el enrutamiento, los flujos de autenticación y la comunicación con el backend de Supabase. También es el origen de la compilación para Android, empaquetada con Capacitor.

> **Nota sobre `/server`:** el repositorio tiene una carpeta `/server` con un esqueleto de Express, pero **no se usa**. Expone una única ruta de saludo y no se conecta a nada. El proyecto habla directo con Supabase desde el cliente — Supabase *es* el backend.

---

## Funcionalidades ✨

- **Bienvenida, inicio de sesión y registro** — gestionados con Supabase Auth. Al crear la cuenta, el usuario es redirigido a la pantalla de login y debe iniciar sesión con las credenciales nuevas.
- **Dashboard** — mensaje de bienvenida, carrusel de novedades y cuadrícula de accesos rápidos a cada módulo
- **Mapa del campus** — mapa interactivo de Google con 35 ubicaciones del campus, posición del usuario en vivo, leyenda de pines, búsqueda dentro del mapa y bloques cercanos
- **Búsqueda** — busca secciones de la app por palabra clave, con filtro de etiquetas (22 etiquetas)
- **FAQ** — preguntas cargadas desde la base de datos, cada una con un enlace oficial y un botón "¿Aún con dudas?" que lleva al foro con la pregunta precargada
- **Foro** — los estudiantes publican preguntas, responden, responden a respuestas (anidadas) y dan like a las publicaciones
- **Mentores** — directorio filtrable por materia, el contacto abre un chat privado de Microsoft Teams
- **Actividades** — listado de eventos con cupos reales, inscripción y cancelación
- **Perfil** — datos del usuario, acceso directo a SIGAA y cierre de sesión
- **Accesibilidad** — controles de tamaño de texto (A− / A+) y contraste, disponibles desde el encabezado en toda pantalla

---

## Stack tecnológico 🛠️

| Capa | Tecnología |
|---|---|
| Framework | React 19 + Vite 8 |
| Enrutamiento | react-router-dom |
| Estilos | Tailwind CSS v4 |
| Móvil | Capacitor 8 (Android) |
| Mapas | Google Maps JavaScript API |
| Geolocalización | `@capacitor/geolocation` |
| Pruebas | Playwright (smoke tests) |
| Linting | ESLint |
| Auth y base de datos | Supabase (Auth + PostgreSQL con RLS) |
| Runtime | Node.js 24 LTS |

> ⚠️ **Aviso sobre Tailwind v4:** este proyecto usa **Tailwind CSS v4**, que tiene diferencias importantes frente a v3. Si usas herramientas de IA o documentación, asegúrate de que estén referenciando v4 — la mayoría todavía asume por defecto la sintaxis de v3.

> ⚠️ **Google Maps necesita un Map ID.** El mapa usa `AdvancedMarkerElement`, que solo funciona con un `mapId` configurado. Como hay un `mapId` presente, Google **ignora** cualquier opción `styles` que se pase desde el código — el estilo del mapa (incluyendo ocultar los POI por defecto) debe configurarse en Google Cloud Console para ese Map ID.

---

## Cómo empezar 🚀

### Requisitos previos

- [Node.js 24 LTS](https://nodejs.org/) instalado (desarrollado con v24.14.0)
- Credenciales del proyecto de Supabase
- Una API key de Google Maps con Map ID

### 1. Entrar a la carpeta del frontend

```bash
cd client
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar las variables de entorno

Crear un archivo `.env` dentro de **`client/`** (no en `server/`):

```
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_anon_key
VITE_GOOGLE_API_KEY=tu_clave_de_google_maps
```

> Las tres son obligatorias. Si falta `VITE_GOOGLE_API_KEY` la app igual carga, pero el mapa se queda en blanco sin ningún error visible.

> Los valores reales se comparten en privado. **No** subir este archivo — ya está en `.gitignore`.

### 4. Iniciar el servidor de desarrollo

```bash
npm run dev
```

La app queda disponible por defecto en `http://localhost:5173`.

---

### 5. Correr los smoke tests

Los smoke tests verifican que el login y logout funcionen correctamente.

Agrega tus credenciales de prueba al archivo `.env`:

```
TEST_EMAIL=tu-correo@upb.edu.co
TEST_PASSWORD=tu-contraseña
```

Luego ejecuta:

```bash
# Correr todos los tests
npm test

# Ver interfaz visual (útil para depurar)
npm run test:ui

# Abrir el reporte HTML con resultados detallados
npm run test:report
```

Los tests cubren:
- Login con credenciales válidas → redirige al dashboard
- Login con credenciales inválidas → muestra error
- Ruta protegida sin sesión → redirige al inicio
- Cerrar sesión desde el menú → redirige a `/LogOut`
- Dashboard tras logout → redirige al inicio

---

### 6. Pasos para abrir en Android Studio

```bash
# 1. Compilar el proyecto web dentro de client
npm run build

# 2. Sincronizar con Android
npx cap sync android

# 3. Abrir Android Studio
npx cap open android
```

> El `AndroidManifest.xml` ya declara `ACCESS_FINE_LOCATION` y `ACCESS_COARSE_LOCATION`. El permiso además se solicita en tiempo de ejecución desde `services/location.service.js`, porque declararlo en el manifest no basta desde Android 6.

---

## ¿Cómo está organizado el proyecto? 🗂️

```
client/
├── android/                 # Proyecto Android de Capacitor (generado, pero versionado)
├── public/                  # Recursos estáticos (favicon, fotos del campus, etc.)
├── tests/                   # Smoke tests de Playwright (login, logout)
├── src/
│   ├── assets/              # Fuentes, íconos y otros recursos empaquetados
│   ├── components/
│   │   ├── atoms/           # Piezas de UI reutilizables más pequeñas (botones, pines, selector de etiquetas)
│   │   └── organisms/       # Componentes compuestos más grandes (encabezados, formularios, modales, menú)
│   ├── context/             # Proveedores de contexto de React — hoy solo el estado de apertura del menú
│   ├── data/                # JSON local usado por la búsqueda (ver nota abajo)
│   ├── pages/               # Un archivo por ruta/vista (Login, Mapa, Foro, etc.)
│   ├── routes/               # Definición de rutas y lógica de rutas protegidas
│   ├── services/             # Todas las integraciones externas (ver abajo)
│   ├── App.jsx               # Componente raíz con la configuración del router
│   ├── index.css             # Estilos globales y punto de entrada de Tailwind v4
│   └── main.jsx               # Punto de entrada de la app
├── .env                     # Variables de entorno locales (no se sube)
└── vite.config.js
```

### Dos headers, a propósito 🧩

Hay dos componentes de encabezado y cada página elige uno en su `import`:

- **`IniHeader.jsx`** — encabezado reducido (solo logo + accesibilidad). Lo usan las cuatro pantallas sin sesión: `Landing`, `Login`, `Register`, `LogOut`.
- **`Header2.jsx`** — encabezado completo (logo + accesibilidad + Perfil + Menú). Lo usan las nueve pantallas que requieren sesión activa.

No hay ninguna condición en tiempo de ejecución — la elección queda fija por página desde el `import`.

### ¿Qué hay en `/services`? ⚙️

Todo lo que habla con el mundo exterior. Ninguna page o componente consulta Supabase directamente; todos pasan por un servicio.

| Servicio | Responsabilidad |
|---|---|
| `supabase.js` | Crea el único cliente de Supabase que usan todos los demás servicios |
| `auth.service.js` | Login, registro, logout, sesión |
| `profile.service.js` | Perfil del usuario actual |
| `faqs.service.js` | Preguntas del FAQ |
| `foro.service.js` | Publicaciones, respuestas, respuestas anidadas, likes |
| `mentores.service.js` | Directorio de mentores, deep link de Teams, registro de contactos |
| `profesores.service.js` | Directorio de profesores |
| `eventos.service.js` | Actividades, inscripción y cancelación |
| `ubicaciones.service.js` | Ubicaciones del campus para el mapa |
| `mapa.service.js` | Cálculos del mapa — distancias, bloques cercanos, leyenda de pines *(sin Supabase)* |
| `location.service.js` | GPS del dispositivo y permiso en tiempo de ejecución *(sin Supabase)* |
| `map.service.js` | Carga el SDK de Google Maps *(sin Supabase)* |

Los últimos tres viven en `/services` pero no tocan la base de datos — la carpeta terminó significando "todo lo que no es interfaz".

### Sobre `/data` 📦

- **`searchIndex.json`** — sigue en uso. Indexa las secciones de la app para que `/buscar` las encuentre. Busca *secciones de la app*, no lugares del campus.
- **`tagList.json`** — las 22 etiquetas que ofrece el filtro de búsqueda.
- **`markersList.js`** — **legado, ya no se importa.** Las 35 ubicaciones del campus se migraron a la tabla `ubicaciones` de Supabase; el mapa ahora lee de la base de datos. El archivo se conserva solo como referencia y puede borrarse.

---

## Base de datos 🗄️

**PostgreSQL vía Supabase.** Todas las tablas tienen Row Level Security activado.

| Tabla | Propósito |
|---|---|
| `profiles` | Datos del usuario, creada automáticamente por un trigger sobre `auth.users` |
| `ubicaciones` | Ubicaciones del campus que se muestran en el mapa |
| `faqs` | Preguntas frecuentes |
| `post` / `respuesta_post` / `likes_post` | Contenido del foro, respuestas y reacciones |
| `mentores` / `contactos_mentor` | Directorio de mentores y registro de contactos |
| `eventos` / `inscripciones_evento` | Actividades e inscripciones |
| `profesores` | Directorio de profesores |

> **Creación del perfil:** un trigger de la base de datos (`on_auth_user_created`) crea la fila en `profiles` cada vez que se agrega un usuario a `auth.users`, sin importar cómo. Luego `register()` la completa con los datos del formulario usando `upsert`. Antes de que existiera este trigger, una cuenta creada fuera del formulario quedaba sin perfil y rompía todas las llaves foráneas que apuntaban a ella.

Datos locales (no están en la BD):
- Índice de búsqueda y lista de etiquetas

---

## Notas 📝

- Todas las claves de Supabase deben llevar el prefijo `VITE_` para ser accesibles en el navegador vía `import.meta.env`.
- Las sesiones de autenticación las gestiona automáticamente la librería cliente de Supabase — el JWT lo emite y firma Supabase, se guarda en `localStorage` y el SDK lo adjunta a cada petición. No existe manejo propio de tokens en este código.
- La confirmación por correo está **desactivada** en el proyecto de Supabase, así que `signUp()` devuelve una sesión activa de inmediato. El registro llama explícitamente a `logout()` antes de redirigir a la pantalla de login.

---

## Sprint 1 — trazabilidad de código 🧭

> Alcance solo del sprint (Autenticación, acceso e inicio). Para los criterios de aceptación completos de cada historia, ver la sección **"Sprint 1"** en el `README.md` de la raíz del repo — nada de lo de abajo lo duplica.

| HU | Ruta(s) | Pages / componentes | Servicio / dato |
|---|---|---|---|
| HU-31 Bienvenida | `/` | `pages/Landing.jsx`, `IniHeader`, `atoms/Card`, `Button` | — |
| HU-32 Encabezado global | todas (por página) | `organisms/Header2.jsx` (completo) / `organisms/IniHeader.jsx` (reducido), `atoms/AccessButton` | — |
| HU-33 Pie de página | todas (por página) | `organisms/Footer.jsx` | — |
| HU-34 Menú lateral | global (montado una vez) | `organisms/Menu.jsx`, `context/MenuContext`, `App.jsx` | `auth.service.js` (`logout`) |
| HU-18 Crear cuenta | `/register` | `pages/Register.jsx`, `organisms/RegisterForm.jsx` | `auth.service.js` (`register`), `data/careerList.json` (desplegable de 26 programas) |
| HU-01 Login | `/Login` | `pages/Login.jsx`, `organisms/LoginForm.jsx` | `auth.service.js` (`login`) |
| HU-02 Logout | `/LogOut`, `/perfil` | `pages/LogOut.jsx`, `pages/Perfil.jsx`, `Menu`, `routes/ProtectedRoute.jsx` | `auth.service.js` (`logout`, `getSession`) |
| HU-19 Inicio + novedades | `/dashboard` | `pages/Dashboard.jsx`, `organisms/Carousel.jsx`, `atoms/NewsCard.jsx` | — |
| HU-20 Accesos rápidos | `/dashboard`, `/buscar` | `organisms/QuickAccess.jsx`, `atoms/DashButton.jsx`, `pages/Buscar.jsx`, `organisms/Search.jsx` | — |

> **"todas (por página)" vs. "global (montado una vez)":** el encabezado y el pie de página aparecen en todas las pantallas, pero cada `page` importa y renderiza su propia copia (`Header2`/`IniHeader` y `Footer`) — es código repetido, no un componente compartido. El menú lateral, en cambio, se monta **una sola vez** en `App.jsx`, fuera del sistema de rutas, y comparte su estado abierto/cerrado con toda la app a través de `MenuContext`. Por eso "global" no significa lo mismo que "todas": una es una instancia única compartida, la otra es la misma pieza repetida en cada página.

### Cobertura de pruebas del Sprint 1 🧪

Los smoke tests existentes (`npm test`, con `TEST_EMAIL` / `TEST_PASSWORD` en `client/.env`) cubren HU-01 y HU-02: login válido → dashboard, login inválido → error, ruta protegida sin sesión → landing, logout desde el menú → `/LogOut`, dashboard después de logout → landing.

### Brechas conocidas del Sprint 1 ⚠️

1. **HU-01:** sin código propio de bcrypt/JWT/captcha — el cifrado de contraseñas y el JWT de sesión los maneja Supabase Auth (ver Notas arriba); el formulario de login no tiene captcha.

> **HU-20 — buscador retirado (16/09/2026):** el bloque de accesos rápidos ya no tiene su propio buscador. Solo encontraba secciones de la app que ya tienen su propio acceso rápido, así que era redundante; la búsqueda se hace desde el acceso "Buscar" (`/buscar`).

---

## Sprint 2 — trazabilidad de código 🧭

> Alcance solo del sprint (Comunidad y Soporte: FAQ y mentores). Para los criterios de aceptación completos de cada historia, ver la sección **"Sprint 2"** en el `README.md` de la raíz del repo — nada de lo de abajo lo duplica.

| HU | Ruta(s) | Pages / componentes | Servicio / dato |
|---|---|---|---|
| HU-04 FAQ | `/faqs` | `pages/FaqsPage.jsx` | `faqs.service.js` (`getFaqs`, `agruparPorCategoria`), tabla `faqs` |
| HU-05 FAQ → foro | `/faqs`, `/foro` | `pages/FaqsPage.jsx` (botón "¿Aún con dudas?"), `pages/Foro.jsx` (lee `location.state`) | `faqs.service.js` |
| HU-06 Directorio de mentores | `/mentores` | `pages/Mentores.jsx` (filtro, estado vacío, tarjetas) | `mentores.service.js` (`getMentores`, `getMaterias`), tabla `mentores` |
| HU-07 Contacto por Teams | `/mentores` | `pages/Mentores.jsx` (modal "Contactar") | `mentores.service.js` (`construirEnlaceTeams`, `construirEnlaceOutlook`, `registrarContacto`), tabla `contactos_mentor` |
| HU-38 Buscar y filtrar FAQ | `/faqs` | `pages/FaqsPage.jsx` (buscador, botones de categoría, estado sin resultados) | `faqs.service.js` (`filtrarFaqs`, `agruparPorCategoria`) |
| HU-39 Materia sin mentor → foro | `/mentores`, `/foro` | `pages/Mentores.jsx` (enlace bajo el filtro y botón en el estado vacío), `pages/Foro.jsx` (lee `location.state`) | — |

### Brechas conocidas del Sprint 2 ⚠️

1. **HU-06:** las 10 filas de la tabla `mentores` son **datos de prueba** insertados a mano para probar el flujo, no el directorio real de tutores de la universidad. Los correos siguen el formato institucional real de la UPB (`nombre.apellido@upb.edu.co`) pero no pertenecen a personas reales.
2. **HU-07:** "funciona en navegador de escritorio y en la app móvil" no se ha verificado dentro del APK de Android. El botón de contacto usa `window.open(..., "_blank")`; está confirmado que funciona en un navegador normal, pero su comportamiento dentro del WebView de Capacitor (sin plugin de enlaces externos instalado) no se ha probado en un dispositivo.
