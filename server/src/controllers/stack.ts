import { Request, Response } from 'express';
import { Stack } from '../models';

export async function getAllStacks(req: Request, res: Response) {
  try {
    const stacks = await Stack.findMany();
    res.status(200).send(stacks);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function addStack (req : Request, res: Response) {
  try {
    const userId = 1 //placeholder will be taken from a jwt/session after I do auth 
    const stackData = {...req.body, userId};
    const newStack = await Stack.create({data: stackData})

    res.status(201).send(newStack);
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
}