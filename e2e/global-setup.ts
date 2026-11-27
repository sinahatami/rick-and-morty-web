import { existsSync } from 'node:fs';

export default function globalSetup() {
  if (!existsSync('out/index.html')) {
    throw new Error('No static build found in out/. Run `pnpm build` before `pnpm e2e`.');
  }
}
