import React from "react";
import { ShimmerDiv, ShimmerTitle } from "shimmer-effects-react";

const SummaryLoader: React.FC<{}> = () => {
  return (
    <div>
      <ShimmerDiv mode="light" height={60} width={400} />
      <div className="separator"></div>
      <ShimmerTitle mode="light" line={4} gap={4} />
      <ul>
        <li>
          <ShimmerTitle mode="light" line={3} gap={4} />
        </li>
        <li>
          <ShimmerTitle mode="light" line={3} gap={4} />
        </li>
        <li>
          <ShimmerTitle mode="light" line={3} gap={4} />
        </li>
      </ul>
      <ShimmerTitle mode="light" line={4} gap={4} />
    </div>
  );
};

export default SummaryLoader;
