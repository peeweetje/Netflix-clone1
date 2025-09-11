import { Spinner } from '../spinner/spinner';

interface LoadingProps {
  loading: boolean;
  error: string | null;
  children: React.ReactNode;
  showError?: boolean;
}

export const Loading = ({ loading, error, children, showError = true }: LoadingProps) => {
  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="relative">
      {children}
      {error && showError && (
        <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <p className="text-center text-destructive text-sm">
            {error}
          </p>
        </div>
      )}
    </div>
  );
};
