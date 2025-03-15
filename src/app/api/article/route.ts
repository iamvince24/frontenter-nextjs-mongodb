import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prismadb'
import { getCurrentUser } from '@/actions/getCurrentUser'
import { ArticleSchema } from '@/types/article'

export async function POST(req: NextRequest) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const result = ArticleSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json({ errors: result.error.flatten() }, { status: 400 })
    }

    const { title, content, imageUrl, isPublic } = result.data

    const article = await prisma.article.create({
      data: {
        title,
        content,
        authorId: currentUser.id,
        imageUrl,
        isPublic,
      },
    })

    return NextResponse.json(article, { status: 201 })
  } catch (error) {
    console.error('Error creating article:', error)
    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}
