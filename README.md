# Node.js Todo Web API

## Overview

This Node.js Web API provides CRUD operations for a Todo list and includes authentication features. The application uses an in-memory database and consists of two controllers: TodoController for Todo operations and AuthController for user registration and login.

## Getting Started

1. *Install Node.js:* Ensure Node.js is installed on your machine.
2. *Clone the Repository:* git clone https://github.com/your-username/your-repo.git
3. *Install Dependencies:* Run npm install
4. *Run the Server:* Execute node main.js

## API Endpoints

### TodoController

- GET /todo/get/{id}: Get a single todo item
- GET /todo/getall: Get all todo items
- PUT /todo/put/{id}: Update a todo item
- POST /todo/create: Create a new todo item
- DELETE /todo/delete/{id}: Delete a todo item

### AuthController

- POST /auth/register: Register a new user
- POST /auth/login: Login and receive a JWT token

## Authentication & Authorization

- TodoController is protected; only authenticated users have access.
- Two roles exist: User (limited access) and Admin (full access).

## JWT Token

- Upon login, a JWT token is returned.
- Encoded fields: First Name, Last Name, Email, IsActive, Roles.
