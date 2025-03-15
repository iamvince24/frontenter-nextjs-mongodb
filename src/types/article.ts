import { z } from 'zod'

export const ArticleSchema = z.object({
  title: z.string().min(1, '標題是必填項'),
  content: z.string().min(1, '內容是必填項'),
  imageUrl: z.string().url(),
  isPublic: z.boolean().default(true),
})
