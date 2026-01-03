import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { apiClient } from './api-client';

// Mock the global fetch API to prevent actual network requests during testing
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('ApiClient', () => {
  // Reset mocks
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Restore original implementations after finish
  afterEach(() => {
    vi.restoreAllMocks();
  });

  // Core Request Logic Tests
  describe('request', () => {
    it('make a request with correct URL and parameters', async () => {
      // Setup a successful API response simulation
      const mockResponse = {
        ok: true,
        status: 200,
        json: () => Promise.resolve({ data: 'test' }),
      };
      mockFetch.mockResolvedValue(mockResponse);

      // Cast to 'any' to access 'request' method for testing
      const client = apiClient as any;
      await client.request('/character', {
        page: '1',
        name: 'Rick',
      });

      // Verify URL matches API requirements
      expect(mockFetch).toHaveBeenCalledWith(
        'https://rickandmortyapi.com/api/character?page=1&name=Rick'
      );
    });

    it('handle 404 error with a message for no results', async () => {
      const mockResponse = {
        ok: false,
        status: 404,
        json: () => Promise.resolve({ error: 'Not found' }),
      };
      mockFetch.mockResolvedValue(mockResponse);

      await expect(
        (apiClient as any).request('/character', { name: 'Nonexistent' })
      ).rejects.toThrow('No characters found matching your search criteria.');
    });

    it('handle generic API errors', async () => {
      // Simulate error (500)
      const mockResponse = {
        ok: false,
        status: 500,
        json: () => Promise.resolve({ error: 'Server error' }),
      };
      mockFetch.mockResolvedValue(mockResponse);

      await expect((apiClient as any).request('/character')).rejects.toThrow(
        'Something went wrong. Please try again.'
      );
    });

    it('handle network errors', async () => {
      // Simulate a total network failure
      mockFetch.mockRejectedValue(new Error('Network failure'));

      await expect((apiClient as any).request('/character')).rejects.toThrow(
        'Network error occurred. Please check your connection.'
      );
    });
  });

  // Domain-Specific Endpoint Tests
  describe('characters endpoints', () => {
    const mockCharacter = {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth', url: '' },
      location: { name: 'Earth', url: '' },
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      episode: [],
      url: '',
      created: '',
    };

    it('fetch all characters with pagination', async () => {
      // Mock the structure returned by 'getAll'
      const mockResponse = {
        info: { count: 1, pages: 1, next: null, prev: null },
        results: [mockCharacter],
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await apiClient.characters.getAll({ page: '1' });

      expect(result).toEqual(mockResponse);
      expect(result.results).toHaveLength(1);
      expect(result.results[0].name).toBe('Rick Sanchez');
    });

    it('fetch a single character by ID', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockCharacter),
      });

      const result = await apiClient.characters.getById('1');

      expect(result).toEqual(mockCharacter);
      expect(mockFetch).toHaveBeenCalledWith('https://rickandmortyapi.com/api/character/1');
    });

    describe('getMultiple', () => {
      it('return empty array for empty ID', async () => {
        // Optimization check: Ensure no API call
        const result = await apiClient.characters.getMultiple([]);
        expect(result).toEqual([]);
        expect(mockFetch).not.toHaveBeenCalled();
      });

      it('fetch single character and wrap in array', async () => {
        // Single ID returns an object, client normalize this to an array
        mockFetch.mockResolvedValue({
          ok: true,
          json: () => Promise.resolve(mockCharacter),
        });

        const result = await apiClient.characters.getMultiple([1]);

        expect(result).toEqual([mockCharacter]);
        expect(mockFetch).toHaveBeenCalledWith('https://rickandmortyapi.com/api/character/1');
      });

      it('fetch multiple characters', async () => {
        const mockCharacters = [mockCharacter, { ...mockCharacter, id: 2 }];

        // Verify array response for IDs
        mockFetch.mockResolvedValue({
          ok: true,
          json: () => Promise.resolve(mockCharacters),
        });

        const result = await apiClient.characters.getMultiple([1, 2]);

        expect(result).toEqual(mockCharacters);
        // Ensure IDs have comma in the URL
        expect(mockFetch).toHaveBeenCalledWith('https://rickandmortyapi.com/api/character/1,2');
      });
    });
  });

  describe('locations endpoints', () => {
    it('fetch all locations', async () => {
      const mockLocation = {
        id: 1,
        name: 'Earth',
        type: 'Planet',
        dimension: 'Dimension C-137',
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve({
            info: { count: 1, pages: 1 },
            results: [mockLocation],
          }),
      });

      const result = await apiClient.locations.getAll();

      expect(result.results[0].name).toBe('Earth');
    });

    it('fetch location by ID', async () => {
      const mockLocation = {
        id: 1,
        name: 'Earth',
        type: 'Planet',
        dimension: 'Dimension C-137',
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockLocation),
      });

      const result = await apiClient.locations.getById('1');

      expect(result).toEqual(mockLocation);
    });
  });

  describe('episodes endpoint', () => {
    it('should fetch all episodes', async () => {
      const mockEpisode = {
        id: 1,
        name: 'Pilot',
        episode: 'S01E01',
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve({
            info: { count: 1, pages: 1 },
            results: [mockEpisode],
          }),
      });

      const result = await apiClient.episodes.getAll();

      expect(result.results[0].name).toBe('Pilot');
    });
  });
});