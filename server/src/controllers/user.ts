import { Request, Response } from 'express';
import * as User from '../models/user'
import bcrypt from 'bcrypt';

export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await User.getAllUsers();
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function createUser(req: Request, res: Response) {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findByUsername(username);

    if (existingUser) return res.status(400).send('User Exists');

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await User.create(username, passwordHash)

    res.status(201).send(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
