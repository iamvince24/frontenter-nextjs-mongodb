import { Input } from '@/components/ui/input'
import { ImageUploader } from './ImageUpload'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import TiptapEditor from '@/components/Tiptap/Tiptap'
import { Switch } from '@/components/ui/switch'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'

const formSchema = z.object({
  title: z.string().min(1, { message: '請輸入標題' }),
  isPublic: z.boolean().default(true),
  content: z.string(),
  imageUrl: z.string(),
})

interface ArticleFormProps {
  onSubmit: (data: any) => void
  defaultValues?: {
    title?: string
    isPublic?: boolean
    content?: string
    imageUrl?: string
  }
  initialData?: {
    title?: string
    isPublic?: boolean
    content?: string
    imageUrl?: string
  }
}

export function ArticleForm({ onSubmit, defaultValues, initialData }: ArticleFormProps) {
  const pathname = usePathname()
  const isInEditPage = pathname.startsWith('/profile/article/edit')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ||
      defaultValues || {
        title: '',
        isPublic: true,
        content: '',
        imageUrl: '',
      },
  })

  const handleEditorChange = (content: string) => {
    form.setValue('content', content, { shouldValidate: true })
  }

  const handleFormSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
    const formData = {
      ...data,
      imageUrl: data.imageUrl || '',
    }
    onSubmit(formData)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>標題</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isPublic"
          render={({ field }) => (
            <FormItem className="flex flex-col  ">
              <FormLabel>公開</FormLabel>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ImageUploader register={form.register} setValue={form.setValue} initialData={initialData?.imageUrl} />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>內容</FormLabel>
              <FormControl>
                <TiptapEditor content={field.value} onChange={handleEditorChange} className="mt-1" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className={`mt-4 py-2 px-4 rounded-md shadow-sm ${
            form.formState.isSubmitting ? 'bg-black text-white' : 'bg-indigo-600 text-white'
          }`}
          disabled={form.formState.isSubmitting}
        >
          {isInEditPage ? '儲存文章' : '新增文章'}
        </Button>
      </form>
    </Form>
  )
}
