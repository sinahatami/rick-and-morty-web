import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

// Mock Next.js Router
jest.mock('next/router', () => require('next-router-mock'));

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: props => {
    return <img {...props} />;
  },
}));

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  Github: () => 'GithubIcon',
  Linkedin: () => 'LinkedinIcon',
  Heart: () => 'HeartIcon',
  // Add more icons as needed
  __esModule: true,
}));
