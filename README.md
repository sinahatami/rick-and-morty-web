# 🧪 Rick & Morty Wiki

## An interdimensional database for exploring characters, locations, and episodes from

## the Rick and Morty universe. Built with performance, scalability, and clean

## architecture in mind.

## 🚀 Features

## Multiverse Explorer: Browse detailed lists of Characters, Locations, and Episodes.

## Deep Linking: Fully interconnected data. Navigate from a Character to their Origin

## Location, or see all Characters in a specific Episode.

## Advanced Filtering: Filter by status, species, gender, type, and dimension.

## URL Synchronization: All search and filter states are synced to the URL (useUrlSync),

## allowing users to share exact search results.

## Infinite Scrolling: Seamless pagination powered by TanStack Query.

## Dark Mode: Fully responsive Light/Dark themes using next-themes.

## Responsive Design: Mobile-first layout with a custom navigation drawer and grid system.

## 🛠 Tech Stack

## Framework:Next.js (React)

## Language:TypeScript

## Styling:Tailwind CSS

## State & Data Fetching:TanStack Query (React Query)

## Icons:Lucide React

## API:The Rick and Morty API

## Testing:Vitest

## 📦 Key Dependencies

## The project relies on a curated set of robust libraries to handle core functionality.

```
Package Purpose
```

```
@tanstack/react-query Handles server state, caching, and infinite scroll pagination.
```

```
zustand A small, fast, and scalable bearbones state-management solution.
```

```
axios Promise-based HTTP client for making requests to the Rick and
Morty API.
```

```
react-intersection-
observer
```

```
Monitors the scroll position to trigger "Load More" actions
automatically.
```

```
lucide-react Provides a clean, consistent set of SVG icons.
```

```
tailwindcss Utility-first CSS framework for rapid UI development.
```

```
msw Mock Service Worker for API mocking during testing.
```

```
vitest Blazing fast unit test framework powered by Vite.
```

## 💻 Getting Started

### Follow these steps to set up the project locally on your machine.

### Prerequisites

### Node.js (Latest LTS recommended)

### Yarn (Package Manager)

### Installation

### 1. Clone the repository

```
git clone [https://github.com/sinahatami/rick-and-morty-web.git](https://gith
cd rick-and-morty-web
```

### 2. Install dependencies

```
yarn install
```

### 3. Start the development server

```
yarn dev
```

### Open http://localhost:3000 with your browser to see the result.

## ✅ Quality Assurance

### This project uses a strict suite of tools to ensure code quality.

```
Command Description
```

```
yarn typecheck Runs the TypeScript compiler to check for type errors.
```

```
yarn lint Runs ESLint to catch code issues.
```

```
yarn format Formats code using Prettier.
```

```
yarn test Runs unit tests using Vitest.
```

## 🏗 Architecture & Design Patterns

### This project follows a modular, feature-based architecture to ensure maintainability and

### scalability.

### 1. Centralized API Layer

### All data fetching logic is encapsulated in src/lib/api-client.ts. This provides a type-safe,

### consistent interface for the entire application and handles 404/Error states globally.

### 2. Custom Hooks

### Logic is extracted into reusable hooks to keep components clean:

### useUrlSync: A powerful hook that manages the two-way binding between the UI (Search

### Bar/Filters) and the URL Query Parameters.

### useCharacters / useLocations / useEpisodes: Specialized hooks wrapping React

### Query's useInfiniteQuery for data fetching and caching.

### 3. Component Design System

### A set of atomic, shared components ensures UI consistency:

### BaseCard: Handles hover effects, shadows, and theme colors (Green for Characters, Blue

### for Locations, Orange for Episodes).

### ResourcePageLayout: A higher-order layout component that standardizes the header,

### search bar, grid, and loading states across all list pages.

### EmptyState / NotFoundState: Standardized UI for error handling.

## 📂 Project Structure

```
public/
└── images/ # Static images
```

```
src/
├── components/
│ ├── character/ # Character-specific components (Card, Detail)
│ ├── episode/ # Episode-specific components
│ ├── location/ # Location-specific components
│ ├── shared/ # Reusable UI (Button, Modal, Loader, etc.)
│ └── context/ # Theme Provider ('portal', 'rick', and 'morty')
├── hooks/ # Custom logic (useUrlSync, useDebounce)
├── lib/ # API client and singletons
├── pages/ # Next.js routes
├── styles/ # Tailwind and Global CSS
├── test/ # Test components
├── utils/ # Some helper files
└── types/ # Centralized TypeScript definitions
```
