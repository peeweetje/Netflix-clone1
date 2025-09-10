interface EmptyStateProps {
  title: string;
  message: string;
  className?: string;
}

export const EmptyState = ({ title, message, className = '' }: EmptyStateProps) => {
  return (
    <div
    className={`flex items-center justify-center min-h-[60vh] ${className}`}
     role="status"
     aria-live="polite">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-foreground mb-4">{title}</h2>
        <p className="text-muted-foreground">{message}</p>
      </div>
    </div>
  );
};
