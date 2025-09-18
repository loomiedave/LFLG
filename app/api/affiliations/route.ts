// app/api/affiliations/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { CreateAffiliationData } from "@/types/registry";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const affiliations = await prisma.affiliation.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(affiliations);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch affiliations" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateAffiliationData = await request.json();

    const affiliation = await prisma.affiliation.create({
      data: {
        ...body,
        dateRegistered: body.dateRegistered
          ? new Date(body.dateRegistered)
          : new Date(),
      },
    });

    return NextResponse.json(affiliation);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create affiliation" },
      { status: 500 },
    );
  }
}
