# BookCollection API using ES6 Module (MongoDB Version)

BookCollection is a Node.js backend application built using ES6 Module that provides an API for managing a collection of books. This version uses MongoDB as the database and includes authentication features using JSON Web Tokens (JWT).

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14.x or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Ensure MongoDB server is running)

### Installation

1. **Clone the repository:**

    ```bash
    cd MongoBackend
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

### Configuration

Before running the application, you need to set up your environment variables. Create a `.env` file in the root of your project with the contents of `.env.example`:


### Running the Application

1. **Ensure MongoDB is running:**

    If MongoDB is not running as a service, you can start it manually:

    ```bash
    mongod
    ```

2. **Start the application:**

    - In production mode:

        ```bash
        npm start
        ```

    - In development mode (with `nodemon` for auto-restarting):

        ```bash
        npm run dev
        ```

The server will start on `http://localhost:5000` by default.

3. **Test the application:**

    - Run the test:

        ```bash
        npm test
        ```
    - Visualize the Test Coverage Report:
    
         After running the `npm test`, locate the coverage report in your project `./coverage` directory

        ```bash
        open ./coverage/index.html
        ```
        or manually navigate to the file location and open it with your preferred web browser.


### API Endpoints

The following are some of the key endpoints provided by the BookCollection API:

- **`POST /api/books`**: Add a new book.
- **`GET /api/books`**: Get a list of all books.
- **`GET /api/books/:id`**: Get details of a single book by its ID.
- **`PUT /api/books/:id`**: Update a book by its ID.
- **`DELETE /api/books/:id`**: Delete a book by its ID.
- **`POST /api/auth/register`**: Register a new user.
- **`POST /api/auth/login`**: Authenticate a user and return a JWT token.

For a complete list of endpoints and their usage, inspect the routes in the source code.
