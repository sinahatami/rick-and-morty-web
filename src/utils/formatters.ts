export const formatDate = (dateString?: string): string => {
  if (!dateString) return 'Unknown Date';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const parseEpisodeCode = (episodeCode: string) => {
  if (!episodeCode) return { season: '?', episode: '?' };

  const seasonMatch = episodeCode.match(/S(\d+)/);
  const episodeMatch = episodeCode.match(/E(\d+)/);

  return {
    season: seasonMatch ? seasonMatch[1] : '?',
    episode: episodeMatch ? episodeMatch[1] : '?',
  };
};