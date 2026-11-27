/** @type {import('lint-staged').Configuration} */
const config = {
  // Generated files such as next-env.d.ts are on ESLint's ignore list: that is not a warning to fail on.
  '*.{ts,tsx,js,jsx,mjs,cjs}': [
    'eslint --fix --max-warnings 0 --no-warn-ignored',
    'prettier --write',
  ],
  '*.{json,md,css,yml,yaml}': 'prettier --write',
};

export default config;
