import { useToast } from '@/components/ui/use-toast'

export const useClipboard = () => {
  const { toast } = useToast()
  const copyValue = async ({ value }: { value: string }) => {
    await navigator.clipboard.writeText(value)
    toast({ title: 'The value was copied to clipboard.' })
  }
  return {
    copyValue
  }
}
