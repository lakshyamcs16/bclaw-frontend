import { useState } from "react";
import { ISummaryResponse } from "../types/Metadata";
import { fetchDocumentSummary } from "../utilities/Summarize";

// Custom hook for managing document summary functionality
export const useSummary = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSummaryLoading, setIsSummaryLoading] = useState<boolean>(false);
  const [summaryContent, setSummaryContent] = useState<(ISummaryResponse & { title: string }) | null>(null);
  const [summaryError, setSummaryError] = useState<string | null>(null);

  // Handler for when a document card is clicked
  const cardClickHandler = async (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    if (!target) return;

    try {
      // Extract document information from the clicked element's id
      const [documentId, jurisdiction, title] = target.id.split("@@");
      
      // Reset states and open modal
      setIsModalOpen(true);
      setIsSummaryLoading(true);
      setSummaryError(null);
      setSummaryContent(null);
      
      // Fetch the document summary
      const response = await fetchDocumentSummary(documentId, jurisdiction);

      if (response?.summary?.length > 0) {
        setSummaryContent({ ...response, title });
      } else {
        throw new Error("Failed to get the summary");
      }
    } catch (error) {
      console.error("Error fetching summary:", error);
      setSummaryError("Failed to fetch summary. Please try again later.");
    } finally {
      setIsSummaryLoading(false);
    }
  };

  // Return all state variables and functions
  return {
    isModalOpen,
    setIsModalOpen,
    summaryContent,
    setSummaryContent,
    isSummaryLoading,
    summaryError,
    setSummaryError,
    cardClickHandler
  };
};