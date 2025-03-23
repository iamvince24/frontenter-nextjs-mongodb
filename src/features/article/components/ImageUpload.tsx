'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { CldUploadWidget, CldUploadWidgetProps } from 'next-cloudinary'
import { Button } from '@/components/ui/button'
import { UseFormRegister, UseFormSetValue } from 'react-hook-form'

interface ImageUploaderProps {
  register: UseFormRegister<any>
  setValue: UseFormSetValue<any>
  fieldName?: string
  uploadPreset?: string
  initialData?: string
}

export const ImageUploader = ({
  register,
  setValue,
  fieldName = 'imageUrl',
  uploadPreset = 'qlq9mpxc',
  initialData,
}: ImageUploaderProps) => {
  const [imageUrl, setImageUrl] = useState<string>(initialData || '')
  const [imageWidth, setImageWidth] = useState<number>(0)
  const [imageHeight, setImageHeight] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(!!initialData)

  useEffect(() => {
    if (initialData) {
      setValue(fieldName, initialData)

      const img = new window.Image()
      img.onload = () => {
        setImageWidth(img.width)
        setImageHeight(img.height)
        setIsLoading(false)
      }
      img.onerror = () => {
        console.error('Failed to load initial image')
        setIsLoading(false)
      }
      img.src = initialData
    }
  }, [initialData, setValue, fieldName])

  const handleUpload: CldUploadWidgetProps['onSuccess'] = (result: any) => {
    if (result.event === 'success') {
      setImageUrl(result.info.secure_url)
      setValue(fieldName, result.info.secure_url)
      setImageWidth(result.info.width)
      setImageHeight(result.info.height)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={fieldName}>封面圖片上傳:</label>
      <input
        id={fieldName}
        type="url"
        {...register(fieldName)}
        value={imageUrl}
        onChange={e => setImageUrl(e.target.value)}
        hidden
      />
      <CldUploadWidget
        uploadPreset={uploadPreset}
        onSuccess={handleUpload}
        // onFailure={(error) => console.error("Upload failed", error)}
        options={{ sources: ['local'], maxFiles: 1 }}
      >
        {({ open }) => (
          <Button type="button" onClick={() => open?.()} className="w-fit">
            {imageUrl ? '上傳新圖片' : '上傳圖片'}
          </Button>
        )}
      </CldUploadWidget>
      {imageUrl && (
        <div className="mt-2">
          {isLoading ? (
            <div className="animate-pulse bg-gray-200 h-48 w-full rounded-md"></div>
          ) : (
            <Image
              src={imageUrl}
              alt="Uploaded Image"
              width={imageWidth || 300}
              height={imageHeight || 200}
              className="max-w-full h-auto rounded-md"
              priority={!!initialData}
            />
          )}
        </div>
      )}
    </div>
  )
}
