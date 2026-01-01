import { useRouter } from 'next/router';
import { AlertCircle } from 'lucide-react';

import { getThemeStyles } from '~/lib/theme';
import { NotFoundStateProps } from '~/types';
import { Button } from '../Button';

export function NotFoundState({
  title,
  message,
  backLabel = 'Return to Safety',
  theme = 'portal',
}: NotFoundStateProps) {
  const router = useRouter();
  const styles = getThemeStyles(theme);

  return (
    <div className="flex flex-col items-center justify-center p-12 mt-24 text-center max-w-lg mx-auto">
      <div className={`p-6 rounded-full mb-6 ${styles.lightBg}`}>
        <AlertCircle className="h-12 w-12" style={{ color: styles.primary }} />
      </div>

      <h2 className="text-2xl font-black text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-500 mb-8">{message}</p>

      <Button onClick={() => router.back()} className="font-bold">
        {backLabel}
      </Button>
    </div>
  );
}
