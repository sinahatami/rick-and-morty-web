/** Splits a production code such as "S02E05" into its season and episode number ("02", "05"). */
export function parseEpisodeCode(code: string): { season: string; episode: string } {
  return {
    season: code.match(/S(\d+)/)?.[1] ?? '?',
    episode: code.match(/E(\d+)/)?.[1] ?? '?',
  };
}
