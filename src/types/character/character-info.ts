import { CharacterGender, CharacterSpecies } from './character-species-status-gender';

export interface CharacterInfoProps {
  name: string;
  species: CharacterSpecies;
  gender: CharacterGender;
}
