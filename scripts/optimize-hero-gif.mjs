/**
 * Smaller hero GIF at same 700×700 display size (CSS unchanged).
 * Requires: npx gifsicle (pulled on first run).
 *
 * Run: node scripts/optimize-hero-gif.mjs [input.gif]
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const input =
  process.argv[2] ??
  new URL('../src/assets/hero-workspace-transparent.gif', import.meta.url).pathname;
const output = input;

const before = readFileSync(input).length;
const dir = mkdtempSync(join(tmpdir(), 'hero-gif-'));
const out = join(dir, 'out.gif');

try {
  execFileSync(
    'npx',
    [
      '--yes',
      'gifsicle',
      '-O3',
      '--lossy=35',
      '--colors',
      '128',
      '--no-warnings',
      '-o',
      out,
      input,
    ],
    { stdio: 'inherit' },
  );
  writeFileSync(output, readFileSync(out));
  const after = readFileSync(output).length;
  console.log(
    `Optimized → ${output}: ${(before / 1024).toFixed(0)} KiB → ${(after / 1024).toFixed(0)} KiB`,
  );
} finally {
  rmSync(dir, { recursive: true, force: true });
}
