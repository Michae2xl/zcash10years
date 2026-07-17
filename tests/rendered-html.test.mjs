import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the English Zcash archive", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="en">/i);
  assert.match(html, /<title>From Iron to Code \| Zcash, 2013–2026<\/title>/i);
  assert.match(html, /2013–2026/);
  assert.match(html, /Zerocoin/);
  assert.match(html, /NU6\.3 · Ironwood/);
  assert.match(html, /aria-label="10 Years"/);
  assert.match(html, />10<\/b>/);
  assert.match(html, />YEARS<\/span>/);
  assert.doesNotMatch(html, /BEGIN WITH SOUND/);
});

test("keeps the main chronology scoped to 2013–2026", async () => {
  const [page, layout, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  const eras = page.match(/\n    chapter: /g) ?? [];
  assert.equal(eras.length, 13);
  assert.match(page, /year: "2013",\n    chapter: "Zerocoin"/);
  assert.match(page, /date: "JULY 28, 2026"/);
  assert.match(page, /chapter: "NU6\.3 · Ironwood"/);
  assert.doesNotMatch(page, /const PROLOGUE = \[/);
  assert.doesNotMatch(page, /entry-gate/);
  assert.match(page, /aria-label="10 Years"/);
  assert.match(page, /href=\{assetPath\("\/"\)\} aria-label="Return to the 2013 beginning"/);
  assert.doesNotMatch(page, /className="zcash-brand" href="https:\/\/z\.cash\/"/);
  assert.match(page, /if \(!era\.logo\)/);
  assert.match(page, /KNOW MORE ↗/);
  assert.match(page, /new AudioContext\(\)/);
  assert.match(page, /\/upgrades\/sprout\.png/);
  assert.match(page, /\/upgrades\/sapling\.png/);
  assert.match(page, /\/upgrades\/zebra\.png/);
  assert.match(page, /\/upgrades\/ironwood\.png/);
  assert.match(page, /\/ironwood-finale\.png/);
  assert.match(page, /setFinale\(true\)/);
  assert.match(page, /finale-curtain--left/);

  assert.match(layout, /title: "From Iron to Code \| Zcash, 2013–2026"/);
  assert.match(layout, /rel="preload" as="image" href=\{assetPath\("\/ironwood-finale\.png"\)\}/);
  assert.match(css, /\.masthead-center b/);
  assert.match(css, /\.upgrade-mark--learn/);
  assert.match(css, /\.upgrade-mark--zebra img/);
  assert.match(css, /\.figure-dossier/);
  assert.match(css, /@keyframes finale-tear-left/);
  assert.match(css, /@keyframes finale-shockwave/);
  assert.match(css, /@media \(max-width: 760px\)/);
});
