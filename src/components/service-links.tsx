import { Button } from '@/components/ui/button'

export const ServiceLinks = () => {
  return (
    <div className="flex items-start flex-col md:flex-row gap-0 md:gap-4">
      <Button variant="link" className="p-0" asChild>
        <a
          href="https://palladians.xyz/privacy"
          target="_blank"
          rel="noreferrer noopener"
        >
          Privacy Policy
        </a>
      </Button>
      <Button variant="link" className="p-0" asChild>
        <a
          href="https://palladians.xyz/terms"
          target="_blank"
          rel="noreferrer noopener"
        >
          Terms and Conditions
        </a>
      </Button>
      <Button variant="link" className="p-0" asChild>
        <a
          href="https://status.palladians.xyz/status/minaverse"
          target="_blank"
          rel="noreferrer noopener"
        >
          Service Status
        </a>
      </Button>
    </div>
  )
}
