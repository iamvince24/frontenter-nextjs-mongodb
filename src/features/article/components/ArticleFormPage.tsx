import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { ImageUploader } from './ImageUpload'
import { Textarea } from '@/components/ui/textarea'
import { usePathname } from 'next/navigation'
import Tiptap from '@/components/Tiptap/Tiptap'
import { useState } from 'react'
import TiptapEditor from '@/components/Tiptap/Tiptap'

interface ArticleFormProps {
  onSubmit: (data: any) => void
  defaultValues?: {
    title?: string
    content?: string
    image?: string
  }
  initialData?: {
    title?: string
    content?: string
    imageUrl?: string
  }
}

export function ArticleForm({ onSubmit, defaultValues, initialData }: ArticleFormProps) {
  const [editorContent, setEditorContent] = useState(initialData?.content || defaultValues?.content || '')

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initialData ||
      defaultValues || {
        title: '',
        content: '',
        image: '',
      },
  })

  const pathname = usePathname()
  const isInEditPage = pathname.startsWith('/profile/article/edit')

  const handleFormSubmit = (data: any) => {
    const formData = {
      ...data,
      content: editorContent,
    }
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          標題
        </label>
        <Input
          id="title"
          type="text"
          {...register('title')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.title && <p className="text-red-600">{errors.title.message}</p>}
      </div>

      <ImageUploader register={register} setValue={setValue} initialData={initialData?.imageUrl} />

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          內容
        </label>

        <TiptapEditor content={editorContent} onChange={setEditorContent} className="mt-1" />

        {errors.content && <p className="text-red-600">{errors.content.message}</p>}
      </div>

      <button
        type="submit"
        className={`mt-4 py-2 px-4 rounded-md shadow-sm ${
          isSubmitting ? 'bg-black text-white' : 'bg-indigo-600 text-white'
        }`}
        disabled={isSubmitting}
      >
        {isInEditPage ? '儲存文章' : '新增文章'}
      </button>
    </form>
  )
}

// const IgnoreFormSettings = () => {
//   return (
//     <>
//     <div>
//       <label htmlFor="className" className="block text-sm font-medium text-gray-700">
//         課程名稱
//       </label>
//       <Input
//         id="className"
//         type="text"
//         {...register('className')}
//         className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//       />
//       {errors.className && <p className="text-red-600">{errors.className.message}</p>}
//     </div>
//     <div>
//       <label htmlFor="introduction" className="block text-sm font-medium text-gray-700">
//         簡介
//       </label>
//       <Input
//         id="introduction"
//         type="text"
//         {...register('introduction')}
//         className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//       />
//       {errors.introduction && <p className="text-red-600">{errors.introduction.message}</p>}
//     </div>
//     <div>
//       <label htmlFor="classLocation" className="block text-sm font-medium text-gray-700">
//         上課地點
//       </label>
//       <Select onValueChange={value => setValue('classLocation', value)}>
//         <SelectTrigger className="w-fit">
//           <SelectValue placeholder="選擇城市或以線上方式" />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectItem value="online">線上</SelectItem>
//           <SelectItem value="taipei">台北</SelectItem>
//           <SelectItem value="new-taipei">新北</SelectItem>
//           <SelectItem value="taoyuan">桃園</SelectItem>
//           <SelectItem value="taichung">台中</SelectItem>
//           <SelectItem value="tainan">台南</SelectItem>
//           <SelectItem value="kaohsiung">高雄</SelectItem>
//           <SelectItem value="keelung">基隆</SelectItem>
//           <SelectItem value="hsinchu">新竹</SelectItem>
//           <SelectItem value="chiayi">嘉義</SelectItem>
//           <SelectItem value="miaoli">苗栗</SelectItem>
//           <SelectItem value="changhua">彰化</SelectItem>
//           <SelectItem value="nantou">南投</SelectItem>
//           <SelectItem value="yunlin">雲林</SelectItem>
//           <SelectItem value="pingtung">屏東</SelectItem>
//           <SelectItem value="yilan">宜蘭</SelectItem>
//           <SelectItem value="hualien">花蓮</SelectItem>
//           <SelectItem value="taitung">台東</SelectItem>
//           <SelectItem value="penghu">澎湖</SelectItem>
//           <SelectItem value="kinmen">金門</SelectItem>
//           <SelectItem value="lienchiang">連江</SelectItem>
//         </SelectContent>
//       </Select>
//       {errors.classLocation && <p className="text-red-600">{errors.classLocation.message}</p>}
//     </div>
//     <div>
//       <label htmlFor="classType" className="block text-sm font-medium text-gray-700">
//         教學模式
//       </label>
//       <Select onValueChange={value => setValue('classType', value)}>
//         <SelectTrigger className="w-fit">
//           <SelectValue placeholder="選擇教學模式" />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectItem value="one-on-one">一對一</SelectItem>
//           <SelectItem value="large-class">大班制</SelectItem>
//           <SelectItem value="small-class">小班制</SelectItem>
//           <SelectItem value="online-course">線上課程</SelectItem>
//         </SelectContent>
//       </Select>
//       {errors.classType && <p className="text-red-600">{errors.classType.message}</p>}
//     </div>
//     <div>
//       <label htmlFor="fee" className="block text-sm font-medium text-gray-700">
//         費用
//       </label>
//       <Input
//         id="fee"
//         type="number"
//         {...register('fee', { valueAsNumber: true })}
//         className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//       />
//       {errors.fee && <p className="text-red-600">{errors.fee.message}</p>}
//     </div>
//     <div>
//       <label htmlFor="teachingMethod" className="block text-sm font-medium text-gray-700">
//         教學方式
//       </label>
//       <Select onValueChange={value => setValue('teachingMethod', value)}>
//         <SelectTrigger className="w-fit">
//           <SelectValue placeholder="選擇教學方式" />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectItem value="hands-on">手把手教制</SelectItem>
//           <SelectItem value="self-guided">放養制</SelectItem>
//         </SelectContent>
//       </Select>
//       {errors.teachingMethod && <p className="text-red-600">{errors.teachingMethod.message}</p>}
//     </div>
//     <div>
//       <label htmlFor="technology" className="block text-sm font-medium text-gray-700">
//         技術
//       </label>
//       <Input
//         placeholder="React, JavaScript, TypeScript ......"
//         id="technology"
//         type="text"
//         {...register('technology')}
//         className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//       />
//       {errors.technology && <p className="text-red-600">{errors.technology.message}</p>}
//     </div>
//     <div>
//       <label htmlFor="totalDays" className="block text-sm font-medium text-gray-700">
//         總天數
//       </label>
//       <Input
//         id="totalDays"
//         type="number"
//         {...register('totalDays', { valueAsNumber: true })}
//         className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//       />
//       {errors.totalDays && <p className="text-red-600">{errors.totalDays.message}</p>}
//     </div>
//     <div>
//       <label htmlFor="weeklyHours" className="block text-sm font-medium text-gray-700">
//         每週幾小時
//       </label>
//       <Input
//         id="weeklyHours"
//         type="number"
//         {...register('weeklyHours', { valueAsNumber: true })}
//         className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//       />
//       {errors.weeklyHours && <p className="text-red-600">{errors.weeklyHours.message}</p>}
//     </div>
//   </>
//   )
// }
