# Pintrendy

Pintrendy is a Python and React web app that replicates the essential features of Pinterest.It was built using Node.js, SQLAlchemy, Flask, Sequelize, Sqlite3, React, Redux, HTML5, CSS, Git, Python, and JavaScript.

## Features
1. Create Pin
2. Get Pin
3. Edit Pin
4. Delete Pin
5. Create Comment
6. Get Comment
7. Edit Comment
8. Delte Comment
9. Search Pin
10. Sign Up
11. Log In/Log Out


## Getting started
1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.


