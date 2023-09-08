import { truncateString } from '@/lib/string'

it('truncates a wallet address', () => {
  const address = '0x1234567890abcdef1234567890abcdef12345678'
  expect(
    truncateString({ value: address, firstCharCount: 8, endCharCount: 8 })
  ).toEqual('0x123456...12345678')
})
