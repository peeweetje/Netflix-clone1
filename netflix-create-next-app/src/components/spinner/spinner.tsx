

export const Spinner = () => {
  return (
    <div className="mt-16 flex flex-col items-center justify-center w-full h-full">
      <div
        className="w-12 h-12 text-primary-light border-4 border-primary border-t-transparent rounded-full animate-spin"
      />
      <p className="mt-4 text-xl text-primary">
        Loading...
      </p>
    </div>
  );
};
