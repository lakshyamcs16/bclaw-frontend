import React from 'react';
import DOMPurify from 'dompurify';
import { ISummaryResponse } from "../types/Metadata";
import SummaryLoader from "./SummaryLoader";

// Extend ISummaryResponse interface with additional props
interface SummaryProps extends ISummaryResponse {
  title: string;
  isSummaryLoading: boolean;
}

// Summary component to display the summary of a document
const Summary: React.FC<SummaryProps> = ({ summary, title, isSummaryLoading }) => {
  return (
    <div className="summary-modal-container" role="dialog" aria-labelledby="summary-title">
      {isSummaryLoading && <SummaryLoader />}
      {title && <h2 id="summary-title">Summary of {title}</h2>}
      {summary && (
        <div 
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(summary) }}
          aria-label="Document summary"
        />
      )}
    </div>
  );
};

export default Summary;