import { getPublicArticles } from '@/lib/articles'
import { getCurrentUser } from '@/actions/getCurrentUser'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const page = parseInt(searchParams.get('page') || '1')
    const search = searchParams.get('search') || undefined

    // 獲取當前用戶 ID
    const currentUser = await getCurrentUser()

    // 觸發數據獲取，讓緩存生效
    await getPublicArticles(page, 9, search, currentUser?.id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('預取公開文章失敗:', error)
    return NextResponse.json({ success: false, error: '預取失敗' }, { status: 500 })
  }
}
