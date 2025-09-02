import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import  { prisma }  from '@/lib/prisma'
import { generateLicenseNumber } from '@/lib/utils'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const licenseNumber = searchParams.get('licenseNumber')
    const name = searchParams.get('name')
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let whereClause: any = {}
    
    if (search) {
      whereClause = {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { surname: { contains: search, mode: 'insensitive' } },
          { licenseNumber: { contains: search, mode: 'insensitive' } }
        ]
      }
    } else {
      if (licenseNumber) {
        whereClause.licenseNumber = { contains: licenseNumber, mode: 'insensitive' }
      }
      if (name) {
        whereClause.OR = [
          { name: { contains: name, mode: 'insensitive' } },
          { surname: { contains: name, mode: 'insensitive' } }
        ]
      }
    }

    const licenses = await prisma.license.findMany({
      where: whereClause,
      include: {
        renewals: {
          orderBy: { renewalDate: 'desc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ licenses })
  } catch (error) {
    console.error('Error fetching licenses:', error)
    return NextResponse.json(
      { error: 'Failed to fetch licenses' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

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
      expiryDate
    } = body

    // Generate unique license number
    let licenseNumber = generateLicenseNumber()
    let isUnique = false
    
    while (!isUnique) {
      const existing = await prisma.license.findUnique({
        where: { licenseNumber }
      })
      if (!existing) {
        isUnique = true
      } else {
        licenseNumber = generateLicenseNumber()
      }
    }

    const license = await prisma.license.create({
      data: {
        licenseNumber,
        licenseType,
        name,
        surname,
        dateOfBirth: new Date(dateOfBirth),
        address,
        state,
        district,
        clubName,
        photoUrl,
        expiryDate: expiryDate ? new Date(expiryDate) : null
      },
      include: {
        renewals: true
      }
    })

    return NextResponse.json({ license })
  } catch (error) {
    console.error('Error creating license:', error)
    return NextResponse.json(
      { error: 'Failed to create license' },
      { status: 500 }
    )
  }
}