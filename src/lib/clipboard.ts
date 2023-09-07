import { useToast } from '@/components/ui/use-toast'
import { useTranslation } from '@/lib/i18n/client'

export const useClipboard = () => {
  const { t } = useTranslation()
  const { toast } = useToast()
  const copyValue = async ({ value }: { value: string }) => {
    await navigator.clipboard.writeText(value)
    toast({ title: t('common.valueCopied') })
  }
  return {
    copyValue
  }
}
