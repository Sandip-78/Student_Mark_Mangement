# Backend Server

A Node.js and Express-based backend server with MongoDB integration for managing API requests and database operations.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Middleware](#middleware)
- [Error Handling](#error-handling)

## Overview

This is the backend server for a full-stack web application. It handles API requests, manages database operations using MongoDB with Mongoose, and communicates with the frontend through CORS-enabled endpoints.


## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)
- MongoDB (local or MongoDB Atlas account)

## Installation

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

**Required Dependencies:**
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `cors` - Cross-origin support
- `dotenv` - Environment variables
- `bcrypt` - Password hashing
- `jsonwebtoken` - JWT authentication
- `express-validator` - Input validation

## Environment Setup

Create a `.env` file in the server directory with the following:

```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/projectdb
JWT_SECRET_KEY=your_jwt_secret_key_here
```

For MongoDB Atlas:
```env
PORT=4000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/projectdb
JWT_SECRET_KEY=your_jwt_secret_key_here
```

**Note:** Add `.env` to `.gitignore` - never commit it to version control.

## Running the Server

Start the server:

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

Expected output:
```
server is running on 4000
Database connection successfully
```

Access the server at `http://localhost:4000`

## API Endpoints

### GET /

**Description:** Health check endpoint to verify the server is running.

**URL:** `http://localhost:4000/`

**Method:** `GET`

**Status Code:** `200 OK`

**Response:**
```
hii from backend
```

**Example with cURL:**
```bash
curl http://localhost:4000/
```

---

### POST /users/register

**Description:** Register a new user (teacher, student, or admin).

**URL:** `http://localhost:4000/users/register`

**Method:** `POST`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student"
}
```

**Status Codes:**

| Code | Description |
|------|-------------|
| **201** | User registered successfully |
| **400** | Bad request (missing fields or user exists) |
| **422** | Validation error |
| **500** | Server error |

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "67890abc123def456ghi789",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

**Error Response (400 - User Already Exists):**
```json
{
  "message": "user is already exists! Please Log in to continue"
}
```

**Error Response (400 - Missing Fields):**
```json
{
  "message": "All fields are required."
}
```

**Validation Error Response (422):**
```json
{
  "errors": [
    {
      "type": "field",
      "value": "ab",
      "msg": "Name must at least 5 characters long",
      "path": "name",
      "location": "body"
    }
  ]
}
```

**Validation Rules:**
- `name` - Minimum 3 characters
- `email` - Valid email format
- `password` - Minimum 6 characters
- `role` - Must be one of: `teacher`, `student`, `admin`

**Example with cURL:**
```bash
curl -X POST http://localhost:4000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "student"
  }'
```

**Example with Fetch (JavaScript):**
```javascript
fetch('http://localhost:4000/users/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'student'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

## Project Structure

```
server/
├── src/
│   ├── app.js                    # Express application and routes
│   ├── models/
│   │   └── userModel.js          # User schema and methods
│   ├── controllers/
│   │   └── userController.js     # Registration logic
│   ├── routes/
│   │   └── userRoutes.js         # User route handlers
│   └── db/
│       └── db.js                 # MongoDB connection
├── server.js                     # Server entry point
├── package.json                  # Dependencies
├── .env                          # Environment variables
└── README.md                     # Documentation
```

**File Descriptions:**
- `server.js` - Creates HTTP server and starts listening on PORT
- `src/app.js` - Express app setup with middleware and routes
- `src/models/userModel.js` - User schema with password hashing and JWT token generation
- `src/controllers/userController.js` - User registration business logic
- `src/routes/userRoutes.js` - Route definitions with validation
- `src/db/db.js` - MongoDB connection using Mongoose

## Middleware

- **CORS** - Enables frontend requests
- **express.json()** - Parses JSON request bodies
- **express.urlencoded()** - Parses form data
- **express-validator** - Validates user input

## Authentication

User passwords are hashed using **bcrypt** before being stored.

**JWT Token:**
- Generated on user registration
- Valid for 24 hours
- Includes user ID in payload

## Error Handling

### User Registration Errors

| Error | Status | Cause |
|-------|--------|-------|
| All fields are required | 400 | Missing name, email, password, or role |
| User already exists | 400 | Email already registered |
| Validation errors | 422 | Invalid input format |

### Database Connection Errors

Check if:
- MongoDB is running
- `MONGODB_URI` is correct in `.env`
- Username/password is correct (for MongoDB Atlas)

---

**Last Updated:** January 28, 2026
