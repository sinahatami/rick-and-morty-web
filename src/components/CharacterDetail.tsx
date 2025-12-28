import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ChevronRight, AlertCircle } from 'lucide-react';
import { Character } from '~/types/api';
import { apiClient } from '~/lib/api-client';
import { GoBackButton } from './shared/GoBackButton';

interface CharacterDetailProps {
  id: string;
}

export function CharacterDetail({ id }: CharacterDetailProps) {
  const router = useRouter();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();

    const fetchCharacter = async () => {
      try {
        setLoading(true);
        const data = await apiClient.characters.getById(id);
        if (isMounted) {
          setCharacter(data);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
      </div>
    );
  }

  if (error || !character) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Character Not Found</h2>
        <button
          onClick={() => router.back()}
          className="mt-6 px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <div className="max-w-6xl mx-auto px-5 py-6 md:py-12">
        {/* Back Button */}
        <GoBackButton />
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-12 items-start">
          {/* --- LEFT COLUMN: Profile Identity (Sticky on Desktop) --- */}
          <div className="flex flex-col items-center md:items-start md:sticky md:top-10">
            <div className="w-64 h-64 md:w-64 md:h-64 rounded-full overflow-hidden border-[5px] border-slate-100 mb-5 shadow-sm">
              <img
                src={character.image}
                alt={character.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 text-center md:text-left tracking-tight mb-2">
              {character.name}
            </h1>
          </div>
          {/* --- RIGHT COLUMN: Scrollable Content --- */}
          <div className="space-y-10">
            {/* Informations Section */}
            <div>
              <h2 className="text-xl font-bold text-gray-400 mb-4 uppercase tracking-wider text-sm">
                Informations
              </h2>

              {/* Update: Added `pl-4 md:pl-0`
                  This adds left padding on mobile to indent the items under the header, 
                  and removes it on desktop where the grid layout takes over.
              */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 pl-4 md:pl-0">
                <InfoRow label="Gender" value={character.gender} />
                <InfoRow label="Status" value={character.status} />
                <InfoRow label="Specie" value={character.species} />
                <InfoRow label="Type" value={character.type || 'Unknown'} />

                <div className="md:col-span-2">
                  <InfoRow
                    label="Origin"
                    value={character.origin.name}
                    onClick={
                      character.origin.url
                        ? () => {
                            const originId = character.origin.url.split('/').pop();
                            router.push(`/locations/${originId}`);
                          }
                        : undefined
                    }
                  />
                </div>
                <div className="md:col-span-2">
                  <InfoRow
                    label="Location"
                    value={character.location.name}
                    isLink={true}
                    onClick={
                      character.location.url
                        ? () => {
                            const locationId = character.location.url.split('/').pop();
                            router.push(`/locations/${locationId}`);
                          }
                        : undefined
                    }
                  />
                </div>
              </div>
            </div>

            {/* Episodes Section */}
            <div>
              <h2 className="text-xl font-bold text-gray-400 mb-4 uppercase tracking-wider text-sm">
                Episodes
              </h2>
              {/* Update: Added `pl-4 md:pl-0` 
                  Same indentation logic for the episodes list on mobile.
              */}
              <div className="space-y-1 pl-4 md:pl-0">
                {character.episode.slice(0, 10).map(episodeUrl => {
                  const episodeId = episodeUrl.split('/').pop();
                  return (
                    <EpisodeRow
                      key={episodeUrl}
                      code={`Episode ${episodeId}`}
                      title="View Episode Details"
                      onClick={() => router.push(`/episodes/${episodeId}`)}
                    />
                  );
                })}
                {character.episode.length > 10 && (
                  // Added pl-2 here just to align the "view all" text slightly better with the indented row text
                  <div className="pt-4 pl-2 md:pl-0 text-left text-gray-400 text-sm font-medium hover:text-gray-600 cursor-pointer">
                    View all {character.episode.length} episodes &rarr;
                  </div>
                )}
              </div>
            </div>
          </div>{' '}
          {/* End Right Column */}
        </div>{' '}
        {/* End Grid */}
      </div>
    </div>
  );
}

// --- Components (No changes needed here) ---

interface InfoRowProps {
  label: string;
  value: string;
  onClick?: () => void;
  isLink?: boolean;
}

function InfoRow({ label, value, onClick, isLink }: InfoRowProps) {
  const showArrow = isLink || (!!onClick && value !== 'unknown');
  const Component = onClick ? 'button' : 'div';

  return (
    <Component
      onClick={onClick}
      className={`w-full text-left py-3 border-b border-gray-100 flex items-center justify-between group 
        ${onClick ? 'hover:bg-gray-50 transition-colors rounded-lg px-2 -mx-2' : ''}`}
    >
      <div className="flex flex-col">
        <span className="text-slate-900 font-bold text-[17px] mb-1">{label}</span>
        <span className="text-gray-500 text-sm font-medium break-words">{value}</span>
      </div>
      {showArrow && (
        <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-slate-900 transition-colors" />
      )}
    </Component>
  );
}

interface EpisodeRowProps {
  code: string;
  title: string;
  onClick: () => void;
}

function EpisodeRow({ code, title, onClick }: EpisodeRowProps) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left py-3 border-b border-gray-100 flex items-center justify-between group hover:bg-gray-50 transition-colors rounded-lg px-2 -mx-2"
    >
      <div className="flex flex-col">
        <span className="text-slate-900 font-bold text-[17px] mb-1">{code}</span>
        <span className="text-gray-500 text-sm font-medium">{title}</span>
      </div>
      <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-slate-900 transition-colors" />
    </button>
  );
}
