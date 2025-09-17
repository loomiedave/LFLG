// app/api/competitions/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const competition = await prisma.competition.findUnique({
      where: { id },
    });
    
    if (!competition) {
      return NextResponse.json({ error: 'Competition not found' }, { status: 404 });
    }
    
    return NextResponse.json(competition);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch competition' }, { status: 500 });
  }
}