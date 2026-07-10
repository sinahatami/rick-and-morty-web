import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { UsersRound, Map, Film, Search, Loader2 } from 'lucide-react';
import Image from 'next/image';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '~/components/ui/command';
import { ROUTES } from '~/lib/routes';
import { useCharacters } from '~/hooks/useCharacters';
import { useLocations } from '~/hooks/useLocations';
import { useEpisodes } from '~/hooks/useEpisodes';
import { useDebounce } from '~/hooks/useDebounce';

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const router = useRouter();

  const { characters, isLoading: loadingChars } = useCharacters({
    name: debouncedSearch || undefined,
  });
  const { locations, isLoading: loadingLocs } = useLocations({
    name: debouncedSearch || undefined,
  });
  const { episodes, isLoading: loadingEps } = useEpisodes({ name: debouncedSearch || undefined });

  const isSearching = loadingChars || loadingLocs || loadingEps;
  const hasResults = characters.length > 0 || locations.length > 0 || episodes.length > 0;

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(open => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    setSearch('');
    command();
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-500 bg-gray-100/50 hover:bg-gray-100 rounded-xl transition-colors border border-gray-200"
      >
        <Search className="h-4 w-4" />
        <span>Universal Search...</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-white px-1.5 font-mono text-[10px] font-medium text-gray-500 opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen} shouldFilter={false}>
        <CommandInput
          placeholder="Search for any character, location, or episode..."
          value={search}
          onValueChange={setSearch}
        />
        <CommandList>
          {isSearching ? (
            <div className="py-6 flex items-center justify-center text-sm text-gray-500">
              <Loader2 className="h-4 w-4 animate-spin mr-2" /> Searching multiverse...
            </div>
          ) : !hasResults && search ? (
            <CommandEmpty>No results found for &quot;{search}&quot;.</CommandEmpty>
          ) : null}

          {characters.length > 0 && (
            <CommandGroup heading="Characters">
              {characters.slice(0, 3).map(character => (
                <CommandItem
                  key={character.id}
                  value={`character-${character.name}-${character.id}`}
                  onSelect={() =>
                    runCommand(() => router.push(ROUTES.CHARACTERS.DETAIL(character.id.toString())))
                  }
                  className="group cursor-pointer flex items-center gap-3 py-2"
                >
                  <div className="relative h-8 w-8 rounded-full overflow-hidden border border-gray-200 shrink-0">
                    <Image
                      src={character.image}
                      alt={character.name}
                      fill
                      className="object-cover"
                      sizes="32px"
                    />
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

          {locations.length > 0 && (
            <CommandGroup heading="Locations">
              {locations.slice(0, 3).map(location => (
                <CommandItem
                  key={location.id}
                  value={`location-${location.name}-${location.id}`}
                  onSelect={() =>
                    runCommand(() => router.push(ROUTES.LOCATIONS.DETAIL(location.id.toString())))
                  }
                  className="group cursor-pointer flex items-center gap-3 py-2"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 shrink-0 group-hover:bg-white/20 group-data-[selected=true]:bg-white/20">
                    <Map className="h-4 w-4 text-blue-600 group-hover:text-white group-data-[selected=true]:text-white" />
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

          {episodes.length > 0 && (
            <CommandGroup heading="Episodes">
              {episodes.slice(0, 3).map(episode => (
                <CommandItem
                  key={episode.id}
                  value={`episode-${episode.name}-${episode.id}`}
                  onSelect={() =>
                    runCommand(() => router.push(ROUTES.EPISODES.DETAIL(episode.id.toString())))
                  }
                  className="group cursor-pointer flex items-center gap-3 py-2"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 shrink-0 group-hover:bg-white/20 group-data-[selected=true]:bg-white/20">
                    <Film className="h-4 w-4 text-purple-600 group-hover:text-white group-data-[selected=true]:text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold">{episode.name}</span>
                    <span className="text-xs text-gray-600">
                      {episode.episode} • {episode.air_date}
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
                  onSelect={() => runCommand(() => router.push(ROUTES.CHARACTERS.LIST))}
                  className="group cursor-pointer font-bold"
                >
                  <UsersRound className="mr-2 h-4 w-4 text-primary group-hover:text-white group-data-[selected=true]:text-white" />
                  <span>Browse All Characters</span>
                </CommandItem>
                <CommandItem
                  value="navigate-locations"
                  onSelect={() => runCommand(() => router.push(ROUTES.LOCATIONS.LIST))}
                  className="group cursor-pointer font-bold"
                >
                  <Map className="mr-2 h-4 w-4 text-primary group-hover:text-white group-data-[selected=true]:text-white" />
                  <span>Browse All Locations</span>
                </CommandItem>
                <CommandItem
                  value="navigate-episodes"
                  onSelect={() => runCommand(() => router.push(ROUTES.EPISODES.LIST))}
                  className="group cursor-pointer font-bold"
                >
                  <Film className="mr-2 h-4 w-4 text-primary group-hover:text-white group-data-[selected=true]:text-white" />
                  <span>Browse All Episodes</span>
                </CommandItem>
              </CommandGroup>
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
