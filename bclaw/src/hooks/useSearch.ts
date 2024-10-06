import { useState } from "react";
import { IDocuments } from "../types/Metadata";
import { fetchDocumentsMetadata } from "../utilities/Search";

export const useSearch = () => {
  const [query, setQuery] = useState<string>("");
  const [jury, setJury] = useState<string>("statreg");
  const [page, setPage] = useState<number>(1);
  const [documents, setDocuments] = useState<IDocuments | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const resetState = () => {
    setIsLoading(false);
    setError(null);
    setDocuments(null);
    setInfo(null);
  };

  const handleSearch = async (searchPage: number) => {
    if (!query.trim()) {
      resetState();
      setError("Please enter a term to search.");
      return;
    }

    resetState();
    setIsLoading(true);

    try {
      const responseData = await fetchDocumentsMetadata(jury, query, searchPage);
      if (responseData && responseData.data && responseData.data.total_pages > 0) {
        setDocuments(responseData);
      } else {
        setInfo("The given query didn't match with any document titles");
      }
    } catch (error) {
      handleSearchError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchError = (error: unknown) => {
    if (error instanceof Error) {
      if (error.message.includes("Service Unavailable")) {
        setError("The service is currently unavailable. Please try again later.");
      } else {
        setError(`Failed to get details for the query: ${error.message}`);
      }
    } else {
      setError("An unexpected error occurred. Please try again.");
    }
    console.error("Error fetching documents:", error);
  };

  const handleKeyEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(1);
    }
  };

  const handleSelect = (e: React.Key) => {
    setJury(e.toString());
  };

  const handlePagination = (newPage: number) => {
    setPage(newPage);
    handleSearch(newPage);
  };

  return {
    query, setQuery,
    jury, setJury,
    page, setPage,
    documents, setDocuments,
    error, setError,
    info, setInfo,
    isLoading, setIsLoading,
    handleSearch,
    handleKeyEvent,
    handleSelect,
    handlePagination
  };
};