import { AlertCircle } from 'lucide-react';
import Link from 'next/link';

import { type Theme } from '~/lib/theme';

interface NotFoundStateProps {
  title: string;
  message: string;
  backLabel?: string;
  backHref?: string;
  theme?: Theme;
}

export function NotFoundState({
  title,
  message,
  backLabel = 'Return to Safety',
  backHref = '/',
  theme,
}: NotFoundStateProps) {
  return (
    <div
      data-theme={theme}
      className="mx-auto mt-24 flex max-w-lg flex-col items-center justify-center p-12 text-center"
    >
      <div className="mb-6 rounded-full bg-theme/10 p-6">
        <AlertCircle className="h-12 w-12 text-theme-ink" aria-hidden="true" />
      </div>

      <h1 className="mb-2 text-2xl font-black text-gray-900">{title}</h1>
      <p className="mb-8 text-gray-600">{message}</p>

      <Link
        href={backHref}
        className="inline-flex items-center justify-center rounded-xl border-2 border-theme/30 bg-theme/25 px-8 py-3 font-bold text-theme-ink transition-all duration-200 active:scale-95"
      >
        {backLabel}
      </Link>
    </div>
  );
}
