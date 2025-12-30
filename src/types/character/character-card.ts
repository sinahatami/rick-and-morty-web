import { Character } from "../api/character";

export interface CharacterCardProps {
  character: Character;
  onClick?: () => void;
}