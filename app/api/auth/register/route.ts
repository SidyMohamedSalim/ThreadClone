import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();
  const exists = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (exists) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  } else {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: await hash(password, 10),
      },
    });
    return NextResponse.json(user);
  }
}
