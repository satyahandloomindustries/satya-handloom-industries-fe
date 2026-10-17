const Shimmer = ({ className = '' }) => {
  return (
    <div className={`relative overflow-hidden bg-[#f3e6cf] ${className}`}>
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-[#fffaf3] to-transparent" />
    </div>
  );
};

export default Shimmer;
