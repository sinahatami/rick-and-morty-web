
import { apiClient } from './api-client';

import { Character, Location, Episode } from '~/types';

// Setup Global Fetch Mock with explicit typing
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Helper to create typed responses easily
const createMockResponse = (data: unknown, status = 200, ok = true) => {
  return {
    ok,
    status,
    json: async () => data,
  } as Response;
};

describe('ApiClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Error Handling', () => {
    it('should throw a specific error message when API returns 404', async () => {
      mockFetch.mockResolvedValue(createMockResponse({ error: 'Not found' }, 404, false));

      await expect(apiClient.characters.getAll({ name: 'Nonexistent' })).rejects.toThrow(
        'No results found matching your search criteria.'
      );
    });

    it('should throw a generic error when API returns 500', async () => {
      mockFetch.mockResolvedValue(createMockResponse({ error: 'Server error' }, 500, false));

      await expect(apiClient.characters.getAll()).rejects.toThrow(
        'Something went wrong. Please try again.'
      );
    });

    it('should handle network failures', async () => {
      mockFetch.mockRejectedValue(new Error('Network failure'));

      await expect(apiClient.characters.getAll()).rejects.toThrow(
        'Network error occurred. Please check your connection.'
      );
    });
  });

  describe('characters endpoints', () => {
    const mockCharacter: Partial<Character> = {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
    };

    describe('getAll', () => {
      it('constructs the correct URL with parameters', async () => {
        mockFetch.mockResolvedValue(
          createMockResponse({
            info: { count: 1, pages: 1 },
            results: [mockCharacter],
          })
        );

        await apiClient.characters.getAll({ page: '1', name: 'Rick' });

        expect(mockFetch).toHaveBeenCalledWith(
          expect.stringContaining('https://rickandmortyapi.com/api/character?page=1&name=Rick')
        );
      });
    });

    describe('getMultiple', () => {
      it('returns empty array directly when no IDs are provided', async () => {
        const result = await apiClient.characters.getMultiple([]);
        expect(result).toEqual([]);
        expect(mockFetch).not.toHaveBeenCalled();
      });

      it('fetches a single ID and wraps it in an array', async () => {
        mockFetch.mockResolvedValue(createMockResponse(mockCharacter));

        const result = await apiClient.characters.getMultiple([1]);

        expect(result).toEqual([mockCharacter]);
        expect(mockFetch).toHaveBeenCalledWith('https://rickandmortyapi.com/api/character/1');
      });

      it('fetches multiple IDs as an array', async () => {
        const mockChars = [mockCharacter, { ...mockCharacter, id: 2 }];
        // The API returns an ARRAY for /character/1,2
        mockFetch.mockResolvedValue(createMockResponse(mockChars));

        const result = await apiClient.characters.getMultiple([1, 2]);

        expect(result).toEqual(mockChars);
        expect(mockFetch).toHaveBeenCalledWith('https://rickandmortyapi.com/api/character/1,2');
      });

      it('fetches multiple similary IDs as an array', async () => {
        const mockChars = [mockCharacter, { ...mockCharacter, id: 2 }];
        // The API returns an ARRAY for /character/1,1
        mockFetch.mockResolvedValue(createMockResponse(mockChars));

        const result = await apiClient.characters.getMultiple([1, 1]);

        expect(result).toEqual(mockChars);
        expect(mockFetch).toHaveBeenCalledWith('https://rickandmortyapi.com/api/character/1,1');
      });
    });
  });

  describe('locations endpoints', () => {
    const mockLocation: Partial<Location> = {
      id: 1,
      name: 'Earth',
      type: 'Planet',
    };

    it('fetches all locations', async () => {
      mockFetch.mockResolvedValue(
        createMockResponse({
          info: { count: 1 },
          results: [mockLocation],
        })
      );

      const result = await apiClient.locations.getAll();
      expect(result.results[0].name).toBe('Earth');
    });

    it('fetches location by ID', async () => {
      mockFetch.mockResolvedValue(createMockResponse(mockLocation));

      const result = await apiClient.locations.getById('1');
      expect(result).toEqual(mockLocation);
      expect(mockFetch).toHaveBeenCalledWith('https://rickandmortyapi.com/api/location/1');
    });
  });
});
