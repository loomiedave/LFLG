import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { generateLicenseNumber } from "@/lib/utils";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const licenseNumber = searchParams.get("licenseNumber");
    const name = searchParams.get("name");

    let whereClause: any = {};

    if (search) {
      whereClause = {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { surname: { contains: search, mode: "insensitive" } },
          { licenseNumber: { contains: search, mode: "insensitive" } },
        ],
      };
    } else {
      if (licenseNumber) {
        whereClause.licenseNumber = {
          contains: licenseNumber,
          mode: "insensitive",
        };
      }
      if (name) {
        whereClause.OR = [
          { name: { contains: name, mode: "insensitive" } },
          { surname: { contains: name, mode: "insensitive" } },
        ];
      }
    }

    const licenses = await prisma.license.findMany({
      where: whereClause,
      include: {
        club: {
          include: {
            district: true,
          },
        },
        renewals: {
          orderBy: { renewalDate: "desc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ licenses });
  } catch (error) {
    console.error("Error fetching licenses:", error);
    return NextResponse.json(
      { error: "Failed to fetch licenses" },
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

    const body = await request.json();
    const {
      licenseType,
      name,
      surname,
      dateOfBirth,
      address,
      clubId, // Changed from clubName and district to clubId
      photoUrl,
      expiryDate,
      transfers = [],
    } = body;

    // Validate club exists
    const club = await prisma.club.findUnique({
      where: { id: clubId },
      include: { district: true },
    });

    if (!club) {
      return NextResponse.json({ error: "Club not found" }, { status: 400 });
    }

    // Generate unique license number
    let licenseNumber = generateLicenseNumber();
    let isUnique = false;

    while (!isUnique) {
      const existing = await prisma.license.findUnique({
        where: { licenseNumber },
      });
      if (!existing) {
        isUnique = true;
      } else {
        licenseNumber = generateLicenseNumber();
      }
    }

    const result = await prisma.$transaction(async (tx) => {
      const license = await tx.license.create({
        data: {
          licenseNumber,
          licenseType,
          name,
          surname,
          dateOfBirth: new Date(dateOfBirth),
          address,
          clubId,
          // Keep old fields for backward compatibility
          clubName: club.name,
          district: club.district.name,
          photoUrl,
          expiryDate: expiryDate ? new Date(expiryDate) : null,
        },
      });

      if (transfers.length > 0) {
        const transfersData = transfers.map((transfer: any) => ({
          licenseId: license.id,
          fromClub: transfer.fromClub,
          toClub: transfer.toClub,
          transferDate: new Date(transfer.transferDate),
          type: transfer.type,
          status: transfer.status,
          fee: transfer.fee,
          season: transfer.season,
          notes: transfer.notes,
        }));

        await tx.transfer.createMany({
          data: transfersData,
        });
      }

      return await tx.license.findUnique({
        where: { id: license.id },
        include: {
          club: {
            include: {
              district: true,
            },
          },
          renewals: true,
          transfers: {
            orderBy: { transferDate: "desc" },
          },
        },
      });
    });

    return NextResponse.json({ license: result });
  } catch (error) {
    console.error("Error creating license:", error);
    return NextResponse.json(
      { error: "Failed to create license" },
      { status: 500 },
    );
  }
}
