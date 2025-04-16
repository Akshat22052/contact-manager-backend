# Contact Manager Backend 📞

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

A robust backend application built with Node.js, Express, and MongoDB to manage user contacts efficiently and securely. This application provides RESTful APIs for user registration, login, and CRUD (Create, Read, Update, Delete) operations on contacts.

## ✨ Features

* **User Authentication:** Secure user registration and login using JWT (JSON Web Tokens).
* **Password Hashing:** Passwords are securely hashed using `bcrypt` before storing.
* **Contact Management:** Full CRUD functionality for managing contacts associated with authenticated users.
* **Private Routes:** Endpoints for contact management are protected and accessible only to logged-in users.
* **Error Handling:** Centralized error handling middleware.
* **Environment Variables:** Configuration managed through environment variables.

## 🛠️ Tech Stack

* **Backend Framework:** [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/)
* **Database:** [MongoDB](https://www.mongodb.com/) (with [Mongoose](https://mongoosejs.com/) ODM)
* **Authentication:** [JSON Web Tokens (JWT)](https://jwt.io/), [bcrypt](https://www.npmjs.com/package/bcrypt)
* **Environment Variables:** [dotenv](https://www.npmjs.com/package/dotenv)
* **Middleware:** Express middleware for validation, authentication, and error handling.

## 📂 Directory Structure


```plaintext
contact-manager-backend/
├── config/                 # Configuration files (e.g., database connection)
│   └── dbConnection.js
├── controllers/            # Request handling logic
│   ├── contactController.js
│   └── userController.js
├── middleware/             # Custom middleware (e.g., authentication, error handling)
│   ├── errorHandler.js
│   └── validateTokenHandler.js
├── models/                 # Mongoose schemas/models
│   ├── contactModel.js
│   └── userModel.js
├── routes/                 # API route definitions
│   ├── contactRoutes.js
│   └── userRoutes.js
├── .env                    # Environment variables (ignored by Git)
├── .gitignore              # Specifies intentionally untracked files that Git should ignore
├── constants.js            # Application constants (e.g., status codes)
├── package.json            # Project metadata and dependencies
├── package-lock.json       # Records exact versions of dependencies
├── server.js               # Main application entry point
└── README.md               # Project documentation (You are here!)
```




## 📋 Prerequisites

Before you begin, ensure you have the following installed:

* [Node.js](https://nodejs.org/en/download/) (LTS version recommended)
* [npm](https://www.npmjs.com/get-npm) (usually comes with Node.js) or [yarn](https://yarnpkg.com/getting-started/install)
* [MongoDB](https://www.mongodb.com/try/download/community) installed and running, or a MongoDB Atlas connection string.

## 🚀 Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Akshat22052/contact-manager-backend.git](https://github.com/Akshat22052/contact-manager-backend.git)
    cd contact-manager-backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root directory of the project and add the following variables. Replace the placeholder values with your actual configuration.

    ```env
    # Port for the server to run on
    PORT=5001

    # MongoDB Connection String
    # Example for local MongoDB: MONGODB_URI=mongodb://localhost:27017/contact_manager
    # Example for MongoDB Atlas: MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/contact_manager?retryWrites=true&w=majority
    MONGODB_URI=your_mongodb_connection_string

    # Secret key for JWT signing and verification
    JWT_SECRET=your_strong_jwt_secret_key
    ```
    **Important:** Keep your `JWT_SECRET` secure and do not commit the `.env` file to version control (it's included in `.gitignore` by default).

## ▶️ Running the Application

1.  **Start the server:**
    ```bash
    npm start
    # or (if you have nodemon installed for development)
    npm run dev
    ```

2.  The server should now be running on the port specified in your `.env` file (default is `5001`). You'll see a confirmation message in the console:
    `Server running on port <PORT>`

## 🔌 API Endpoints

The API base URL is `http://localhost:<PORT>/api`.

*(Note: Replace `<PORT>` with the actual port number, e.g., 5001)*

### User Authentication (`/api/users`)

| Method | Endpoint        | Description             | Request Body                  | Response (Success 2xx)        | Response (Error 4xx/5xx) | Requires Auth |
| :----- | :-------------- | :---------------------- | :---------------------------- | :---------------------------- | :----------------------- | :------------ |
| POST   | `/register`     | Register a new user     | `{ "username", "email", "password" }` | `{ "_id", "email" }` (201) | 400 (Validation), 500    | No            |
| POST   | `/login`        | Login an existing user  | `{ "email", "password" }`     | `{ "accessToken" }` (200)   | 400, 401 (Unauthorized)  | No            |
| GET    | `/current`      | Get current user info   | -                             | `{ "username", "email" }` (200) | 401 (Unauthorized), 404  | Yes (`Bearer Token`) |

### Contact Management (`/api/contacts`)

*These endpoints require a valid `Bearer Token` in the `Authorization` header.*

| Method | Endpoint        | Description             | Request Body                  | Response (Success 2xx)        | Response (Error 4xx/5xx) | Requires Auth |
| :----- | :-------------- | :---------------------- | :---------------------------- | :---------------------------- | :----------------------- | :------------ |
| GET    | `/`             | Get all contacts for user | -                             | `[ {contact1}, {contact2} ]` (200) | 401, 500                 | Yes           |
| POST   | `/`             | Create a new contact    | `{ "name", "email", "phone" }` | `{createdContact}` (201)    | 400 (Validation), 401    | Yes           |
| GET    | `/:id`          | Get a specific contact  | -                             | `{contactDetails}` (200)    | 401, 404 (Not Found)     | Yes           |
| PUT    | `/:id`          | Update a contact        | `{ "name", "email", "phone" }` | `{updatedContact}` (200)    | 400, 401, 404            | Yes           |
| DELETE | `/:id`          | Delete a contact        | -                             | `{ "message": "Contact removed" }` (200) | 401, 404                 | Yes           |

### Authentication Header Format

For protected routes, include the JWT token in the `Authorization` header:

Authorization: Bearer <your_jwt_token>
## 🛡️ Authentication Flow

1.  **Register:** A user signs up via `POST /api/users/register`. Their password is hashed using `bcrypt`.
2.  **Login:** The user logs in via `POST /api/users/login` with their email and password.
3.  **Token Generation:** If credentials are valid, the server generates a JWT containing user information (like user ID) and signs it using the `JWT_SECRET`.
4.  **Token Sent:** The server sends the `accessToken` back to the client.
5.  **Protected Requests:** The client includes this `accessToken` in the `Authorization: Bearer <token>` header for subsequent requests to protected routes (e.g., contact management).
6.  **Token Validation:** A middleware (`validateTokenHandler.js`) intercepts requests to protected routes, verifies the JWT signature, and extracts user information. If the token is valid, the request proceeds; otherwise, a `401 Unauthorized` error is returned.

## ⚠️ Error Handling

* A centralized error handling middleware (`middleware/errorHandler.js`) catches errors thrown throughout the application.
* It standardizes error responses based on the status code, providing a consistent JSON format: `{ title: "Error Title", message: "Error Message", stackTrace: "..." }`.
* Common status codes used:
    * `400 Bad Request`: Validation errors (e.g., missing fields).
    * `401 Unauthorized`: Invalid or missing authentication token.
    * `403 Forbidden`: User is authenticated but doesn't have permission.
    * `404 Not Found`: Resource not found.
    * `500 Internal Server Error`: Generic server errors.

## 🤝 Contributing

Contributions are welcome! If you find a bug or want to suggest an improvement, please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name` or `bugfix/issue-description`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

Please ensure your code follows the existing style and includes relevant tests if applicable.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details (if one exists, otherwise specify).

---

