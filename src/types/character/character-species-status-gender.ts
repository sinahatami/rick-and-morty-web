export const SPECIES_OPTIONS = ['Alien', 'Human', 'unknown'] as const;
export const GENDER_OPTIONS = ['Female', 'Male', 'Genderless', 'unknown'] as const;
export const STATUS_OPTIONS = ['Alive', 'Dead', 'unknown'] as const;

export type CharacterSpecies = (typeof SPECIES_OPTIONS)[number];
export type CharacterGender = (typeof GENDER_OPTIONS)[number];
export type CharacterStatus = (typeof STATUS_OPTIONS)[number];
