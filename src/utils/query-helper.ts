/**
 * Cleans filters by removing undefined, null, and empty string values
 */
export function cleanFilters<T extends Record<string, any>>(filters: T): Partial<T> {
    const cleaned: Partial<T> = {};

    Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            cleaned[key as keyof T] = value;
        }
    });

    return cleaned;
}

/**
 * Builds query parameters from filters
 */
export function buildQueryParams(filters: Record<string, any>): Record<string, string> {
    const params: Record<string, string> = {};

    Object.entries(cleanFilters(filters)).forEach(([key, value]) => {
        params[key] = String(value);
    });

    return params;
}