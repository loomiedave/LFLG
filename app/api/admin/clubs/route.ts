// app/api/admin/clubs/route.ts
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const clubs = await prisma.club.findMany({
      include: {
        district: true,
        _count: {
          select: { licenses: true }
        }
      },
      orderBy: [
        { district: { name: 'asc' } },
        { name: 'asc' }
      ]
    });

    return NextResponse.json({ clubs });
  } catch (error) {
    console.error("Error fetching clubs:", error);
    return NextResponse.json(
      { error: "Failed to fetch clubs" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, districtId } = await request.json();

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: "Club name is required" },
        { status: 400 }
      );
    }

    if (!districtId) {
      return NextResponse.json(
        { error: "District is required" },
        { status: 400 }
      );
    }

    const club = await prisma.club.create({
      data: {
        name: name.trim(),
        districtId
      },
      include: {
        district: true
      }
    });

    return NextResponse.json({ club });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: "Club name already exists in this district" },
        { status: 400 }
      );
    }
    
    console.error("Error creating club:", error);
    return NextResponse.json(
      { error: "Failed to create club" },
      { status: 500 }
    );
  }
}