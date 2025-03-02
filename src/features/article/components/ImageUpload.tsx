'use client'

import { useState } from 'react'
import Image from 'next/image'
import { CldUploadWidget, CldUploadWidgetProps } from 'next-cloudinary'
import { Button } from '@/components/ui/button'
import { UseFormRegister, UseFormSetValue } from 'react-hook-form'

interface ImageUploaderProps {
  register: UseFormRegister<any>
  setValue: UseFormSetValue<any>
  fieldName?: string
  uploadPreset?: string
}

export const ImageUploader = ({
  register,
  setValue,
  fieldName = 'imageUrl',
  uploadPreset = 'qlq9mpxc',
}: ImageUploaderProps) => {
  const [imageUrl, setImageUrl] = useState<string>('')
  const [imageWidth, setImageWidth] = useState<number>(0)
  const [imageHeight, setImageHeight] = useState<number>(0)

  const handleUpload: CldUploadWidgetProps['onSuccess'] = (result: any) => {
    if (result.event === 'success') {
      setImageUrl(result.info.secure_url)
      setValue(fieldName, result.info.secure_url)
      setImageWidth(result.info.width)
      setImageHeight(result.info.height)
    }
  }

  return (
    <div>
      <label htmlFor={fieldName}>Upload Image:</label>
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
          <Button type="button" onClick={() => open?.()}>
            Upload Image
          </Button>
        )}
      </CldUploadWidget>
      {imageUrl && (
        <div>
          <Image src={imageUrl} alt="Uploaded Image" width={imageWidth} height={imageHeight} />
        </div>
      )}
    </div>
  )
}
