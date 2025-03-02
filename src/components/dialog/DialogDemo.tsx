import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { NavButton } from '../ui/NavButton'

type DialogDemoProps = {
  name: string
  children: React.ReactNode
  onSuccess?: () => void
}

export function DialogDemo({ name, children, onSuccess }: DialogDemoProps) {
  const [open, setOpen] = React.useState(false)

  const handleSuccess = () => {
    setOpen(false)
    if (onSuccess) {
      onSuccess()
    }
  }

  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { onDialogClose: handleSuccess } as any)
    }
    return child
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <NavButton>{name}</NavButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
        </DialogHeader>
        {childrenWithProps}
      </DialogContent>
    </Dialog>
  )
}
