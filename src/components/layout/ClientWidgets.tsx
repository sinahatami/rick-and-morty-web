'use client';

import dynamic from 'next/dynamic';

// Purely decorative or on-demand widgets: they never block the first render.
const CustomCursor = dynamic(
  () => import('~/components/controls/CustomCursor').then(module => module.CustomCursor),
  { ssr: false },
);
const ScrollToTop = dynamic(
  () => import('~/components/controls/ScrollToTop').then(module => module.ScrollToTop),
  { ssr: false },
);
const Toaster = dynamic(() => import('~/components/ui/sonner').then(module => module.Toaster), {
  ssr: false,
});

export function ClientWidgets() {
  return (
    <>
      <CustomCursor />
      <ScrollToTop />
      <Toaster position="bottom-right" />
    </>
  );
}
