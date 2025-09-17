// app/api/districts/[districtId]/clubs/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log('Looking for district:', id);
    
    const district = await prisma.district.findUnique({
      where: { id },
      include: {
        clubs: {
          include: {
            _count: {
              select: { licenses: true }
            }
          },
          orderBy: { name: 'asc' }
        }
      }
    });

    console.log('Found district:', district);
    
    if (!district) {
      console.log('District not found in database');
      return NextResponse.json(
        { error: 'District not found' },
        { status: 404 }
      );
    }

    console.log('Returning district with', district.clubs.length, 'clubs');
    return NextResponse.json(district);
    
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch clubs' },
      { status: 500 }
    );
  }
}