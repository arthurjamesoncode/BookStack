import prisma from './index';

export async function getAllStacks() {
  const stacks = await prisma.stack.findMany();
}

export async function create(userId: number, name: string, type: string) {
  const newStack = await prisma.stack.create({
    data: { userId, name, type },
  });

  return newStack;
}

export async function findByUser(userId: number) {
  const stacks = await prisma.stack.findMany({ where: { userId } });

  return stacks;
}

export async function findPrimarystack(userId: number, type: 'tbr' | 'current' | 'finished') {
  const stacks = await prisma.stack.findFirst({ where: { userId, type } });

  return stacks;
}

export async function updateById(id: number, name: string) {
  const updatedStack = await prisma.stack.update({
    where: { id },
    data: { name },
  });

  return updatedStack;
}

export async function deleteById(id: number) {
  const deletedStack = await prisma.stack.delete({
    where: { id, type: 'other' },
  });

  return deletedStack;
}

export async function getStacksContainingBook(bookId: number) {
  const stacks = await prisma.stack.findMany({
    where: {
      books: { some: { bookId } },
    },
  });

  return stacks
}


