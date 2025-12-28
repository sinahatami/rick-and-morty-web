import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Calendar, Tv, Users, ArrowRight } from 'lucide-react';
import { Episode, Character } from '~/types/api';
import { apiClient } from '~/lib/api-client';
import { InfoItem } from './shared/InfoItem';
import { GoBackButton } from './shared/GoBackButton';

interface EpisodeDetailProps {
  id: string;
}

export function EpisodeDetail({ id }: EpisodeDetailProps) {
  const router = useRouter();
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchEpisodeAndCharacters = async () => {
      try {
        setLoading(true);
        const episodeData = await apiClient.episodes.getById(id);
        if (!isMounted) return;
        setEpisode(episodeData);

        if (episodeData.characters.length > 0) {
          const characterIds = episodeData.characters.map(url => {
            const parts = url.split('/');
            return parts[parts.length - 1];
          });

          const charactersData = await apiClient.characters.getMultiple(
            characterIds.map(id => parseInt(id))
          );
          if (isMounted) setCharacters(charactersData);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load episode details');
          console.error(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchEpisodeAndCharacters();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading episode details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !episode) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="h-12 w-12 text-red-500 mx-auto mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Episode Not Found</h2>
          <p className="text-gray-600 mb-6">
            {error || 'This episode does not exist in this timeline.'}
          </p>
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Extract season and episode numbers
  const seasonMatch = episode.episode.match(/S(\d+)/);
  const episodeMatch = episode.episode.match(/E(\d+)/);
  const season = seasonMatch ? seasonMatch[1] : '?';
  const episodeNum = episodeMatch ? episodeMatch[1] : '?';

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Back Button */}
      <GoBackButton />

      {/* Episode Header */}
      <div className="bg-white rounded-2xl p-8 shadow-xl mb-8">
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full">
                <span className="font-bold text-sm">
                  S{season}E{episodeNum}
                </span>
              </div>
              <div className="text-sm text-gray-600 font-medium">
                Episode {episodeNum} • Season {season}
              </div>
            </div>
            <h1 className="text-4xl font-black text-gray-900 mb-2">{episode.name}</h1>
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span className="font-medium">Aired on {episode.air_date}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <InfoItem
              icon={<Tv className="h-5 w-5" />}
              label="Episode Code"
              value={episode.episode}
            />
            <InfoItem
              icon={<Calendar className="h-5 w-5" />}
              label="Air Date"
              value={episode.air_date}
            />
          </div>
        </div>
      </div>

      {/* Characters Section */}
      {characters.length > 0 && (
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Featured Characters ({characters.length})
            </h2>
            <div className="text-sm text-gray-500">Click on a character to view their details</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {characters.map(character => (
              <div
                key={character.id}
                className="group border border-gray-200 rounded-xl p-4 hover:border-purple-500/50 hover:shadow-md transition-all cursor-pointer"
                onClick={() => router.push(`/characters/${character.id}`)}
              >
                <div className="flex items-start gap-4">
                  <img
                    src={character.image}
                    alt={character.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                      {character.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                      <span>{character.species}</span>
                      <span>•</span>
                      <span
                        className={`font-medium ${
                          character.status === 'Alive'
                            ? 'text-green-600'
                            : character.status === 'Dead'
                              ? 'text-red-600'
                              : 'text-gray-600'
                        }`}
                      >
                        {character.status}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Characters Message */}
      {characters.length === 0 && (
        <div className="bg-gray-50 rounded-2xl p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full mb-4">
            <Users className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Characters Found</h3>
          <p className="text-gray-600 mb-4">This episode has no character information available.</p>
        </div>
      )}
    </div>
  );
}
