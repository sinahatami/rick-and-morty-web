import { CharacterGender, CharacterSpecies, CharacterStatus } from '~/types';

export interface FilterOptionsCharacter {
  species: CharacterSpecies[];
  gender: CharacterGender[];
  status: CharacterStatus[];
  [key: string]: string[];
}
