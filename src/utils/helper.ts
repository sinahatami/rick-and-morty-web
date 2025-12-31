export const formatDate = (dateString?: string): string => {
  if (!dateString) return 'Unknown Date';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export function extractIdFromUrl(url?: string): number | null {
  if (!url) return null;
  const parts = url.split('/').filter(Boolean);
  const id = parts.pop();
  const parsed = parseInt(id || '', 10);
  return isNaN(parsed) ? null : parsed;
}

export const parseEpisodeCode = (episodeCode: string) => {
  if (!episodeCode) return { season: '?', episode: '?' };

  const seasonMatch = episodeCode.match(/S(\d+)/);
  const episodeMatch = episodeCode.match(/E(\d+)/);

  return {
    season: seasonMatch ? seasonMatch[1] : '?',
    episode: episodeMatch ? episodeMatch[1] : '?',
  };
};