import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { getSessionUser } from "../../../../lib/auth";

export async function PATCH(request: Request) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json();
  if (!body || typeof body.email !== "string") {
    return NextResponse.json(
      { error: "Missing or invalid email" },
      { status: 400 },
    );
  }

  const newEmail = body.email.trim().toLowerCase();
  if (newEmail === user.email) {
    return NextResponse.json(
      { error: "New email is the same as current email" },
      { status: 400 },
    );
  }

  const existing = await prisma.user.findUnique({ where: { email: newEmail } });
  if (existing) {
    return NextResponse.json(
      { error: "Email already in use" },
      { status: 409 },
    );
  }

  const updated = await prisma.user.update({
    where: { id: user.id },
    data: { email: newEmail },
  });

  return NextResponse.json({ id: updated.id, email: updated.email });
}

export async function DELETE(request: Request) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // Delete all sessions for this user
  await prisma.session.deleteMany({ where: { userId: user.id } });

  // Delete all favorite chairs for this user
  await prisma.favoriteChair.deleteMany({ where: { userId: user.id } });

  // Delete the user
  await prisma.user.delete({ where: { id: user.id } });

  const response = NextResponse.json({ success: true });
  response.cookies.delete("council-session-token");
  response.cookies.delete("council-user-id");

  return response;
}
