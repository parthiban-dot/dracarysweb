import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log("==========================================");
  console.log("⚠️  WARNING: DRACARYS SEED SCRIPT RUNNING");
  console.log("⚠️  DO NOT USE THESE CREDENTIALS IN PRODUCTION");
  console.log("==========================================");

  const hashedPassword = await bcrypt.hash("dracarys_demo_2026!", 10);

  // Admin Account
  const admin = await prisma.user.upsert({
    where: { email: 'admin@dracarys.local' },
    update: {},
    create: {
      email: 'admin@dracarys.local',
      name: 'Super Admin',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
    },
  });

  console.log(`Created admin user: ${admin.email}`);

  // Member Account
  const member = await prisma.user.upsert({
    where: { email: 'member@dracarys.local' },
    update: {},
    create: {
      email: 'member@dracarys.local',
      name: 'Team Member',
      password: hashedPassword,
      role: 'MEMBER',
    },
  });

  console.log(`Created member user: ${member.email}`);
  
  console.log("==========================================");
  console.log("✅ Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
