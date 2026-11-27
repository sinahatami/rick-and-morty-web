import { type ReactNode } from 'react';

// Unlike a layout, a template is re-created on every navigation, which replays the entrance animation.
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-transition-enter">{children}</div>;
}
