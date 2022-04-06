import { PrismaClient } from '@prisma/client';

const persons = [
  {
    name: 'user1',
    age: 10,
    emails: ['sadsdaaaa11@sad.com'],
  },
  {
    name: 'user2',
    age: 10,
  },
];

const prisma = new PrismaClient();

async function main() {
  for (const person of persons) {
    const emailsValues: { email: string }[] = person.emails?.length
      ? person.emails.map((email) => {
          return {
            email,
          };
        })
      : [];
    await prisma.person.create({
      data: {
        ...person,
        emails: {
          createMany: {
            data: emailsValues,
          },
        },
      },
    });
  }
}

main()
  .catch((err) => {
    console.log(err);
    process.exit(1);
  })
  .finally(async () => {
    prisma.$disconnect();
  });
