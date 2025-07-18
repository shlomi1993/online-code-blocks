# Online Code Blocks - Frontend

This repository contains the **React frontend application** for *Online Code Blocks*, a web-based platform enabling real-time, collaborative JavaScript code editing. The app integrates with a Node.js backend and AWS DynamoDB to allow users to create, edit, and share code blocks interactively with others.

The frontend is built using **React**, **Firebase Authentication**, **Socket.IO**, **Material-UI**, and **PrismJS**, with support for real-time synchronization and intuitive user experience.

## Features

* Google Sign-in using **Firebase Authentication**
* Real-time collaboration with **Socket.IO**
* Collaborative code editing powered by **React Simple Code Editor**
* Syntax highlighting with **PrismJS**
* Persistent storage of code blocks using a backend DynamoDB API
* Dynamic lobby to manage, create, and delete code blocks
* Error handling and fallback for non-existent routes

## Tech Stack

* **React** - with React Router
* **Socket.IO Client**
* **Firebase Authentication**
* **Material-UI** - for UI components
* **PrismJS** - for syntax highlighting
* **React Simple Code Editor** - as the core code input interface

## Project Structure

```
online-code-blocks-frontend/
├── public/
│   ├── index.html
│   └── favicon.ico, manifest.json, robots.txt
├── src/
│   ├── App.js                   # Main React app with routing
│   ├── App.css                 # Global styles
│   ├── firebase.js             # Firebase configuration
│   ├── config.json             # Externalized URIs and keys
│   ├── assets/                 # Images and animations
│   └── pages/
│       ├── Login.jsx           # Google authentication and app intro
│       ├── Lobby.jsx           # Code block lobby with create/join/delete features
│       ├── CodeBlock.jsx       # Real-time collaborative code editor
│       └── Error.jsx           # 404 fallback screen
```

## Pages Overview

### `Login.jsx`

* First page shown to the user.
* Provides sign-in via Google (Firebase popup).
* Introduces the purpose and usage of the app.

### `Lobby.jsx`

* Accessible after login.
* Fetches list of existing code blocks.
* Allows users to create new blocks or delete existing ones.
* Each block is represented as a card with title and controls.

### `CodeBlock.jsx`

* Enables real-time, collaborative editing of JavaScript code.
* Shows who the user is connected as.
* Auto-syncs changes to all participants via WebSockets.
* Includes a "Save" button to persist changes via a PUT request.
* Bonus: Shows a visual cue if a predefined correct answer is matched.

### `Error.jsx`

* Displays an error page for unknown routes.
* Basic "404: Page not found" message.

## Configuration

Update `src/config.json` to include Firebase credentials and backend gateway:

```json
{
  "firebase": {
    "apiKey": "YOUR_FIREBASE_API_KEY",
    "authDomain": "your-project.firebaseapp.com",
    "projectId": "your-project-id",
    "storageBucket": "your-project.appspot.com",
    "messagingSenderId": "SENDER_ID",
    "appId": "APP_ID"
  },
  "gateway": "http://localhost:3001/"
}
```

Make sure the backend server is accessible at the URI provided in `gateway`.

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm start
```

This will open the app in your browser at:

```
http://localhost:3000
```

### 3. Ensure backend is running

Make sure the [online-code-blocks-backend](https://github.com/your-org/online-code-blocks-backend) is up and reachable at the configured `gateway` address.

## Deployment

To build the frontend for production:

```bash
npm run build
```

Then deploy the contents of the `build/` directory to your preferred static site hosting (e.g., Netlify, Vercel, Firebase Hosting, S3, etc).
