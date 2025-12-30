export interface URLFiltersCharacter {
  name?: string;
  status?: string;
  species?: string;
  gender?: string;
  [key: string]: string | undefined;
}