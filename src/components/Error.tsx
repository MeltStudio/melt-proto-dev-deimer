export const Error = ({ message }: { message: string }) => {
  return (
    <div className="container max-w-7xl mx-auto flex h-full w-full items-center justify-center">
      <div className="text-center">
        <p className="text-red-600">Error loading tasks: {message}</p>
      </div>
    </div>
  );
};
