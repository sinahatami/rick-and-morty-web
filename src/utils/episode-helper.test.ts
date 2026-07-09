import { parseEpisodeData } from './episode-helper';
import { Episode } from '~/types';

describe('episode-helper', () => {
  describe('parseEpisodeData', () => {
    it('should parse valid episode data correctly', () => {
      const mockEpisode: Episode = {
        id: 1,
        name: 'Pilot',
        air_date: 'December 2, 2013',
        episode: 'S01E01',
        characters: ['https://rickandmortyapi.com/api/character/1'],
        url: 'https://rickandmortyapi.com/api/episode/1',
        created: '2017-11-10T12:56:33.798Z',
      };

      const result = parseEpisodeData(mockEpisode);

      expect(result).toEqual({
        id: 1,
        name: 'Pilot',
        season: '01',
        episode: '01',
        episodeCode: 'S01E01',
        airDate: 'Dec 2, 2013',
        theme: 'morty',
      });
    });
  });
});
