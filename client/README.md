# UPB AGE — ASISTENTE GENERAL ESTUDIANTIL (General Student Assistant) 🎓

Web app for new students at **Universidad Pontificia Bolivariana – Medellín**, designed to help them navigate campus life from day one.

---

## What's in `/client`? 📁

`/client` contains the entire client-side application. It is a React + Vite single-page app responsible for all UI, routing, authentication flows, and communication with the Supabase backend. It is also the source for the Android build, packaged with Capacitor.

> **Note on `/server`:** the repository has a `/server` folder with an Express skeleton, but it is **not used**. It exposes a single placeholder route and connects to nothing. The project talks to Supabase directly from the client — Supabase *is* the backend.

---

## Features ✨

- **Welcome, Login & Registration** — handled via Supabase Auth. After signing up, the user is redirected to the login screen and must sign in with the new credentials.
- **Dashboard** — welcome message, news carousel, and quick-access grid to every module
- **Campus Map** — interactive Google Map with 35 campus locations, live user position, pin legend, in-map search, and nearby blocks
- **Search** — searches app sections by keyword, with a tag filter (22 tags)
- **FAQ** — questions loaded from the database, each with an official link and an "¿Aún con dudas?" button that jumps to the forum with the question pre-filled
- **Forum** — students post questions, reply, reply to replies (nested), and like posts
- **Mentors** — directory filterable by subject, contact opens a private Microsoft Teams chat
- **Activities** — event listing with real seat counts, sign-up and cancellation
- **Profile** — user data, SIGAA shortcut, and sign-out
- **Accessibility** — text size (A− / A+) and contrast controls, available from the header on every screen

---

## Tech Stack 🛠️

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite 8 |
| Routing | react-router-dom |
| Styling | Tailwind CSS v4 |
| Mobile | Capacitor 8 (Android) |
| Maps | Google Maps JavaScript API |
| Geolocation | `@capacitor/geolocation` |
| Testing | Playwright (smoke tests) |
| Linting | ESLint |
| Auth & Database | Supabase (Auth + PostgreSQL with RLS) |
| Runtime | Node.js 24 LTS |

> ⚠️ **Tailwind v4 heads-up:** This project uses **Tailwind CSS v4**, which has significant differences from v3. If you're using AI tools or documentation, make sure they're referencing v4 — most still default to v3 syntax.

> ⚠️ **Google Maps requires a Map ID.** The map uses `AdvancedMarkerElement`, which only works when a `mapId` is set. Because a `mapId` is present, Google **ignores** any `styles` option passed from the code — map styling (including hiding default POIs) must be configured in Google Cloud Console for that Map ID.

---

## Getting Started 🚀

### Prerequisites

- [Node.js 24 LTS](https://nodejs.org/) installed (developed on v24.14.0)
- Supabase project credentials
- A Google Maps API key with a Map ID

### 1. Navigate to the frontend folder

```bash
cd client
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file inside **`client/`** (not in `server/`):

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_GOOGLE_API_KEY=your_google_maps_key
```

> All three are required. If `VITE_GOOGLE_API_KEY` is missing the app still loads, but the map renders blank with no visible error.

> The actual values are shared privately. Do **not** commit this file — it is already in `.gitignore`.

### 4. Start the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` by default.

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

## How is the project organized? 🗂️

```
client/
├── android/                 # Capacitor Android project (generated, but tracked)
├── public/                  # Static assets (favicon, campus photos, etc.)
├── tests/                   # Playwright smoke tests (login, logout)
├── src/
│   ├── assets/              # Fonts, icons, and other bundled resources
│   ├── components/
│   │   ├── atoms/           # Smallest reusable UI pieces (buttons, pins, tag picker)
│   │   └── organisms/       # Larger composed components (headers, forms, modals, menu)
│   ├── context/             # React context providers — currently menu open/close state
│   ├── data/                # Local JSON used by the search (see note below)
│   ├── pages/               # One file per route/view (Login, Mapa, Foro, etc.)
│   ├── routes/              # Route definitions and protected route logic
│   ├── services/            # All external integrations (see below)
│   ├── App.jsx              # Root component with router setup
│   ├── index.css            # Global styles and Tailwind v4 entry point
│   └── main.jsx             # App entry point
├── .env                     # Local env variables (not committed)
└── vite.config.js
```

### Two headers, on purpose 🧩

There are two header components and each page picks one in its `import`:

- **`IniHeader.jsx`** — reduced header (logo + accessibility only). Used by the four pre-session pages: `Landing`, `Login`, `Register`, `LogOut`.
- **`Header2.jsx`** — full header (logo + accessibility + Perfil + Menú). Used by the nine pages that require an active session.

There is no runtime condition — the choice is fixed per page at import time.

### What lives in `/services`? ⚙️

Everything that talks to the outside world. No page or component queries Supabase directly; they all go through a service.

| Service | Responsibility |
|---|---|
| `supabase.js` | Creates the single Supabase client used by every other service |
| `auth.service.js` | Login, registration, logout, session |
| `profile.service.js` | Current user's profile |
| `faqs.service.js` | FAQ entries |
| `foro.service.js` | Posts, replies, nested replies, likes |
| `mentores.service.js` | Mentor directory, Teams deep link, contact tracking |
| `profesores.service.js` | Professor directory |
| `eventos.service.js` | Activities, sign-up and cancellation |
| `ubicaciones.service.js` | Campus locations for the map |
| `mapa.service.js` | Map maths — distances, nearby blocks, pin legend *(no Supabase)* |
| `location.service.js` | Device GPS + runtime permission *(no Supabase)* |
| `map.service.js` | Loads the Google Maps SDK *(no Supabase)* |

The last three live in `/services` but do not touch the database — the folder ended up meaning "everything that isn't UI".

### About `/data` 📦

- **`searchIndex.json`** — still in use. Indexes the app's sections so `/buscar` can find them. It searches *app sections*, not campus places.
- **`tagList.json`** — the 22 tags offered by the search filter.
- **`markersList.js`** — **legacy, no longer imported.** The 35 campus locations were migrated to the `ubicaciones` table in Supabase; the map now reads from the database. The file is kept only for reference and can be deleted.

---

## Database 🗄️

**PostgreSQL via Supabase.** Every table has Row Level Security enabled.

| Table | Purpose |
|---|---|
| `profiles` | User data, created automatically by a trigger on `auth.users` |
| `ubicaciones` | Campus locations shown on the map |
| `faqs` | Frequently asked questions |
| `post` / `respuesta_post` / `likes_post` | Forum content, replies and reactions |
| `mentores` / `contactos_mentor` | Mentor directory and contact tracking |
| `eventos` / `inscripciones_evento` | Activities and sign-ups |
| `profesores` | Professor directory |

> **Profile creation:** a database trigger (`on_auth_user_created`) creates the `profiles` row whenever a user is added to `auth.users`, no matter how. `register()` then completes it with the form data using `upsert`. Before this trigger existed, an account created outside the form ended up with no profile and broke every foreign key pointing at it.

Local data (not in the DB):
- Search index and tag list

---

## Notes 📝

- All Supabase keys must use the `VITE_` prefix to be accessible in the browser via `import.meta.env`.
- Auth sessions are managed automatically by the Supabase client library — the JWT is issued and signed by Supabase, stored in `localStorage`, and attached to every request by the SDK. No token handling exists in this codebase.
- Email confirmation is **disabled** in the Supabase project, so `signUp()` returns an active session immediately. Registration explicitly calls `logout()` before redirecting to the login screen.
