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

## Environment Setup

Create a `.env` file in the server directory with the following:

```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/projectdb
```

For MongoDB Atlas:
```env
PORT=4000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/projectdb
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
```json
hii from backend
```

**Example with cURL:**
```bash
curl http://localhost:4000/
```

**Example with Fetch (JavaScript):**
```javascript
fetch('http://localhost:4000/')
  .then(response => response.text())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

## Project Structure

```
server/
├── src/
│   ├── app.js              # Express application and routes
│   └── db/
│       └── db.js           # MongoDB connection
├── server.js               # Server entry point
├── package.json            # Dependencies
├── .env                    # Environment variables (not in git)
└── README.md               # Documentation
```

**File Descriptions:**
- `server.js` - Creates HTTP server and starts listening on PORT
- `src/app.js` - Express app setup with middleware and routes
- `src/db/db.js` - MongoDB connection using Mongoose

## Middleware

The server uses the following middleware:

- **CORS** - Enables requests from frontend
- **express.json()** - Parses JSON request bodies
- **express.urlencoded()** - Parses form data

## Error Handling

Database connection errors are logged to console:

```
Database connection Error: [error details]
```

If the server cannot connect to MongoDB, check:
- MongoDB is running
- `MONGODB_URI` is correct in `.env`
- Username/password is correct (for MongoDB Atlas)

---

**Last Updated:** January 27, 2026
