import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  await prisma.product.createMany({
    data: [
      {
        name: 'Beautiful Cloth',
        price: 50000,
        // images: [
        //   'https://s3.example.com/product1.jpg',
        //   'https://s3.example.com/product2.jpg',
        // ],
      },
      {
        name: 'Good Pants',
        price: 130000,
        // images: [
        //   'https://s3.example.com/product1.jpg',
        //   'https://s3.example.com/product2.jpg',
        // ],
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error('❌ Error inserting seed data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
