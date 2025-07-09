# Etapa 1: Builder do frontend
FROM node:18-alpine AS frontend_builder

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ ./

# Opcional: se quiser construir para produção, descomente essa linha
# RUN npm run build

# Etapa 2: Imagem final Python com Node.js instalado
FROM python:3.13-slim

WORKDIR /app

# Instalar dependências do sistema + Node.js e npm
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    curl \
    gnupg \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copiar requirements e instalar Python packages
COPY backend/requirements.txt ./requirements.txt
RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt

# Copiar backend e frontend para dentro da imagem final
COPY backend ./backend
COPY --from=frontend_builder /app/frontend ./frontend

# Variáveis de ambiente
ENV PYTHONUNBUFFERED=1
ENV DJANGO_SETTINGS_MODULE=backend.settings
ENV PYTHONPATH="/app/backend"

# Coletar arquivos estáticos Django
RUN python backend/manage.py collectstatic --noinput

# Expor portas do Django (8000) e React dev (3000)
EXPOSE 8000 3000

# Comando para rodar backend e frontend em paralelo
CMD ["sh", "-c", "gunicorn backend.wsgi:application --bind 0.0.0.0:8000 & cd frontend && npm run dev"]
