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

export async function addStack(req: Request, res: Response) {
  try {
    const userId = 1; //placeholder will be taken from a jwt/session after I do auth
    const stackData = { ...req.body, userId };
    console.log(stackData);
    const newStack = await Stack.create({ data: stackData });

    res.status(201).send(newStack);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function getUserStacks(req: Request, res: Response) {
  try {
    const userId = Number(req.params.userId);
    const stacks = await Stack.findMany({ where: { userId } });

    res.status(201).send(stacks);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
