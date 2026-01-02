export const ROUTES = {
  HOME: '/',
  CHARACTERS: {
    LIST: '/',
    DETAIL: (id: string) => `/characters/${id}`,
  },
  LOCATIONS: {
    LIST: '/locations',
    DETAIL: (id: string) => `/locations/${id}`,
  },
  EPISODES: {
    LIST: '/episodes',
    DETAIL: (id: string) => `/episodes/${id}`,
  },
};
