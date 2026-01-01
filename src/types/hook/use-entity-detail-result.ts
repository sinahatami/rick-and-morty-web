export interface UseEntityDetailResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}