# Online Code Blocks - Backend

Welcome to the backend of the **Online Code Blocks** system — a collaborative real-time code editing platform.
This backend application is built with **Node.js**, **Express**, **Socket.IO**, and **AWS DynamoDB** to support creation, editing, deletion, and real-time synchronization of code blocks.

---

## Features

* **Real-Time Collaboration** via WebSockets (Socket.IO)
* **CRUD Operations** for Code Blocks (Create, Read, Update, Delete)
* **DynamoDB Integration** for scalable NoSQL storage
* **CORS-enabled REST API** for frontend communication
* **Reset & Room Management** for handling collaborative sessions

---

## Tech Stack

* **Node.js** + **Express** - API and server logic
* **Socket.IO** - Real-time communication
* **AWS DynamoDB** - Persistent data store
* **UUID** - Unique code-block identifiers
* **CORS** - Secure cross-origin communication

---

## 📁 Project Structure

```
online-code-blocks-backend/
├── app.js             # Main server file (REST API + Socket.IO)
├── dynamodb.js        # AWS DynamoDB operations
├── package.json       # Node.js dependencies and scripts
```

---

## API Endpoints

### GET

| Endpoint            | Description                             |
| ------------------- | --------------------------------------- |
| `/ping`             | Returns `PONG` for sanity checks        |
| `/getblock?id=...`  | Retrieves a specific code block by ID   |
| `/getAllCodeBlocks` | Retrieves all code blocks               |
| `/reset`            | Resets all room data (Socket.IO)        |
| `/getrooms`         | Lists all active rooms and participants |

### POST

| Endpoint       | Description                       |
| -------------- | --------------------------------- |
| `/createblock` | Creates a new code block by title |

### PUT

| Endpoint                       | Description                           |
| ------------------------------ | ------------------------------------- |
| `/updateblock?id=...&name=...` | Updates the code of an existing block |

### DELETE

| Endpoint              | Description                   |
| --------------------- | ----------------------------- |
| `/deleteblock?id=...` | Deletes a specific code block |

---

## Socket.IO Events

| Event             | Triggered When...                        |
| ----------------- | ---------------------------------------- |
| `join_room`       | A client joins a collaborative code room |
| `send_message`    | A client sends updated code to others    |
| `recieve_message` | Server broadcasts new code to clients    |
| `bye`             | A client leaves a code room              |

---

## Quick Start

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Run the server**:

   ```bash
   node app.js
   ```

3. The backend will be live on:

   ```
   http://localhost:3001
   ```
