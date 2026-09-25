const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const demoMembers = [
    {
      name: "Parthiban V",
      tag: "Prince",
      role: "SUPER_ADMIN",
      skills: ["React", "Next.js", "Node.js", "Python", "PostgreSQL", "AWS"],
      github: "https://github.com/parthiban-dot",
      linkedin: "https://www.linkedin.com/in/parthi-xii-581493376/",
      instagram: "https://www.instagram.com/its_.prince._here?stkn=MXBld3RqdGVjZ3pnMw==",
    },
    {
      name: "Sindhuja S M",
      tag: "Sindhu",
      role: "MEMBER",
      skills: ["Java", "Python", "HTML", "CSS", "JavaScript", "React.js", "SQL"],
      github: "https://github.com/Sindhuja-wq",
      linkedin: "https://www.linkedin.com/in/sindhu-sm-bb56683b0/",
    },
    {
      name: "Rithika",
      tag: "Aira",
      role: "MEMBER",
      skills: ["HTML", "CSS", "JavaScript", "Java", "SQL", "Git", "AI Agents", "DSA"],
      github: "https://github.com/rithikarvrs",
      linkedin: "https://www.linkedin.com/in/rithika-r-b13b41377",
    },
    {
      name: "Shrivarsha M",
      tag: "Neko",
      role: "MEMBER",
      skills: ["Java", "Python", "HTML", "CSS", "JavaScript", "SQL"],
      github: "https://github.com/shrivarsha62",
      linkedin: "https://www.linkedin.com/in/shrivarsham/",
    },
    {
      name: "Shree Nithi Gobika S",
      tag: "Siri",
      role: "MEMBER",
      skills: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/shreenithi3318-dotcom",
      linkedin: "https://www.linkedin.com/in/shree-nithi-ab1ba73ba",
    },
    {
      name: "Prijitha S",
      tag: "Priji",
      role: "MEMBER",
      skills: ["HTML", "CSS", "JavaScript", "Java", "Python"],
      github: "https://github.com/prijithasekar",
      linkedin: "https://www.linkedin.com/in/prijitha-s-01ab66400",
    },
    {
      name: "Shahana A.R",
      tag: "Zaya",
      role: "MEMBER",
      skills: ["Java", "JavaScript", "HTML", "CSS"],
      github: "https://github.com/arshahana68",
      linkedin: "https://www.linkedin.com/in/shahana-a-r-4076ab385",
    },
    {
      name: "Priya Dharshini A",
      tag: "Prini",
      role: "MEMBER",
      skills: ["HTML", "CSS", "JavaScript", "Java", "Python", "C++", "SQL", "SQLite"],
      github: "https://github.com/priyadharshini699",
      linkedin: "https://www.linkedin.com/in/priyadharshini-a-7066683a8",
    },
    {
      name: "Sanjay V",
      tag: "Cheesyy",
      role: "MEMBER",
      skills: ["HTML", "CSS", "React", "JavaScript", "Bootstrap", "XML"],
      github: "https://github.com/sanjayvisvanathan20012-source",
      linkedin: "https://www.linkedin.com/in/sanjay-v-2207a3381/",
    }
];

async function main() {
  for (const member of demoMembers) {
    const exists = await prisma.user.findFirst({ where: { name: member.name } });
    if (!exists) {
      await prisma.user.create({
        data: {
          name: member.name,
          role: member.role,
          status: "APPROVED",
          onboarded: true,
          profile: {
            create: {
              memberTag: member.tag,
              skills: member.skills,
              githubUrl: member.github,
              linkedinUrl: member.linkedin,
              instagramUrl: member.instagram || null,
              isApproved: true
            }
          }
        }
      });
      console.log("Added " + member.name);
    } else {
      console.log("Skipped " + member.name + " (already exists)");
    }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());