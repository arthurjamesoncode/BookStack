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

export async function getStacksWithBook(req: Request, res: Response) {
  try {
    const bookId = Number(req.params.bookId);
    const stacks = await Stack.findMany({
      where: { books: { some: { id: bookId } } },
    });

    res.status(200).send(stacks);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function editStack(req: Request, res: Response) {
  try {
    const stackId = Number(req.params.stackId);
    const newStackData = req.body;

    const updatedStack = await Stack.update({
      where: { id: stackId },
      data: newStackData,
    });

    res.status(200).send(updatedStack);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}