import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

import { Button } from './Button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center animate-in fade-in zoom-in-95 duration-300">
          {/* Icon Circle */}
          <div className="p-4 rounded-full mb-6 bg-red-50 dark:bg-red-900/20">
            <AlertTriangle className="h-12 w-12 text-red-500 dark:text-red-400" />
          </div>

          {/* Title */}
          <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">
            Portal Gun Malfunction
          </h2>

          {/* Error Message */}
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md text-lg leading-relaxed">
            {this.state.error?.message || 'An unexpected dimensional rift occurred.'}
          </p>

          {/* Action Button using your Shared Component */}
          <Button onClick={() => window.location.reload()} icon={RefreshCw} theme="character">
            Reload Dimension
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
