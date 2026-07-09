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
import { useDebounce } from '~/hooks/useDebounce';

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const router = useRouter();

  // Fetch live character data based on search input
  const { characters, isLoading } = useCharacters({
    name: debouncedSearch || undefined,
  });

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
        <span>Search characters...</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-white px-1.5 font-mono text-[10px] font-medium text-gray-500 opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen} shouldFilter={false}>
        <CommandInput
          placeholder="Search for any character or navigate..."
          value={search}
          onValueChange={setSearch}
        />
        <CommandList>
          {isLoading ? (
            <div className="py-6 flex items-center justify-center text-sm text-gray-500">
              <Loader2 className="h-4 w-4 animate-spin mr-2" /> Searching multiverse...
            </div>
          ) : (
            <CommandEmpty>No results found for &quot;{search}&quot;.</CommandEmpty>
          )}

          {characters.length > 0 && (
            <CommandGroup heading="Characters (Live Search)">
              {characters.slice(0, 5).map(character => (
                <CommandItem
                  key={character.id}
                  value={`character-${character.name}-${character.id}`}
                  onSelect={() =>
                    runCommand(() => router.push(ROUTES.CHARACTERS.DETAIL(character.id.toString())))
                  }
                  className="cursor-pointer flex items-center gap-3 py-2"
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
                    <span className="text-xs text-gray-500">
                      {character.species} • {character.status}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          <CommandSeparator />

          <CommandGroup heading="Navigation">
            <CommandItem
              value="navigate-characters"
              onSelect={() => runCommand(() => router.push(ROUTES.CHARACTERS.LIST))}
              className="cursor-pointer font-bold"
            >
              <UsersRound className="mr-2 h-4 w-4 text-[#00B5CC]" />
              <span>Browse All Characters</span>
            </CommandItem>
            <CommandItem
              value="navigate-locations"
              onSelect={() => runCommand(() => router.push(ROUTES.LOCATIONS.LIST))}
              className="cursor-pointer font-bold"
            >
              <Map className="mr-2 h-4 w-4 text-[#00B5CC]" />
              <span>Browse All Locations</span>
            </CommandItem>
            <CommandItem
              value="navigate-episodes"
              onSelect={() => runCommand(() => router.push(ROUTES.EPISODES.LIST))}
              className="cursor-pointer font-bold"
            >
              <Film className="mr-2 h-4 w-4 text-[#00B5CC]" />
              <span>Browse All Episodes</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
