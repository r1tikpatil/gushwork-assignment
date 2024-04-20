Welcome to the Book Reviewer Application!

This project combines both frontend and backend components to create an engaging platform for reviewing books. The frontend leverages React.js for dynamic user interfaces, while the backend, powered by Node.js with Express.js and MongoDB, handles data management and authentication.

To configure it on your local machine, execute the following commands in the main directory after cloning the repository:

********* Frontend (FE) ***********

1.Navigate to the frontend directory by using below command:
cd ./client

2.Install dependencies:
npm install

3.Start the development server:
npm start

4.Access the frontend in your browser at http://localhost:3000.

Features:
User Authentication: Allows users to sign up, log in, and log out securely.
Book Reviews: Users can view and add book and also review them reviews.
Search Functionality: Enables users to search for books by title, author, or genre


********* Backend (BE) ***********

Open a new terminal

1.Navigate to the backend directory by using below command:
cd ./server

2.Install dependencies:
npm install

3.Configure environment variables:
    Set up the .env file taking reference to .env.example file.
    Configure the following environment variables:
        "MONGO_URI": MongoDB URL for database connection.
        "PORT": Port number for the server (e.g., PORT=8080).
        "JWT_SECRET": Secret key for JSON Web Token encryption.

4.Start the development server:
npm start

Hosted Server URL - https://gushwork-assignment-backend.onrender.com