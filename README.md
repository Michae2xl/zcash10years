# Zcash: From Iron to Code

An interactive English-language archive covering the path from Zerocoin and
Zerocash to Zcash, Zebra and the Ironwood network upgrade (2013–2026).

The story is presented through evolving writing surfaces and machines: research
cards, kraft paper, archival stock, e-ink, terminals and a multi-agent CLI.

## Live site

[michae2xl.github.io/zcash10years](https://michae2xl.github.io/zcash10years/)

## Local development

Requires Node.js 22 or newer.

```bash
npm install
npm run dev
```

## Validation

```bash
npm test
NEXT_PUBLIC_BASE_PATH=/zcash10years npm run build:pages
```

## Deployment

Every push to `main` exports the application as a static site and deploys the
`out` directory through GitHub Actions to GitHub Pages.
