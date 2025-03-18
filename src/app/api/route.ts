import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ success: false, message: 'ID is required' }, { status: 400 })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    })

    if (user) {
      return NextResponse.json({ success: true, data: user })
    } else {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 })
    }
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, message: 'Failed to retrieve user' }, { status: 500 })
  }
}
