# My Contacts Backend API

This is a **backend API** built using **Node.js**, **Express.js**, and **MongoDB**. It provides a RESTful API for managing user accounts and their associated contacts. The project includes features such as user authentication (using JWT), CRUD operations for contacts, and error handling.

---

## **Table of Contents**
1. [Features](#features)
2. [Folder Structure](#folder-structure)
3. [Installation](#installation)
4. [Environment Variables](#environment-variables)
5. [Running the Project](#running-the-project)
6. [API Endpoints](#api-endpoints)
7. [Middleware](#middleware)
8. [Error Handling](#error-handling)
9. [Technologies Used](#technologies-used)

---

## **Features**
- **User Authentication**:
  - Register new users.
  - Login users and generate JWT tokens.
  - Access current user details using the token.
- **Contact Management**:
  - Create, read, update, and delete contacts.
  - Each contact is associated with a specific user.
- **Error Handling**:
  - Centralized error handling with custom error messages and status codes.
- **Secure API**:
  - Protected routes using JWT-based authentication.

---

## **Folder Structure**
The project is organized into the following folders:
