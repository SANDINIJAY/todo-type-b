# TODO App — Backend

A RESTful API for managing TODO tasks, built with Node.js, Express.js, and MongoDB.

The backend supports creating, retrieving, updating, completing, and deleting tasks. It uses Mongoose for database modeling and validation.

## Tech Stack

- **Node.js** — JavaScript runtime
- **Express.js** — REST API framework
- **MongoDB** — NoSQL database
- **Mongoose** — MongoDB object modeling
- **dotenv** — Environment variable management
- **CORS** — Cross-origin request support

## Prerequisites

- Node.js and npm installed
- MongoDB Atlas account or a local MongoDB installation
- A valid MongoDB connection string

## Installation

Clone the repository and navigate to the backend:

```bash
cd backend
npm install
```

Alternatively, if using npm Workspaces, install dependencies from the repository root:

```bash
npm install
```

## Environment Configuration

Create a `.env` file inside the `backend` directory.

Use `.env.example` as a reference:

```env
PORT=5000
MONGO_URI=mongodb_connection_string_here
```

### MongoDB Atlas Setup

1. Create a MongoDB Atlas cluster.
2. Create a database user with appropriate permissions.
3. Configure Network Access to allow your development machine to connect.
4. Copy the connection string from Atlas.
5. Replace the placeholder in `MONGO_URI` with the nection string.


Use your actual Atlas-generated connection string and URL-encode any special characters in the credentials.


if npm Workspaces is configured:

```bash
npm run dev:backend
```

The backend runs at:

`http://localhost:5000`

The TODO API is available at:

`http://localhost:5000/api/todos`

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/todos` | Retrieve all TODOs |
| POST | `/api/todos` | Create a TODO |
| PUT | `/api/todos/:id` | Update a TODO |
