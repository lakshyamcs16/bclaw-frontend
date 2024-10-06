import { ISummaryResponse } from "../types/Metadata";
import SummaryLoader from "./SummaryLoader";

const Summary: React.FC<ISummaryResponse & { title: string, isSummaryLoading: boolean }> = ({
  summary, title, isSummaryLoading
}) => {
  return (
    <div className="summary-modal-container">
      {isSummaryLoading && <SummaryLoader />}
      {title && <h2>Summary of {title}</h2>}
      {summary && <div dangerouslySetInnerHTML={{ __html: summary }} />}
    </div>
  );
};

export default Summary;
