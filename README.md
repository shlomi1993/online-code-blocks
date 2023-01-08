# OnlineCodeBlocks


## Introduction

This repository documents a "pet-project" of mine named "Online Code Blocks". It is a deployed full-stack web application designed to share a JavaScript code editor between multiple browser clients. The main purpose of the application is self-study of full-stack development and project deployment methods.

![image](https://user-images.githubusercontent.com/72878018/211213980-f213146e-453a-47c0-bf6e-e6a25472a08a.png)


## Launch the Application

### Links
You can use any of the following links to try the app:
1. https://main.d2piff1wyqa5iw.amplifyapp.com/
2. https://online-code-blocks-frontend.vercel.app/

### Basic Instructions

1. Start the app on two different browsers (possibly on different computers), and it should display the welcome/login page.
2. Login with different Google accounts on each browser.
3. Select the same code-block in each browser.
4. Enjoy code sharing.


## Tech-Stack

* **Node.js (with Express)** - For backend/server-side implementation.
* **React.js** - For frontend/client-side implementation.
* **AWS DynamoDB** - The selected database for storing code-blocks.
* **Google Firebase** - For user authentication.
* **Socket.IO** - For creating live-sockets between clients and the server.
* **AWS EC2** - For hosting the Node.js server.
* **AWS Amplify and Vercel.com** - For hosting the React web application (the later for backup).
* **AWS API Gateway** - For making a geteway that allows HTTPS requests.
* **react-router-dom** - A React package for in-app navigation.
* **MUI** - React component library. Used for creating buttons, icons, text-fields, etc.
* **react-simple-code-editor** - A React package for creating a code editor.
* **Prismjs** - A React for text highlighting (making text displayed as code).
* **Postman** - For testing CRUD requests.
* **Github and Github Desktop** - for version control and deployments.
* **draw.io** - For making project architecture diagram (https://app.diagrams.net/).
* **VS Code** - For coding.


## Architecture

![ocb-architecture drawio](https://user-images.githubusercontent.com/72878018/211220847-e5394fde-7da5-424a-bba3-022f592f2103.png)


## Notes

* This repository is still under development for learning purposes.
