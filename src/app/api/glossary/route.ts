import { NextResponse } from 'next/server'
import { groupBy } from 'rambda'

import { pocketbase } from '@/lib/pocketbase'

export async function GET() {
  const terms = await pocketbase
    .collection('glossary_terms')
    .getFullList({ sort: 'term', requestKey: null })
  const mappedTerms = terms.map((term) => ({
    term: term.term,
    definition: term.definition,
    aka: term.aka
  }))
  const byLetter = groupBy((term) => term.term[0].toUpperCase(), mappedTerms)
  const sorted = Object.entries(byLetter).sort()
  return NextResponse.json(sorted)
}
