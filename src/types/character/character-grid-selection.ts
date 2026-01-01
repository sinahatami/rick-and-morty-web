import { Theme } from "~/types";

export interface CharacterGridSectionProps {
  title: string;
  characterIds: number[];
  icon?: any;
  emptyTitle?: string;
  emptyMessage?: string;
  theme: Theme
}