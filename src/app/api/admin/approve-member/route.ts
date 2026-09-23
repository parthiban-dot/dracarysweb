import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    return new NextResponse("Missing approval token", { status: 400 });
  }

  const profile = await db.memberProfile.findUnique({
    where: { approvalToken: token },
    include: { user: true },
  });

  if (!profile) {
    return new NextResponse("Invalid or expired approval token", { status: 404 });
  }

  await db.memberProfile.update({
    where: { id: profile.id },
    data: {
      isApproved: true,
      approvalToken: null, // Consume token
    },
  });

  const baseUrl = process.env.NEXTAUTH_URL || process.env.AUTH_URL || "https://dracarysweb.vercel.app";
  return NextResponse.redirect(new URL("/admin/members?approved=true", baseUrl));
}
