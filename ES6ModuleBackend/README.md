# BookCollection API using ES6 Module

BookCollection is a Node.js backend application built using ES6 Module that provides an API for managing a collection of books. It uses MySQL as the database and includes authentication features using JSON Web Tokens (JWT).

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
- [MySQL](https://www.mysql.com/) (Ensure MySQL server is running)

### Installation

1. **Clone the repository:**

    ```bash
    cd ES6ModuleBackend
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

### Configuration

Before running the application, you need to set up your environment variables. Create a `.env` file in the root of your project with the contents of `.env.example`:


### Running the Application

Before starting the application, ensure that the `database` exists in your MySQL server.

1. **Create the database:**

    Log in to your MySQL server and create the `bookcollection` database:

    ```sql
    CREATE DATABASE bookcollection;
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
