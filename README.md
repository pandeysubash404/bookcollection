# BookCollection Project

BookCollection is a full-stack application designed to manage a collection of books. It includes a backend API and a frontend application, both of which can be configured to work with either MySQL or MongoDB databases.

This repository is designed for `testing backend functionality` of the BookCollection application using `Jest`.

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/pandeysubash404/bookcollection.git
    cd bookcollection
    ```

## Getting Started

To get started with the BookCollection project, follow the setup instructions in the relevant directories:

- **[Backend Setup](CommonJsBackend/README.md):** Instructions for setting up the backend with either MySQL or MongoDB.
- **[Frontend Setup](Frontend/README.md):** Instructions for setting up the frontend application, including adjustments needed for different backend configurations.

## Backend Compatibility

The backend supports two databases:
- **MySQL**: See the `CommonJsBackend/README.md` file for setup instructions specific to MySQL.
- **MongoDB**: See the `MongoBackend/README.md` file for setup instructions specific to MongoDB.

## Frontend Compatibility

The frontend is compatible with both backend setups. Depending on the backend you use, you may need to make specific changes:
- **Using MySQL Backend**: No additional changes required. Follow the `Frontend/README.md` for setup instructions.
- **Using MongoDB Backend**: Make the necessary code changes as outlined in the `Frontend/README.md`.

## Running the Application

Once you have set up both the backend and frontend, you can run the application by following the respective instructions in the backend and frontend `README.md` files.
