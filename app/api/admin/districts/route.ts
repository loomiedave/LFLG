// app/api/admin/districts/route.ts
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const districts = await prisma.district.findMany({
      include: {
        _count: {
          select: { clubs: true },
        },
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json({ districts });
  } catch (error) {
    console.error("Error fetching districts:", error);
    return NextResponse.json(
      { error: "Failed to fetch districts" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name } = await request.json();

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: "District name is required" },
        { status: 400 },
      );
    }

    const district = await prisma.district.create({
      data: { name: name.trim() },
    });

    return NextResponse.json({ district });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "District name already exists" },
        { status: 400 },
      );
    }

    console.error("Error creating district:", error);
    return NextResponse.json(
      { error: "Failed to create district" },
      { status: 500 },
    );
  }
}
