'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import { useEffect } from 'react'

interface ArticleContentProps {
  content: any // TipTap 內容通常是 JSON 格式
}

export const ArticleContent = ({ content }: ArticleContentProps) => {
  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: content,
    editable: false,
  })

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  return <EditorContent editor={editor} className="prose max-w-none" />
}
