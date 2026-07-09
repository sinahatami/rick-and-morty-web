import { Character, CharacterFilters } from '~/types';
import { useResourceQuery } from './useResourceQuery';
import { apiClient } from '~/lib/api-client';

export function useCharacters(filters: CharacterFilters = {}) {
  const result = useResourceQuery<Character, CharacterFilters>({
    queryKeyPrefix: 'characters',
    filters,
    fetchFn: params => apiClient.characters.getAll(params),
  });

  const { items, ...rest } = result;

  return { characters: items, ...rest };
}
