Welcome to the Book Reviewer Application!

This project combines both frontend and backend components to create an engaging platform for reviewing books. The frontend leverages React.js for dynamic user interfaces, while the backend, powered by Node.js with Express.js and MongoDB, handles data management and authentication.

To configure it on your local machine, follow the below steps:

Step 1 - Goto your desired file location and open terminal.

Step 2 - Clone the project here by using the following command
git clone https://github.com/r1tikpatil/gushwork-assignment

Step 3 - Now change directory from the terminal using the following command
cd gushwork-assignment/

Step 4 - Open this folder inside a code editor of your choice by using the following command (you can use vs code for it’s extensive features) and make sure to be inside the gushwork-assignment folder

code .

Now follow the below steps to run the project:

********* Frontend (FE) ***********

Open a terminal

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