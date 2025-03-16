import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  try {
    const articles = await prisma.article.findMany({
      where: {
        isPublic: true,
      },
    })

    if (!articles || articles.length === 0) {
      return NextResponse.json({ error: 'No public articles found' }, { status: 404 })
    }

    return NextResponse.json(articles)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
