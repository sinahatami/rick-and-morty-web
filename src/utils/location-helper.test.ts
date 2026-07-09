
import { parseLocationData } from './location-helper';
import { Location } from '~/types';

describe('location-helper', () => {
  describe('parseLocationData', () => {
    it('should parse valid location data correctly', () => {
      const mockLocation: Location = {
        id: 1,
        name: 'Earth (C-137)',
        type: 'Planet',
        dimension: 'Dimension C-137',
        residents: ['https://rickandmortyapi.com/api/character/1'],
        url: 'https://rickandmortyapi.com/api/location/1',
        created: '2017-11-10T12:42:04.162Z',
      };

      const result = parseLocationData(mockLocation);

      expect(result).toEqual({
        id: 1,
        name: 'Earth (C-137)',
        type: 'Planet',
        residentsCount: 1,
        theme: 'rick',
      });
    });

    it('should fallback to "unknown" type if type is missing', () => {
      const mockLocation = {
        id: 2,
        name: 'Abadango',
        type: '',
        dimension: 'unknown',
        residents: [],
        url: 'https://rickandmortyapi.com/api/location/2',
        created: '2017-11-10T13:06:38.182Z',
      } as Location;

      const result = parseLocationData(mockLocation);

      expect(result.type).toBe('unknown');
    });
  });
});
