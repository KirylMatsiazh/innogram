
#!/usr/bin/env bash
# Innogram Project Initialization Script
# Creates the initial monorepo structure and configuration files.

set -e

echo "Initializing Innogram Project Structure..."

# Create directories
directories=(
  "apps"
  "apps/core_microservice"
  "apps/auth_microservice"
  "apps/notifications_consumer_microservice"
  "apps/client_app"
  "packages"
  "packages/shared"
  "packages/types"
  "scripts"
  "docker"
  ".github"
  ".github/workflows"
)

echo "Creating project directories..."
for dir in "${directories[@]}"; do
  mkdir -p "$dir"
  echo "  Ready: $dir"
done

# Root package.json
echo "Creating package.json..."
cat > package.json <<'EOF'
{
  "name": "innogram",
  "version": "1.0.0",
  "description": "Innogram - Social Media Application",
  "private": true,
  "workspaces": ["apps/*", "packages/*"],
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "test": "turbo run test",
    "lint": "turbo run lint",
    "type-check": "turbo run type-check",
    "clean": "turbo run clean",
    "docker:up": "docker compose up -d",
    "docker:down": "docker compose down",
    "db:migrate": "turbo run db:migrate",
    "db:seed": "turbo run db:seed"
  },
  "devDependencies": {
    "turbo": "^1.10.0",
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0",
    "eslint": "^8.0.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "eslint-config-prettier": "^9.0.0",
    "eslint-plugin-prettier": "^5.0.0"
  }
}
EOF

# Turborepo configuration
echo "Creating turbo.json..."
cat > turbo.json <<'EOF'
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", "build/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "test": {
      "dependsOn": ["^build"]
    },
    "lint": {},
    "type-check": {
      "dependsOn": ["^build"]
    },
    "clean": {
      "cache": false
    },
    "db:migrate": {
      "cache": false
    },
    "db:seed": {
      "cache": false
    }
  }
}
EOF

# Git ignore
echo "Creating .gitignore..."
cat > .gitignore <<'EOF'
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

dist/
build/
.next/
out/
.nuxt/
coverage/
.nyc_output/

.env
.env.local
.env.development.local
.env.test.local
.env.production.local

.vscode/
.idea/
*.swp
*.swo
.DS_Store
Thumbs.db

logs/
*.log
tmp/
temp/
*.pid
*.seed

*.db
*.sqlite

.npm/
.eslintcache
.parcel-cache/
.cache/
.storybook-out/
*.tgz
.yarn-integrity
EOF

# Environment template
echo "Creating .env.example..."
cat > .env.example <<'EOF'
# Database
DATABASE_URL=postgresql://innogram_user:innogram_password@localhost:5432/innogram
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=innogram_user
POSTGRES_PASSWORD=innogram_password
POSTGRES_DB=innogram

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# JWT - replace the placeholder before implementing authentication
JWT_SECRET=replace-with-a-secure-random-secret
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3002/auth/google/callback

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# File uploads
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=10485760

# Application URLs
CORE_SERVICE_URL=http://localhost:3001
AUTH_SERVICE_URL=http://localhost:3002
NOTIFICATIONS_SERVICE_URL=http://localhost:3003
CLIENT_URL=http://localhost:3000

# Message broker
RABBITMQ_URL=amqp://innogram:innogram_password@localhost:5672
KAFKA_BROKERS=localhost:9092

# Development
NODE_ENV=development
LOG_LEVEL=debug
EOF

# Docker Compose
echo "Creating docker-compose.yml..."
cat > docker-compose.yml <<'EOF'
services:
  postgres:
    image: postgres:15
    container_name: innogram-postgres
    environment:
      POSTGRES_DB: innogram
      POSTGRES_USER: innogram_user
      POSTGRES_PASSWORD: innogram_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - innogram-network

  redis:
    image: redis:7-alpine
    container_name: innogram-redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    networks:
      - innogram-network

  rabbitmq:
    image: rabbitmq:3-management
    container_name: innogram-rabbitmq
    environment:
      RABBITMQ_DEFAULT_USER: innogram
      RABBITMQ_DEFAULT_PASS: innogram_password
    ports:
      - "5672:5672"
      - "15672:15672"
    networks:
      - innogram-network

volumes:
  postgres_data:
  redis_data:

networks:
  innogram-network:
    driver: bridge
EOF

