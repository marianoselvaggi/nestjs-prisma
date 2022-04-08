import { PrismaClient } from '@prisma/client';

const persons = [
  {
    name: 'user1',
    age: 10,
    emails: ['sadsdaaaa11@sad.com', 'sda@sad.com'],
  },
  {
    name: 'user2',
    age: 10,
    emails: ['sdadas@2sada.com'],
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
          create: emailsValues,
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
