FROM python:3.13-slim AS backend

WORKDIR /app

RUN apt-get update && apt-get install -y build-essential libpq-dev curl

COPY backend/requirements.txt ./requirements.txt
RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt

COPY . .

ENV PYTHONUNBUFFERED=1
ENV DJANGO_SETTINGS_MODULE=backend.settings
ENV PYTHONPATH="/app/backend"

RUN python backend/manage.py collectstatic --noinput

EXPOSE 8000

CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000"]