# Root TypeScript configuration
echo "Creating tsconfig.json..."
cat > tsconfig.json <<'EOF'
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"],
      "@/shared/*": ["./packages/shared/*"],
      "@/types/*": ["./packages/types/*"]
    }
  },
  "include": ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
  "exclude": ["node_modules", "dist", "build", ".next"]
}
EOF

# ESLint configuration
echo "Creating .eslintrc.json..."
cat > .eslintrc.json <<'EOF'
{
  "root": true,
  "env": {
    "browser": true,
    "es2022": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint", "prettier"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "prefer-const": "error",
    "no-var": "error",
    "prettier/prettier": "error",
    "semi": ["error", "always"],
    "quotes": ["error", "single"],
    "indent": ["error", 2],
    "comma-dangle": ["error", "never"],
    "max-len": [
      "error",
      {
        "code": 80,
        "ignoreUrls": true,
        "ignoreStrings": true
      }
    ]
  },
  "ignorePatterns": [
    "node_modules/",
    "dist/",
    "build/",
    ".next/"
  ]
}
EOF

# README
echo "Creating README.md..."
cat > README.md <<'EOF'
# Innogram - Social Media Application

A social media application foundation using a monorepo structure.

## Project Structure

- `apps/core_microservice/` - Core NestJS API
- `apps/auth_microservice/` - Authentication service
- `apps/notifications_consumer_microservice/` - Notifications consumer
- `apps/client_app/` - Next.js frontend
- `packages/shared/` - Shared utilities
- `packages/types/` - Shared TypeScript types
- `scripts/` - Development and deployment scripts
- `docker/` - Docker configurations
- `.github/workflows/` - CI/CD workflows

## Prerequisites

- Node.js LTS
- npm
- Git for Windows (Git Bash)
- Docker Desktop

## Initial Setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env`.
3. Start infrastructure with `npm run docker:up`.

## Infrastructure

- PostgreSQL on port 5432
- Redis on port 6379
- RabbitMQ on port 5672
- RabbitMQ management UI on port 15672

## Note

This script creates the initial project structure and configuration.
Application implementations, database migrations, and tests must
be added separately.
EOF

# Workspace package manifests
echo "Creating workspace package manifests..."

cat > apps/core_microservice/package.json <<'EOF'
{
  "name": "@innogram/core-microservice",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "echo \"Core microservice implementation pending\"",
    "build": "echo \"Build not configured yet\"",
    "test": "echo \"Tests not configured yet\"",
    "lint": "echo \"Lint not configured yet\"",
    "type-check": "echo \"Type checking not configured yet\"",
    "clean": "echo \"Nothing to clean yet\""
  }
}
EOF

cat > apps/auth_microservice/package.json <<'EOF'
{
  "name": "@innogram/auth-microservice",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "echo \"Auth microservice implementation pending\"",
    "build": "echo \"Build not configured yet\"",
    "test": "echo \"Tests not configured yet\"",
    "lint": "echo \"Lint not configured yet\"",
    "type-check": "echo \"Type checking not configured yet\"",
    "clean": "echo \"Nothing to clean yet\""
  }
}
EOF

cat > apps/notifications_consumer_microservice/package.json <<'EOF'
{
  "name": "@innogram/notifications-consumer",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "echo \"Notifications implementation pending\"",
    "build": "echo \"Build not configured yet\"",
    "test": "echo \"Tests not configured yet\"",
    "lint": "echo \"Lint not configured yet\"",
    "type-check": "echo \"Type checking not configured yet\"",
    "clean": "echo \"Nothing to clean yet\""
  }
}
EOF

cat > apps/client_app/package.json <<'EOF'
{
  "name": "@innogram/client-app",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "echo \"Next.js client implementation pending\"",
    "build": "echo \"Build not configured yet\"",
    "test": "echo \"Tests not configured yet\"",
    "lint": "echo \"Lint not configured yet\"",
    "type-check": "echo \"Type checking not configured yet\"",
    "clean": "echo \"Nothing to clean yet\""
  }
}
EOF

cat > packages/shared/package.json <<'EOF'
{
  "name": "@innogram/shared",
  "version": "1.0.0",
  "private": true
}
EOF

cat > packages/types/package.json <<'EOF'
{
  "name": "@innogram/types",
  "version": "1.0.0",
  "private": true
}
EOF

echo ""
echo "Innogram project foundation created successfully!"
echo "Next steps:"
echo "  1. Run: npm install"
echo "  2. Run: cp .env.example .env"
echo "  3. Run: npm run docker:up"
echo ""
echo "Note: Application services still need implementation."