// app/api/districts/route.ts
import { prisma } from "@/lib/prisma"; // Adjust import path to your prisma client
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const clubs = await prisma.club.findMany({
      include: {
        _count: {
          select: { licenses: true },
        },
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json(clubs);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch districts" },
      { status: 500 },
    );
  }
}
