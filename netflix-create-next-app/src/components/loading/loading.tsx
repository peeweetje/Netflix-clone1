import { Spinner } from '../spinner/spinner';

interface LoadingProps {
  loading: boolean;
  error: string | null;
  children: React.ReactNode;
}

export const Loading = ({ loading, error, children }: LoadingProps) => {
  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <p className="text-center py-8 text-foreground">
        {error}
      </p>
    );
  }

  return <>{children}</>;
};
