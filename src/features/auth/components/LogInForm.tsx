'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { loginSchema, useLogin } from '../hooks/useLogin'

type LogInFormProps = {
  onDialogClose?: () => void
  setOpen?: (open: boolean) => void
}

export default function LogInForm({ onDialogClose, setOpen }: LogInFormProps) {
  const { login, isPending, error } = useLogin()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'test1234@gmail.com',
      password: 'test1234',
    },
  })

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      await login(values)
      if (onDialogClose) {
        onDialogClose()
      }
      if (setOpen) {
        setOpen(false)
      }
    } catch (error) {
      console.error('登入失敗:', error)
    }
  }
  return (
    <div>
      <CardHeader className="text-center">
        <CardTitle>登入</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4 flex flex-col items-center" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full max-w-sm">
                  <FormLabel>信箱</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full max-w-sm">
                  <FormLabel>密碼</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="" {...field} />
                  </FormControl>
                  <FormDescription>密碼長度不可小於 8 個字元</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center w-full">
              <Button type="submit" className="w-32" disabled={isPending}>
                登入
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </div>
  )
}
