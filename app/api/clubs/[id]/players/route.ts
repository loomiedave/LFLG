// app/api/clubs/[Id]/players/route.ts
import { prisma } from '@/lib/prisma'; // Adjust import path to your prisma client
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const club = await prisma.club.findUnique({
      where: { id: id },
      include: {
        district: true,
        licenses: {
          orderBy: [
            { surname: 'asc' },
            { name: 'asc' }
          ]
        }
      }
    });

    if (!club) {
      return NextResponse.json(
        { error: 'Club not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(club);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch players' },
      { status: 500 }
    );
  }
}