# Laundry

One project containing the existing React interface and a Python FastAPI backend,
with PostgreSQL and versioned Alembic migrations.

```text
laundry/
  frontend/                  React app, API client, local/deployment env templates
  backend/
    app/                     API, authentication, models, validation, pricing
    migrations/versions/     Version-controlled PostgreSQL schema changes
    tests/                   API integration tests against PostgreSQL
  compose.local.yaml         Local PostgreSQL
  compose.deployment.yaml    PostgreSQL, migrations, Python API, React/nginx
  legacy/                   Original Spring Boot source and Git metadata (ignored)
```

## Local development (PowerShell)

Requires Python 3.13+, Node.js 22+, and PostgreSQL 17 (installed directly or via
Docker Desktop). Run these commands from this folder:

```powershell
Copy-Item .env.local.example .env.local
Copy-Item backend/.env.local.example backend/.env.local
Copy-Item frontend/.env.local.example frontend/.env.development.local
docker compose --env-file .env.local -f compose.local.yaml up -d --wait
```

If PostgreSQL is installed directly, create a `laundry` role and database using
your PostgreSQL administrator account, then put that database URL in
`backend/.env.local`. Skip the Docker command. If port 5432 is already occupied,
set `POSTGRES_PORT` in the root env file and match the backend URL port.

Start the backend in one terminal:

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.lock
.\.venv\Scripts\alembic.exe upgrade head
.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload --port 8000
```

Start the frontend in another terminal:

```powershell
cd frontend
npm ci
npm start
```

Open http://localhost:3000. API documentation: http://localhost:8000/docs.
Database/migration health: http://localhost:8000/api/health.
On macOS/Linux, use `.venv/bin/python` and `.venv/bin/alembic` instead.

## Environment files

| Component | Local file | Deployment file |
| --- | --- | --- |
| Frontend | `frontend/.env.development.local` | `frontend/.env.production.local` |
| Backend | `backend/.env.local` | `backend/.env.deployment` |
| Docker Compose | `.env.local` | `.env.deployment` |

Each has a corresponding `.example` template. Real env files are ignored by Git
and excluded from Docker images. Local copies are supplied for development.
The backend defaults to `.env.local`; use `$env:ENV_FILE='.env.deployment'` when
running deployment commands directly. Hosted platform environment variables
override file settings; Docker Compose supplies backend values via `env_file`.

Frontend variables are public and embedded at build time; never put passwords or
JWT secrets there. Restart the dev server or rebuild after changing them.
`REACT_APP_API_BASE_URL` is the backend origin without `/api`; empty means the
same origin. Docker builds read this value from the root deployment env through
a build argument. Standalone `npm run build:deployment` reads
`frontend/.env.production.local`. Development env overrides do not affect production.

## Deployment with Docker Compose

```powershell
Copy-Item .env.deployment.example .env.deployment
Copy-Item backend/.env.deployment.example backend/.env.deployment
Copy-Item frontend/.env.deployment.example frontend/.env.production.local
python -c "import secrets; print(secrets.token_urlsafe(48))"
```

Set a unique database password in both root `POSTGRES_PASSWORD` and backend
`DATABASE_URL` (URL-encode special characters in the URL). Use the generated
value for backend `JWT_SECRET`. Set `CORS_ORIGINS` to a JSON array of your actual
HTTPS frontend origins. The backend rejects the placeholder JWT secret.

```powershell
docker compose --env-file .env.deployment -f compose.deployment.yaml up -d --build
docker compose --env-file .env.deployment -f compose.deployment.yaml ps
```

Put an HTTPS reverse proxy or load balancer in front of `127.0.0.1:8080` on the
deployment host. nginx serves the React app, handles browser route refreshes,
and proxies `/api` and `/uploads` to Python. PostgreSQL and the API are internal
to the Docker network. Database and avatar files use persistent named volumes.
Back up both volumes. Changing the env password does not rotate an existing
PostgreSQL role password; update that role explicitly when rotating credentials.

For subsequent releases, build images and run the migration job explicitly before
recreating the app services:

```powershell
docker compose --env-file .env.deployment -f compose.deployment.yaml build
docker compose --env-file .env.deployment -f compose.deployment.yaml run --rm migrate
docker compose --env-file .env.deployment -f compose.deployment.yaml up -d
```

For separate hosting, build the frontend with the public HTTPS API origin, deploy
the backend Dockerfile with `DATABASE_URL`, `JWT_SECRET`, `APP_ENV=deployment`,
and `CORS_ORIGINS`, and run `alembic upgrade head` as a release command. Use a
persistent disk for `UPLOAD_DIR`. A managed PostgreSQL provider may require
`?sslmode=require` in `DATABASE_URL`. Configure the static host's SPA fallback.

## Schema changes and verification

See [migration workflow](backend/migrations/README.md). All schema changes live
in `backend/migrations/versions`; the API does not create or modify tables.

Use a dedicated disposable PostgreSQL database whose name ends in `_test`:

```powershell
cd backend
.\.venv\Scripts\python.exe -m pip install -r requirements-dev.txt
$env:TEST_DATABASE_URL='postgresql+psycopg://laundry:laundry_local@localhost:5432/laundry_test'
.\.venv\Scripts\python.exe -m pytest -q
.\.venv\Scripts\alembic.exe check
cd ../frontend
npm test -- --watchAll=false
npm run build:deployment
```

The tests apply migrations and roll back test data. They cover authentication,
profile edits, account isolation, scheduling and server pricing, filters,
delivery edits, cancellation, input validation, image uploads, and CORS.

Prices are maintained in `backend/app/catalog.json`. After editing them, run
`python scripts/sync-catalog.py` from the project root and rebuild the frontend.
Both order pages use the copied catalog; the backend always calculates the total.

`requirements.lock` records tested runtime dependencies; `requirements.txt`
defines allowed update ranges. After intentional dependency updates, regenerate
the lock in a clean runtime-only virtual environment and repeat verification.

The original Java implementation used MySQL. No old database contents were
provided or imported. The new schema includes pickup ownership; existing orders
need an explicit account mapping before any data import. The old source and Git
history remain under `legacy`. The existing UI's time-based order progress display
is retained; this project does not add an operator workflow for status changes.

Implementation references: [FastAPI JWT authentication](https://fastapi.tiangolo.com/tutorial/security/oauth2-jwt/),
[Alembic migrations](https://alembic.sqlalchemy.org/en/latest/tutorial.html), and
[React environment configuration](https://create-react-app.dev/docs/adding-custom-environment-variables/).

## Verification completed

- Backend: 8 integration tests passed on an isolated PostgreSQL 17 database.
- Migrations: upgrade, downgrade to base, re-upgrade, and `alembic check` passed.
- Frontend: 4 tests passed; production build succeeded with existing frontend
  lint warnings (unused variables, placeholder links, and hook dependencies).
- Production bundle contains no hardcoded local backend origin.
- Compose YAML parsed successfully; container builds/startup were not tested
  because Docker was not installed on this machine.

No deployment was performed. Replace deployment placeholders with your domain
and credentials before deploying. The temporary PostgreSQL test server was stopped.
