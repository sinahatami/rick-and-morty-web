import { Html, Head, Main, NextScript } from 'next/document';

import { BASE_PATH } from '~/lib/constants';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href={`${BASE_PATH}/images/icon.png`} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
