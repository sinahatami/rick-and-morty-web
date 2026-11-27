import { createFilterParser } from '~/lib/filters';

const STATUS_OPTIONS = ['Alive', 'Dead', 'unknown'] as const;
const SPECIES_OPTIONS = ['Alien', 'Human', 'unknown'] as const;
const GENDER_OPTIONS = ['Female', 'Male', 'Genderless', 'unknown'] as const;

export type CharacterFilters = {
  name?: string;
  status?: (typeof STATUS_OPTIONS)[number];
  species?: (typeof SPECIES_OPTIONS)[number];
  gender?: (typeof GENDER_OPTIONS)[number];
};

export const CHARACTER_FILTER_OPTIONS = {
  status: STATUS_OPTIONS,
  species: SPECIES_OPTIONS,
  gender: GENDER_OPTIONS,
};

export const parseCharacterFilters = createFilterParser<CharacterFilters>({
  name: true,
  status: STATUS_OPTIONS,
  species: SPECIES_OPTIONS,
  gender: GENDER_OPTIONS,
});
