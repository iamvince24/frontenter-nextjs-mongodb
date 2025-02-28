import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { FaExclamationTriangle } from 'react-icons/fa'

interface ErrorAlertProps {
  title?: string
  error?: unknown
  message?: string
  className?: string
}

export function ErrorAlert({
  title = '載入失敗',
  error,
  message = '未知錯誤',
  className = 'w-full py-10 px-4 max-w-3xl mx-auto',
}: ErrorAlertProps) {
  const errorMessage = error instanceof Error ? error.message : message

  return (
    <div className={className}>
      <Alert variant="destructive">
        <FaExclamationTriangle className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{errorMessage}</AlertDescription>
      </Alert>
    </div>
  )
}
