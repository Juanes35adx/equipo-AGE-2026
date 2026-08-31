# UPB AGE — ASISTENTE GENERAL ESTUDIANTIL (General Student Assistant) 🎓

Web app for new students at **Universidad Pontificia Bolivariana – Medellín**, designed to help them navigate campus life from day one.

---

## What's in `/client`? 📁

`/client` contains the entire client-side application. It is a React + Vite single-page app responsible for all UI, routing, authentication flows, and communication with the Supabase backend. Static assets like search indexes live here locally, while dynamic content (FAQs, teacher directory, etc.) is fetched from the database at runtime.

---

## Features ✨

- **Login & Registration** — handled via Supabase Auth
- **Campus Map** — interactive map of the UPB Medellín campus
- **Teacher Directory** — searchable list of professors, loaded from the database
- **FAQ** — frequently asked questions, loaded from the database
- **Forum** — specific questions, answered and asked by fellow students

---

## Tech Stack 🛠️

| Layer | Technology |
|---|---|
| Framework | React + Vite |
| Routing | react-router-dom |
| Styling | Tailwind CSS v4 |
| Compatibility | Babel (via Vite plugin) |
| Linting | ESLint |
| Auth & Database | Supabase (Auth + PostgreSQL) |
| Runtime | Node.js LTS |

> ⚠️ **Tailwind v4 heads-up:** This project uses **Tailwind CSS v4**, which has significant differences from v3. If you're using AI tools or documentation, make sure they're referencing v4 — most still default to v3 syntax.

> **Data split:** Search indexes are bundled as local JSON files for performance (see `/data` below). FAQs, teacher lists, and other dynamic content are fetched from Supabase (PostgreSQL) at runtime.

---

## Getting Started 🚀

### Prerequisites

- [Node.js (24.15.0) LTS](https://nodejs.org/) installed
- Supabase project credentials

### 1. Navigate to the frontend folder

```bash
cd client
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file inside `front/`:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

> The actual values are shared privately. Do **not** commit this file

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

---

## How is the project organized? 🗂️

```
client/
├── public/                  # Static assets (favicon, images, etc.)
├── src/
│   ├── assets/              # Fonts, icons, and other bundled resources
│   ├── components/
│   │   ├── atoms/           # Smallest reusable UI pieces (buttons, inputs)
│   │   └── organisms/       # Larger composed components built from atoms
│   ├── context/             # React context providers — currently used for menu/nav state management
│   ├── data/                # Local JSON files used as search indexes
│   ├── pages/               # One file per route/view (Login, Map, FAQ, etc.)
│   ├── routes/              # Route definitions and protected route logic
│   ├── services/            # All external integrations: Supabase auth, foro, mapa, professor list
│   ├── App.jsx              # Root component with router setup
│   ├── index.css            # Global styles and Tailwind v4 entry point
│   └── main.jsx             # App entry point
├── .env                     # Local env variables (not committed)
└── vite.config.js
```

### Why is search data stored locally? 🤔

The project's scope is small and well-defined — the set of searchable content (campus locations, FAQs, etc.) is compact and changes infrequently. Storing it as local JSON inside `/data` avoids unnecessary database round-trips and keeps the search experience instant. If the dataset grows significantly, migrating to a DB-backed search is straightforward.

### What lives in `/services`? ⚙️

Everything that talks to the outside world. This includes Supabase Auth flows (login, register, session handling) as well as data fetching for interactive features like the forum (`foro`), the campus map (`mapa`), and the professor directory (`profesores`). Keeping this logic centralized makes it easy to swap or update integrations without touching the UI layer.

---

## Database 🗄️

The app uses **PostgreSQL via Supabase**. The hosted database contains:

- Teacher directory
- FAQ entries
- *(other tables as needed)*

Local data (not in the DB):
- Search indexes
- Static lookup objects

---

## Notes 📝

- All Supabase keys must use the `VITE_` prefix to be accessible in the browser via `import.meta.env`.
- Auth sessions are managed automatically by the Supabase client library.
