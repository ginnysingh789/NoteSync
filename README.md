# Note-Taking App

## Overview

This is a full-stack note-taking application built using React for the frontend and Node.js with Express for the backend. It features user authentication, allowing users to securely create, save, and delete notes. If an existing user logs in, they can view their previously saved notes.

## Features

-   **User Authentication:** Secure signup and login system using JWT.
-   **Create Notes:** Users can write and save notes.
-   **Delete Notes:** Users can delete existing notes.
-   **Persistent Notes:** Users can see their saved notes after logging in.
-   **Responsive UI:** Built with React, Bootstrap, and Material UI for a smooth experience.

## Technologies Used

### **Frontend (React)**

-   React 19
-   React Router DOM 7
-   Material UI
-   Axios (for API requests)

### **Backend (Node.js & Express)**

-   Express.js
-   MongoDB (via Mongoose)
-   JWT for authentication
-   Bcrypt for password hashing
-   CORS for handling cross-origin requests
-   Zod for validation

## Installation & Setup

### **Clone the repository**

```sh
git clone <your-repo-url>
cd note-taking-app

```

### **Backend Setup**

1.  Navigate to the backend folder:
    
    ```sh
    cd Backend
    
    ```
    
2.  Install dependencies:
    
    ```sh
    npm install
    
    ```
    
3.  Create a `.env` file and add:
    
    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
    
    ```
    
4.  Start the backend server:
    
    ```sh
    npm start
    
    ```
    

### **Frontend Setup**

1.  Navigate to the frontend folder:
    
    ```sh
    cd ../Frontend
    
    ```
    
2.  Install dependencies:
    
    ```sh
    npm install
    
    ```
    
3.  Start the frontend server:
    
    ```sh
    npm start
    
    ```
    

## API Endpoints

### **Authentication**

-   `POST /api/auth/register` - Register a new user
-   `POST /api/auth/login` - Login a user

### **Notes**

-   `POST /api/notes` - Create a note
-   `GET /api/notes` - Get all user notes
-   `DELETE /api/notes/:id` - Delete a note

## Dependencies

### **Frontend Dependencies**

```json
{
  "@emotion/react": "^11.14.0",
  "@emotion/styled": "^11.14.0",
  "@fortawesome/fontawesome-svg-core": "^6.7.2",
  "@fortawesome/free-solid-svg-icons": "^6.7.2",
  "@fortawesome/react-fontawesome": "^0.2.2",
  "@mui/material": "^6.4.7",
  "@toolpad/core": "^0.12.1",
  "axios": "^1.8.2",
  "react": "^19.0.0",
  "react-bootstrap": "^2.10.9",
  "react-dom": "^19.0.0",
  "react-router-dom": "^7.3.0"
}

```

### **Backend Dependencies**

```json
{
  "bcrypt": "^5.1.1",
  "cors": "^2.8.5",
  "express": "^4.21.2",
  "jsonwebtoken": "^9.0.2",
  "mongoose": "^8.12.1",
  "zod": "^3.24.2"
}

```

## License

This project is open-source and free to use.
