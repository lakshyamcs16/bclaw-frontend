import React from "react";
import { ShimmerTitle } from "shimmer-effects-react";

const SearchLoader: React.FC<{}> = () => {
  console.log("Loader");

  return (
    <div className="search-loader">
      <div>
        <ShimmerTitle mode="light" line={1} gap={4} height={20} />
        <ShimmerTitle mode="light" line={2} gap={4} height={15} />
      </div>
      <div>
        <ShimmerTitle mode="light" line={1} gap={4} height={20} />
        <ShimmerTitle mode="light" line={2} gap={4} height={15} />
      </div>
      <div>
        <ShimmerTitle mode="light" line={1} gap={4} height={20} />
        <ShimmerTitle mode="light" line={2} gap={4} height={15} />
      </div>
      <div>
        <ShimmerTitle mode="light" line={1} gap={4} height={20} />
        <ShimmerTitle mode="light" line={2} gap={4} height={15} />
      </div>
      <div>
        <ShimmerTitle mode="light" line={1} gap={4} height={20} />
        <ShimmerTitle mode="light" line={2} gap={4} height={15} />
      </div>
      <div>
        <ShimmerTitle mode="light" line={1} gap={4} height={20} />
        <ShimmerTitle mode="light" line={2} gap={4} height={15} />
      </div>
      <div>
        <ShimmerTitle mode="light" line={1} gap={4} height={20} />
        <ShimmerTitle mode="light" line={2} gap={4} height={15} />
      </div>
      <div>
        <ShimmerTitle mode="light" line={1} gap={4} height={20} />
        <ShimmerTitle mode="light" line={2} gap={4} height={15} />
      </div>
    </div>
  );
};

export default SearchLoader;
