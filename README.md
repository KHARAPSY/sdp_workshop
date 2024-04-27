# SDP Workshop Dockerized Application

This repository contains the Docker setup for the SDP Workshop application. Before running the Docker containers, make sure to replace the MongoDB credentials in the `.env` file with your own credentials.

## Prerequisites

- Docker installed on your system
- MongoDB credentials

## Setup

1. Clone this repository:

    ```
    git clone https://github.com/yourusername/sdp-workshop.git
    ```

2. Navigate to the project directory:

    ```
    cd sdp-workshop
    ```

3. Replace MongoDB credentials in the `.env` file:

    ```
    MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/sdp_workshop
    ```

## Build Docker Image

To build the Docker image, run the following command:

```
docker build -t sdp_workshop .
```

## Run Docker Container

To run the Docker container, use the following command:

```
docker run -p 6969:6969 -d sdp_workshop
```

This will start the SDP Workshop application on port 6969.

## Alternative: Run with Docker Compose

Alternatively, you can use Docker Compose to manage the containers. To do this, run the following command:

```
docker-compose up -d --build
```

This command will build the Docker image and start the container in detached mode.

## Accessing the Application

Once the container is running, you can access the SDP Workshop application by visiting http://localhost:6969 in your web browser.
