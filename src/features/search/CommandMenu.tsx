'use client';

import { useQuery } from '@tanstack/react-query';
import { Film, Loader2, Map, UsersRound } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { RemoteImage } from '~/components/data-display/RemoteImage';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '~/components/ui/command';
import { useDebounce } from '~/hooks/useDebounce';
import { api } from '~/lib/api/client';
import { formatDate } from '~/lib/format';
import { ROUTES } from '~/lib/routes';

interface CommandMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RESULTS_PER_GROUP = 3;

/** The universal search dialog (Ctrl/⌘ + K): characters, locations and episodes in one place. */
export function CommandMenu({ open, onOpenChange }: CommandMenuProps) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const term = useDebounce(search.trim(), 300);

  // Nothing is requested until the dialog is opened.
  const characters = useQuery({
    queryKey: ['search', 'characters', term],
    queryFn: ({ signal }) => api.characters.list({ name: term }, signal),
    select: page => page.results.slice(0, RESULTS_PER_GROUP),
    enabled: open,
  });
  const locations = useQuery({
    queryKey: ['search', 'locations', term],
    queryFn: ({ signal }) => api.locations.list({ name: term }, signal),
    select: page => page.results.slice(0, RESULTS_PER_GROUP),
    enabled: open,
  });
  const episodes = useQuery({
    queryKey: ['search', 'episodes', term],
    queryFn: ({ signal }) => api.episodes.list({ name: term }, signal),
    select: page => page.results.slice(0, RESULTS_PER_GROUP),
    enabled: open,
  });

  const isSearching = characters.isLoading || locations.isLoading || episodes.isLoading;
  const hasResults = [characters, locations, episodes].some(query => (query.data?.length ?? 0) > 0);

  const go = (href: string) => {
    onOpenChange(false);
    setSearch('');
    router.push(href);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange} shouldFilter={false}>
      <CommandInput
        placeholder="Search for any character, location, or episode..."
        value={search}
        onValueChange={setSearch}
      />
      <CommandList>
        {isSearching ? (
          <div className="flex items-center justify-center py-6 text-sm text-gray-600">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" /> Searching
            multiverse...
          </div>
        ) : !hasResults && search ? (
          <CommandEmpty>No results found for &quot;{search}&quot;.</CommandEmpty>
        ) : null}

        {(characters.data?.length ?? 0) > 0 && (
          <CommandGroup heading="Characters">
            {characters.data?.map(character => (
              <CommandItem
                key={character.id}
                value={`character-${character.name}-${character.id}`}
                onSelect={() => go(ROUTES.characters.detail(character.id))}
                className="flex cursor-pointer items-center gap-3 py-2"
              >
                <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-gray-200">
                  <RemoteImage src={character.image} alt="" className="object-cover" sizes="32px" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold">{character.name}</span>
                  <span className="text-xs text-gray-600">
                    {character.species} • {character.status}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {(locations.data?.length ?? 0) > 0 && (
          <CommandGroup heading="Locations">
            {locations.data?.map(location => (
              <CommandItem
                key={location.id}
                value={`location-${location.name}-${location.id}`}
                onSelect={() => go(ROUTES.locations.detail(location.id))}
                className="flex cursor-pointer items-center gap-3 py-2"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100">
                  <Map className="h-4 w-4 text-blue-700" aria-hidden="true" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold">{location.name}</span>
                  <span className="text-xs text-gray-600">
                    {location.type} • {location.dimension}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {(episodes.data?.length ?? 0) > 0 && (
          <CommandGroup heading="Episodes">
            {episodes.data?.map(episode => (
              <CommandItem
                key={episode.id}
                value={`episode-${episode.name}-${episode.id}`}
                onSelect={() => go(ROUTES.episodes.detail(episode.id))}
                className="flex cursor-pointer items-center gap-3 py-2"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100">
                  <Film className="h-4 w-4 text-orange-800" aria-hidden="true" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold">{episode.name}</span>
                  <span className="text-xs text-gray-600">
                    {episode.episode} • {formatDate(episode.air_date)}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {(!search || (!hasResults && !isSearching)) && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Quick Navigation">
              <CommandItem
                value="navigate-characters"
                onSelect={() => go(ROUTES.characters.list)}
                className="cursor-pointer font-bold"
              >
                <UsersRound className="mr-2 h-4 w-4 text-primary-ink" aria-hidden="true" />
                <span>Browse All Characters</span>
              </CommandItem>
              <CommandItem
                value="navigate-locations"
                onSelect={() => go(ROUTES.locations.list)}
                className="cursor-pointer font-bold"
              >
                <Map className="mr-2 h-4 w-4 text-primary-ink" aria-hidden="true" />
                <span>Browse All Locations</span>
              </CommandItem>
              <CommandItem
                value="navigate-episodes"
                onSelect={() => go(ROUTES.episodes.list)}
                className="cursor-pointer font-bold"
              >
                <Film className="mr-2 h-4 w-4 text-primary-ink" aria-hidden="true" />
                <span>Browse All Episodes</span>
              </CommandItem>
            </CommandGroup>
          </>
        )}
      </CommandList>
    </CommandDialog>
  );
}
