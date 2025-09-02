import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    const license = await prisma.license.findUnique({
      where: { id },
      include: {
        renewals: {
          orderBy: { renewalDate: 'desc' }
        }
      }
    })

    if (!license) {
      return NextResponse.json({ error: 'License not found' }, { status: 404 })
    }

    return NextResponse.json({ license })
  } catch (error) {
    console.error('Error fetching license:', error)
    return NextResponse.json(
      { error: 'Failed to fetch license' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await currentUser()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const {
      licenseType,
      name,
      surname,
      dateOfBirth,
      address,
      state,
      district,
      clubName,
      photoUrl,
      expiryDate,
      status
    } = body

    const license = await prisma.license.update({
      where: { id },
      data: {
        licenseType,
        name,
        surname,
        dateOfBirth: new Date(dateOfBirth),
        address,
        state,
        district,
        clubName,
        photoUrl,
        expiryDate: expiryDate ? new Date(expiryDate) : null,
        status
      },
      include: {
        renewals: {
          orderBy: { renewalDate: 'desc' }
        }
      }
    })

    return NextResponse.json({ license })
  } catch (error) {
    console.error('Error updating license:', error)
    return NextResponse.json(
      { error: 'Failed to update license' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await currentUser()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    await prisma.license.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'License deleted successfully' })
  } catch (error) {
    console.error('Error deleting license:', error)
    return NextResponse.json(
      { error: 'Failed to delete license' },
      { status: 500 }
    )
  }
}