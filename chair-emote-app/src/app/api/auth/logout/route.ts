import { NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, GUEST_COOKIE_NAME } from "../../../../lib/auth";

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: "",
    path: "/",
    maxAge: 0,
  });
  response.cookies.set({
    name: GUEST_COOKIE_NAME,
    value: "",
    path: "/",
    maxAge: 0,
  });

  return response;
}
