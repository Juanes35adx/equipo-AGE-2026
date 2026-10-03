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
- **Mapa del campus** — mapa interactivo (Leaflet + OpenStreetMap) con 35 ubicaciones del campus, posición del usuario en vivo, leyenda de pines, búsqueda dentro del mapa y bloques cercanos
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
| Mapas | Leaflet + OpenStreetMap (sin API key) |
| Geolocalización | `@capacitor/geolocation` |
| Pruebas | Playwright (smoke tests) |
| Linting | ESLint |
| Auth y base de datos | Supabase (Auth + PostgreSQL con RLS) |
| Runtime | Node.js 24 LTS |

> ⚠️ **Aviso sobre Tailwind v4:** este proyecto usa **Tailwind CSS v4**, que tiene diferencias importantes frente a v3. Si usas herramientas de IA o documentación, asegúrate de que estén referenciando v4 — la mayoría todavía asume por defecto la sintaxis de v3.

> ℹ️ **El mapa ya no usa Google Maps.** El 29 de septiembre de 2026 migró a **Leaflet** con los mapas libres de **OpenStreetMap**: no necesita API key, Map ID ni tarjeta de crédito. Los pines se dibujan con `L.divIcon` a partir de `components/atoms/Marker.jsx`.

---

## Cómo empezar 🚀

### Requisitos previos

