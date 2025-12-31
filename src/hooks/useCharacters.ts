import { Character, CharacterFilters } from '~/types';
import { useResourceQuery } from './useResourceQuery';

export function useCharacters(filters: CharacterFilters = {}) {
  const result = useResourceQuery<Character, CharacterFilters>({
    resource: 'characters',
    filters,
  });

  const { items, ...rest } = result;

  return {
    characters: items,
    ...rest,
  };
}