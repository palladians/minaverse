# Minaverse

[![Discord](https://img.shields.io/discord/1127906495409958953?label=Discord)](https://discord.gg/ExzzfTGUnB)

<a href="https://minaverse.xyz">
  <img src="https://github.com/palladians/minaverse/blob/main/logo.png" />
</a>

Explore the universe of Mina Protocol.

## Stack

- Next.js 13.4 & React Server Components
- [Tremor](https://www.tremor.so/components), [shadcn/ui](https://ui.shadcn.com/), Tailwind
- Playwright

## Getting Started

### Prerequisite

- NVM
- PNPM

### Prepare

```bash
cp .env.example .env # copy env variables
# Adjust ENV variables in .env
pnpm i # install dependencies
```

### Dev server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build app

```bash
pnpm build
```

### Lint & format

```bash
pnpm format
```

## Contributors

<a href="https://github.com/palladians/minaverse/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=palladians/minaverse" />
</a>

Made with [contrib.rocks](https://contrib.rocks).

## Acknowledgements

- Big thanks to Gareth Davies for creating and maintaining Mina Explorer APIs.
- Prices are fetched with CoinGecko.
