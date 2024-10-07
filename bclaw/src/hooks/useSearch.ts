import { useState } from "react";
import { IDocuments } from "../types/Metadata";
import { fetchDocumentsMetadata } from "../utilities/Search";

// Custom hook for managing search functionality
export const useSearch = () => {
  const [query, setQuery] = useState<string>("");
  const [jury, setJury] = useState<string>("statreg");
  const [page, setPage] = useState<number>(1);
  const [documents, setDocuments] = useState<IDocuments | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Reset state variables except query and jury
  const resetState = () => {
    setIsLoading(false);
    setError(null);
    setDocuments(null);
    setInfo(null);
  };

  // Handle the search process
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
      if (responseData?.data?.total_pages > 0) {
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

  // Handle errors that occur during search
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

  // Handle key press
  const handleKeyEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(1);
    }
  };

  // Handle jurisdiction selection
  const handleSelect = (e: React.Key) => {
    setJury(e.toString());
  };

  // Handle pagination
  const handlePagination = (newPage: number) => {
    setPage(newPage);
    handleSearch(newPage);
  };

  // Return all state variables and functions
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