import { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import { Character } from '~/types/api';
import { apiClient } from '~/lib/api-client';

import { CharacterCard } from '../character/CharacterCard';
import { LoadMoreButton } from './LoadMoreButton';
import { LoadingSpinner } from './LoadingSpinner';
import { SectionHeader } from './SectionHeader';
import { Grid } from './Grid';
import { EmptyState } from './EmptyState';

interface CharacterGridSectionProps {
  title: string;
  characterIds: number[];
  icon?: any;
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

  // 1. Initial Fetch
  useEffect(() => {
    let isMounted = true;
    const fetchInitial = async () => {
      if (characterIds.length === 0) {
        setIsLoadingInitial(false);
        return;
      }
      try {
        setIsLoadingInitial(true);
        const firstBatchIds = characterIds.slice(0, PER_PAGE);
        const data = await apiClient.characters.getMultiple(firstBatchIds);
        const normalized = (Array.isArray(data) ? data : [data]) as Character[];

        if (isMounted) setCharacters(normalized);
      } catch (error) {
        console.error(error);
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
        const normalizedNew = (Array.isArray(newData) ? newData : [newData]) as Character[];
        setCharacters(prev => [...prev, ...normalizedNew]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  if (isLoadingInitial) {
    return (
      <div className="py-12">
        <LoadingSpinner message="Loading cast data..." />
      </div>
    );
  }

  // --- REFACTOR: Use Shared EmptyState ---
  if (characters.length === 0) {
    return (
      <section className="space-y-8 animate-in slide-in-from-bottom duration-500">
        <SectionHeader title={title} icon={Icon} />
        <EmptyState
          title={emptyTitle}
          description={emptyMessage}
          onClearFilters={() => {}}
          showClearButton={false}
        />
      </section>
    );
  }

  const hasMore = characters.length < characterIds.length;

  return (
    <section className="space-y-8 animate-in slide-in-from-bottom duration-500 delay-100">
      <SectionHeader title={title} icon={Icon} count={characterIds.length} />

      <div className="space-y-12">
        {/* Use the shared Grid component */}
        <Grid>
          {characters.map(character => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </Grid>

        {hasMore && (
          <LoadMoreButton
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            isFetchingNextPage={isLoadingMore}
          />
        )}
      </div>
    </section>
  );
}
