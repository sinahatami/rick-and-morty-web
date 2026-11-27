// Every route ends with a slash (`trailingSlash: true`), so links never trigger a redirect.
export const ROUTES = {
  home: '/',
  characters: {
    list: '/',
    detail: (id: number | string) => `/characters/${id}/`,
  },
  locations: {
    list: '/locations/',
    detail: (id: number | string) => `/locations/${id}/`,
  },
  episodes: {
    list: '/episodes/',
    detail: (id: number | string) => `/episodes/${id}/`,
  },
} as const;
