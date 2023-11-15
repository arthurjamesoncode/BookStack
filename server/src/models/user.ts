import prisma from './index';

export async function create(username: string, passwordHash: string) {
  const newUser = await prisma.user.create({
    data: {
      username,
      passwordHash,
      stacks: {
        createMany: {
          data: [
            { name: 'Currently Reading', type: 'current' },
            { name: 'To Read', type: 'tbr' },
            { name: 'Finished', type: 'finished' },
          ],
        },
      },
    },
  });

  return newUser;
}

export async function findByUsername(username: string) {
  const user = prisma.user.findFirst({ where: { username } });
  
  return user
}

export async function getAllUsers() {
  const users = await prisma.user.findMany();

  return users;
}
