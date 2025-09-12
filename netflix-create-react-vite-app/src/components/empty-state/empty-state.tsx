import type React from 'react';
import {
  EmptyStateContainer,
  EmptyStateContent,
  EmptyStateTitle,
  EmptyStateMessage,
} from './empty-state.styles';

interface EmptyStateProps {
  title: string;
  message: string;
  className?: string;
}

export const EmptyState = ({ title, message, className }: EmptyStateProps) => {
  return (
    <EmptyStateContainer
      className={className}
      role="status"
      aria-live="polite"
    >
      <EmptyStateContent>
        <EmptyStateTitle>{title}</EmptyStateTitle>
        <EmptyStateMessage>{message}</EmptyStateMessage>
      </EmptyStateContent>
    </EmptyStateContainer>
  );
};
