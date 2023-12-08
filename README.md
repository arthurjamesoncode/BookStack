# BookStack

## Summary:

Bookstack is a application that users can use to track their reading habits. Users can create stacks (collections of books) and add books from their libraries filling in the relevant details. They can also search for books from the open library database to easily add them to their library. As well as track their progress with certain books. It is currently a work in progress.

![main page](/readme-images/main.png)

![search](/readme-images/search.png)

![details](/readme-images/details.png)

## Getting Started 

To install this project first clone the repo onto your local machine.

After this open the repo in your terminal and execute these commands:

    cd client
    npm i
    cd ../server 
    npm i

Then you can run the client with 

    npm run dev

and the server with
    
    npm start

In order to for the app to work you will need a postgres database running on your local machine and to place the url to this in a .env file inside the server folder. If you install the app before I have to chance to add authentication and login a user will be created for you using the username "test" and the password "password"

## Tech Stack

This projects frontend tech stack includes:
 
 - React (With helper libraries)

This projects backend tech stack includes:

 - Postgres
 - Prisma
 - Express