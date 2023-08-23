import { useToast } from '@/components/ui/use-toast'

export const useClipboard = ({ value }: { value: string }) => {
  const { toast } = useToast()
  const copyValue = async () => {
    await navigator.clipboard.writeText(value)
    toast({ title: 'The value was copied to clipboard.' })
  }
  return {
    copyValue
  }
}
