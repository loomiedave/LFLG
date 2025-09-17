// app/api/players/route.ts
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const players = await prisma.license.findMany({
      where: {
        licenseType: "PLAYER",
        status: "ACTIVE",
      },
      select: {
        id: true,
        name: true,
        surname: true,
        photoUrl: true,
        clubName: true,
        district: true,
      },
      orderBy: [{ surname: "asc" }, { name: "asc" }],
    });

    return NextResponse.json({
      success: true,
      data: players,
      count: players.length,
    });
  } catch (error) {
    console.error("Error fetching players:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch players",
      },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
