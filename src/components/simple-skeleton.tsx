import { Skeleton } from '@/components/ui/skeleton'

export const SimpleSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
    </div>
  )
}
