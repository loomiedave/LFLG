// app/api/affiliations/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const affiliation = await prisma.affiliation.findUnique({
      where: { id },
    });

    if (!affiliation) {
      return NextResponse.json(
        { error: "Affiliation not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(affiliation);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch affiliation" },
      { status: 500 },
    );
  }
}
