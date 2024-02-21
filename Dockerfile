FROM node:20-alpine as build-node
FROM python:3.12-bullseye as build-python
RUN useradd wagtail
EXPOSE 8000
ENV PYTHONUNBUFFERED=1 \
    PORT=8000
RUN curl -fsSL https://deb.nodesource.com/setup_21.x | bash - 
RUN apt-get update --yes --quiet && apt-get install --yes --quiet --no-install-recommends \
    build-essential \
    libpq-dev \
    libjpeg62-turbo-dev \
    zlib1g-dev \
    libwebp-dev \
    nodejs \
 && rm -rf /var/lib/apt/lists/*
RUN python -m pip install "gunicorn==20.0.4"
RUN pip install -U pip
COPY requirements.txt /
RUN pip install -r /requirements.txt
WORKDIR /app
RUN chown wagtail:wagtail /app
COPY --chown=wagtail:wagtail . .
RUN make django-npm-install django-npm-build
RUN python manage.py collectstatic --noinput --clear
CMD set -xe; python manage.py migrate --noinput; gunicorn backend.wsgi:application
