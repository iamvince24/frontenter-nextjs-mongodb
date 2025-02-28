import { Card, CardContent, CardDescription } from '@/components/ui/card'

interface EmptyStateProps {
  icon?: React.ReactNode
  message: string
  className?: string
}

export function EmptyState({ icon, message, className = 'w-full py-20 flex justify-center' }: EmptyStateProps) {
  const defaultIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-12 w-12 text-muted-foreground"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
      />
    </svg>
  )

  return (
    <div className={className}>
      <Card className="w-full max-w-md">
        <CardContent className="pt-6 text-center">
          <div className="flex flex-col items-center gap-2">
            {icon || defaultIcon}
            <CardDescription className="text-base">{message}</CardDescription>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
