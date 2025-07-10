export const Loading = () => {
  return (
    <div className="container max-w-7xl mx-auto flex h-full w-full items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2"></div>
        <p className="text-slate-600">Loading tasks...</p>
      </div>
    </div>
  );
};
