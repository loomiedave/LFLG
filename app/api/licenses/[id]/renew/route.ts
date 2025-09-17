//api / licenses /[id]/ renew/route.ts

import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const userId = await currentUser();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { season, notes, expiryDate } = body;

    // Create renewal record
    const renewal = await prisma.renewal.create({
      data: {
        licenseId: id,
        season,
        notes,
      },
    });

    // Update license status and expiry date
    const license = await prisma.license.update({
      where: { id },
      data: {
        status: "ACTIVE",
        expiryDate: expiryDate ? new Date(expiryDate) : null,
      },
      include: {
        renewals: {
          orderBy: { renewalDate: "desc" },
        },
      },
    });

    return NextResponse.json({ license, renewal });
  } catch (error) {
    console.error("Error renewing license:", error);
    return NextResponse.json(
      { error: "Failed to renew license" },
      { status: 500 },
    );
  }
}
