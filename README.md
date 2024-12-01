# CRUD Project

A simple and efficient backend application built using **Node.js**, **Express**, and **MongoDB** for managing CRUD operations, user authentication, and task management.

## Features

- **User Authentication**: Secure user registration and login with hashed passwords.
- **Task Management**: Create, read, update, and delete tasks with advanced filtering, pagination, and sorting.
- **Rate Limiting**: Protect the API from abuse using rate limiting.
- **Email Integration**: Send emails using Nodemailer for notifications.
- **Environment Configurations**: Securely manage secrets and configurations using `.env`.

## Prerequisites

Before running this application, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v16 or above recommended)
- [MongoDB](https://www.mongodb.com/)

## Installation##

1. Clone the repository:
   ```bash
git clone https://github.com/uUtkarsh3vedi/Advanced-Crud-.git
cd crud-project

##Install dependencies:
npm install

##Create a .env
envURL=mongodb://localhost:27017
JWT_SECRET=<your-jwt-secret>
EMAIL_USER=<your-email-address>
EMAIL_PASS=<your-email-password>

##Start the development server:
.npm start

##Dependencies
bcrypt: For hashing passwords.
dotenv: For environment variable management.
express: Web framework for Node.js.
express-rate-limit: Middleware to limit repeated requests to public APIs.
jsonwebtoken: For creating and verifying JSON Web Tokens.
mongoose: MongoDB object modeling tool.
nodemailer: For sending emails.
nodemon: Automatically restarts the server on code changes.
validator: For data validation.

