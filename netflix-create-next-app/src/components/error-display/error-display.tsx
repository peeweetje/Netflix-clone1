import React from 'react';
import { AlertCircle, Wifi, RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';

interface ErrorDisplayProps {
  title?: string;
  message: string;
  type?: 'error' | 'warning' | 'info' | 'no-data';
  showRetry?: boolean;
  onRetry?: () => void;
  className?: string;
}

export const ErrorDisplay = ({
  title,
  message,
  type = 'error',
  showRetry = false,
  onRetry,
  className = '',
}: ErrorDisplayProps) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'error':
        return {
          container: 'bg-red-900/20 border-red-500/30',
          text: 'text-red-400',
          icon: 'text-red-500'
        };
      case 'warning':
        return {
          container: 'bg-yellow-900/20 border-yellow-500/30',
          text: 'text-yellow-400',
          icon: 'text-yellow-500'
        };
      case 'info':
        return {
          container: 'bg-blue-900/20 border-blue-500/30',
          text: 'text-blue-400',
          icon: 'text-blue-500'
        };
      case 'no-data':
        return {
          container: 'bg-gray-900/50 border-gray-600/30',
          text: 'text-gray-400',
          icon: 'text-gray-500'
        };
      default:
        return {
          container: 'bg-red-900/20 border-red-500/30',
          text: 'text-red-400',
          icon: 'text-red-500'
        };
    }
  };

  const getDefaultTitle = () => {
    switch (type) {
      case 'error':
        return 'Something went wrong';
      case 'warning':
        return 'Warning';
      case 'info':
        return 'Information';
      case 'no-data':
        return 'No data available';
      default:
        return 'Error';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'error':
        return <AlertCircle className={`w-5 h-5 ${getTypeStyles().icon}`} />;
      case 'warning':
        return <AlertCircle className={`w-5 h-5 ${getTypeStyles().icon}`} />;
      case 'info':
        return <AlertCircle className={`w-5 h-5 ${getTypeStyles().icon}`} />;
      case 'no-data':
        return <Wifi className={`w-5 h-5 ${getTypeStyles().icon}`} />;
      default:
        return <AlertCircle className={`w-5 h-5 ${getTypeStyles().icon}`} />;
    }
  };

  const styles = getTypeStyles();

  return (
    <div className={`p-6 border rounded-lg max-w-md mx-auto ${styles.container} ${className}`}>
      <div className="text-center">
        <div className="flex justify-center mb-3">
          {getIcon()}
        </div>

        <h3 className={`text-lg font-semibold mb-2 ${styles.text}`}>
          {title || getDefaultTitle()}
        </h3>

        <p className={`text-sm mb-4 ${styles.text} opacity-90`}>
          {message}
        </p>

        {showRetry && onRetry && (
          <Button
            onClick={onRetry}
            variant="outline"
            size="sm"
            className={`border-current ${styles.text} hover:bg-current hover:bg-opacity-10`}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
};

export default ErrorDisplay;
