FROM python:3.13-slim AS backend

WORKDIR /app

RUN apt-get update && apt-get install -y build-essential libpq-dev

COPY ./requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app/

ENV PYTHONUNBUFFERED=1