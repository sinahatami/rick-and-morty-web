'use client';

import { X } from 'lucide-react';
import { type RefObject } from 'react';

import { Button } from '~/components/controls/Button';
import { FilterSelect } from '~/components/controls/FilterSelect';
import { Popover, PopoverAnchor, PopoverContent } from '~/components/ui/popover';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '~/components/ui/sheet';
import { useMediaQuery } from '~/hooks/useMediaQuery';

interface FilterPanelContentProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  /** The selectable values per filter, keyed by filter name. */
  filterOptions: Record<string, readonly string[]>;
  /** The values being edited (empty string = "all"). */
  draft: Record<string, string>;
  onDraftChange: (key: string, value: string) => void;
  canReset: boolean;
  onApply: () => void;
  onReset: () => void;
  /** Receives the focus again when the panel closes. */
  returnFocusTo: RefObject<HTMLElement | null>;
}

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

/**
 * The filter form inside a popover (desktop) or a bottom sheet (mobile). It lives in its own file
 * so that Radix Popover, Dialog and Select are only downloaded when the panel is first opened.
 */
export function FilterPanelContent({
  isOpen,
  onOpenChange,
  filterOptions,
  draft,
  onDraftChange,
  canReset,
  onApply,
  onReset,
  returnFocusTo,
}: FilterPanelContentProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const accent = (
    <div className="h-1.5 w-full bg-linear-to-r from-theme-from via-theme-via to-theme-to" />
  );

  const form = (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <h2 className="text-lg font-black tracking-tight text-gray-900">Refine Search</h2>
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="rounded-full p-2 transition-colors hover:bg-gray-100"
          aria-label="Close filters"
        >
          <X className="h-5 w-5 text-gray-600" aria-hidden="true" />
        </button>
      </div>

      <div className="space-y-5">
        {Object.entries(filterOptions).map(([key, options]) => (
          <FilterSelect
            key={key}
            label={capitalize(key)}
            value={draft[key] ?? ''}
            options={options}
            onChange={value => onDraftChange(key, value)}
          />
        ))}
      </div>

      <div className="flex gap-3 pt-2">
        <Button
          onClick={onReset}
          disabled={!canReset}
          className="flex-1 border-none bg-transparent py-3 text-xs tracking-widest text-gray-600 uppercase shadow-none hover:bg-red-50 hover:text-red-700"
        >
          Reset
        </Button>
        <Button
          onClick={onApply}
          className="flex-[2] py-3 text-xs tracking-widest uppercase shadow-md"
        >
          Apply
        </Button>
      </div>
    </div>
  );

  const restoreFocus = (event: Event) => {
    event.preventDefault();
    returnFocusTo.current?.focus();
  };

  if (isDesktop) {
    return (
      <Popover open={isOpen} onOpenChange={onOpenChange}>
        <PopoverAnchor className="pointer-events-none absolute inset-0" />
        <PopoverContent
          align="end"
          sideOffset={12}
          aria-label="Refine search"
          className="w-96 overflow-hidden rounded-3xl border-gray-100 p-0 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]"
          onCloseAutoFocus={restoreFocus}
        >
          {accent}
          {form}
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="overflow-hidden rounded-t-[2.5rem] border-0 p-0 [&>button]:hidden"
        onCloseAutoFocus={restoreFocus}
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Refine search</SheetTitle>
          <SheetDescription>Choose filters for the list, then apply them.</SheetDescription>
        </SheetHeader>
        {accent}
        {form}
      </SheetContent>
    </Sheet>
  );
}
