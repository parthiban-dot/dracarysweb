const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const email = "vinayagamparthiban07@gmail.com";
  
  const user = await prisma.user.findUnique({ where: { email } });
  
  if (user) {
    await prisma.user.update({
      where: { email },
      data: {
        status: "APPROVED",
        role: "SUPER_ADMIN"
      }
    });
    console.log("Successfully restored super admin access for " + email);
  } else {
    console.log("User not found!");
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());