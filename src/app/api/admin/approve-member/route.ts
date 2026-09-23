import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  const action = request.nextUrl.searchParams.get("action") || "approve";

  if (!token) {
    return new NextResponse("Missing token parameter", { status: 400 });
  }

  const profile = await db.memberProfile.findUnique({
    where: { approvalToken: token },
    include: { user: true },
  });

  if (!profile) {
    return new NextResponse("Invalid or expired action token", { status: 404 });
  }

  const isApprove = action === "approve";

  await db.$transaction([
    db.user.update({
      where: { id: profile.userId },
      data: {
        status: isApprove ? "APPROVED" : "REJECTED",
      },
    }),
    db.memberProfile.update({
      where: { id: profile.id },
      data: {
        isApproved: isApprove,
        approvalToken: null, // Consume token
      },
    }),
  ]);

  const baseUrl = process.env.NEXTAUTH_URL || process.env.AUTH_URL || "https://dracarysweb.vercel.app";
  return NextResponse.redirect(new URL(`/admin/members?action=${action}`, baseUrl));
}
