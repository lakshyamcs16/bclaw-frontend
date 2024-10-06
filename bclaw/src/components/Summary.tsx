import { ISummaryResponse } from "../types/Metadata";

const Summary: React.FC<ISummaryResponse & { title: string }> = ({
  summary, title
}) => {
  return (
    <div className="summary-modal-container">
      {title && <h2>Summary of {title}</h2>}
      {summary && <div dangerouslySetInnerHTML={{ __html: summary }} />}
    </div>
  );
};

export default Summary;
