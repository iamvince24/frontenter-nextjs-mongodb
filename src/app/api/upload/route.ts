import { NextRequest, NextResponse } from 'next/server'
import multer from 'multer'
import prisma from '@/lib/prismadb'
import { getCurrentUser } from '@/actions/getCurrentUser'
import { runMiddleware } from '@/lib/utils'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})

const upload = multer({ storage: storage })
const uploadMiddleware = upload.single('image')

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const req = {
      ...request,
      headers: Object.fromEntries(request.headers),
      query: Object.fromEntries(new URL(request.url).searchParams),
    } as any

    const res = {} as any
    await runMiddleware(req, res, uploadMiddleware)

    const currentUser = await getCurrentUser()
    const authorId = currentUser?.id

    if (!authorId) {
      console.error('Unauthorized: No current user')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const file = req.file
    const { path } = file

    const formData = await request.formData()
    const title = formData.get('title') as string
    const content = formData.get('content') as string

    console.log('Request data:', { title, content })

    const article = await prisma.article.create({
      data: {
        authorId,
        title,
        content,
        imageUrl: path,
      },
    })

    console.log('Article created:', article)
    return NextResponse.json({ article }, { status: 200 })
  } catch (error) {
    console.error('Failed to upload image:', error)
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 })
  }
}
