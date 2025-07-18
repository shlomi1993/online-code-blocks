# Online Code Blocks

> ⚠️ **Note:** The backend server is currently **stopped**. Please contact me if you'd like me to start the server and demonstrate the application.

## Introduction

**Online Code Blocks** is a full-stack collaborative code-sharing platform built as a personal learning project. It allows multiple users to edit and share JavaScript code blocks in real time using WebSockets.

The system is split into two main parts:

* **[Frontend](https://github.com/shlomi1993/online-code-blocks-frontend)** (React web app)
* **[Backend](https://github.com/shlomi1993/online-code-blocks-backend)** (Node.js server)

This monorepo uses Git submodules to include the frontend and backend codebases.

![UI Preview](https://user-images.githubusercontent.com/72878018/211213980-f213146e-453a-47c0-bf6e-e6a25472a08a.png)

---

## Demo

Try it here - you may need to ask me to activate the backend server:

* [https://main.d2piff1wyqa5iw.amplifyapp.com/](https://main.d2piff1wyqa5iw.amplifyapp.com/)
* [https://online-code-blocks-frontend.vercel.app/](https://online-code-blocks-frontend.vercel.app/)

---

## How to Use

1. Open the app in **two different browsers or devices**.
2. Log in using **different Google accounts**.
3. Select the **same code block** in both browsers.
4. You should see code changes in real-time, synchronized between the two views.

---

## Key Features

* Google authentication
* Real-time collaborative code editing
* Syntax highlighting
* Persistent storage via DynamoDB
* Clean, responsive UI

---

## Tech Stack

### Backend

* **Node.js** with **Express.js**
* **Socket.IO** for real-time collaboration
* **DynamoDB** for database storage
* **Firebase Admin SDK** for token verification
* **Hosted on AWS EC2**
* **REST APIs via AWS API Gateway**

### Frontend

* **React.js**
* **react-simple-code-editor** for code editing
* **PrismJS** for syntax highlighting
* **Material UI (MUI)** for design
* **react-router-dom** for routing
* **Google Firebase** for OAuth
* **Hosted on AWS Amplify & Vercel**

---

## Repository Structure

```
online-code-blocks/
│
├── backend/      # Git submodule - Node.js backend
├── frontend/     # Git submodule - React.js frontend
├── .gitmodules
├── .gitignore
└── README.md
```

---

## Architecture

![Architecture Diagram](https://user-images.githubusercontent.com/72878018/211475127-f391503e-891f-488e-95bc-d60871f22517.png)

---

## ⚙️ Local Development

```bash
# Clone with submodules
git clone --recurse-submodules https://github.com/shlomibenshushan/online-code-blocks.git

# Install dependencies
cd frontend && npm install
cd ../backend && npm install

# Run frontend (default: http://localhost:3000)
npm start

# Run backend (default: http://localhost:5000 or based on config)
npm start
```

---

## Notes

* This project is still under development and serves mainly for learning purposes.
* Feel free to explore the individual modules for more implementation details:

  * [`online-code-blocks-frontend`](https://github.com/shlom1993/online-code-blocks-frontend)
  * [`online-code-blocks-backend`](https://github.com/shlomi1993/online-code-blocks-backend)
