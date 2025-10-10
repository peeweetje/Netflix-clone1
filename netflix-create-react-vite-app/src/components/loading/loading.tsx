import type React from 'react';
import { Spinner } from '../spinner/spinner';

interface LoadingProps {
  loading: boolean;
  error: string | null;
  children: React.ReactNode;
}

export const Loading: React.FC<LoadingProps> = ({ loading, error, children }) => {
  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p role="alert" aria-live="assertive">{error}</p>;
  }

  return <>{children}</>;
};
