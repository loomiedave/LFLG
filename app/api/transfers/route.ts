// app/api/transfers/route.ts
import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { currentUser } from "@clerk/nextjs/server";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const transfers = await prisma.transfer.findMany({
      include: {
        license: {
          select: {
            name: true,
            surname: true,
            licenseNumber: true,
          },
        },
      },
      orderBy: { transferDate: "desc" },
    });

    return NextResponse.json({ transfers });
  } catch (error) {
    console.error("Error fetching transfers:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await currentUser();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const transfer = await prisma.transfer.create({
      data: {
        licenseId: body.licenseId,
        fromClub: body.fromClub,
        toClub: body.toClub,
        transferDate: new Date(body.transferDate),
        type: body.type,
        status: body.status || "PENDING",
        fee: body.fee,
        season: body.season,
        notes: body.notes,
      },
      include: {
        license: {
          select: {
            name: true,
            surname: true,
            licenseNumber: true,
          },
        },
      },
    });

    return NextResponse.json({ transfer }, { status: 201 });
  } catch (error) {
    console.error("Error creating transfer:", error);
    return NextResponse.json(
      { error: "Failed to create transfer" },
      { status: 500 },
    );
  }
}
