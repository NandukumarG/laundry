# Laundry frontend

The existing React app now calls the Python backend through `src/api.js`.
All requests share the environment-configured origin and attach the login token.

## Local

```powershell
Copy-Item .env.local.example .env.development.local
npm ci
npm start
```

The local template points to `http://localhost:8000`. Start the backend separately.

## Deployment

```powershell
Copy-Item .env.deployment.example .env.production.local
npm run build:deployment
```

Set `REACT_APP_API_BASE_URL` to the public API origin without `/api`, or leave it
empty when using the included nginx reverse proxy. Environment values are public
and embedded during the build. Do not put credentials here. Rebuild after changes.
The root Docker Compose deployment supplies this value as a Docker build argument.

## Checks

```powershell
npm test -- --watchAll=false
npm run build:deployment
```

Use `python scripts/sync-catalog.py` from the project root after editing the backend
price catalog. See the [project setup guide](../README.md) for PostgreSQL,
migrations, backend setup, and the complete deployment workflow.
