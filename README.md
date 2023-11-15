# BookStack

A digitized reading journal.

## Why did you pick this one?

I'm just gonna tell you, you fucked up. This is a real annoying one to pick. My code is messy as fuck and picking through this if i wasn't already the one who wrote it would make me cry.

## For some reason you did tho

So I'm gonna say some of the things that I wanted to do to this app, since there was a lot, but first what do you need to do

- npm i should be all you need to install dependencies (run npm i from client and server)
- You will also need a postgres database running on your system. 
- You will need to include a .env file in your server folder with a line in this format
DATABASE_URL="postgresql://username:password@localhost:5432/bookstack?schema=public" To act as link to your database
- You will also need to run npx prisma migrate dev from the server folder in order to initialise the database (called bookstack in the db_url but you can change that if you want) and create the prisma client.

- Then after doing all of that you should be able to run the server using npm start from the server folder and the client by using npm run dev in the client folder.

### Quirks

- The way the app is meant to work is there are primary stacks (To read, 'tbr'; Currently Reading, 'current'; and Finished, 'finsihed') Each book will always be in one of these stacks, and can only be in one of these stacks, but can also be in the other stacks that users create. 

- E.g If a book is in currently reading it can't be in finished but can be in a different user-created stack.

## What could you do?

Refactoring

- CSS. I am not good at it I very much want to go back over everything I've done and make it cleaner more modular (following BEM).
- State. I did not use any kind of state management or context when I was building this app. There isn't technically a lot of prop drilling but I do pass state around using useNavigate and useLocation, a lot of this could probably be cleaned up if I was using context or redux but I was focused on sprinting to get features out sooo...
- Forms. The forms I am using are terrible. I made them, they are annnoying to use and I had to keep editing them to account for different inputs. I really wanted to refactor to use a library like react-hook-form but I didn't beacause I had spent so much time on them and honestly the idea of not using them just hurt.
- Theres also definitely more that could be made better if you wanted to but those are the 3 main things that I would change

Features and Fixes

- Notes can currently only be added you may want to add routes for deleting and editing them and then implement this on the front end.
- Authorization and login logout system for users would be a really good thing to add.
- You could improve the search UI to show more information about the books and allow users to view different editions (looking at the edition_key[] that the api returns)
- There are definitely bugs aswell that you could find and fix but that's your problem. Why did you pick this?

### Overall you picked a bad project. I did a bad job but now it's your problem lmao.
