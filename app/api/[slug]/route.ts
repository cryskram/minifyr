import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;
  const url = await prisma.link.findUnique({
    where: {
      shortCode: slug,
    },
  });

  if (!url) {
    redirect("/");
  }

  return Response.json({ success: true, url });
}
