FROM node:18-slim AS frontend

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

FROM python:3.13-slim AS backend

WORKDIR /app

RUN apt-get update && apt-get install -y build-essential libpq-dev curl

COPY backend/requirements.txt ./requirements.txt
RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt

COPY backend ./backend
COPY backend/manage.py ./

ENV PYTHONUNBUFFERED=1
ENV DJANGO_SETTINGS_MODULE=backend.settings

COPY --from=frontend /app/frontend/dist ./frontend_dist

RUN python manage.py collectstatic --noinput

EXPOSE 8000

CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000"]
