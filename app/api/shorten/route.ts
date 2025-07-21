import { generateCode } from "@/lib/link_helpers";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const { url, alias }: { url: string; alias?: string } = await request.json();
  let shortCode = generateCode(8);

  if (alias) {
    const existingAlias = await prisma.link.findUnique({
      where: { shortCode: alias },
    });

    if (existingAlias) {
      return Response.json(
        {
          success: false,
          message:
            "Alias already taken. Please choose another or let autogenerate",
        },
        { status: 409 }
      );
    } else {
      shortCode = alias;
    }
  } else {
    shortCode = await getUniqueCode();
  }

  const newLink = await prisma.link.create({
    data: {
      originalUrl: url,
      shortCode,
    },
  });

  return Response.json({ success: true, newLink });
}

async function getUniqueCode(): Promise<string> {
  let code = generateCode(8);
  let exists = await prisma.link.findUnique({ where: { shortCode: code } });

  while (exists) {
    code = generateCode(8);
    exists = await prisma.link.findUnique({ where: { shortCode: code } });
  }

  return code;
}
