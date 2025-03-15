import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import React, { useEffect } from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '../ui/button'
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  MinusSquare,
  Image as ImageIcon,
  Upload,
  Strikethrough,
} from 'lucide-react'

interface TiptapEditorProps {
  content: string
  onChange: (content: string) => void
  className?: string
}

const TiptapEditor = ({ content, onChange, className }: TiptapEditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit, Image],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    autofocus: true,
  })

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  const MenuBar = () => {
    if (!editor) {
      return null
    }

    const addImage = () => {
      const url = window.prompt('輸入圖片 URL')

      if (url) {
        editor.chain().focus().setImage({ src: url }).run()
      }
    }

    const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.length) {
        const file = e.target.files[0]
        const reader = new FileReader()

        reader.onload = event => {
          const imageUrl = event.target?.result as string
          editor.chain().focus().setImage({ src: imageUrl }).run()
        }

        reader.readAsDataURL(file)
      }
    }

    const ToolButton = ({
      onClick,
      isActive = false,
      icon,
      tooltip,
    }: {
      onClick: () => void
      isActive?: boolean
      icon: React.ReactNode
      tooltip: string
    }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant={isActive ? 'secondary' : 'ghost'}
              className="h-8 w-8 p-0"
              // onClick={onClick}
              onMouseDown={e => {
                e.preventDefault()
                onClick()
              }}
              type="button"
            >
              {icon}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )

    return (
      <div className="flex flex-wrap items-center gap-1 p-1 border-b">
        <ToolButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={editor.isActive('heading', { level: 1 })}
          icon={<Heading1 className="h-4 w-4" />}
          tooltip="標題 1"
        />

        <ToolButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive('heading', { level: 2 })}
          icon={<Heading2 className="h-4 w-4" />}
          tooltip="標題 2"
        />

        <ToolButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          isActive={editor.isActive('heading', { level: 3 })}
          icon={<Heading3 className="h-4 w-4" />}
          tooltip="標題 3"
        />

        <ToolButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          icon={<Bold className="h-4 w-4" />}
          tooltip="粗體"
        />

        <ToolButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          icon={<Italic className="h-4 w-4" />}
          tooltip="斜體"
        />

        <ToolButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive('strike')}
          icon={<Strikethrough className="h-4 w-4" />}
          tooltip="刪除線"
        />

        <div className="mx-1 h-6 w-px bg-gray-200" />

        <ToolButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          icon={<List className="h-4 w-4" />}
          tooltip="項目列表"
        />

        <ToolButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          icon={<ListOrdered className="h-4 w-4" />}
          tooltip="數字列表"
        />

        <ToolButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          isActive={false}
          icon={<MinusSquare className="h-4 w-4" />}
          tooltip="分隔線"
        />

        <div className="mx-1 h-6 w-px bg-gray-200" />

        <ToolButton
          onClick={addImage}
          isActive={false}
          icon={<ImageIcon className="h-4 w-4" />}
          tooltip="插入圖片 URL"
        />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <label className="inline-flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer">
                <Upload className="h-4 w-4" />
                <input type="file" accept="image/*" onChange={uploadImage} className="hidden" />
              </label>
            </TooltipTrigger>
            <TooltipContent>
              <p>上傳圖片</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    )
  }

  return (
    <div className={`border rounded-md overflow-hidden ${className} h-full`}>
      <MenuBar />

      <EditorContent editor={editor} className="p-3 min-h-[400px] h-full prose max-w-none focus:outline-none" />
    </div>
  )
}

export default TiptapEditor
