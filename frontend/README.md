# TODO App — Frontend

A responsive TODO management application built with React and Vite. The application allows users to create, view, update, complete, and delete tasks through a REST API.

## Tech Stack

- React — User interface and state management
- Vite — Frontend development and build tool
- Tailwind CSS v4 — Styling and responsive layout
- Axios — HTTP requests
- Lucide React — Interface icons

## Features

- Create tasks with a required title and optional description
- View tasks retrieved from MongoDB through the backend API
- Edit existing tasks
- Mark tasks as completed or pending
- Delete tasks with confirmation
- View total, pending, and completed task counts
- Responsive dark-themed dashboard
- Loading, validation, and error messages

## Prerequisites

- Node.js and npm
- A running instance of the TODO backend

## Installation

From the project root:

```bash
npm install
```

Alternatively, to install the frontend independently:

```bash
cd frontend
npm install
```

## Environment Configuration

Create a `.env` file inside the `frontend` directory using `.env.example` as a reference.

```env
VITE_API_URL=http://localhost:5000/api
```

The URL should point to the running backend API.

## Running the Application

From the frontend directory:

```bash
npm run dev
```

Or, if using the configured npm workspace scripts, from the project root:

```bash
npm run dev:frontend
```

Open the local URL displayed by Vite, normally:

http://localhost:5173

## Application Structure

```text
src/
├── components/
│   ├── TodoForm.jsx
│   └── TodoItem.jsx
├── services/
│   └── api.js
├── App.jsx
└── index.css
```


## Assumptions and Limitations

- The application is designed for a single shared task list and does not implement user authentication.
- The backend must be running for tasks to be loaded or modified.
- Task statistics are calculated from the tasks loaded into React state.
- Data persistence is handled by the backend and MongoDB.
- The application is configured for local development by default.