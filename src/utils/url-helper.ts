export function createFilterParser<T>(
  config: Partial<Record<keyof T, readonly string[] | true>>
) {
  return (searchParams: URLSearchParams): T => parseUrlFilters<T>(searchParams, config);
}

export function parseUrlFilters<T>(
  searchParams: URLSearchParams,
  config: Partial<Record<keyof T, readonly string[] | true>>
): T {
  const filters: any = {};

  (Object.keys(config) as (keyof T)[]).forEach((key) => {
    const rawValue = searchParams.get(String(key));
    const rule = config[key];

    if (!rawValue) return;

    if (Array.isArray(rule)) {
      const validOption = rule.find((opt) => opt === rawValue);
      if (validOption) {
        filters[key] = validOption;
      }
    } else {
      filters[key] = rawValue;
    }
  });

  return filters;
}