# Movie Ticket Booking App

Welcome to the Movie Ticket Booking App! This README file provides instructions on how to set up and run the application on your local machine.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) installed (version X.X.X)
- [MongoDB](https://www.mongodb.com/) installed and running (or a MongoDB Atlas account)
- [Git](https://git-scm.com/) installed (optional)

## Installation

1. Clone the repository (if you haven't already):

   ```bash
   git clone https://github.com/SajanGh/movie-ticket-api

1. cd movie-ticket-booking-app

2. npm install

3. Create a .env file in the root directory and configure your environment variables. You can use the provided .env.example as a template.

Configuration
In the .env file, configure the following environment variables:

DATABASE_URL: The URL of your MongoDB database.
JWT_SECRET: A secret key for JWT token generation.
PORT: The port on which the application will run (e.g., 3000).

Database Setup
1.Make sure your MongoDB server is running.

2. Create a new database for the Movie Ticket Booking App.

Starting the Application
To start the application, run the following command:
npm start








# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
