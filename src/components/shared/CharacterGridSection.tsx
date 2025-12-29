import { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import { Character } from '~/types/api';
import { apiClient } from '~/lib/api-client';

import { CharacterCard } from '../character/CharacterCard';
import { LoadMoreButton } from './LoadMoreButton';
import { LoadingSpinner } from './LoadingSpinner';

interface CharacterGridSectionProps {
  title: string;
  characterIds: number[];
  icon?: any; // Lucide Icon type
  emptyTitle?: string;
  emptyMessage?: string;
}

const PER_PAGE = 12;

export function CharacterGridSection({
  title,
  characterIds,
  icon: Icon = Users,
  emptyTitle = 'No Data Found',
  emptyMessage = 'No characters found for this entry.',
}: CharacterGridSectionProps) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // 1. Initial Fetch when IDs change
  useEffect(() => {
    let isMounted = true;

    const fetchInitial = async () => {
      if (characterIds.length === 0) {
        setIsLoadingInitial(false);
        return;
      }

      try {
        setIsLoadingInitial(true);
        // Slice the first batch
        const firstBatchIds = characterIds.slice(0, PER_PAGE);
        const data = await apiClient.characters.getMultiple(firstBatchIds);

        // Normalize (API returns object if 1 item, array if multiple)
        const normalized = Array.isArray(data) ? data : [data];

        if (isMounted) {
          setCharacters(normalized);
        }
      } catch (error) {
        console.error('Error fetching initial characters:', error);
      } finally {
        if (isMounted) setIsLoadingInitial(false);
      }
    };

    fetchInitial();

    return () => {
      isMounted = false;
    };
  }, [characterIds]);

  // 2. Load More Handler
  const handleLoadMore = async () => {
    if (isLoadingMore) return;

    try {
      setIsLoadingMore(true);
      const currentCount = characters.length;
      const nextBatchIds = characterIds.slice(currentCount, currentCount + PER_PAGE);

      if (nextBatchIds.length > 0) {
        const newData = await apiClient.characters.getMultiple(nextBatchIds);
        const normalizedNew = Array.isArray(newData) ? newData : [newData];

        setCharacters(prev => [...prev, ...normalizedNew]);
      }
    } catch (error) {
      console.error('Error loading more characters:', error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const hasMore = characters.length < characterIds.length;

  if (isLoadingInitial) {
    return (
      <div className="py-12">
        <LoadingSpinner message={`Loading ${title}...`} />
      </div>
    );
  }

  // Empty State
  if (characterIds.length === 0) {
    return (
      <div className="bg-gray-50 rounded-3xl p-16 text-center border-2 border-dashed border-gray-200">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-200 mb-4">
          <Icon className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{emptyTitle}</h3>
        <p className="text-gray-500 max-w-md mx-auto">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <section className="space-y-8 animate-in slide-in-from-bottom duration-500 delay-100">
      {/* Section Header */}
      <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
        <div className="p-2 bg-[#00B5CC]/10 text-[#00B5CC] rounded-lg">
          <Icon className="h-6 w-6" />
        </div>
        <h2 className="text-3xl font-black text-[#0B1E2D]">{title}</h2>
      </div>

      {/* Grid */}
      <div className="space-y-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8">
          {characters.map(character => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="flex justify-center pt-8 border-t border-gray-100">
            <LoadMoreButton
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              isFetchingNextPage={isLoadingMore}
            />
          </div>
        )}
      </div>
    </section>
  );
}
