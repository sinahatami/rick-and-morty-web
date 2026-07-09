# 🧪 Rick & Morty Explorer (Enterprise Edition)

[![CI Pipeline](https://github.com/sinahatami/rick-and-morty-web/actions/workflows/ci.yml/badge.svg)](https://github.com/sinahatami/rick-and-morty-web/actions)
[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://sinahatami.github.io/rick-and-morty-web)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**🔗 Live Demo:** [https://sinahatami.github.io/rick-and-morty-web](https://sinahatami.github.io/rick-and-morty-web)

![Homepage](public/images/screenshot.png)

A production-grade, highly-optimized interdimensional database for exploring characters, locations, and episodes from the Rick and Morty universe. Built with enterprise performance, extreme scalability, and pristine architectural standards in mind.

---

## 🚀 Features & Architecture

- **Universal Command Palette (Omnisearch)** - Instantly search across Characters, Locations, and Episodes with a keyboard-first `⌘K` command menu powered by `cmdk`.
- **Premium Headless UI** - Built with **Radix UI** primitives and **Shadcn UI** components to ensure massive accessibility (a11y), focus management, and keyboard navigation.
- **Multiverse Explorer** - Browse detailed lists of Characters, Locations, and Episodes with a seamless, responsive UI featuring dynamic **Skeleton Grid Loaders**.
- **Deep Linking & URL Sync** - All search, pagination, and filter states are synced to the URL (`useUrlSync`), allowing users to bookmark and share exact search results.
- **Infinite Scrolling** - Silky-smooth pagination powered by TanStack Query (React Query v5).
- **Mobile-First UX** - Utilizes native slide-out **Sheets** for mobile navigation and filters, completely eliminating clunky mobile dropdowns.
- **Production-Ready SEO** - Built-in dynamic `<SEO />` engine that generates canonical URLs, OpenGraph (Facebook/LinkedIn) cards, and Twitter rich-previews on the fly.

---

## 🛠 Tech Stack

- **Framework:** Next.js (React 18)
- **Language:** TypeScript (Strict Mode)
- **UI Components:** Shadcn UI & Radix UI Primitives
- **Styling:** SASS / SCSS & Tailwind CSS v4
- **State & Data Fetching:** TanStack Query (React Query)
- **Icons:** lucide-react
- **API:** The Rick and Morty API

---

## 🧪 Testing & CI/CD Infrastructure

This repository is hardened by a massive multi-layered testing and continuous integration suite.

- **Unit & Integration Testing:** 100% test passing rate powered by **Jest** and **React Testing Library**.
- **Visual Debugging:** Integrated **Jest Preview** for rapid visual component debugging.
- **End-to-End (E2E) Testing:** Full browser automation and regression testing powered by **Cypress**.
- **CI/CD Pipelines:** Automated **GitHub Actions** workflows (`ci.yml`, `cd.yml`) enforce strict type-checking, linting, unit testing, and E2E testing on every Pull Request.
- **Git Hooks:** Secured by **Husky** to prevent bad commits from ever reaching the remote repository.

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

---

## ✅ Quality Assurance Commands

This project uses a strict suite of tools to ensure enterprise-level code quality.

| Command             | Description                                                  |
| ------------------- | ------------------------------------------------------------ |
| `yarn typecheck`    | Runs the TypeScript compiler to ensure strict typing.        |
| `yarn lint`         | Runs ESLint to enforce code style.                           |
| `yarn test:once`    | Runs the full Jest unit/integration test suite once.         |
| `yarn test:preview` | Launches Jest Preview server for visual debugging.           |
| `yarn cypress:open` | Opens the interactive Cypress GUI for local E2E testing.     |
| `yarn test:e2e:ci`  | Headless Cypress test runner mapped against the Next build.  |
| `yarn knip`         | Audits the repository for dead code and unused dependencies. |

---

## 🏗 Advanced Design Patterns

This project follows a strict **Feature-Sliced Design (FSD)** inspired architecture to ensure zero circular dependencies.

### 1. Atomic Typing

Types are strictly localized to their domains (e.g. `src/types/character`, `src/types/episode`) and cross-imported securely. This entirely prevents TypeScript circular dependency loops.

### 2. Centralized API Layer

All data fetching logic is encapsulated in `src/lib/api-client.ts`. This provides a type-safe, consistent interface for the entire application and handles 404/Error states globally.

### 3. Component Design System

A set of atomic, shared components ensures UI consistency:

- `FilterPanel` - Uses a highly responsive desktop dropdown and a native mobile "bottom-sheet" portal.
- `ResourcePageLayout` - A higher-order layout component that standardizes the header, search bar, grid, and loading states across all list pages.
- `SEO` - A global meta-tag injector ensuring the site is fully indexable by search engines.

---

## 📂 Project Structure

```
src/
├── components/
│   ├── ui/          # Shadcn / Radix Primitive UI components
│   ├── character/   # Character domain components
│   ├── episode/     # Episode domain components
│   ├── location/    # Location domain components
│   ├── shared/      # Reusable UI (Button, SEO, SearchBar)
│   └── context/     # Theme Provider ('portal', 'rick', 'morty')
├── hooks/           # Custom React hooks (useUrlSync, useCharacters)
├── lib/             # API client and Next.js singletons
├── pages/           # Next.js Application Routes
├── styles/          # SCSS Globals and Tailwind Configuration
├── types/           # Atomic Domain Interfaces
└── utils/           # String, URL, and Math helpers
```
