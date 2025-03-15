import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prismadb'

export async function GET(req: NextRequest, { params }: { params: { articleId: string } }) {
  try {
    const { articleId } = params

    if (!articleId) {
      return NextResponse.json({ message: 'Article ID is required' }, { status: 400 })
    }

    const article = await prisma.article.findUnique({
      where: {
        id: articleId,
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    })

    if (!article) {
      return NextResponse.json({ message: 'Article not found' }, { status: 404 })
    }

    return NextResponse.json(article, { status: 200 })
  } catch (error) {
    console.error('Error fetching article:', error)
    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}

export async function PUT(req: NextRequest, { params }: { params: { articleId: string } }) {
  try {
    const { articleId } = params

    if (!articleId) {
      return NextResponse.json({ message: '文章 ID 是必需的' }, { status: 400 })
    }

    const body = await req.json()
    const { title, content, imageUrl, isPublic } = body

    const existingArticle = await prisma.article.findUnique({
      where: { id: articleId },
    })

    if (!existingArticle) {
      return NextResponse.json({ message: '找不到文章' }, { status: 404 })
    }

    const updatedArticle = await prisma.article.update({
      where: { id: articleId },
      data: {
        ...(title !== undefined && { title }),
        ...(content !== undefined && { content }),
        ...(imageUrl !== imageUrl && { imageUrl }),
        ...(isPublic !== undefined && { isPublic }),
        updatedAt: new Date(),
      },
    })

    return NextResponse.json(updatedArticle, { status: 200 })
  } catch (error) {
    console.error('更新文章時出錯:', error)
    return NextResponse.json(
      { error: '內部伺服器錯誤', details: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}
