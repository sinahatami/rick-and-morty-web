import {
  CharacterGender,
  CharacterSpecies,
  CharacterStatus,
} from './character-species-status-gender';

export interface CharacterFilters {
  name?: string;
  status?: CharacterStatus;
  species?: CharacterSpecies;
  gender?: CharacterGender;
  [key: string]: string | undefined;
}
