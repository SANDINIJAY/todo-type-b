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
MONGO_URI=your_mongodb_connection_string_here
```

### MongoDB Atlas Setup

1. Create a MongoDB Atlas cluster.
2. Create a database user with appropriate permissions.
3. Configure Network Access to allow your development machine to connect.
4. Copy the connection string from Atlas.
5. Replace the placeholder in `MONGO_URI` with your connection string.

Example format:

```text
mongodb+srv://<username>:<password>@<cluster-host>/<database>?retryWrites=true&w=majority
```

Use your actual Atlas-generated connection string and URL-encode any special characters in the credentials.

Alternatively, for a local MongoDB instance:

```env
MONGO_URI=mongodb://127.0.0.1:27017/todo_app
```

## Running the Backend

From the backend directory:

```bash
npm run dev
```

Or from the repository root, if npm Workspaces is configured:

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
| PATCH | `/api/todos/:id/done` | Toggle completion status |
| DELETE | `/api/todos/:id` | Delete a TODO |

### Create a TODO

**POST** `/api/todos`

Request body:

```json
{
  "title": "Complete assignment",
  "description": "Finish the frontend and backend"
}
```

The `done` field defaults to `false`.

### Update a TODO

**PUT** `/api/todos/:id`

Example request body:

```json
{
  "title": "Update README",
  "description": "Add setup instructions"
}
```

### Toggle Completion

**PATCH** `/api/todos/:id/done`

Toggles a TODO between completed and pending.

### Delete a TODO

**DELETE** `/api/todos/:id`

Deletes the TODO identified by its MongoDB document ID.

## Data Model

The TODO model contains the following fields:

| Field | Type | Description |
|---|---|---|
| `_id` | ObjectId | MongoDB-generated identifier |
| `title` | String | Required task title |
| `description` | String | Optional task description |
| `done` | Boolean | Completion status; defaults to false |
| `createdAt` | Date | Automatically generated creation timestamp |
| `updatedAt` | Date | Automatically generated update timestamp |

## Validation and Error Handling

The application uses Mongoose schema validation for required fields and data types.

The API also checks MongoDB document IDs before performing ID-based operations.

Database and request errors are handled by the backend and returned as HTTP responses.

## Project Structure

```text
backend/
├── models/
│   └── Todo.js
├── routes/
│   └── todoRoutes.js
├── server.js
├── .env.example
├── package.json
└── README.md
```

- `server.js` configures Express, middleware, database connectivity, and routes.
- `models/Todo.js` defines the MongoDB TODO schema.
- `routes/todoRoutes.js` contains the CRUD API endpoints.


## Assumptions and Limitations

- The application uses a single shared TODO collection.
- Authentication and user-specific task ownership are not implemented.
- MongoDB must be accessible for the API to operate.
- The backend is intended for local development and assessment demonstration.
- Automated tests and production deployment configuration are outside the current implementation scope.