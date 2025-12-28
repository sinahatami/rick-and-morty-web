// Character
export interface Character {
    id: number;
    name: string;
    status: 'Alive' | 'Dead' | 'unknown';
    species: string;
    type: string;
    gender: 'Female' | 'Male' | 'unknown';
    origin: LocationReference;
    location: LocationReference;
    image: string;
    episode: string[];
    url: string;
    created: string;
}

export interface LocationReference {
    name: string;
    url: string;
}

// Location
export interface Location {
    id: number;
    name: string;
    type: string;
    dimension: string;
    residents: string[];
    url: string;
    created: string;
}

// Episode
export interface Episode {
    id: number;
    name: string;
    air_date: string;
    episode: string;
    characters: string[];
    url: string;
    created: string;
}

// Filter Types
export interface CharacterFilters {
    name?: string;
    status?: string;
    species?: string;
    gender?: string;
    page?: number;
}

export interface LocationFilters {
    name?: string;
    type?: string;
    dimension?: string;
    page?: number;
}

export interface EpisodeFilters {
    name?: string;
    episode?: string;
    page?: number;
}