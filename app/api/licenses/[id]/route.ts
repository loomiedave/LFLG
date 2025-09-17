// app/api/licenses/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const license = await prisma.license.findUnique({
      where: { id },
      include: {
        club: {
          include: {
            district: true
          }
        },
        renewals: {
          orderBy: { renewalDate: "desc" },
        },
        transfers: {
          orderBy: { transferDate: "desc" },
        },
        loans: {
          orderBy: { startDate: "desc" },
        },
      },
    });

    if (!license) {
      return NextResponse.json({ error: "License not found" }, { status: 404 });
    }

    return NextResponse.json(license);
  } catch (error) {
    console.error("Error fetching license:", error);
    return NextResponse.json(
      { error: "Failed to fetch license" },
      { status: 500 },
    );
  }
}

export async function PUT(
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
    const {
      licenseType,
      name,
      surname,
      dateOfBirth,
      address,
      state,
      clubId,
      photoUrl,
      expiryDate,
      status,
    } = body;

    // Validate club exists if clubId provided
    if (clubId) {
      const club = await prisma.club.findUnique({
        where: { id: clubId },
        include: { district: true }
      });

      if (!club) {
        return NextResponse.json(
          { error: "Club not found" },
          { status: 400 }
        );
      }

      // Update with club relationship
      const license = await prisma.license.update({
        where: { id },
        data: {
          licenseType,
          name,
          surname,
          dateOfBirth: new Date(dateOfBirth),
          address,
          clubId,
          // Update old fields for backward compatibility
          clubName: club.name,
          district: club.district.name,
          photoUrl,
          expiryDate: expiryDate ? new Date(expiryDate) : null,
          status,
        },
        include: {
          club: {
            include: {
              district: true
            }
          },
          renewals: {
            orderBy: { renewalDate: "desc" },
          },
          transfers: {
            orderBy: { transferDate: "desc" },
          },
          loans: {
            orderBy: { startDate: "desc" },
          },
        },
      });

      return NextResponse.json({ license });
    } else {
      // Fallback for old data without clubId
      const license = await prisma.license.update({
        where: { id },
        data: {
          licenseType,
          name,
          surname,
          dateOfBirth: new Date(dateOfBirth),
          address,
          photoUrl,
          expiryDate: expiryDate ? new Date(expiryDate) : null,
          status,
        },
        include: {
          club: {
            include: {
              district: true
            }
          },
          renewals: {
            orderBy: { renewalDate: "desc" },
          },
          transfers: {
            orderBy: { transferDate: "desc" },
          },
          loans: {
            orderBy: { startDate: "desc" },
          },
        },
      });

      return NextResponse.json({ license });
    }
  } catch (error) {
    console.error("Error updating license:", error);
    return NextResponse.json(
      { error: "Failed to update license" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const userId = await currentUser();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    await prisma.license.delete({
      where: { id },
    });

    return NextResponse.json({ message: "License deleted successfully" });
  } catch (error) {
    console.error("Error deleting license:", error);
    return NextResponse.json(
      { error: "Failed to delete license" },
      { status: 500 },
    );
  }
}