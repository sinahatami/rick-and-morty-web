import { useState, useEffect } from 'react';
import { Users } from 'lucide-react';

import { CharacterCard } from '../character/CharacterCard';
import { LoadMoreButton } from './LoadMoreButton';
import { LoadingSpinner } from './LoadingSpinner';
import { SectionHeader } from './SectionHeader';
import { Grid } from './Grid';
import { EmptyState } from './EmptyState';
import { apiClient } from '~/lib/api-client';
import { Character, CharacterGridSectionProps } from '~/types';

const PER_PAGE = 12;

export function CharacterGridSection({
  title,
  characterIds,
  icon: Icon = Users,
  emptyTitle = 'No Data Found',
  emptyMessage = 'No characters found for this entry.',
  theme = 'portal', // Changed default from 'character' to 'portal'
}: CharacterGridSectionProps) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Use fingerprint to prevent infinite loop
  const idsFingerprint = JSON.stringify(characterIds);

  useEffect(() => {
    let isMounted = true;
    const currentIds = JSON.parse(idsFingerprint);

    const fetchInitial = async () => {
      if (currentIds.length === 0) {
        {
          theme;
        }
        if (isMounted) setIsLoadingInitial(false);
        return;
      }
      try {
        if (isMounted) setIsLoadingInitial(true);
        const firstBatchIds = currentIds.slice(0, PER_PAGE);
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
  }, [idsFingerprint]);

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

  if (characters.length === 0) {
    return (
      <section className="space-y-8 animate-in slide-in-from-bottom duration-500">
        <SectionHeader title={title} icon={Icon} />
        <EmptyState
          title={emptyTitle}
          description={emptyMessage}
          onClearFilters={() => {}}
          showClearButton={false}
          theme={theme}
        />
      </section>
    );
  }

  const hasMore = characters.length < characterIds.length;

  return (
    <section className="space-y-8 animate-in slide-in-from-bottom duration-500 delay-100">
      <SectionHeader title={title} icon={Icon} count={characterIds.length} />

      <div className="space-y-12">
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
            theme={theme}
          />
        )}
      </div>
    </section>
  );
}
