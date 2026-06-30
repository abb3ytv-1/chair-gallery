import { hashSync } from "bcryptjs";
import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { createSession, mergeGuestFavorites, getGuestUser, SESSION_COOKIE_NAME, GUEST_COOKIE_NAME, COOKIE_MAX_AGE } from "../../../../lib/auth";

export async function POST(request: Request) {
  const body = await request.json();
  if (!body || typeof body.email !== "string" || typeof body.password !== "string") {
    return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
  }

  const email = body.email.trim().toLowerCase();
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Email already in use" }, { status: 409 });
  }

  const user = await prisma.user.create({
    data: {
      email,
      password: hashSync(body.password, 10),
    },
  });

  const session = await createSession(user.id);
  const guestState = await getGuestUser();
  if (guestState.user.id !== user.id) {
    await mergeGuestFavorites(guestState.user.id, user.id);
  }

  const response = NextResponse.json({ id: user.id, email: user.email });
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: session.token,
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
  });
  if (guestState.setGuestCookie) {
    response.cookies.set({
      name: GUEST_COOKIE_NAME,
      value: guestState.user.id,
      path: "/",
      maxAge: COOKIE_MAX_AGE,
    });
  }

  return response;
}
