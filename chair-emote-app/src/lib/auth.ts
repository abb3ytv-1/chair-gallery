import crypto from "crypto";
import { cookies } from "next/headers";
import prisma from "./prisma";

export const SESSION_COOKIE_NAME = "council-session-token";
export const GUEST_COOKIE_NAME = "council-user-id";
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 * 2; // 2 years

export async function getSessionUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;

  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!session || session.expiresAt < new Date()) {
    return null;
  }

  return session.user;
}

export async function getGuestUser() {
  const cookieStore = await cookies();
  const guestId = cookieStore.get(GUEST_COOKIE_NAME)?.value;
  if (guestId) {
    const user = await prisma.user.findUnique({ where: { id: guestId } });
    if (user) {
      return { user, setGuestCookie: false };
    }
  }

  const user = await prisma.user.create({ data: {} });
  return { user, setGuestCookie: true };
}

export async function getSessionOrGuestUser() {
  const sessionUser = await getSessionUser();
  if (sessionUser) {
    return { user: sessionUser, setGuestCookie: false };
  }

  return getGuestUser();
}

export function createSessionToken() {
  return crypto.randomBytes(32).toString("hex");
}

export async function createSession(userId: string) {
  const token = createSessionToken();
  const expiresAt = new Date(Date.now() + COOKIE_MAX_AGE * 1000);

  await prisma.session.create({
    data: {
      token,
      userId,
      expiresAt,
    },
  });

  return { token, expiresAt };
}

export async function mergeGuestFavorites(guestId: string, userId: string) {
  const guestFavorites = await prisma.favoriteChair.findMany({
    where: { userId: guestId },
    select: { chairId: true },
  });

  const createOrIgnore = guestFavorites.map((favorite) =>
    prisma.favoriteChair.upsert({
      where: {
        userId_chairId: {
          userId,
          chairId: favorite.chairId,
        },
      },
      update: {},
      create: {
        userId,
        chairId: favorite.chairId,
      },
    }),
  );

  await Promise.all(createOrIgnore);
  await prisma.favoriteChair.deleteMany({ where: { userId: guestId } });
}
