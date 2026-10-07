import  React from 'react';
import * as stylex from '@stylexjs/stylex';
import { emptyStateStyles } from './empty-state.styles';

interface EmptyStateProps {
  title: string;
  message: string;
  className?: string;
}

export const EmptyState = ({ title, message, className }: EmptyStateProps) => {
  const containerProps = stylex.props(emptyStateStyles.container);

  return (
    <div
      {...containerProps}
      className={[containerProps.className, className].filter(Boolean).join(' ')}
      role="status"
      aria-live="polite"
    >
      <div {...stylex.props(emptyStateStyles.content)}>
        <h2 {...stylex.props(emptyStateStyles.title)}>{title}</h2>
        <p {...stylex.props(emptyStateStyles.message)}>{message}</p>
      </div>
    </div>
  );
};
