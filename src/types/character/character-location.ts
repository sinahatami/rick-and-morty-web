import { Character } from "../api";

export interface CharacterLocationsProps {
  origin: Character['origin'];
  location: Character['location'];
  onLocationClick?: (url: string) => void;
}
