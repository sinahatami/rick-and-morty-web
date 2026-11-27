type FilterRules<T> = Partial<Record<keyof T, readonly string[] | true>>;

/**
 * Builds a parser that turns `?status=Alive&name=rick` into a typed filter object.
 * `true` accepts any non-empty value; a list only accepts the values it contains, so
 * a hand-edited URL can never put an unknown value into the filters.
 */
export function createFilterParser<T>(rules: FilterRules<T>) {
  return (searchParams: URLSearchParams): T => {
    const filters: Record<string, string> = {};

    for (const key of Object.keys(rules) as (keyof T & string)[]) {
      const value = searchParams.get(key);
      const rule = rules[key];

      if (!value || !rule) continue;
      if (rule === true || rule.includes(value)) filters[key] = value;
    }

    return filters as T;
  };
}
