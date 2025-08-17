import { getAuthorArticles } from '@/lib/articles'
import { getCurrentUser } from '@/actions/getCurrentUser'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const page = parseInt(searchParams.get('page') || '1')

    // 獲取當前用戶
    const currentUser = await getCurrentUser()

    if (!currentUser?.id) {
      return NextResponse.json({ success: false, error: '用戶未登入' }, { status: 401 })
    }

    // 觸發數據獲取，讓緩存生效
    await getAuthorArticles(currentUser.id, currentUser.id, page, 9)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('預取個人文章失敗:', error)
    return NextResponse.json({ success: false, error: '預取失敗' }, { status: 500 })
  }
}
