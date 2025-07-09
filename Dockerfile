FROM node:18-alpine AS frontend_builder

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ ./

FROM python:3.13-slim

WORKDIR /app

RUN apt-get update && apt-get install -y build-essential libpq-dev curl

COPY backend/requirements.txt ./requirements.txt
RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt

COPY backend ./backend
COPY --from=frontend_builder /app/frontend ./frontend

ENV PYTHONUNBUFFERED=1
ENV DJANGO_SETTINGS_MODULE=backend.settings
ENV PYTHONPATH="/app/backend"

RUN python backend/manage.py collectstatic --noinput

EXPOSE 8000 3000

CMD ["sh", "-c", "gunicorn backend.wsgi:application --bind 0.0.0.0:8000 & cd frontend && npm run dev"]
