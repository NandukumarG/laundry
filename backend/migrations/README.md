# Database migrations

Run from `backend` with its virtual environment active. Local commands load
`.env.local`; set `ENV_FILE=.env.deployment` to select deployment settings.
Process environment variables override the selected file.

```sh
alembic upgrade head
alembic current
alembic revision --autogenerate -m "describe schema change"
alembic check
```

Review generated revisions, including data backfills, before applying them.
Commit each revision in `versions/`. Do not edit an already-applied revision.
The app never uses `create_all` or changes tables at startup.

`alembic downgrade -1` reverses the latest revision; take a database backup
first because downgrades may discard data. The initial downgrade drops all
application tables. Deployment runs migrations in a separate one-shot service
before starting the API; run that service again for each release.

This initial schema targets a new PostgreSQL database. Existing MySQL data is
not imported: the old pickup table has no owner column, so a data transfer needs
an explicit user-to-order mapping. Existing bcrypt password hashes are supported
by the Python verifier, but old Java JWTs are not; users must log in again.
