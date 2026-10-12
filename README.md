# JobTrack — Job Application Tracker

JobTrack is a full-stack web application that helps job seekers manage and track their job applications in one place.

## Live Demo

- **Frontend:** https://jobtrack-frontend-nvj5.onrender.com
- **Backend API:** https://jobtrack-backend-t7zg.onrender.com/api/jobs

## Features

- Add new job applications.
- View all saved applications.
- Edit existing application details.
- Delete applications.
- Track application statuses: Applied, Interview, Selected, and Rejected.
- View dashboard statistics for application statuses.
- Search and filter applications.
- Store application data in a cloud database.

## Tech Stack

### Frontend
- React
- Vite
- JavaScript
- CSS

### Backend
- Java
- Spring Boot
- Spring Data JPA
- Maven
- REST APIs
- Docker — containerizing the Spring Boot backend

### Database and Deployment
- TiDB Cloud (MySQL-compatible database)
- Render (frontend and backend hosting)
- Git and GitHub

## Architecture

The application follows a frontend-backend architecture.

1. The React frontend provides the user interface.
2. The frontend communicates with the Spring Boot backend through REST APIs.
3. The backend processes requests and manages job application records.
4. TiDB Cloud stores the application data.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/jobs` | Retrieve all job applications |
| POST | `/api/jobs` | Create a job application |
| GET | `/api/jobs/{id}` | Retrieve an application by ID |
| PUT | `/api/jobs/{id}` | Update an application |
| DELETE | `/api/jobs/{id}` | Delete an application |


## Run Locally

### Prerequisites

- Java 21
- Maven
- Node.js and npm
- A MySQL-compatible database
- Git

### 1. Clone the repository

```bash
git clone https://github.com/thrinesh01/JobTrack.git
cd JobTrack
```

### 2. Configure the backend

Configure the following environment variables in your IDE's run configuration or shell:

```text
DB_URL=your_database_jdbc_url
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password
```

Use your own database connection details. 

### 3. Run the Spring Boot backend

Open a terminal in the `backend` directory and run:

```bash
mvn spring-boot:run
```

The backend normally runs on `http://localhost:8080`.

### 4. Run the React frontend

Open another terminal in the `frontend` directory and run:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite in your terminal, usually `http://localhost:5173`.

Ensure the frontend API configuration points to your local backend when running locally.

## Security

- Database credentials are supplied through environment variables.
- Do not commit passwords, API keys, or other secrets.
- Use environment variables for deployment-specific configuration.## Docker and Deployment

## Docker and Deployment

- Created a multi-stage `Dockerfile` using Maven and Java 21 to build the Spring Boot backend into a JAR file.
- Used a Java 21 runtime container to run the packaged backend application.
- Deployed the containerized backend to Render.
- Configured database credentials through Render environment variables for secure database connectivity.

  

## Future Improvements

- User authentication and individual application tracking.
- Application deadlines and interview reminders.
- Notes and interview preparation tracking.
- Improved analytics and reporting.
- Automated testing and CI/CD.

## Author - Thrinesh

Developed as a minor full-stack project to gain hands on experience with React, Java, Spring Boot, REST API development, database integration, and cloud deployment.
