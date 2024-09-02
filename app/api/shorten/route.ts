import { generateCode } from "@/lib/link_helpers";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const { url }: { url: string } = await request.json();
  let shortCode = generateCode(8);

  let isShortCode = await prisma.link.findUnique({
    where: {
      shortCode,
    },
  });

  while (isShortCode) {
    shortCode = generateCode(8);
    isShortCode = await prisma.link.findUnique({
      where: {
        shortCode,
      },
    });
  }

  const newLink = await prisma.link.create({
    data: {
      originalUrl: url,
      shortCode,
    },
  });

  return Response.json({ success: true, newLink });
}
