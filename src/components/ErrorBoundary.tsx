import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    const { hasError } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      if (fallback) {
        return fallback;
      }

      return (
        <div className="border border-red-200 dark:border-red-900/50 p-4 sm:p-6 bg-red-50 dark:bg-red-950/20 rounded-2xl flex flex-col items-center justify-center text-center min-h-[300px]">
          <AlertCircle className="w-10 h-10 text-red-500 dark:text-red-400 mb-3" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">Something went wrong</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm">
            We encountered an error loading this project. Please try refreshing the page.
          </p>
        </div>
      );
    }

    return children;
  }
}
