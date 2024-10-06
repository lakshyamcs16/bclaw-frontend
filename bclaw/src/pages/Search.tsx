import React, { useState } from "react";
import {
  InlineAlert,
  Modal,
  Select,
  TextField,
} from "@bcgov/design-system-react-components";
import SearchIcon from "../assets/icons/SearchIcon";
import { IDocuments, ISummaryResponse } from "../types/Metadata";
import Pagination from "../components/Pagination";
import { fetchDocumentsMetadata } from "../utilities/Search";
import Summary from "../components/Summary";
import { fetchDocumentSummary } from "../utilities/Summarize";
import { BC_LAW_DOCUMENT_URL } from "../utilities/Constants";
import SearchLoader from "../components/SearchLoader";

const Search: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [jury, setJury] = useState<string>("statreg");
  const [page, setPage] = useState<number>(1);
  const [documents, setDocuments] = useState<IDocuments | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSummaryLoading, setIsSummaryLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [summaryContent, setSummaryContent] = useState<
    (ISummaryResponse & { title: string }) | null
  >(null);

  const resetState = () => {
    setIsLoading(false);
    setError(null);
    setDocuments(null);
    setInfo(null);
    setIsModalOpen(false);
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
      const responseData = await fetchDocumentsMetadata(
        jury,
        query,
        searchPage
      );
      if (
        responseData &&
        responseData.data &&
        responseData.data.total_pages > 0
      ) {
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
        setError(
          "The service is currently unavailable. Please try again later."
        );
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
        setError("Failed to get the summary");
      }
    } catch (error) {
      handleSearchError(error);
    } finally {
      setIsSummaryLoading(false);
    }
  };

  return (
    <>
      <div className="content-container">
        <div className="search-container">
          <TextField
            label="Enter a term to search the titles"
            type="search"
            className="input-container"
            size="medium"
            iconLeft={<SearchIcon width="12px" height="12px" />}
            isRequired
            minLength={1}
            maxLength={20}
            value={query}
            onChange={setQuery}
            onKeyUp={handleKeyEvent}
            aria-describedby="search-instructions"
          />
          <div className="search-results">
            {renderSearchResults(cardClickHandler)}
            {renderPagination()}
            {/* Error message display */}
            {error && (
              <InlineAlert
                description={error}
                onClose={() => setError(null)}
                variant="danger"
                isCloseable
              />
            )}
            {/* Info message display */}
            {info && (
              <InlineAlert
                description={info}
                onClose={() => setInfo(null)}
                variant="info"
                isCloseable
              />
            )}
            {isLoading && <SearchLoader />}
          </div>
        </div>
        <div className="dropdown-container">
          <Select
            label="Select Jurisdiction"
            size="medium"
            items={[
              { id: "statreg", label: "Public Statutes and Regulations" },
              {
                id: "psl",
                label: "Private, Special and Local Statutes and Regulations",
              },
            ]}
            isRequired
            defaultSelectedKey="statreg"
            onSelectionChange={handleSelect}
          />
        </div>
        <Modal
          isOpen={isModalOpen}
          isDismissable
          shouldCloseOnInteractOutside={() => {
            setSummaryContent(null);
            setIsModalOpen(false);
            return true;
          }}
        >
          <Summary
            title={summaryContent?.title || ""}
            summary={summaryContent?.summary || ""}
            url={summaryContent?.url || ""}
            time_taken={summaryContent?.time_taken || 0}
            isSummaryLoading={isSummaryLoading}
          />
        </Modal>
      </div>
    </>
  );

  function renderSearchResults(
    clickHandler: React.MouseEventHandler<HTMLDivElement>
  ) {
    if (!documents || !documents.data || documents.data.total_pages === 0)
      return null;

    return documents.data.data.map(
      ({ title, document_id, index_id, location }) => (
        <div
          key={`${document_id}_${index_id}`}
          id={`${document_id}@@${index_id}@@${title}`}
          className="meta-container"
          onClick={clickHandler}
        >
          <h3>{title}</h3>
          <div>
            <a
              href={`${BC_LAW_DOCUMENT_URL}/document/id/complete/${index_id}/${document_id}`}
              rel="noreferrer"
              target="_blank"
              onClick={(e) => e.stopPropagation()}
            >
              {location}
            </a>
          </div>
        </div>
      )
    );
  }

  function renderPagination() {
    if (!documents || !documents.data || documents.data.total_pages === 0)
      return null;

    return (
      <Pagination
        pages={documents.data.total_pages}
        selectedPage={page}
        setPage={handlePagination}
      />
    );
  }
};

export default Search;
