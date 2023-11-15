import { Request, Response } from 'express';
import * as Stack from '../models/stack'

export async function getAllStacks(req: Request, res: Response) {
  try {
    const stacks = await Stack.getAllStacks();
    res.status(200).send(stacks);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function addStack(req: Request, res: Response) {
  try {
    const userId = 1; //placeholder will be taken from a jwt/session after I do auth
    const {name} = req.body ;

    const newStack = await Stack.create(userId, name, 'other')

    res.status(201).send(newStack);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function getUserStacks(req: Request, res: Response) {
  try {
    const userId = Number(req.params.userId);

    const stacks = await Stack.findByUser(userId);

    res.status(201).send(stacks);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function getStacksWithBook(req: Request, res: Response) {
  try {
    const bookId = Number(req.params.bookId);

    const stacks = await Stack.getStacksContainingBook(bookId)

    res.status(200).send(stacks);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function editStack(req: Request, res: Response) {
  try {
    const stackId = Number(req.params.stackId);
    const {name} = req.body;

    const updatedStack = Stack.updateById(stackId, name);

    res.status(200).send(updatedStack);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function deleteStack(req: Request, res: Response) {
  try {
    const stackId = Number(req.params.stackId);

    const deletedStack = await Stack.deleteById(stackId);

    res.status(203).send(deletedStack);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
