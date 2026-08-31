## Security

The project uses **Supabase** as its backend, which provides the following security layers:

### Authentication and sessions
- Passwords are automatically hashed with **Bcrypt** — they are never stored in plain text.
- Upon login, two **JWT** tokens are generated: an **Access Token** (1 hour duration) and a **Refresh Token** that automatically renews it without user intervention.
- Sessions are managed client-side and are correctly invalidated upon logout.

### Encrypted communication
- All communication between the frontend and Supabase is encrypted via **HTTPS/TLS**.
- The project URL always operates under `https://` — Supabase does not allow HTTP connections.

### Database access control (RLS)
**Row Level Security (RLS)** is enforced on all tables to ensure each user only accesses the data they are authorized to see:

| Table | Policy |
|---|---|
| `profiles` | Each user can only view and edit their own profile |
| `profesores` | Only authenticated users can read |
| `ubicaciones` | Only authenticated users can read |
| `faqs` | Only authenticated users can read |
| `post` | Authenticated users can read, only the author can delete |
| `respuesta_post` | Authenticated users can read, only the author can delete |

### Attack protection
- **Rate limiting** active by default in Supabase to limit failed login attempts and prevent brute force attacks.
- **Captcha (hCaptcha)** integrated in login and register forms — enabled in production with a real domain.
- Connection keys (`SUPABASE_URL` and `SUPABASE_ANON_KEY`) are managed via environment variables in `.env`, excluded from the repository via `.gitignore`.

### Current security status

| Mechanism | Status |
|---|---|
| Bcrypt password hashing | ✅ Active |
| JWT with automatic refresh | ✅ Active |
| HTTPS/TLS | ✅ Active |
| Row Level Security | ✅ Active on all tables |
| Rate limiting | ✅ Active by default |
| Email confirmation | ⏳ Enabled in production |
| Captcha (hCaptcha) | ⏳ Enabled in production |

## Code Standards

This project follows the following standards:

- **JSDoc** is used to document functions and services. Example:
```js
/**
 * Logs in a user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {string} captchaToken - hCaptcha token
 * @returns {Promise<object>} Supabase session data
 */
export async function login(email, password, captchaToken) { ... }
```
- Component names use **PascalCase** → `LoginForm`, `Dashboard`
- Service files use **camelCase** → `auth.service.js`, `foro.service.js`
- All Git commits must be written in **English** following the format: `type: description` (e.g. `feat: add forum page`)

## Tech Stack & Versions

| Technology | Version |
|---|---|
| Node.js | v18+ |
| React | v18.3.1 |
| Vite | v6.x |
| react-router-dom | v6.26.0 |
| @supabase/supabase-js | v2.x |
| JavaScript | ES2022+ |

## Database Requirements

This project uses **Supabase** (PostgreSQL) as its database. To set it up:

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Run the SQL schema located in `doc/database/schema.sql` in the Supabase SQL Editor
4. Run the seed data in `doc/database/seed.sql` to populate initial data
5. Get your credentials from **Project Settings → API**:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Add them to your `front/.env` file

### Required tables
- `profiles` — user profiles
- `profesores` — faculty directory
- `ubicaciones` — campus locations
- `faqs` — frequently asked questions
- `post` — community forum posts
- `respuesta_post` — forum replies