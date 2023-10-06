import { matchSorter } from 'match-sorter'
import { Metadata } from 'next'
import Highlighter from 'react-highlight-words'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { env } from '@/env.mjs'
import { getT } from '@/lib/i18n/server'
import { titleTemplate } from '@/lib/metadata'

type Term = {
  term: string
  definition: string
  aka?: string
}

type LetterTerms = [string, Term[]]

type Glossary = LetterTerms[]

type GlossaryPageProps = { searchParams: { search: string } }

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getT()
  return {
    title: titleTemplate(t('common.glossary'))
  }
}

const GlossaryPage = async ({ searchParams }: GlossaryPageProps) => {
  const query = searchParams.search || ''
  const t = await getT()
  const glossary = (await fetch(env.NEXT_PUBLIC_APP_URL + '/api/glossary').then(
    (res) => res.json()
  )) as Glossary
  const filteredGlossary = matchSorter(glossary, query, {
    keys: ['1.*.term']
  })
  return (
    <div className="max-w-[40rem] mx-auto flex flex-1 flex-col gap-8">
      <h1 className="text-2xl font-semibold" data-testid="transactions__header">
        {t('common.glossary')}
      </h1>
      <form>
        <Input
          name="search"
          placeholder="Search for terms"
          defaultValue={query}
        />
      </form>
      {filteredGlossary.map(([letter, terms]) => {
        return (
          <div className="flex flex-col gap-4">
            <h2>{letter}</h2>
            <Accordion type="single" collapsible>
              {terms.map((term, i) => (
                <AccordionItem value={`${letter}-${i}`}>
                  <AccordionTrigger>
                    <Highlighter
                      searchWords={[query]}
                      autoEscape={true}
                      textToHighlight={term.term}
                    />
                  </AccordionTrigger>
                  <AccordionContent className="leading-7">
                    {term.definition}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )
      })}
    </div>
  )
}

export default GlossaryPage
