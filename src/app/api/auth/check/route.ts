import { NextResponse } from "next/server";
import { getAuthStatus } from "@/lib/auth";

export async function GET() {
  const isAuth = await getAuthStatus();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true });
}
