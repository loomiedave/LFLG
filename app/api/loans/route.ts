// app/api/loans/route.ts
import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { currentUser } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const loans = await prisma.loan.findMany({
      include: {
        license: {
          select: {
            name: true,
            surname: true,
            licenseNumber: true,
          },
        },
      },
      orderBy: { startDate: "desc" },
    });

    return NextResponse.json({ loans });
  } catch (error) {
    console.error("Error fetching loans:", error);
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

    const loan = await prisma.loan.create({
      data: {
        licenseId: body.licenseId,
        parentClub: body.parentClub,
        hostClub: body.hostClub,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        status: body.status || "ACTIVE",
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

    return NextResponse.json({ loan }, { status: 201 });
  } catch (error) {
    console.error("Error creating loan:", error);
    return NextResponse.json(
      { error: "Failed to create loan" },
      { status: 500 },
    );
  }
}
