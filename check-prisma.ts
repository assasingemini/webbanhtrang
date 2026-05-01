
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Post fields:', Object.keys((prisma as any)._runtimeDataModel.models.Post.fields));
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
