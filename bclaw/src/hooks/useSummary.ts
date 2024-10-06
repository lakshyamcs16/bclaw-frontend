import { useState } from "react";
import { ISummaryResponse } from "../types/Metadata";
import { fetchDocumentSummary } from "../utilities/Summarize";

export const useSummary = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSummaryLoading, setIsSummaryLoading] = useState<boolean>(false);
  const [summaryContent, setSummaryContent] = useState<(ISummaryResponse & { title: string }) | null>(null);

  const cardClickHandler = async (e: React.MouseEvent<HTMLDivElement>) => {
    if (!e.currentTarget) return;

    try {
      const id = (e.currentTarget as HTMLElement).id;
      const [documentId, jurisdiction, title] = id.split("@@");
      setIsModalOpen(true);
      setIsSummaryLoading(true);

      const response = await fetchDocumentSummary(documentId, jurisdiction);

      if (response && response.summary && response.summary.length > 0) {
        setSummaryContent({ ...response, title });
      } else {
        throw new Error("Failed to get the summary");
      }
    } catch (error) {
      console.error("Error fetching summary:", error);
      // You might want to set an error state here and display it in the UI
    } finally {
      setIsSummaryLoading(false);
    }
  };

  return {
    isModalOpen,
    setIsModalOpen,
    summaryContent,
    setSummaryContent,
    isSummaryLoading,
    cardClickHandler
  };
};