import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const seed = async()=> {
  const maria = await prisma.user.upsert({
    where: { email: 'maria@email.com' },
    update: {},
    create: {
      email: 'maria@email.com',
      name: 'Maria',
      password: '$2b$10$hHYKQW.ioMR9Y/UKw7lNBu27FtiXQdSkzl9BEE7kp.jYl14OPcR0i', // senha: 123456
      stores: {
        create: [
          {
            name: 'Maria Gourmet',
            urlLogo: 'https://www.prisma.io/nextjs',
            address: 'Rua dos beija-flores, 300 Bairro Planices',
          },
          {
            name: 'Maria Costuras',
            urlLogo: 'https://www.prisma.io/nextjs',
            address: 'Rua dos beija-flores, 3500 Bairro Planices',
          }
      
      ],

      }
    },
  })
  const bob = await prisma.user.upsert({
    where: { email: 'bob@email.com' },
    update: {},
    create: {
      email: 'bob@email.com',
      name: 'Bob',
      password: '$2b$10$qp6RoAwT8eDaobf8AuoKTuXhYUWNWNa1dHmRWockCA.mOkZi9Bagu', // senha: 654321
      stores: {
        create: [{
            name: 'Hamburgão do Bob',
            urlLogo: 'https://www.prisma.io/nextjs',
            address: 'Rua das Araras, 430 Bairro Planices',
          }],
        }

    },
  })

}
seed()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })