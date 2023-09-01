# Cooking Recipe API
## Introduction

Cooking Recipe API is application that provide users with an all information about culinary recipes recipes, whether it's an appetizer, main course or dessert.

Also, there is a feedback facilities to, for users. So, users can send their feedback out for recipe that they're wants to gift a feedback on it.

This API facilitates is make the interaction between 3 distinct roles, admin, maker, and viewer that focusing on designing a system that efficiently handles transfer requests ensuring security and integrity.

## Content
* Introduction
* Content
* Requirement Tech
* Getting Started
* Deployment
* Directory Structure
* Dependencies

## Requirement Tech

- **Node.js** - JavaScript runtime environment.
- **Express.js** - Web application framework for Node.js.
- **MongoDB** - NoSQL database.
- **JWT** - For authentication and authorization.
- **Bcrypt** - For password hashing.
- **Swagger** - For project api documentation

## Getting Started

### 1. Prerequisites

Firts, make sure you already have:

- Node.js and npm installed.
- MongoDB set up and running.
- A text editor or IDE (e.g., Visual Studio Code).

### 2. Clone the Repository

```bash
git clone <repository-url>
cd <repository-folder-name>
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configuration

Modify `.env` file for the environment variables to match your development environment.

### 5. Running the server

To start the server in development mode, make sure you already have intalled nodemon `npm install -g nodemon`, and make custom script on `package.json`:

```bash
npm start
```

### 6. API Documentation

We using **Swagger** for comprehensive API documentation detailing endpoints, validation, and usage instructions. Access the documentation at `/api-docs` on the running server.

Here is the deploy API link for swagger UI : https://odd-red-bikini.cyclic.app/api-docs

## Deployment

Ensure you set environment variables according to the server environment.

Here is the deploy link for API  : https://odd-red-bikini.cyclic.app

## Directory Structure

- `/constant` - Utility for error handling helpers.
- `/controllers` - Contains the logic for handling routes.
- `/database` - Contains a handling for connecting to database.
- `/docs` - Swagger API documentation related files.
- `/middleware` - Contains all the database middleware and middlewares for things like authentication and error handling.
- `/routes` - All the route definitions.
- `/sevices` - Contains the logic for handling request & respond, and contain query for database to.
- `/utils` - Configuration related `jwt` token signature.
- `.env` - Contain jwt secret key, custom port, database name and uri variables.
- `app.js` - It's a base file of API server.

## Dependencies

1. **express** - Fast, unopinionated, minimalist web framework for Node.js.
2. **mongodb** - Elegant mongodb object modeling for Node.js.
3. **jsonwebtoken** - An implementation of JSON Web Tokens.
4. **bcrypt** - A library to help you hash passwords.
5. **swagger-ui-express** - For Swagger documentation generation and UI.

The other necessary libraries here :
- `"dotenv": "^16.3.1"`
- `"body-parser": "^1.20.2"`
- `"express-openapi-validator": "^5.0.5"`
- `"express-validator": "^7.0.1"`
- `"yaml": "^2.3.1"`

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/XqBuIcOG)
