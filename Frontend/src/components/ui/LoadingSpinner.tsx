import { cn } from '@/lib/utils'
import { Loader2Icon } from 'lucide-react'

const LoadingSpinner = ({ className }: { className?: string }) => {
  return (
    <span className={cn(
      'flex justify-center items-center gap-2.5',
      className
    )}>
      <span className='flex gap-2.5'>
        <Loader2Icon className='animate-spin' /> Loading
      </span>
    </span>
  )
}

export default LoadingSpinner