- [Node.js 24 LTS](https://nodejs.org/) instalado (desarrollado con v24.14.0)
- Credenciales del proyecto de Supabase

### 1. Entrar a la carpeta del frontend

```bash
cd client
```

### 2. Instalar dependencias

```bash
npm install
```

> Hay que volver a correr `npm install` cada vez que un `git pull` traiga librerías nuevas en `package.json`. Si no, la página queda en blanco porque falta la librería (pasó con `leaflet` el 29 de septiembre).

### 3. Configurar las variables de entorno

Crear un archivo `.env` dentro de **`client/`** (no en `server/`):

```
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_anon_key
```

> Las dos son obligatorias. `VITE_GOOGLE_API_KEY` ya no se usa desde la migración del mapa a Leaflet; si la tienes en tu `.env`, puedes borrarla.

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
| `map.service.js` | **Legado**: cargaba el SDK de Google Maps; tras la migración a Leaflet ya no se usa *(sin Supabase)* |

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

> **Materias del filtro de mentores:** la política RLS de `mentores` solo deja ver las filas con `activo = true`, así que el cliente no puede saber qué materias se quedaron sin mentor disponible. Para eso existe la función `materias_mentoria()` (`security definer`), que devuelve **solo los nombres** de las materias — nunca datos de mentores inactivos — y permite que el filtro ofrezca una materia sin mentores y se muestre el mensaje correspondiente.

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
| HU-06 Directorio de mentores | `/mentores` | `pages/Mentores.jsx` (filtro, estado vacío, tarjetas) | `mentores.service.js` (`getMentores`, `getMateriasDelPrograma`), tabla `mentores`, función `materias_mentoria()` |
| HU-07 Contacto por Teams | `/mentores` | `pages/Mentores.jsx` (modal "Contactar") | `mentores.service.js` (`construirEnlaceTeams`, `construirEnlaceOutlook`, `registrarContacto`), tabla `contactos_mentor` |
| HU-38 Buscar y filtrar FAQ | `/faqs` | `pages/FaqsPage.jsx` (buscador, botones de categoría, estado sin resultados) | `faqs.service.js` (`filtrarFaqs`, `agruparPorCategoria`) |
| HU-39 Materia sin mentor → foro | `/mentores`, `/foro` | `pages/Mentores.jsx` (enlace bajo el filtro y botón en el estado vacío), `pages/Foro.jsx` (lee `location.state`) | — |

### Brechas conocidas del Sprint 2 ⚠️

1. **HU-06:** las 10 filas de la tabla `mentores` son **datos de prueba** insertados a mano para probar el flujo, no el directorio real de tutores de la universidad. Los correos siguen el formato institucional real de la UPB (`nombre.apellido@upb.edu.co`) pero no pertenecen a personas reales.
2. **HU-07:** "funciona en navegador de escritorio y en la app móvil" no se ha verificado dentro del APK de Android. El botón de contacto usa `window.open(..., "_blank")`; está confirmado que funciona en un navegador normal, pero su comportamiento dentro del WebView de Capacitor (sin plugin de enlaces externos instalado) no se ha probado en un dispositivo.

---

## Sprint 3 — trazabilidad de código 🧭

> Alcance solo del sprint (Mapa, Perfil y Accesibilidad). Para los criterios de aceptación completos de cada historia, ver la sección **"Sprint 3"** en el `README.md` de la raíz del repo — nada de lo de abajo lo duplica.

| HU | Ruta(s) | Pages / componentes | Servicio / dato |
|---|---|---|---|
| HU-08 Ubicación en tiempo real | `/mapa` | `pages/Mapa.jsx`, `organisms/MapInfo.jsx` (botón de ubicación, punto azul, círculo de precisión, seguimiento, aviso con causa y pasos), `atoms/Marker.jsx` (`htmlDeUsuario`) | `location.service.js` (`getUserLocation`, `watchUserLocation`, `diagnosticarErrorUbicacion`), `@capacitor/geolocation` |
| HU-09 Puntos de interés | `/mapa` | `organisms/MapInfo.jsx` (pines con `L.divIcon`), `pages/Mapa.jsx` (panel lateral de detalle), `atoms/Marker.jsx` (`htmlDePin`) | `ubicaciones.service.js` (`getUbicaciones`, `aPunto`), tabla `ubicaciones` |
| HU-30 Bloques cercanos | `/mapa` | `pages/Mapa.jsx` (sección "Bloques Cercanos" del panel lateral) | `mapa.service.js` (`bloquesCercanos`, `distanciaEnMetros`) |
| HU-35 Leyenda de colores | `/mapa` | `pages/Mapa.jsx` (leyenda sobre el mapa, esquina superior derecha), `atoms/Marker.jsx` (`PIN_COLORS`) | `mapa.service.js` (`PIN_LEYENDA`) |
| HU-36 Buscar en el mapa | `/mapa` | `pages/Mapa.jsx` (buscador, lista de resultados, `irAlLugar`), `organisms/MapInfo.jsx` (`flyTo` al lugar elegido) | `ubicaciones.service.js` |
| HU-27 Consultar mi perfil | `/perfil` | `pages/Perfil.jsx`, `atoms/Button.jsx` | `profile.service.js` (`getProfile`), `auth.service.js` (`logout`), tabla `profiles` |
| HU-28 Accesibilidad | todas (por página) | `atoms/AccessButton.jsx`, `atoms/AccessOpts.jsx`, `atoms/SizeButton.jsx`, `atoms/ContrastButton.jsx`, usados en `organisms/Header2.jsx` e `organisms/IniHeader.jsx` | `localStorage` (`font-scale`, `contrast-mode`) |

> **Detalles técnicos del mapa:** las imágenes de OpenStreetMap llegan hasta el nivel de zoom 19; por eso la capa usa `maxNativeZoom: 19` con `maxZoom: 20` (en el 20 se amplían las del 19; sin esto el mapa quedaba en blanco). Un `ResizeObserver` llama a `invalidateSize()` cuando cambia el tamaño del contenedor. El mapa va dentro de un contenedor con `isolate`: las capas de Leaflet usan `z-index` de 200 a 1000 y, sin un contexto propio, al hacer scroll se montaban encima del encabezado fijo (`z-50`). `diagnosticarErrorUbicacion()` combina el código del error (1 permiso, 2 no disponible, 3 tiempo agotado), `navigator.permissions.query` y `window.isSecureContext` para explicar la causa real. La ubicación del usuario se considera "dentro del campus" si cae en los límites del mapa más un margen de ~150 m.

> **Pantallas conectadas al mapa:** desde Actividades se puede abrir el mapa centrado en el lugar de un evento; `pages/Mapa.jsx` lo recibe como `location.state.ubicacionId`.

### Brechas conocidas del Sprint 3 ⚠️

1. **HU-08:** el tiempo de carga (NF-02, ~1,5 s) se midió en escritorio con el servidor de desarrollo, no en un celular con datos móviles. El seguimiento en tiempo real (`watchPosition`) se verificó con Playwright simulando la ubicación (caminata, precisión de computador, fuera del campus, permiso denegado), pero no caminando por el campus con un celular real ni dentro del APK. En Windows, el navegador solo entrega la ubicación si está activada en Configuración → Privacidad y seguridad → Ubicación.
2. **HU-09:** de las 35 ubicaciones, 15 no tienen `imagen_url`: los 9 puntos de comida, las 4 porterías, `poi-013` (Bulevar Bloque 12) y `poi-017a` (Gimnasio UPB).
3. **HU-30:** los bloques cercanos se calculan respecto al lugar **elegido** (los 3 más cercanos), no respecto a la zona visible del mapa, y se muestran en el panel lateral, no encima del mapa.
4. **HU-27:** el "ID" son los primeros 8 caracteres de `profiles.profile_id` (UUID de Supabase Auth), no el ID de estudiante de la UPB, que no existe en la base. Las notificaciones son un texto fijo; no hay tabla ni lógica de notificaciones.
5. **`map.service.js`** quedó como legado de Google Maps: ya nadie lo importa y se puede borrar.
