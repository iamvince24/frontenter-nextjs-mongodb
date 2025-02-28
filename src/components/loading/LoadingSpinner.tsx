import { Spinner } from '@/components/ui/spinner'

interface LoadingSpinnerProps {
  text?: string
}

export function LoadingSpinner({ text = '載入中...' }: LoadingSpinnerProps) {
  return (
    <div className="w-full flex justify-center items-center py-20">
      <div className="flex flex-col items-center gap-2">
        <Spinner className="h-8 w-8" />
        <p className="text-sm text-muted-foreground">{text}</p>
      </div>
    </div>
  )
}
