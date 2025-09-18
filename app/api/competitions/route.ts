// app/api/competitions/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { CreateCompetitionData } from "@/types/registry";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const competitions = await prisma.competition.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(competitions);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch competitions" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateCompetitionData = await request.json();

    const competition = await prisma.competition.create({
      data: {
        ...body,
        dateRegistered: body.dateRegistered
          ? new Date(body.dateRegistered)
          : new Date(),
      },
    });

    return NextResponse.json(competition);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create competition" },
      { status: 500 },
    );
  }
}
