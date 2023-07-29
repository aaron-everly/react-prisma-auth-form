
# React + TailwindCSS register/login form with Postgres, Prisma, and Express.
A simple React login/register form that allows you to create users and store them in a Postgres database.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Dependencies](#dependencies)
- [Getting Started](#getting-started)
- [Setup](#setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [To-dos](#to-dos)
- [License](#license)

## Introduction

This project features a React-based register/login form styled with TailwindCSS. The backend uses Prisma to interact with the Postgres database and is served with Express. The application utilizes token-based authentication using JSON Web Tokens (JWT), which are stored in the browser's localStorage to provide persistent user information across components. For now, this project cannot be built and is solely to be used in development. 

## Features

- User registration with encrypted password storage in the database.
- User login with JWT-based authentication and token storage in localStorage.
- Protected routes based on presence of token (`http://localhost:5713/home` is currently the only protected route). 
- React components for a user-friendly register/login interface.
- Backend API routes using Express for handling user authentication.
- Integration with PostgreSQL for persistent user data storage.
- Prisma ORM for efficient database management and queries.

## Dependencies

Before running the project, ensure you have the following dependencies installed:

- npm version 9.5.0 or later
- npx version 9.5.0 or later
- Postgres 15 or later

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository to your local machine:

```bash
git clone https://github.com/aaron-everly/react-prisma-auth-form.git
```

2. Navigate to the project directory:

```bash
cd react-prisma-auth-form
```

## Setup and usage
1. Ensure that you have postgres running on your local machine.

2. Add your own `DATABASE_URL`, `SECRET_KEY`, and `PORT` to the `.env` file in `/backend` directory

```javascript
// .env

// Replace this with your database connection string
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/DbName?schema=public"

// Replace this with a secret key for your tokens
SECRET_KEY="secret-key-for-app"

// Replace this with your desired port 
PORT="http://localhost:3000"
```

2. Install project dependencies for all repos and setup database and ORM (see `package.json`  scripts in the root directory to see all that is being done):

```bash
npm setup
```


3. Configure your PostgreSQL database settings in the `.env` file:

```plaintext
DB_URL=your_postgres_database_url
```

3. Run the application

```bash
npm run dev
```

4. Open your web browser and navigate to `http://localhost:5713/` to access the application 


## Contributing

Contributions to this project are welcome and encouraged. To contribute, please follow these steps:

1. Fork the repository to your GitHub account.

2. Create a new branch for your feature or bug fix:

```bash
git checkout -b description
```

3. Make your modifications and commit the changes:

```bash
git commit -m "Add your commit message here"
```

4. Push your branch to your forked repository:

```bash
git push origin description
```

5. Open a pull request on the original repository, explaining your changes and improvements.

## To-dos

A lot could be done with what is here. A few thing I would like to add include:

- Tests (add jest or similar)
- Authenticating the token on the sever and rendering some data accordingly. 
- Improve handling around the session by having functionality that detects when the token expires and prompts a new login.
- Improve `ProtectedRouter` logic
- Some navigation elements on the home page
- TailwindCSS transitions and other UI flair :)


## License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute this code for your purposes. Attribution is always appreciated.

Thank you for using and contributing to this project! If you have any questions or issues, please open an issue on GitHub. Happy coding!
