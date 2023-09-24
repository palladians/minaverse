'use client'

import { type FormEvent, useState } from 'react'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { useTranslation } from '@/lib/i18n/client'
import { SentinelCollections, sentinelPocketbase } from '@/lib/pocketbase'

interface AccountReportDialogProps {
  publicKey: string
}

interface ReportBody {
  publicKey: string
  description: string
  attachment?: File
}

const AllowedFileTypes = ['application/pdf', 'image/jpeg', 'image/png']
const Megabyte = Math.pow(1024, 2)

const FormSchema = z.object({
  reason: z.string().trim().min(3).max(256),
  evidence: z.instanceof(File)
})

export const AccountReportDialog = ({
  publicKey
}: AccountReportDialogProps) => {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()
  const { toast } = useToast()
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const validation = FormSchema.safeParse(Object.fromEntries(formData))
    if (!validation.success) return // invalid form
    const { reason, evidence } = validation.data
    const reportBody: ReportBody = { publicKey, description: reason }
    if (evidence.size) {
      if (evidence.size > Megabyte) return // invalid file size
      if (!AllowedFileTypes.includes(evidence.type)) return // invalid file type
      reportBody.attachment = evidence
    }
    await sentinelPocketbase
      .collection(SentinelCollections.reports)
      .create(reportBody)
      .then(() => {
        setOpen(false)
        toast({ description: t('accountReport.toast') })
      })
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link" className="ml-auto">
          {t('accountReport.trigger')}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('accountReport.title')}</DialogTitle>
        </DialogHeader>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="reason">{t('accountReport.reason')}</Label>
            <Textarea
              id="reason"
              name="reason"
              className="resize-none"
              placeholder={t('accountReport.reasonDescription')}
              minLength={3}
              maxLength={256}
              required
            />
          </div>
          <div>
            <Label htmlFor="evidence">{t('accountReport.evidence')}</Label>
            <Input
              id="evidence"
              name="evidence"
              type="file"
              accept={AllowedFileTypes.join(', ')}
            />
          </div>
          <Button className="w-full">{t('accountReport.submit')}</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
