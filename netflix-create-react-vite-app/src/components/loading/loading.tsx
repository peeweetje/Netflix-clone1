import React, { type ReactNode } from 'react';
import { Spinner } from '../spinner/spinner';

interface LoadingProps {
  loading: boolean;
  error: string | null;
  children: ReactNode;
}

export const Loading = ({ loading, error, children }: LoadingProps) => {
  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p role="alert" aria-live="assertive">{error}</p>;
  }

  return <>{children}</>;
};
