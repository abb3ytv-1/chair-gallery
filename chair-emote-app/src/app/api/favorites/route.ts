import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

const COOKIE_NAME = "council-user-id";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 * 2; // 2 years

async function getUserId() {
  const cookieStore = await cookies();
  const existingId = cookieStore.get(COOKIE_NAME)?.value;

  if (existingId) {
    const user = await prisma.user.findUnique({ where: { id: existingId } });
    if (user) {
      return { userId: existingId, setCookie: false };
    }
  }

  const user = await prisma.user.create({ data: {} });
  return { userId: user.id, setCookie: true };
}

async function getFavoriteIds(userId: string) {
  const favorites = await prisma.favoriteChair.findMany({
    where: { userId },
    select: { chairId: true },
  });

  return favorites.map((row: { chairId: string }) => row.chairId);
}

export async function GET() {
  const { userId, setCookie } = await getUserId();
  const favorites = await getFavoriteIds(userId);

  const response = NextResponse.json(favorites);
  if (setCookie) {
    response.cookies.set({
      name: COOKIE_NAME,
      value: userId,
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
    });
  }

  return response;
}

export async function POST(request: Request) {
  const { userId, setCookie } = await getUserId();
  const body = await request.json();

  if (!body || typeof body.chairId !== "string") {
    return NextResponse.json(
      { error: "Missing or invalid chairId" },
      { status: 400 },
    );
  }

  const chairId = body.chairId;
  const existing = await prisma.favoriteChair.findUnique({
    where: {
      userId_chairId: {
        userId,
        chairId,
      },
    },
  });

  if (existing) {
    await prisma.favoriteChair.delete({ where: { id: existing.id } });
  } else {
    await prisma.favoriteChair.create({
      data: {
        chairId,
        userId,
      },
    });
  }

  const favorites = await getFavoriteIds(userId);
  const response = NextResponse.json(favorites);

  if (setCookie) {
    response.cookies.set({
      name: COOKIE_NAME,
      value: userId,
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
    });
  }

  return response;
}
