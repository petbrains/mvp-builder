# Docker Standards

## When to Use

✅ Cloud deployment, CI/CD, team dev environment consistency, Kubernetes, local DB/Redis isolation  
❌ Serverless deployments, simple scripts, early prototyping

## Non-negotiable Rules

### Production
- Always multi-stage builds: `deps` → `builder` → `runner`
- Base image: `node:20-alpine` (never `latest`, never full Debian)
- Run as non-root user — always create and switch to unprivileged user
- Never store secrets in Dockerfile — pass via env at runtime
- Always add `HEALTHCHECK`
- Run `prisma migrate deploy` in CMD, not during build

### Development
- Use `docker-compose` for local dev — never manual `docker run` chains
- Database service must have `healthcheck` + `depends_on` with `condition: service_healthy`
- Use service name as DB host (`postgres`, not `localhost`)

### Always
- `.dockerignore` required — must exclude: `node_modules`, `dist`, `.env*`, `.git`, test files
- Layer order: `package*.json` → `npm ci` → source files (cache optimization)
- `npm ci --only=production` in production stage, never full `npm install`