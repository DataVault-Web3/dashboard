
export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const { email, password, companyName, contactPerson, industry, website, description } = await request.json()

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: contactPerson || null,
        companyName: companyName || 'Unnamed Company',
        contactPerson: contactPerson || null,
        industry: industry || null,
        business: {
          create: {
            companyName: companyName || 'Unnamed Company',
            contactPerson: contactPerson || null,
            industry: industry || null,
            website: website || null,
            description: description || null
          }
        }
      },
      include: {
        business: true
      }
    })

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      message: 'Business account created successfully',
      user: userWithoutPassword
    })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
