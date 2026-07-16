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

The production export is published from the `gh-pages` branch. Build it with
`NEXT_PUBLIC_BASE_PATH=/zcash10years npm run build:pages`, then publish the
contents of the generated `out` directory to that branch.
