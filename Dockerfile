# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Install PostgreSQL and configure
RUN apt-get update && \
    apt-get install -y --no-install-recommends postgresql postgresql-contrib && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Setup PostgreSQL database and user
RUN service postgresql start && \
    su - postgres -c "psql -c \"CREATE DATABASE mydb;\"" && \
    su - postgres -c "psql -c \"CREATE USER myuser WITH PASSWORD 'mypassword';\"" && \
    su - postgres -c "psql -c \"ALTER ROLE myuser SET client_encoding TO 'utf8';\"" && \
    su - postgres -c "psql -c \"ALTER ROLE myuser SET default_transaction_isolation TO 'read committed';\"" && \
    su - postgres -c "psql -c \"ALTER ROLE myuser SET timezone TO 'UTC';\"" && \
    su - postgres -c "psql -c \"GRANT ALL PRIVILEGES ON DATABASE mydb TO myuser;\""

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Run app.py when the container launches
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
