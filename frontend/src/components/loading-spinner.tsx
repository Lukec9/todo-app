const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="w-16 h-16 border-4 border-t-4 border-t-green-500 border-green-200 rounded-full spinner" />
    </div>
  );
};

export default LoadingSpinner;
