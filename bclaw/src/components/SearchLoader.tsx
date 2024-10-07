import React from "react";
import { ShimmerTitle } from "shimmer-effects-react";

const SearchLoader: React.FC = () => {
  const shimmerItems = Array(8).fill(null);

  return (
    <div className="search-loader" aria-label="Loading search results" role="status">
      <ShimmerTitle mode="light" line={1} gap={4} height={20} />
      {shimmerItems.map((_, index) => (
        <div key={index}>
          <ShimmerTitle mode="light" line={1} gap={4} height={20} />
          <ShimmerTitle mode="light" line={2} gap={4} height={15} />
        </div>
      ))}
    </div>
  );
};

export default SearchLoader;