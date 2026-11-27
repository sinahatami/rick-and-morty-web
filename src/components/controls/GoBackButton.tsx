'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface GoBackButtonProps {
  /** Where to go when the page was opened directly and there is nothing to go back to. */
  fallbackHref: string;
  label?: string;
}

export function GoBackButton({ fallbackHref, label = 'Go back' }: GoBackButtonProps) {
  const router = useRouter();

  const goBack = () => {
    if (window.history.length > 1) router.back();
    else router.push(fallbackHref);
  };

  return (
    <button
      type="button"
      onClick={goBack}
      className="group flex items-center gap-2 text-lg font-medium text-gray-900 transition-colors hover:text-black"
    >
      <ArrowLeft
        className="h-5 w-5 transition-transform group-hover:-translate-x-1"
        aria-hidden="true"
      />
      <span className="uppercase">{label}</span>
    </button>
  );
}
