import React from "react";
import { ShimmerDiv, ShimmerTitle } from "shimmer-effects-react";

// SummaryLoader component to display a loading state for the summary
const SummaryLoader: React.FC = () => {
  return (
    <div role="status" aria-label="Loading summary content">
      {/* Shimmer effect for the title */}
      <ShimmerDiv mode="light" height={60} width={400} />
      <div className="separator" aria-hidden="true"></div>

      {/* Shimmer effect for the first paragraph */}
      <ShimmerTitle mode="light" line={4} gap={4} />

      {/* Shimmer effects for list items */}
      <ul>
        {[1, 2, 3].map((item) => (
          <li key={item}>
            <ShimmerTitle mode="light" line={3} gap={4} />
          </li>
        ))}
      </ul>

      {/* Shimmer effect for the last paragraph */}
      <ShimmerTitle mode="light" line={4} gap={4} />
    </div>
  );
};

export default SummaryLoader;