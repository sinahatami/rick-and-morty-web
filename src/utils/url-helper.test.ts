
import { createFilterParser } from './url-helper';

describe('url-helper', () => {
  describe('createFilterParser', () => {
    it('should parse simple text filters correctly', () => {
      const parser = createFilterParser<{ name: string }>({ name: true });
      const searchParams = new URLSearchParams('name=rick');
      
      expect(parser(searchParams)).toEqual({ name: 'rick' });
    });

    it('should ignore filters not defined in the config', () => {
      const parser = createFilterParser<{ name: string }>({ name: true });
      const searchParams = new URLSearchParams('name=rick&status=alive');
      
      expect(parser(searchParams)).toEqual({ name: 'rick' });
    });

    it('should parse array options correctly if value is valid', () => {
      const parser = createFilterParser<{ status: 'alive' | 'dead' }>({ 
        status: ['alive', 'dead'] 
      });
      const searchParams = new URLSearchParams('status=alive');
      
      expect(parser(searchParams)).toEqual({ status: 'alive' });
    });

    it('should omit array options if value is invalid', () => {
      const parser = createFilterParser<{ status: 'alive' | 'dead' }>({ 
        status: ['alive', 'dead'] 
      });
      const searchParams = new URLSearchParams('status=zombie');
      
      expect(parser(searchParams)).toEqual({});
    });

    it('should parse multiple filters simultaneously', () => {
      const parser = createFilterParser<{ name: string; status: 'alive' | 'dead' }>({ 
        name: true,
        status: ['alive', 'dead'] 
      });
      const searchParams = new URLSearchParams('name=morty&status=dead');
      
      expect(parser(searchParams)).toEqual({ name: 'morty', status: 'dead' });
    });
  });
});
