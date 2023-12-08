import express from 'express';
import router from './router';
import cors from 'cors'
import * as User from './models/user'
import bcrypt from 'bcrypt';

const app = express();

app.use(cors())
app.use(express.json())

app.use(async (_, __, next) => {
  if (!(await User.getAllUsers()).length) {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash('password', salt);

    await User.create('user', passwordHash);
    next()
  }
});

app.use(router)


app.listen(3000, () => {
  console.log('Server Listening on port 3000 👂');
});
