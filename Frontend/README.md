# BookCollection Frontend

This is the frontend application for the BookCollection API. The frontend is built with React, Tailwind CSS and interacts with the BookCollection backend, which can be configured to use either MySQL or MongoDB.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Backend Compatibility](#backend-compatibility)
  - [Using MySQL Backend](#using-mysql-backend)
  - [Using MongoDB Backend](#using-mongodb-backend)

## Getting Started

Follow these instructions to set up the frontend project on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14.x or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. **Clone the repository:**

    ```bash
    cd Frontend
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

### Configuration

Before running the application, you need to set up your environment variables. Create a `.env` file in the root of your project with the contents of `.env.example`.

### Running the Application

1. **Start the application:**

    ```bash
    npm start
    ```

The application will start on `http://localhost:3000` by default.

2. **Test the application:**

    ```bash
    npm test
    ```

## Backend Compatibility

The frontend is designed to work seamlessly with either the MySQL or MongoDB backend of the BookCollection API. However, depending on which backend you are using, you may need to make certain changes in the frontend code.

### Using MySQL Backend

If you are using the MySQL version of the BookCollection backend, no changes are needed in the frontend code.

### Using MongoDB Backend

If you are using the MongoDB version of the BookCollection backend, you need to make the following changes in the frontend code:

1. **Update `ViewBook.js`:**

   Inside `src/components/CRUD/ViewBook.js`, change all instances of `book.id` to `book._id`. Changes on `4 place`. Example:

   ```javascript
   // Before (MySQL)
   key={book.id}

   // After (MongoDB)
   key={book._id}
   ```

2. **Update `EditBook.js`:**

   Inside `src/components/CRUD/EditBook.js`, change all instances of `book.id` to `book._id`.  Changes on `1 place`. Example:

   ```javascript
   // Before (MySQL)
   const response = await api.updateBook(token, book.id, updatedBook);

   // After (MongoDB)
   const response = await api.updateBook(token, book._id, updatedBook);
   ```

After making these changes, the frontend will be compatible with the MongoDB backend.
