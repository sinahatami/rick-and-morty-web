import { useState, useEffect } from 'react';
import { MapPin, Globe, Activity, Dna, Ghost, Skull, User } from 'lucide-react';

import { Character } from '~/types/api';
import { apiClient } from '~/lib/api-client';

import { GoBackButton } from '../shared/GoBackButton';
import { LoadingSpinner } from '../shared/LoadingSpinner';
import { AttributeRow } from '../shared/AttributeRow';
import { LocationLinkRow } from '../shared/LocationLinkRow';

import { EpisodeGridSection } from '../episode/EpisodeGridSection';
import { CharacterAvatar } from './CharacterAvatar';
import { NotFoundState } from '../shared/NotFoundState';

interface CharacterDetailProps {
  id: string;
}

export function CharacterDetail({ id }: CharacterDetailProps) {
  // --- Data States ---
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();

    const fetchCharacter = async () => {
      try {
        setLoading(true);
        const charData = await apiClient.characters.getById(id);

        if (isMounted) {
          setCharacter(charData);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load character details');
          console.error(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCharacter();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [id]);

  // --- Helper: Status Config ---
  const getStatusConfig = (status: string = 'Unknown') => {
    switch (status.toLowerCase()) {
      case 'alive':
        return {
          color: 'text-green-600',
          bg: 'bg-green-50',
          border: 'border-green-200',
          dot: 'bg-green-500',
          icon: Activity,
        };
      case 'dead':
        return {
          color: 'text-red-600',
          bg: 'bg-red-50',
          border: 'border-red-200',
          dot: 'bg-red-500',
          icon: Skull,
        };
      default:
        return {
          color: 'text-gray-500',
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          dot: 'bg-gray-400',
          icon: Ghost,
        };
    }
  };

  if (loading) {
    return <LoadingSpinner message="Accessing Galactic Federation Database..." />;
  }

  if (error || !character) {
    return (
      <NotFoundState
        title="Subject Not Found"
        message="The character you are looking for does not exist in this central finite curve."
      />
    );
  }

  const statusConfig = getStatusConfig(character.status);
  const StatusIcon = statusConfig.icon;

  // Extract Episode IDs for the Grid Section
  const episodeIds = character.episode.map(url => url.split('/').pop()).filter(Boolean) as string[];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-500">
      <GoBackButton />

      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 items-start">
        {/* --- LEFT COLUMN: Identity Card --- */}
        <div className="relative group lg:sticky lg:top-8">
          <div className="absolute -inset-0.5 bg-gradient-to-br from-[#00B5CC] to-[#B8E986] rounded-[2rem] opacity-30 blur-md group-hover:opacity-50 transition duration-500"></div>
          <div className="relative bg-white rounded-[1.8rem] p-6 shadow-xl border border-gray-100 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#00B5CC] via-[#B8E986] to-[#00B5CC]" />
            <div className="flex flex-col items-center pt-4">
              <CharacterAvatar
                name={character.name}
                image={character.image}
                status={character.status}
              />
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 text-center tracking-tight leading-none mb-2">
                {character.name}
              </h1>
              <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs font-bold rounded-lg uppercase tracking-wider mb-6">
                Subject ID: #{character.id}
              </span>
              <div className="grid grid-cols-2 gap-3 w-full">
                <div
                  className={`flex flex-col items-center p-3 rounded-xl border ${statusConfig.bg} ${statusConfig.border}`}
                >
                  <StatusIcon className={`h-6 w-6 mb-1 ${statusConfig.color}`} />
                  <span className={`text-[10px] font-bold uppercase ${statusConfig.color}`}>
                    Condition
                  </span>
                </div>
                <div className="flex flex-col items-center p-3 rounded-xl border border-blue-50 bg-blue-50">
                  <Dna className="h-6 w-6 mb-1 text-[#00B5CC]" />
                  <span className="text-[10px] font-bold uppercase text-[#00B5CC]">Genetic</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: Data Log --- */}
        <div className="space-y-8">
          {/* Section 1: Biometrics */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
            <h2 className="flex items-center gap-3 text-lg font-black text-gray-900 uppercase tracking-wide mb-6">
              <span className="p-2 bg-[#00B5CC]/10 text-[#00B5CC] rounded-lg">
                <User className="h-5 w-5" />
              </span>
              Biometrics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <AttributeRow label="Gender" value={character.gender} icon={User} />
              <AttributeRow label="Species" value={character.species} icon={Dna} />
              {character.type && (
                <div className="md:col-span-2">
                  <AttributeRow label="Type / Subspecies" value={character.type} icon={Dna} />
                </div>
              )}
            </div>
          </div>

          {/* Section 2: Locations */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
            <h2 className="flex items-center gap-3 text-lg font-black text-gray-900 uppercase tracking-wide mb-6">
              <span className="p-2 bg-[#B8E986]/20 text-green-600 rounded-lg">
                <MapPin className="h-5 w-5" />
              </span>
              Location History
            </h2>
            <div className="space-y-4">
              <LocationLinkRow
                label="Origin Point"
                name={character.origin.name}
                url={character.origin.url}
                icon={Globe}
              />
              <LocationLinkRow
                label="Last Known Location"
                name={character.location.name}
                url={character.location.url}
                icon={MapPin}
              />
            </div>
          </div>

          {/* Section 3: Episodes */}
          <EpisodeGridSection title="Episode Appearances" episodeIds={episodeIds} />
        </div>
      </div>
    </div>
  );
}
