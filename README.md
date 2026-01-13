# 🧪 Rick & Morty Wiki

[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://sinahatami.github.io/rick-and-morty-web)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**🔗 Live Demo:** [https://sinahatami.github.io/rick-and-morty-web](https://sinahatami.github.io/rick-and-morty-web)

![Homepage](public/images/screenshot.png)

An interdimensional database for exploring characters, locations, and episodes from the Rick and Morty universe. Built with performance, scalability, and clean architecture in mind.

---

## 🚀 Features

- **Multiverse Explorer** - Browse detailed lists of Characters, Locations, and Episodes.

- **Deep Linking** - Fully interconnected data. Navigate from a Character to their Origin Location, or see all Characters in a specific Episode.

- **Advanced Filtering** - Filter by status, species, gender, type, and dimension.

- **URL Synchronization** - All search and filter states are synced to the URL (`useUrlSync`), allowing users to share exact search results.

- **Infinite Scrolling** - Seamless pagination powered by TanStack Query.

- **Responsive Design** - Mobile-first layout with a custom navigation drawer and grid system.

---

## 🛠 Tech Stack

- **Framework:** Next.js (React)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State & Data Fetching:** TanStack Query (React Query)
- **Icons:** lucide-react
- **API:** The Rick and Morty API
- **Testing:** Vitest

---

## 📦 Key Dependencies

| Package                 | Purpose                                                        |
| ----------------------- | -------------------------------------------------------------- |
| `@tanstack/react-query` | Handles server state, caching, and infinite scroll pagination. |
| `lucide-react`          | Provides a clean, consistent set of SVG icons.                 |
| `tailwindcss`           | Utility-first CSS framework for rapid UI development.          |
| `vitest`                | Fast unit test framework powered by Vite.                      |

---

## 💻 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

- Node.js (Latest LTS recommended)
- Yarn (or `pnpm`/`npm` - adjust commands as needed)

### Installation

1. Clone the repository

```bash
git clone https://github.com/sinahatami/rick-and-morty-web.git
cd rick-and-morty-web
```

2. Install dependencies

```bash
yarn install
```

3. Start the development server

```bash
yarn dev
```

Open `http://localhost:3000` in your browser to see the result.

> If you're using `npm` or `pnpm`, replace `yarn` with `npm run` or `pnpm` accordingly.

---

## ✅ Quality Assurance

This project uses a strict suite of tools to ensure code quality.

| Command          | Description                                            |
| ---------------- | ------------------------------------------------------ |
| `yarn typecheck` | Runs the TypeScript compiler to check for type errors. |
| `yarn lint`      | Runs ESLint to catch code issues.                      |
| `yarn format`    | Formats code using Prettier.                           |
| `yarn test`      | Runs unit tests using Vitest.                          |
| `yarn knip`      | Finds unused files, dependencies, and exports.         |

---

## 🏗 Architecture & Design Patterns

This project follows a modular, feature-based architecture to ensure maintainability and scalability.

### 1. Centralized API Layer

All data fetching logic is encapsulated in `src/lib/api-client.ts`. This provides a type-safe, consistent interface for the entire application and handles 404/Error states globally.

### 2. Custom Hooks

Logic is extracted into reusable hooks to keep components clean:

- `useUrlSync` : Manages two-way binding between the UI (Search Bar/Filters) and URL query parameters.
- `useCharacters` / `useLocations` / `useEpisodes` : Specialized hooks wrapping React Query's `useInfiniteQuery` for data fetching and caching.

### 3. Component Design System

A set of atomic, shared components ensures UI consistency:

- `BaseCard` - Handles hover effects, shadows, and theme colors (Green for Characters, Blue for Locations, Orange for Episodes).
- `ResourcePageLayout` - A higher-order layout component that standardizes the header, search bar, grid, and loading states across all list pages.
- `EmptyState` / `NotFoundState` - Standardized UI for error handling.

---

## 📂 Project Structure

```
public/
└── images/ # Static images
```

```
src/
├── components/
│   ├── character/   # Character-specific components (Card, Detail)
│   ├── episode/     # Episode-specific components
│   ├── location/    # Location-specific components
│   ├── shared/      # Reusable UI (Button, Modal, Loader, etc.)
│   └── context/     # Theme Provider (e.g. 'portal', 'rick', 'morty')
├── hooks/           # Custom logic (useUrlSync, useDebounce)
├── lib/             # API client and singletons
├── pages/           # Next.js routes
├── styles/          # Tailwind and global CSS
├── test/            # Test components
├── utils/           # Helper files
└── types/           # Centralized TypeScript definitions
```

---
