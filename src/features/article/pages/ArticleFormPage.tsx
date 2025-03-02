'use client'

import { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'next/navigation'
import { ImageUploader } from '../components/ImageUpload'
import { ArticleSchema } from '@/types/article'

type ArticleFormInputs = z.infer<typeof ArticleSchema>

export default function ArticleFormPage({ authorId }: { authorId: string | undefined }) {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<ArticleFormInputs>({
    resolver: zodResolver(ArticleSchema),
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (data: ArticleFormInputs) => {
    setIsSubmitting(true)

    try {
      if (!data.imageUrl) {
        throw new Error('請上傳圖片')
      }

      const response = await fetch('/api/article', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.error || responseData.message || 'Failed to create article')
      }

      router.push(`/profile/article/self`)
      reset()
    } catch (error) {
      console.error('Error submitting form:', error)
      alert(error instanceof Error ? error.message : '提交失敗，請稍後再試')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!authorId) {
    return <p>Please sign in to create an article.</p>
  }

  return (
    <div className="space-y-6 p-6">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">新增文章</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

        <ImageUploader register={register} setValue={setValue} />

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            內容
          </label>
          <Textarea
            id="content"
            {...register('content')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.content && <p className="text-red-600">{errors.content.message}</p>}
        </div>

        <button
          type="submit"
          // className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm"
          className={`mt-4 py-2 px-4 rounded-md shadow-sm ${
            isSubmitting ? 'bg-black text-white' : 'bg-indigo-600 text-white'
          }`}
          disabled={isSubmitting}
        >
          Submit
        </button>
      </form>
    </div>
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
