import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prismadb'
import { getCurrentUser } from '@/actions/getCurrentUser'
import { ArticleSchema } from '@/features/article/pages/ArticleFormPage'

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

    const { title, content, imageUrl } = result.data

    const article = await prisma.article.create({
      data: {
        title,
        content,
        authorId: currentUser?.id,
        imageUrl,
      },
    })

    return NextResponse.json(article, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
